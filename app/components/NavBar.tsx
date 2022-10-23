import {
  Box,
  Flex,
  Text,
  Stack,
  Icon,
  useColorModeValue,
  useBreakpointValue,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { BsCart4, BsSearch } from 'react-icons/bs';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useLocation, useNavigate } from '@remix-run/react';
import { useEffect, useState } from 'react';

export const NavBar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.search) setSearch('');
  }, [location])

  return (
    <Box as="nav" role="navigation" bg="bg-accent">
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH="90px"
        py={{ base: 2 }}
        px={{
          base: '4%', sm: '4%', md: '10%', lg: '16%', xl: '20%',
        }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align="center"
      >
        <Flex
          flex={{ md: 'auto' }}
          ml={{ base: -2 }}
          display={{ md: 'none' }}
        />
        <Flex flex={{ base: 1 }} justify={{ md: 'start' }} alignItems="center">
          <Text
            textAlign={useBreakpointValue({ md: 'left' })}
            fontFamily="heading"
            color={useColorModeValue('gray.800', 'white')}
            onClick={() => navigate('.')}
            cursor="pointer"
            minWidth={{ base: '80px', md: '260px' }}
            fontSize={{ base: '30px', md: '2xl' }}
          >
            {useBreakpointValue({ base: '🍎', md: '🍎 Sweet Apple Store' })}
          </Text>

          <Flex ml={{ base: 0, md: 10 }} width="100%">
          <InputGroup 
              maxWidth={500}
              mr={30}>
            <InputLeftElement
              pointerEvents='none'
              children={<BsSearch color='gray.300' />}
            />
            <Input
              variant="filled"
              placeholder="Search here"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(event) => {
                if (event.key === 'Enter') navigate(`/products?search=${search}`);
              }}
              onBlur={() => navigate(`/products?search=${search}`)}
            />
            <InputRightElement
              hidden={search === ''} 
              cursor="pointer"
              children={<AiOutlineCloseCircle />}
              onClick={() => {
                setSearch('');
                navigate('/products');
              }}
            />
            </InputGroup>
          </Flex>
        </Flex>

        <Stack
          justify="flex-end"
          direction="row"
          spacing={6}
        >
          <Icon
            as={BsCart4}
            w={7}
            h={7}
            pb={1}
            cursor="pointer"
            aria-label="Cart"
            onClick={() => navigate('/cart')}
          />
        </Stack>
      </Flex>
    </Box>
  );
};