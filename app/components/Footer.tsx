import {
  Box,
  Button,
  ButtonGroup, IconButton, Stack, Text, useColorMode,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      mx={{
        base: '4%', sm: '4%', md: '10%', lg: '16%', xl: '20%',
      }}
      height="150px"
    >
      <Stack pt={20} direction="row" justify="space-between" align="center">
        <Text fontSize="sm" color="subtle">
          &copy;
          {' '}
          {new Date().getFullYear()}
          {' '}
          Giovani Silva, Inc. All rights reserved.
        </Text>
        <Stack justify="space-between" direction="row" align="center">
          <Button size="sm" onClick={toggleColorMode}>
            Toggle
            {' '}
            {colorMode === 'light' ? 'Dark' : 'Light'}
          </Button>
          <ButtonGroup variant="ghost">
            <IconButton
              as="a"
              target="_blank"
              href="https://www.linkedin.com/in/giovani-moraes-silva/"
              aria-label="LinkedIn"
              icon={<FaLinkedin fontSize="1.25rem" />}
            />
            <IconButton
              as="a"
              target="_blank"
              href="https://github.com/gigiosilva/"
              aria-label="GitHub"
              icon={(<FaGithub fontSize="1.25rem" />)}
            />
          </ButtonGroup>
        </Stack>
      </Stack>
    </Box>
  );
};