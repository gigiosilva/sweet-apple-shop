import {
  Box,
  Button,
  ButtonGroup, IconButton, Stack, Text, useColorMode,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';

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
          Giovani Silva.
        </Text>
        <Stack justify="space-between" direction="row" align="center">
          <ButtonGroup variant="ghost">
            <IconButton
                aria-label="Color Mode"
                onClick={toggleColorMode}
                icon={colorMode === 'light' ? <BsFillMoonFill /> : <BsFillSunFill />}
                scale="2xl"
              />
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