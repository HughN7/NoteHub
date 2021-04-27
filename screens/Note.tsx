import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, View } from '../components/Themed';
import EditScreenInfo from '../components/EditScreenInfo';


export default function Note() {
  //Check note with note key and update note body based on key
  //Maybe make this come out as a form/modal
  const [note, setNote] = React.useState({
    title: '',
    body: '',
    key: '',
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={ 'OwO' }
        multiline
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  textInput: {
    fontSize: 12,
  },
})