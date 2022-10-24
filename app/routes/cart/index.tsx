import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
  VStack,
  Button,
  FormControl,
  Input,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { CartItem } from '~/components/cart/CartItem';
import { CartOrderSummary } from '~/components/cart/CartOrderSummary';
import type { Product } from '~/models/Product';
import {
  Link as RemixLink, useFetcher, useNavigate,
} from '@remix-run/react';
import Lottie from 'lottie-react';
import type { ActionFunction } from '@remix-run/node';
import { postOrder } from '~/services/product.server';
import cartEmptyAnimation from '../../../public/112087-empty.json';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const items = JSON.parse(formData.get('cart')?.toString() || '[]').map((p: Product) => ({
    productId: p.id,
    quantity: p.quantity,
  }));
  const name = formData.get('name')?.toString();
  const deliveryAddress = formData.get('deliveryAddress')?.toString();

  return postOrder({ name, deliveryAddress, items });
};

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [discount, setDiscount] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState<number>(1);
  const [nameInput, setNameInput] = useState('');
  const [addressInput, setAddressInput] = useState('');
  const [nameInputError, setNameInputError] = useState(false);
  const [addressInputError, setAddressInputError] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);

  const navigate = useNavigate();
  const fetcher = useFetcher();

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
    setNameInputError(false);
  };
  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressInput(e.target.value);
    setAddressInputError(false);
  };

  useEffect(() => {
    document.title = 'Sweet Apple Store | Cart';
  });

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(products);
  }, []);

  useEffect(() => {
    const { value, count } = cart.reduce((acc, product) => {
      acc.count += product.quantity;
      acc.value += (product.price * (product.quantity || 1));
      return acc;
    }, { value: 0, count: 0 });
    setSubtotal(value);
    setTotal(discount ? value * 0.9 : value);
    setCartCount(count);
  }, [cart]);

  useEffect(() => {
    setTotal(discount ? subtotal * 0.9 : subtotal);
  }, [discount]);

  const removeProductFromCart = (product: Product) => {
    const products = JSON.parse(localStorage.getItem('cart') || '[]');
    const newCart = products.filter((p: Product) => p.id !== product.id);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };

  const updateProductQuantity = (product: Product, quantity: number) => {
    const products = JSON.parse(localStorage.getItem('cart') || '[]');
    const newCart = products.map((p: Product) => {
      if (p.id === product.id) {
        return { ...p, quantity };
      }
      return p;
    });
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };

  const placeOrder = async () => {
    if (!nameInput) setNameInputError(true);
    if (!addressInput) setAddressInputError(true);
    if (!nameInput || !addressInput) return;

    setOrderLoading(true);

    const formData = new FormData();
    formData.append('cart', JSON.stringify(cart));
    formData.append('name', nameInput);
    formData.append('deliveryAddress', addressInput);

    fetcher.submit(formData, { method: 'post' });
    localStorage.removeItem('cart');
    navigate('/products?orderPlaced=true');
  };

  return (
    (cartCount > 0) ? (
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        align={{ lg: 'flex-start' }}
        spacing={{ base: '8', md: '16' }}
        pb={{ base: '8', md: '16' }}
        minH="Calc(100vh - 200px)"
      >
        <Stack spacing={{ base: '8', md: '10' }} flex="2">
          <Heading fontSize="2xl" fontWeight="extrabold">
            Shopping Cart (
            {cartCount}
            {' '}
            items)
          </Heading>

          <Stack spacing="6">
            {cart.map((product, i) => (
              <CartItem
                key={`${product.id}-${i}`}
                {...product}
                onClickDelete={() => removeProductFromCart(product)}
                onChangeQuantity={(quantity: number) => updateProductQuantity(product, quantity)}
                onImageClick={() => navigate(`/products/${product.id}`)}
                onTitleClick={() => navigate(`/products/${product.id}`)}
              />
            ))}
          </Stack>
        </Stack>

        <Flex direction="column" align="center" flex="1">
          <CartOrderSummary
            subtotal={subtotal}
            total={total}
            onCheckout={() => placeOrder()}
            onDiscount={(applied) => setDiscount(applied)}
            isLoading={orderLoading}
          >
            <FormControl>
              <VStack spacing={5}>
                <Input isInvalid={nameInputError} type='text' value={nameInput} onChange={handleNameInputChange} placeholder='Name' />
                <Input isInvalid={addressInputError} type='text' value={addressInput} onChange={handleAddressInputChange} placeholder='Delivery Address' />
              </VStack>
            </FormControl>  
          </ CartOrderSummary>
          <HStack mt="6" fontWeight="semibold">
            <p>or</p>
            <Link
              color={mode('blue.500', 'blue.200')}
              as={RemixLink}
              to="/products"
            >
              Continue shopping

            </Link>
          </HStack>
        </Flex>
      </Stack>
    ) : (
      <VStack justify="center" spacing={10} minH="Calc(100vh - 200px)">
        <Box width={{ base: '60%', lg: '40%' }}>
          <Lottie animationData={cartEmptyAnimation} loop={false} />
        </Box>
        <Heading fontSize="2xl" fontWeight="extrabold">Your cart is empty</Heading>
        <Button
          colorScheme="blue"
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </Button>
      </VStack>
    )
  );
}