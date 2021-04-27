import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, View } from '../components/Themed';
import EditScreenInfo from '../components/EditScreenInfo';


export default function Note() {
  //Shouldn't be too diff from new note but body should auto save
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