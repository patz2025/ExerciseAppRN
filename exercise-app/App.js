import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import ExerciseType from './screens/ExerciseType';
import DurationExercise from './screens/DurationExercise';
import RepetitionExercise from './screens/RepetitionExercise';

// stack navigator
const Stack = createStackNavigator();

// Sample exercise data
const exercisesData = [
  { id: '1', name: 'Plank', type: 'repetition', suggested: '3' },
  { id: '2', name: 'Running', type: 'duration', suggested: '1' },
  { id: '3', name: 'Push-Up', type: 'repetition', suggested: '2' },
];

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={Home} 
          initialParams={{ exercises: exercisesData }}
        />
        <Stack.Screen 
          name="ExerciseType" 
          component={ExerciseType} 
        />
        <Stack.Screen 
          name="DurationExercise" 
          component={DurationExercise} 
        />
        <Stack.Screen 
          name="RepetitionExercise" 
          component={RepetitionExercise} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;