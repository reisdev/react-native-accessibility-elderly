import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SpeechText } from "react-native-elderly-frame"

export default function App() {
  return (
    <View style={styles.container}>
      <Text> 123 </Text>
      <SpeechText />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
