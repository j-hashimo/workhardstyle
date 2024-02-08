// HomePage.js in /src/components

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const HomePage = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.100', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Container maxW="container.xl" p={0} centerContent>
      <Box
        className="flex flex-col items-center justify-center h-screen"
        bg={bgColor}
        color={textColor}
        textAlign="center"
        py={20}
        px={6}
      >
        <Heading className="text-4xl font-bold mb-6" size="2xl">
          Welcome to WorkHardStyle
        </Heading>
        <Text fontSize="xl" mb={4}>
          An app used to track the exact weight, reps, and sets you do for each exercise so you can measure your progression easily.
        </Text>
        <Stack spacing={4} direction="row" align="center">
          <Button
            colorScheme="blue"
            onClick={() => navigate('/login')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </Button>
          <Button
            colorScheme="green"
            onClick={() => navigate('/signup')}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Up
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default HomePage;
