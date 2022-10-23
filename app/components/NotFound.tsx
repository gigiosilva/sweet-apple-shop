import {
  Box,
  Button,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from '@remix-run/react';
import Lottie from 'lottie-react';
import pageNotFoundAnimation from '../../public/84918-404-error-doodle-animation.json';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <VStack justify="center" spacing={10} minH="Calc(80vh)">
      <Box width={{ base: '70%', lg: '40%' }}>
        <Lottie animationData={pageNotFoundAnimation} loop={true} />
      </Box>
      <Button colorScheme="blue" onClick={() => navigate('/')}>
        Go Back
      </Button>
    </VStack>
  );
};