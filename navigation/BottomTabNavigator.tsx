/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import React from 'react';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomePage from '../screens/Home';
import NewNote from '../screens/NewNote';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Note, HomeProps } from '../types';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const [noteData, setNoteData] = React.useState<Note[]>([]);

  const importData = React.useCallback((note: Note) => {
    setNoteData((prevNoteData) => prevNoteData.concat(note)); 
  }, []);
  
  const handleDelete = React.useCallback((note) => {
    setNoteData(noteData.filter((item) => item !== note));
  }, [noteData]);

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        children={() => <HomePageNavigator noteData={noteData} handleDelete={handleDelete} />}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      
      <BottomTab.Screen
        name="New Note"
        children={() => <NewNoteNavigator importData={importData} />}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="create" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomePageStack = createStackNavigator();

function HomePageNavigator(props: HomeProps) { //This is the home page
  const {noteData, handleDelete} = props;

  return (
    <HomePageStack.Navigator>
      <HomePageStack.Screen
        name="Home"
        children={() => <HomePage noteData={noteData} handleDelete={handleDelete} />}
        options={{ headerTitle: 'Home' }}
      />
    </HomePageStack.Navigator>
  );
}

const NewNoteStack = createStackNavigator();

function NewNoteNavigator({importData}: any) {
  return (
    <NewNoteStack.Navigator>
      <NewNoteStack.Screen
        name="New Note"
        children={() => <NewNote importData={importData} />}
        options={{ headerTitle: 'New Note' }}
      />
    </NewNoteStack.Navigator>
  );
}
