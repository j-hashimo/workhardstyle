// Head of your component
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, Heading, VStack, useColorModeValue, ChakraProvider } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import WorkoutItem from './WorkoutItem';

const GroupedWorkoutsPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const { muscleGroup } = useParams();
  const navigate = useNavigate();

  // Fetch grouped workouts function defined in the outer scope of useEffect
  const fetchGroupedWorkouts = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { 'x-auth-token': token } };
      const response = await axios.get(`http://localhost:5000/api/workouts/group/${muscleGroup}`, config);
      setWorkouts(response.data);
    } catch (error) {
      console.error('Error fetching grouped workouts:', error);
    }
  };

  // Effect to load grouped workouts on mount and muscleGroup changes
  useEffect(() => {
    fetchGroupedWorkouts();
  }, [muscleGroup]);

  const handleEdit = (workout) => {
    setEditingWorkout({ ...workout });
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
      await fetchGroupedWorkouts(); // Calls the function to refresh the workout list
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };

  const handleChange = (e, field) => {
    setEditingWorkout({ ...editingWorkout, [field]: e.target.value });
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
        fetchGroupedWorkouts();
    } catch (error) {
        console.error('Error updating workout:', error);
    }
};

  return (
    <ChakraProvider>
      <Box bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh" py={10}>
        <Container maxW="container.xl">
          <Heading mb={6}>{muscleGroup.toUpperCase()} Workouts</Heading>
          <VStack spacing={5}>
            {workouts.map((workout) => (
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
            ))}
          </VStack>
          <Heading size="md" mt={10} as="button" onClick={() => navigate('/workoutlist')}>
            Back to all workouts
          </Heading>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default GroupedWorkoutsPage;
