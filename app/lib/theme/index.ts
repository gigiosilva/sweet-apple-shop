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
  colors: {
    primary: {
      50: '#FFE5E5',
      100: '#FFB8B8',
      200: '#FF8A8A',
      300: '#FF5C5C',
      400: '#FF2E2E',
      500: '#FF0000',
      600: '#CC0000',
      700: '#990000',
      800: '#660000',
      900: '#330000'
    }
  }
});
