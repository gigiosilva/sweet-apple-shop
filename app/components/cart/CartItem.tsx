import type { SelectProps } from '@chakra-ui/react';
import {
  CloseButton, Flex, Link, Select, useColorModeValue,
} from '@chakra-ui/react';
import { PriceTag } from './PriceTag';
import { CartProductMeta } from './CartProductMeta';

type CartItemProps = {
  name: string
  description: string
  image: string
  price: number
  quantity: number
  onChangeQuantity: (quantity: number) => void
  onClickDelete?: () => void
  onImageClick?: () => void
  onTitleClick?: () => void
}

const QuantitySelect = (props: SelectProps) => (
  <Select
    maxW="64px"
    aria-label="Select quantity"
    focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
    {...props}
  >
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
    <option value="9">9</option>
    <option value="10">10</option>
    <option value="11">11</option>
    <option value="12">12</option>
    <option value="13">13</option>
    <option value="14">14</option>
    <option value="15">15</option>

  </Select>
);

export const CartItem = (props: CartItemProps) => {
  const {
    name,
    description,
    image,
    price,
    quantity,
    onChangeQuantity,
    onClickDelete,
    onImageClick,
    onTitleClick,
  } = props;

  return (
    <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
      <CartProductMeta
        name={name}
        description={description}
        image={image}
        onImageClick={onImageClick}
        onTitleClick={onTitleClick}
      />

      <Flex width="full" justify="space-between" display={{ base: 'none', md: 'flex' }}>
        <QuantitySelect
          value={(quantity || 1)}
          onChange={(e) => {
            onChangeQuantity?.(+e.currentTarget.value);
          }}
        />
        <PriceTag price={price} currency="USD" />
        <CloseButton aria-label={`Delete ${name} from cart`} onClick={onClickDelete} />
      </Flex>

      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{ base: 'flex', md: 'none' }}
      >
        <Link fontSize="sm" textDecor="underline">
          Delete
        </Link>
        <QuantitySelect
          value={(quantity || 1)}
          onChange={(e) => {
            onChangeQuantity?.(+e.currentTarget.value);
          }}
        />
        <PriceTag price={price} currency="USD" />
      </Flex>
    </Flex>
  );
};