// WorkoutForm.js

import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  VStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Heading,
  useColorModeValue,
  Container,
  Select,
} from '@chakra-ui/react';

const WorkoutForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState(0);
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [machineSettings, setMachineSettings] = useState('');
  const [muscleGroup, setMuscleGroup] = useState(''); // New state for muscle group

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const workout = { name, weight, sets, reps, machine_settings: machineSettings, muscleGroup };
      const token = localStorage.getItem('token');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      };

      const response = await axios.post('http://localhost:5000/api/workouts', workout, config);
      onAdd(response.data);
    } catch (error) {
      console.error('Error adding workout:', error);
    }
  };

  return (
    <Container centerContent>
      <Box
        className="flex flex-col items-center justify-center h-screen"
        bg={useColorModeValue('gray.50', 'gray.800')}
        py={12}
        px={6}
        textAlign="center"
      >
        <Heading fontSize="3xl" mb={4}>Add New Workout</Heading>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          width="full"
          maxW="md"
        >
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl id="name" isRequired>
                <FormLabel>Workout Name</FormLabel>
                <Input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Workout Name" 
                />
              </FormControl>
              <FormControl id="weight" isRequired>
                <FormLabel>Weight</FormLabel>
                <Input 
                  type="number" 
                  value={weight} 
                  onChange={(e) => setWeight(e.target.value)} 
                  placeholder="Weight" 
                />
              </FormControl>
              <FormControl id="sets" isRequired>
                <FormLabel>Sets</FormLabel>
                <Input 
                  type="number" 
                  value={sets} 
                  onChange={(e) => setSets(e.target.value)} 
                  placeholder="Sets" 
                />
              </FormControl>
              <FormControl id="reps" isRequired>
                <FormLabel>Reps</FormLabel>
                <Input 
                  type="number" 
                  value={reps} 
                  onChange={(e) => setReps(e.target.value)} 
                  placeholder="Reps" 
                />
              </FormControl>
              <FormControl id="machineSettings">
                <FormLabel>Machine Settings (Optional)</FormLabel>
                <Input 
                  type="text" 
                  value={machineSettings} 
                  onChange={(e) => setMachineSettings(e.target.value)} 
                  placeholder="Machine Settings" 
                />
              </FormControl>
              <FormControl id="muscleGroup">
                <FormLabel>Muscle Group (Optional)</FormLabel>
                <Select placeholder="Select muscle group" value={muscleGroup} onChange={(e) => setMuscleGroup(e.target.value)}>
                  <option value="chest">Chest</option>
                  <option value="back">Back</option>
                  <option value="legs">Legs</option>
                  <option value="arms">Arms</option>
                  <option value="shoulders">Shoulders</option>
                  <option value="core">Core</option>
                  <option value="unlisted">Unlisted</option>
                </Select>
              </FormControl>
              <Button type="submit" colorScheme="blue" width="full">Submit</Button>
            </VStack>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default WorkoutForm;
