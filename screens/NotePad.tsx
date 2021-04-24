import * as React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { actions, getContentCSS, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text } from '../components/Themed';

export default function NotePad() {
  const richText = React.createRef();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Note Pad Page</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/*<EditScreenInfo path="/screens/TabTwoScreen.tsx" /> */}


    </SafeAreaView>
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
