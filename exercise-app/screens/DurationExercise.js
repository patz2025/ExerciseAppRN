import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const DurationExercise = ({ navigation, route }) => {
  const { name, exercises, suggestedExercise } = route.params;
  
  const [curTime, setCurTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (running) {
      const newTimer = setInterval(() => {
        setCurTime((prev) => prev + 1);
      }, 1000);
      setTimer(newTimer);
      return () => clearInterval(newTimer);
    }
  }, [running]);

  const handleStartStop = useCallback(() => {
    if (running) {
      clearInterval(timer);
      setRunning(false);
    } else {
      setRunning(true);
    }
  }, [running, timer]);

  const handleReset = useCallback(() => {
    clearInterval(timer);
    setRunning(false);
    setCurTime(0);
  }, [timer]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
      <Text style={styles.timerText}>{formatTime(curTime)}</Text>
      
      <View style={styles.controls}>
        <Button
          title="Reset"
          onPress={handleReset}
          buttonStyle={styles.resetButton}
          containerStyle={styles.buttonContainer}
        />
        <Button
          title={running ? "Stop" : "Start"}
          onPress={handleStartStop}
          buttonStyle={styles.startButton}
          containerStyle={styles.buttonContainer}
        />
      </View>
      
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
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 30,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  buttonContainer: {
    marginHorizontal: 10,
    minWidth: 100,
  },
  resetButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
  },
  startButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 10,
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

export default DurationExercise;