import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const RepetitionExercise = ({ navigation, route }) => {
  const { name, exercises, suggestedExercise } = route.params;
  const [count, setCount] = useState(0);

  const handleDecrement = () => {
    setCount(Math.max(0, count - 1));
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  const navigateToSuggested = () => {
    let screenName;
    switch (suggestedExercise.type) {
      case 'duration':
        screenName = 'DurationExercise';
        break;
      case 'repetition':
        screenName = 'RepetitionExercise';
        break;
      default:
        screenName = 'DurationExercise';
    }
    
    navigation.navigate(screenName, {
      name: suggestedExercise.name,
      exercises: exercises,
      suggestedExercise: exercises.find(ex => ex.id === suggestedExercise.suggested)
    });
  };

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{name}</Text>
      
      <View style={styles.counterControls}>
        <Button
          title="-"
          onPress={handleDecrement}
          buttonStyle={styles.controlButton}
          containerStyle={styles.buttonContainer}
        />
        <Text style={styles.counterText}>{count}</Text>
        <Button
          title="+"
          onPress={handleIncrement}
          buttonStyle={styles.controlButton}
          containerStyle={styles.buttonContainer}
        />
      </View>
      
      <Button
        title="Reset"
        onPress={handleReset}
        buttonStyle={styles.resetButton}
        containerStyle={[styles.buttonContainer, styles.resetContainer]}
      />
      
      <View style={styles.navigationButtons}>
        <Button
          title={`Try ${suggestedExercise.name}`}
          onPress={navigateToSuggested}
          buttonStyle={styles.suggestedButton}
          containerStyle={styles.buttonContainer}
        />
        <Button
          title="Home"
          onPress={navigateToHome}
          buttonStyle={styles.homeButton}
          containerStyle={styles.buttonContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  counterControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  counterText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginHorizontal: 30,
  },
  buttonContainer: {
    marginHorizontal: 5,
  },
  controlButton: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    width: 60,
    height: 60,
  },
  resetContainer: {
    marginVertical: 20,
  },
  resetButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  navigationButtons: {
    marginTop: 40,
    width: '100%',
  },
  suggestedButton: {
    backgroundColor: '#3498db',
    marginBottom: 10,
    paddingVertical: 10,
  },
  homeButton: {
    backgroundColor: '#9b59b6',
    paddingVertical: 10,
  },
});

export default RepetitionExercise;