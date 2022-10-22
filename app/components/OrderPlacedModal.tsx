import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from '@remix-run/react';
import Lottie from 'lottie-react';
import successAnimation from '../../public/57490-successful.json';

export const OrderPlacedModal = () => {
  const navigate = useNavigate();

  return (
    <Modal
      isCentered
      isOpen
      onClose={() => navigate('/')}
      size="2xl"
      // `trapFocus` and `blockScrollOnMount` are only switched off so that the preview works properly.
      blockScrollOnMount={false}
      trapFocus={false}
    >
      <ModalOverlay />
      <ModalContent borderRadius="2xl" mx="10">
        <ModalBody>
          <Stack
            maxW="xs"
            mx="auto"
            py={{ base: '12', md: '16' }}
            spacing={{ base: '6', md: '10' }}
            align="center"
          >
            <Lottie animationData={successAnimation} loop={false} />
            <Stack spacing="3" textAlign="center">
              <Text fontSize="4xl" fontWeight={500}>Order Placed</Text>
              <Text fontSize="lg">
                Thank you for choosing us!
              </Text>
              <Text fontSize="sm">
                You will receive an email as soon as your package is shipped.
              </Text>
            </Stack>
            <Button
              colorScheme="blue"
              width="full"
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};