// Navbar.js

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { Flex, Box, Button, Text, IconButton } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const Navbar = () => {
    const [currentPage, setCurrentPage] = useState('');
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const userEmail = useSelector((state) => state.auth.user?.email);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <Box bg="black" px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <IconButton
                    size={'md'}
                    icon={<HamburgerIcon />}
                    aria-label={'Open Menu'}
                    display={{ md: 'none' }}
                />
                <Box>
                    <Button variant={'ghost'} colorScheme="whiteAlpha" onClick={() => handleNavigate('/')}>
                        WorkHardStyle
                    </Button>
                </Box>

                <Flex alignItems={'center'}>
                    {isAuthenticated ? (
                        <>
                            <Button variant={'ghost'} colorScheme="whiteAlpha" onClick={() => handleNavigate('/workoutlist')}>
                                Workouts
                            </Button>
                            <Button variant={'ghost'} colorScheme="whiteAlpha" onClick={() => handleNavigate('/addworkout')}>
                                Add Workout
                            </Button>
                            <Text color="white" px={3}>{userEmail}</Text>
                            <Button colorScheme="red" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button colorScheme="gray" variant={'ghost'} onClick={() => navigate('/login')}>
                                Login
                            </Button>
                            <Button colorScheme="gray" variant={'ghost'} onClick={() => navigate('/signup')}>
                                Signup
                            </Button>
                        </>
                    )}
                </Flex>
            </Flex>
        </Box>
    );
};

export default Navbar;