import {
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import * as React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { formatPrice } from './PriceTag';

type OrderSummaryItemProps = {
  label: string
  value?: string
  children?: React.ReactNode
}

const OrderSummaryItem = (props: OrderSummaryItemProps) => {
  const { label, value, children } = props;

  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

type OrderSummaryProps = {
  subtotal: number;
  total: number;
  onCheckout: () => void;
  onDiscount: (applied: boolean) => void;
}

export const CartOrderSummary = (props: OrderSummaryProps) => {
  const [coupon, setCoupon] = React.useState(false);
  const [shipping, setShipping] = React.useState(false);

  const {
    subtotal, total, onCheckout, onDiscount,
  } = props;

  const addDiscount = (applied: boolean) => {
    setCoupon(applied);
    onDiscount(applied);
  };

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Order Summary</Heading>

      <Stack spacing="6">
        <OrderSummaryItem label="Subtotal" value={formatPrice(subtotal)} />
        <OrderSummaryItem label="Shipping + Tax">
          {shipping ? (
            <Text fontWeight="medium">{formatPrice(0)}</Text>
          ) : (
            <Link href="#" textDecor="underline" onClick={() => setShipping(true)}>
              Calculate shipping
            </Link>
          )}
        </OrderSummaryItem>
        <OrderSummaryItem label="Coupon Code">
          {coupon ? (
            <HStack spacing={4}>
              <Tag
                size="md"
                borderRadius="full"
                variant="solid"
                colorScheme="blue"
              >
                <TagLabel>WanderMaps10</TagLabel>
                <TagCloseButton onClick={() => addDiscount(false)} />
              </Tag>
            </HStack>
          ) : (
            <Link textDecor="underline" onClick={() => addDiscount(true)}>
              Add coupon code
            </Link>
          )}
        </OrderSummaryItem>
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {formatPrice(total)}
          </Text>
        </Flex>
      </Stack>
      <Button colorScheme="blue" size="lg" fontSize="md" rightIcon={<FaArrowRight />} onClick={onCheckout}>
        Place Order
      </Button>
    </Stack>
  );
};