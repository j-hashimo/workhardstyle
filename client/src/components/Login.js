import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { authSuccess, authFail } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { Box, VStack, Input, Button, FormControl, FormLabel, Heading, Text, useColorModeValue } from '@chakra-ui/react';

const Login = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/workoutlist'); // Redirect to WorkoutList if authenticated
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', 
      { 
        email: loginEmail,
        password: loginPassword
      }); //note: the loginEmail and loginPassword are set to the ones the user entered due to onChange on the forms
      localStorage.setItem('token', response.data.token); // Save token to localStorage
      dispatch(authSuccess(response.data)); // Dispatch authSuccess with the response data
      navigate('/workoutlist'); // Redirect to workout list on successful login
    } catch (error) {
      console.error('Error logging in:', error.response?.data.msg || error.message);
      setErrorMessage(error.response?.data.msg || "An error occurred while logging in.");
      dispatch(authFail()); // Dispatch authFail on login failure
    }
  };

  return (
    <Box className="flex flex-col items-center justify-center h-screen" bg={useColorModeValue('gray.50', 'gray.800')}>
      <VStack spacing={8} mx="auto" w="lg" py={12} px={6}>
        <Heading fontSize="3xl" textAlign="center">Log in to WorkHardStyle</Heading>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8} width="full" maxW="md">
          <VStack spacing={4}>
            <Button colorScheme="blue" w="full">Continue with Google</Button>
            <Button colorScheme="facebook" w="full">Continue with Facebook</Button>
            <Text pt={2} pb={2}>or</Text>
            {errorMessage && <Text color="red.500">{errorMessage}</Text>}
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <VStack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input 
                    type="email" 
                    value={loginEmail} 
                    onChange={(e) => setLoginEmail(e.target.value)} 
                    placeholder="Enter your email" 
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input 
                    type="password" 
                    value={loginPassword} 
                    onChange={(e) => setLoginPassword(e.target.value)} 
                    placeholder="Enter your password" 
                  />
                </FormControl>
                <Button type="submit" colorScheme="blue" w="full">Login</Button>
              </VStack>
            </form>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default Login;
