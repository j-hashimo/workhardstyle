import React from 'react';
import { VStack, HStack, Input, Button, IconButton, Text, Select, Checkbox, useDisclosure } from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon, DeleteIcon, TimeIcon, ViewIcon } from '@chakra-ui/icons';
import WorkoutHistory from './WorkoutHistory';


const WorkoutItem = ({ workout, editingWorkout, setEditingWorkout, handleSave, handleEdit, handleDelete, handleChange, isGroupedPage, handleSaveHistory, handleViewHistory }) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Hook to control modal

  // Debug: Check if the functions are undefined
  console.log('handleSaveHistory:', handleSaveHistory);
  console.log('handleViewHistory:', handleViewHistory);
  return (
    <>
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
            <Text>Muscle Group: {workout.muscleGroup || 'Unlisted'}</Text>
            {workout.machine_settings && <Text>Machine Settings: {workout.machine_settings}</Text>}
            <HStack spacing={3}>
                <Button leftIcon={<EditIcon />} colorScheme="yellow" onClick={() => handleEdit(workout)}>Edit</Button>
                {!isGroupedPage ? (
                  <IconButton aria-label="Delete workout" icon={<DeleteIcon />} colorScheme="red" onClick={() => handleDelete(workout._id)} />
                ) : (
                  <Checkbox colorScheme="green" defaultIsChecked>Completed</Checkbox> // Example checkbox for grouped page
                )}
                <Button leftIcon={<TimeIcon />} colorScheme="teal" onClick={() => handleSaveHistory(workout)}>Save History</Button>
                <Button leftIcon={<ViewIcon />} colorScheme="purple" onClick={() => handleViewHistory(workout._id)}>View History</Button>
            </HStack>
        </VStack>
      )}
      
    </>
  );
};

export default WorkoutItem;
