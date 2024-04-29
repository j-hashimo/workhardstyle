// Signup.js in /src/components

import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authSuccess, authFail } from '../redux/authSlice';
import { 
  Box, 
  VStack, 
  Input, 
  Button, 
  FormControl, 
  FormLabel, 
  Heading, 
  useColorModeValue,
  Container 
} from '@chakra-ui/react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { email, password });
      dispatch(authSuccess(response.data)); // this integrates the backend with the state updating that is done in redux
      // navigate to login page or dashboard here if needed
    } catch (error) {
      console.error('Signup failed:', error.response.data);
      dispatch(authFail());
    }
  };

  return (
    <Container centerContent>
      <Box
        className="flex flex-col items-center justify-center h-screen"
        bg={useColorModeValue('gray.50', 'gray.800')}
        py={12}
        px={6}
        textAlign="center"
      >
        <Heading fontSize="3xl" mb={4}>Sign Up for WorkHardStyle</Heading>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          width="full"
          maxW="md"
        >
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Enter your email" 
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Enter your password" 
                />
              </FormControl>
              <Button type="submit" colorScheme="blue" width="full">Sign Up</Button>
            </VStack>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
