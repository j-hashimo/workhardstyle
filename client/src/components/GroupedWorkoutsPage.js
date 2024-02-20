// GroupedWorkoutsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, Heading, VStack, useColorModeValue, ChakraProvider } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import WorkoutItem from './WorkoutItem'; // Import the WorkoutItem component you created earlier

const GroupedWorkoutsPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const { muscleGroup } = useParams(); // Assuming you're using react-router-dom v5+
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchGroupedWorkouts();
  }, [muscleGroup]);

  return (
    <ChakraProvider>
      <Box bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh" py={10}>
        <Container maxW="container.xl">
          <Heading mb={6}>{muscleGroup.toUpperCase()} Workouts</Heading>
          <VStack spacing={5}>
            {workouts.map((workout) => (
              <WorkoutItem key={workout._id} workout={workout} />
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
