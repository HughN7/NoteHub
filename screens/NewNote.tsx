import * as React from 'react';
import { StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import uuid from 'react-native-uuid';
import EditScreenInfo from '../components/EditScreenInfo';
import { TextInput, View } from '../components/Themed';
import { Ionicons } from '@expo/vector-icons'; 

export default function NewNote() {
  //If time try to find a way to add a text editor toolbar
  //Only way I can think of though is implementing rich text editor for it
  const [noteTitle, setNoteTitle] = React.useState('Untitled Note');
  const [noteBody, setNoteBody] = React.useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.inputBox}>
          <TextInput
            multiline={true}
            scrollEnabled={true}
            maxHeight={800}
            style={styles.input}
            onChangeText={(text) => setNoteBody(text)}
          />
        </View>
        
        <Ionicons 
          name="add-circle"
          size={69}
          style={styles.saveButton}
          onPress={() => {Alert.prompt("Save test")}}
      />
      </View>
    </TouchableWithoutFeedback>
  );
}

/**
 * <Button title="Save Note" onPress={() => {
          Alert.prompt("Click Save to save your new note",
          "Enter a name for your new note: ",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Save",
              onPress: (name) => {
                if (name) {
                  setNoteTitle(name);
                }
                let note = { title: noteTitle, body: noteBody, key: uuid.v4() };
                console.log(note);
              },
            },
          ])
        }} />
 * 
 * 
 */

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
    //borderColor: '#aaa',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
  },
  saveButton: {
    color: 'orange',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 15,
    bottom: 15,
    //marginRight: 25,
  },
});
