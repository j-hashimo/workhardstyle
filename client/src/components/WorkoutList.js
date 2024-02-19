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
    Select, 
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import WorkoutItem from './WorkoutItem';

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

    const [groupedView, setGroupedView] = useState(false);
    const [groupedWorkouts, setGroupedWorkouts] = useState({});

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
            groupWorkoutsByMuscleGroup(response.data);
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

    const groupWorkoutsByMuscleGroup = (workouts) => {
        const groups = workouts.reduce((acc, workout) => {
            const group = workout.muscleGroup || 'Unlisted';
            if (!acc[group]) {
                acc[group] = [];
            }
            acc[group].push(workout);
            return acc;
        }, {});
        setGroupedWorkouts(groups);
    };

    const toggleView = () => {
        setGroupedView(!groupedView);
    };

    return (
        <ChakraProvider theme={theme}>
            <Box bg={colorMode === 'dark' ? 'gray.900' : 'gray.50'} minH="100vh" py={20}>
                <Container maxW="container.xl">
                    <Heading mb={6} color={colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.700'}>
                        Your Workouts
                    </Heading>
                    <Button onClick={toggleView} mb={4}>{groupedView ? 'Show Ungrouped View' : 'Show Grouped View'}</Button>
                    {groupedView ? (
                        Object.entries(groupedWorkouts).map(([group, workouts]) => (
                            <Box key={group}>
                                <Text fontSize="2xl" fontWeight="bold" mb={2}>{group}</Text>
                                {workouts.map((workout) => (
                                    <Box 
                                        key={workout._id} p={4} bg={colorMode === 'dark' ? 'gray.700' : 'white'} 
                                        boxShadow="md"
                                        p={5}
                                        rounded="md"
                                        borderWidth="1px"
                                        borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
                                    >
                                        <WorkoutItem 
                                            key={workout._id}
                                            workout={workout}
                                            editingWorkout={editingWorkout}
                                            setEditingWorkout={setEditingWorkout}
                                            handleSave={handleSave}
                                            handleEdit={handleEdit}
                                            handleDelete={handleDelete}
                                            handleChange={handleChange}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        ))
                    ) : (
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
                                    <WorkoutItem 
                                        key={workout._id}
                                        workout={workout}
                                        editingWorkout={editingWorkout}
                                        setEditingWorkout={setEditingWorkout}
                                        handleSave={handleSave}
                                        handleEdit={handleEdit}
                                        handleDelete={handleDelete}
                                        handleChange={handleChange}
                                    />
                                </Box>
                            ))}
                        </VStack>
                    )}
                    
                </Container>
            </Box>
        </ChakraProvider>
    );
};

export default WorkoutList;