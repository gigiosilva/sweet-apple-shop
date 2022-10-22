export interface Product {
  id: string,
  name: string,
  description: string,
  image: string,
  price: number,
  rating: number,
  releated: Array<Product>,
  isAvailable: boolean,
  quantity: number,
}