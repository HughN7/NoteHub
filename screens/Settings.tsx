import React from 'react';
import { StyleSheet, Switch } from 'react-native';
import { Text, View } from '../components/Themed';
import useColorScheme from '../hooks/useColorScheme';
import Navigation from '../navigation';

export default function Settings() {
  const [mode, setMode] = React.useState(useColorScheme() === 'dark'); //Gonna actually have to add functionality so it displays light or dark mode
  //Change between light and dark mode
  //Explain how app works (like how to do what)

  const toggleSwitch = () => {
    if (mode) {
      setMode(false);
    } else {
      setMode(true);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.categoryName}>
        <Text style={styles.categoryNameText}>Toggle Light Mode Dark Mode</Text>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.lightDarkModeToggle}>
        <Text style={styles.settingText}>Current Mode: { mode ? 'Dark Mode' : 'Light' }</Text>
        <Switch
          style={styles.switch}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={mode ? '#f56dd4b' : '#f4d3d4' }
          onValueChange={toggleSwitch}
          value={mode}
        /> 
        {/* Probs have to play with flex for this to get them on the same row and look nice, I suck at that shit a lot so gl */}
      </View>
      {/*<EditScreenInfo path="/screens/TabTwoScreen.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryName: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  categoryNameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  settingText: {
    fontSize: 18,
    justifyContent: 'flex-start',
  },
  separator: {
    height: 1,
    marginBottom: 15,
    width: '80%',
  },
  lightDarkModeToggle: {
    marginLeft: 15,
    marginRight: 15,
  },
  switch: {
    marginTop: 10,
    justifyContent: 'flex-end',
  },
});
