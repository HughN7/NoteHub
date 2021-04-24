import * as React from 'react';
import { StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { TextInput, View } from '../components/Themed';

export default function NewNote() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.inputBox}>
          <TextInput
            multiline={true}
            scrollEnabled={true}
            minHeight={450}
            maxHeight={450}
            style={styles.input}
          />
        </View>
        {/*<EditScreenInfo path="/screens/TabTwoScreen.tsx" /> */} 
        <Button title="Save Note" onPress={() => {Alert.prompt("Enter Note Name: ")}} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputBox: {
    marginTop: 25,
    marginBottom: 75,
    marginLeft: 25,
    marginRight: 25,
  },
  input: {
    fontSize: 18,
    borderColor: '#aaa',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
  },
});
