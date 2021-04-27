import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';

import EditScreenInfo from '../components/EditScreenInfo';

export default function Settings() {
  //Change between light and dark mode
  //Explain how app works (like how to do what)
  //Maybe font selection but probs not
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/*<EditScreenInfo path="/screens/TabTwoScreen.tsx" /> */}

      



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
