import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

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