import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';

const ExerciseType = ({ navigation, route }) => {
  const { selectedExercise, exercises } = route.params;

  const handleReturn = () => {
    navigation.goBack();
  };

  const navigateToExercise = (type) => {
    const currentExercise = exercises.find(ex => ex.name === selectedExercise);
    const suggestedExercise = exercises.find(ex => ex.id === currentExercise.suggested);
    
    let screenName;
    switch (type) {
      case 'duration':
        screenName = 'DurationExercise';
        break;
      case 'repetition':
        screenName = 'RepetitionExercise';
        break;
      case 'steps':
        screenName = 'StepExercise';
        break;
      default:
        screenName = 'DurationExercise';
    }

    navigation.navigate(screenName, {
      name: selectedExercise,
      exercises: exercises,
      suggestedExercise: suggestedExercise
    });
  };

  return (
    <View style={styles.container}>
      <Button
        title="Return"
        onPress={handleReturn}
        buttonStyle={styles.returnButton}
        containerStyle={styles.buttonContainer}
      />
      <Text style={styles.headerText}>{selectedExercise}</Text>
      <View style={styles.typeButtons}>
        <Button
          title="Duration"
          onPress={() => navigateToExercise('duration')}
          buttonStyle={styles.typeButton}
          containerStyle={styles.buttonContainer}
        />
        <Button
          title="Repetition"
          onPress={() => navigateToExercise('repetition')}
          buttonStyle={styles.typeButton}
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
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  typeButtons: {
    marginTop: 20,
  },
  buttonContainer: {
    marginBottom: 15,
  },
  typeButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 15,
    borderRadius: 5,
  },
  returnButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    borderRadius: 5,
  },
});

export default ExerciseType;