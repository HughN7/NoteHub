import * as React from 'react';
import { useState} from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import NoteCard from '../components/NoteCard';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabOneScreen() {
  //Delete option, may have to fix up rename option but shouldn't be too different
  //Folder system maybe?
  const [notes, setNotes] = React.useState([
    { title: 'ToDo', body: 'Eat\nShower\nDo Homework', key: '1' },
    { title: 'Homework', body: 'Math\nMobile Dev\nDatabase', key: '2' },
    { title: 'Shopping List', body: 'Eggs\nWater\nRice\nLamb', key: '3' },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.notesList}>
        <FlatList
          data={notes}
          renderItem={({ item }) => (
            <TouchableOpacity onLongPress={() => {
              Alert.prompt("Rename Note ",
              "Enter a new note name: ",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Ok",
                  onPress: (name) => {
                    let note = { title: item.title, body: item.body, key: item.key };
                    if (name) {
                      note.title = name;
                    }
                    let index = notes.indexOf(item);
                    let newNotes = [...notes];
                    newNotes.splice(index, 1, note);
                    setNotes(newNotes);
                  },
                },
              ])
            }}>
              <NoteCard>
                <Text style={styles.body}>{ item.title }</Text>
              </NoteCard>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  notesList: {
    marginLeft: 20,
    marginRight: 20,
  },
  body: {
    fontSize: 16,
    marginLeft: 18,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  addnotebutton: {
    color: 'white',
    alignSelf: 'flex-end', 
  }
});
