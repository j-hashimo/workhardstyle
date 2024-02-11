// Navbar.js

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { Flex, Box, Button, Text, IconButton, useColorMode } from '@chakra-ui/react';
import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics'; // Import the icon


const Navbar = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const userEmail = useSelector((state) => state.auth.user?.email);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { colorMode, toggleColorMode } = useColorMode();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <Box bg={colorMode === 'dark' ? 'gray.800' : 'white'} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <IconButton
                    size={'md'}
                    icon={<HamburgerIcon />}
                    aria-label={'Open Menu'}
                    display={{ md: 'none' }}
                />
                <Flex alignItems={'center'}>
                    <SportsGymnasticsIcon style={{ color: colorMode === 'dark' ? 'white' : 'black', marginRight: '8px' }} />
                    <Button variant={'ghost'} colorScheme="gray" variant={'ghost'} onClick={() => handleNavigate('/')}>
                        WorkHardStyle
                    </Button>
                </Flex>

                <Flex alignItems={'center'}>
                    <IconButton
                        size={'md'}
                        icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
                        aria-label={'Toggle Color Mode'}
                        onClick={toggleColorMode}
                        mr={4}
                    />
                    {isAuthenticated ? (
                        <>
                            <Button colorScheme="gray" variant={'ghost'} onClick={() => handleNavigate('/workoutlist')}>
                                Workouts
                            </Button>
                            <Button colorScheme="gray" variant={'ghost'} onClick={() => handleNavigate('/addworkout')}>
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
