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
                                        <Select value={editingWorkout.muscleGroup || ''} onChange={(e) => handleChange(e, 'muscleGroup')} placeholder="Select muscle group">
                                            <option value="chest">Chest</option>
                                            <option value="legs">Legs</option>
                                            <option value="arms">Arms</option>
                                            {/* Add more options as needed */}
                                        </Select>
                                        <Button leftIcon={<CheckIcon />} colorScheme="blue" onClick={handleSave}>Save Changes</Button>
                                        <IconButton aria-label="Cancel edit" icon={<CloseIcon />} onClick={() => setEditingWorkout(null)} />
                                    </VStack>
                                ) : (
                                    <VStack align="start" spacing={3}>
                                        <Text fontSize="lg" fontWeight="semibold">{workout.name}</Text>
                                        <Text>Weight: {workout.weight}</Text>
                                        <Text>Sets: {workout.sets}</Text>
                                        <Text>Reps: {workout.reps}</Text>
                                        <Text>Muscle Group: {workout.muscleGroup}</Text>
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