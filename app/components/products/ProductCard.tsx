import type { StackProps } from '@chakra-ui/react';
import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Image,
  Skeleton,
  Link,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RemixLink } from '@remix-run/react';
import type { Product } from '~/models/Product';
import { Rating } from './Rating';
import { PriceTag } from './PriceTag';

interface Props {
  product: Product
  onClickDetails?: () => void
  onClickAddToCart?: () => void
  rootProps?: StackProps
}

export const ProductCard = (props: Props) => {
  const {
    product, rootProps, onClickDetails, onClickAddToCart,
  } = props;

  const {
    name, image, price, rating, isAvailable,
  } = product;

  return (
    <Stack spacing={useBreakpointValue({ base: '4', md: '5' })} {...rootProps}>
      <Box position="relative">
        <AspectRatio ratio={4 / 3}>
          <Image
            src={image}
            alt={name}
            draggable="false"
            cursor="pointer"
            fallback={<Skeleton />}
            borderRadius={useBreakpointValue({ base: 'md', md: 'xl' })}
            onClick={onClickDetails}
          />
        </AspectRatio>
      </Box>
      <Stack>
        <Stack spacing="1">
          <Text fontWeight="medium" color={useColorModeValue('gray.700', 'gray.400')}>
            {name}
          </Text>
          <PriceTag price={price + 10} salePrice={price} currency="USD" />
        </Stack>
        <HStack>
          <Rating defaultValue={rating} size="sm" />
        </HStack>
      </Stack>
      <Stack align="center">
        {isAvailable ? (
          <Button
            colorScheme="blue"
            width="full"
            onClick={onClickAddToCart}
          >
            Add to cart
          </Button>
        ) : (
          <Button
            colorScheme="gray"
            width="full"
            disabled
          >
            Out Of Stock
          </Button>
        )}
        <Link
          textDecoration="underline"
          fontWeight="medium"
          color={useColorModeValue('gray.600', 'gray.400')}
          as={RemixLink}
          to={`/products/${product.id}`}
        >
          Details
        </Link>
      </Stack>
    </Stack>
  );
};