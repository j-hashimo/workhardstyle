import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Text, Heading, VStack, Container, Button } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const WorkoutHistory = () => {
    const [history, setHistory] = useState([]);
    const { workoutId } = useParams();

    useEffect(() => {
        fetchHistory();
    }, [workoutId]);

    const fetchHistory = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/workouts/${workoutId}/history`, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setHistory(response.data);
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    };

    const handleDeleteHistory = async (recordId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/workouts/${workoutId}/history/${recordId}`, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            fetchHistory(); // Refresh history after deletion
        } catch (error) {
            console.error('Error deleting history record:', error);
        }
    };

    return (
        <Container maxW="container.md" p={4}>
            <Heading mb={4} size="lg">Workout History</Heading>
            {history.length > 0 ? (
                <VStack spacing={4} align="stretch">
                    {history.map((record, index) => (
                        <Box key={index} p={4} borderWidth="1px" borderRadius="lg" shadow="sm">
                            <Text fontSize="md" fontWeight="bold">Date: {new Date(record.date).toLocaleDateString()}</Text>
                            <Text>Weight: {record.weight}</Text>
                            <Text>Sets: {record.sets}</Text>
                            <Text>Reps: {record.reps}</Text>
                            <Button leftIcon={<DeleteIcon />} colorScheme="red" onClick={() => handleDeleteHistory(record._id)}>
                                Delete Record
                            </Button>
                        </Box>
                    ))}
                </VStack>
            ) : (
                <Text>No history found</Text>
            )}
        </Container>
    );
};

export default WorkoutHistory;
