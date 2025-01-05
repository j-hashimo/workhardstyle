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
import { useNavigate } from 'react-router-dom';

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
    const { colorMode } = useColorMode();
    const toast = useToast();
    const [groupedView, setGroupedView] = useState(false);
    const [groupedWorkouts, setGroupedWorkouts] = useState({});
    const navigate = useNavigate();

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
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/workouts`, config);
            if (Array.isArray(response.data)) {
                setWorkouts(response.data);
                groupWorkoutsByMuscleGroup(response.data);
            } else {
                throw new Error('Unexpected response format');
            }
        } catch (error) {
            console.error('Error fetching workouts:', error.message || error);
            toast({
                title: "Error fetching workouts",
                description: error.message || "An unexpected error occurred",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
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
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/workouts/${id}`, config);
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
            await axios.put(`${process.env.REACT_APP_API_URL}/api/workouts/${editingWorkout._id}`, editingWorkout, config);
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

    const handleSaveHistory = async (workout) => {
        try {
            const { weight, sets, reps, _id } = workout;  // Destructure the needed properties
            if (!weight || !sets || !reps) {
                console.error('Missing required workout parameters');
                return;
            }
            const historyData = { weight, sets, reps };
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/workouts/${_id}/history`, historyData, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            if (response.status === 201) {
                console.log('History saved:', response.data); // Optionally handle response
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                // Handling no changes to save with a toast
                toast({
                    title: "No changes to save.",
                    description: "This workout progress history is already saved.",
                    status: "info",
                    duration: 5000,
                    isClosable: true,
                    position: "top"
                });
            } else {
                console.error('Error saving workout history:', error);
            }
        }
    };

    const handleViewHistory = (workoutId) => {
        navigate(`/workout-history/${workoutId}`);
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
                                <Text
                                    fontSize="2xl"
                                    fontWeight="bold"
                                    mb={2}
                                    as="button"
                                    onClick={() => navigate(`/grouped-workouts/${group}`)} //this directs the user to the grouped workouts page
                                >
                                    {group.toUpperCase()}
                                </Text>
                                {workouts.map((workout) => (
                                    <Box 
                                        key={workout._id} p={4} bg={colorMode === 'dark' ? 'gray.700' : 'white'} 
                                        boxShadow="md"
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
                                            handleSaveHistory={handleSaveHistory} 
                                            handleViewHistory={handleViewHistory} 
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
                                        handleSaveHistory={() => handleSaveHistory(workout)}
                                        handleViewHistory={() => handleViewHistory(workout._id)} 
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
