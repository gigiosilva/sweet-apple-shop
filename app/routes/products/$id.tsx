import {
  Box,
  Stack,
  Text,
  Image,
  Flex,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { useEffect } from 'react';
import { MdLocalShipping } from 'react-icons/md';
import { PriceTag } from '~/components/products/PriceTag';
import { Rating } from '~/components/products/Rating';
import type { Product } from '~/models/Product';
import { getProduct } from '~/services/product.server';

export const loader: LoaderFunction = async ({ params }) => {
  const product = await getProduct(params.id);
  return product;
};

export default function ProductDetailsPage() {
  const productData: Product = useLoaderData();
  const navigate = useNavigate();

  if (!productData) throw new Error('Product not found');

  useEffect(() => {
    document.title = `Sweet Apple Store | ${productData.name}`;
  });

  const addProductToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProduct = cart.find((p: Product) => p.id === product.id);
    if (!existingProduct) {
      product.quantity = 1;
      cart.push(product);
    } else {
      existingProduct.quantity += 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

  return (

    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 18, md: 24 }}
    >
      <Flex>
        <Image
          rounded="md"
          alt={productData.name}
          src={productData.image}
          fit="cover"
          align="center"
          w="100%"
          h={{ base: '100%', sm: '400px', lg: '500px' }}
        />
      </Flex>
      <Stack spacing={{ base: 6, md: 10 }}>
        <Box as="header">
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
          >
            {productData.name}
          </Heading>
          <VStack justify="space-between" align="self-start">
            <PriceTag price={productData.price + 10} salePrice={productData.price} currency="USD" />
            <Rating defaultValue={productData.rating} size="sm" />
          </VStack>
        </Box>

        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction="column"
          divider={(
            <StackDivider
              borderColor={useColorModeValue('gray.200', 'gray.600')}
            />
            )}
        >
          <Text
            color={useColorModeValue('gray.500', 'gray.400')}
            fontSize="2xl"
            fontWeight="300"
            h={{ base: 'auto', lg: '215px' }}
          >
            {productData.description}
          </Text>
        </Stack>

        {productData.isAvailable ? (

          <Button
            colorScheme="blue"
            width="full"
            onClick={() => addProductToCart(productData)}
          >
            Add to cart
          </Button>
        ) : (
          <Button
            colorScheme="gray"
            width="full"
            disabled
          >
            Out of stock
          </Button>
        )}

        <Stack direction="row" alignItems="center" justifyContent="center">
          <MdLocalShipping />
          <Text>2-3 business days delivery</Text>
        </Stack>
      </Stack>
    </SimpleGrid>
  );
}
