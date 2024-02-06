// WorkoutList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    Box, 
    VStack, 
    HStack, 
    Input, 
    Button, 
    Text, 
    useColorModeValue, 
    useColorMode, 
    IconButton, 
    extendTheme,
    ChakraProvider, 
    Container,
    Heading,
    Stack,
    useToast,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';

// Custom theme adjustments for dark mode
const theme = extendTheme({
    config: {
      initialColorMode: 'dark',
      useSystemColorMode: false,
    },
  });

const WorkoutList = () => {
    const [workouts, setWorkouts] = useState([]);
    const [editingWorkout, setEditingWorkout] = useState(null);

    const { colorMode, toggleColorMode } = useColorMode();
    const toast = useToast();

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const fetchWorkouts = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token
            
            const config = {
                headers: {
                    'x-auth-token': token
                }
            };
            const response = await axios.get('http://localhost:5000/api/workouts', config);
            setWorkouts(response.data);
        } catch (error) {
            console.error('Error fetching workouts:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'x-auth-token': token
                }
            };
            await axios.delete(`http://localhost:5000/api/workouts/${id}`, config);
            fetchWorkouts();
        } catch (error) {
            console.error('Error deleting workout:', error);
        }
    };

    const handleEdit = (workout) => {
        setEditingWorkout({ ...workout });
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'x-auth-token': token
                }
            };
            await axios.put(`http://localhost:5000/api/workouts/${editingWorkout._id}`, editingWorkout, config);
            setEditingWorkout(null);
            fetchWorkouts();
        } catch (error) {
            console.error('Error updating workout:', error);
        }
    };

    const handleChange = (e, field) => {
        setEditingWorkout({ ...editingWorkout, [field]: e.target.value });
    };

    return (
        <ChakraProvider theme={theme}>
            <Box bg={colorMode === 'dark' ? 'gray.900' : 'gray.50'} minH="100vh" py={20}>
                <Container maxW="container.xl">
                    <Heading mb={6} color={colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.700'}>
                        Your Workouts
                    </Heading>
                    
                    <VStack spacing={5}>
                        {workouts.map(workout => (
                            <Box 
                                key={workout._id} p={4} bg={colorMode === 'dark' ? 'gray.700' : 'white'} 
                                boxShadow="md"
                                p={5}
                                rounded="md"
                                borderWidth="1px"
                                borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
                            >
                                {editingWorkout && editingWorkout._id === workout._id ? (
                                    <VStack spacing={3}>
                                        <Input type="text" value={editingWorkout.name} onChange={(e) => handleChange(e, 'name')} />
                                        <HStack spacing={3}>
                                            <Input type="number" value={editingWorkout.weight} onChange={(e) => handleChange(e, 'weight')} />
                                            <Input type="number" value={editingWorkout.sets} onChange={(e) => handleChange(e, 'sets')} />
                                            <Input type="number" value={editingWorkout.reps} onChange={(e) => handleChange(e, 'reps')} />
                                        </HStack>
                                        <Input type="text" value={editingWorkout.machine_settings} onChange={(e) => handleChange(e, 'machine_settings')} />
                                        <Button leftIcon={<CheckIcon />} colorScheme="blue" onClick={handleSave}>Save Changes</Button>
                                        <IconButton aria-label="Cancel edit" icon={<CloseIcon />} onClick={() => setEditingWorkout(null)} />
                                    </VStack>
                                ) : (
                                    <VStack align="start" spacing={3}>
                                        <Text fontSize="lg" fontWeight="semibold">{workout.name}</Text>
                                        <Text>Weight: {workout.weight}</Text>
                                        <Text>Sets: {workout.sets}</Text>
                                        <Text>Reps: {workout.reps}</Text>
                                        {workout.machine_settings && <Text>Machine Settings: {workout.machine_settings}</Text>}
                                        <HStack spacing={3}>
                                            <Button leftIcon={<EditIcon />} colorScheme="yellow" onClick={() => handleEdit(workout)}>Edit</Button>
                                            <IconButton aria-label="Delete workout" icon={<DeleteIcon />} colorScheme="red" onClick={() => handleDelete(workout._id)} />
                                        </HStack>
                                    </VStack>
                                )}
                                
                            </Box>
                        ))}
                    </VStack>
                </Container>
            </Box>
        </ChakraProvider>
    );
};

export default WorkoutList;