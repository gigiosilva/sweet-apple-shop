import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: 'light',
  },
  fonts: {
    body: 'Poppins, sans-serif',
    heading: 'Poppins, serif',
  },
  components: {
    FormLabel: {
      baseStyle: { mb: 0 },
    },
    FormError: {
      parts: ['text', 'icon'],
      baseStyle: { text: { mt: 1 } },
    },
  },
});
