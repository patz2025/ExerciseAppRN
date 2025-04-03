import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native-elements';

const Home = ({ navigation, route }) => {
  const { exercises } = route.params;

  const renderExerciseButton = ({ item }) => (
    <Button
      title={item.name}
      buttonStyle={styles.exerciseButton}
      onPress={() => navigateToExercise(item)}
      containerStyle={styles.buttonContainer}
    />
  );

  const navigateToExercise = (exercise) => {
    // navigate to the screen where user selects exercise type
    navigation.navigate('ExerciseType', {
      selectedExercise: exercise.name,
      exercises: exercises
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
        renderItem={renderExerciseButton}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    paddingVertical: 20,
  },
  buttonContainer: {
    marginBottom: 15,
  },
  exerciseButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 5,
  },
});

export default Home;