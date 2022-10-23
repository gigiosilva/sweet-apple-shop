import type { LoaderFunction } from '@remix-run/node';
import {
  useLoaderData, useNavigate, useSearchParams,
} from '@remix-run/react';
import { ProductGrid } from '~/components/products/ProductGrid';
import type { Product } from '~/models/Product';
import { ProductCard } from '~/components/products/ProductCard';
import { OrderPlacedModal } from '~/components/OrderPlacedModal';
import { getProducts } from '~/services/product.server';
import { useEffect } from 'react';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const products = await getProducts(url.searchParams.get('search') || '');
  return products;
};

export default function ProductsPage() {
  const products: Product[] = useLoaderData();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const orderPlaced = params.get('orderPlaced') === 'true';

  useEffect(() => {
    document.title = 'Sweet Apple Store | Products';
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
    <>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClickDetails={() => navigate(`/products/${product.id}`)}
            onClickAddToCart={() => addProductToCart(product)}
          />
        ))}
      </ProductGrid>
      {orderPlaced && <OrderPlacedModal />}
    </>
  );
}
