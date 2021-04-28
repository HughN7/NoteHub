/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import React from 'react';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomePage from '../screens/Home';
import NewNote from '../screens/NewNote';
import Settings from '../screens/Settings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Note, HomeProps } from '../types';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const [noteData, setNoteData] = React.useState<Note[]>([]);

  React.useEffect(() => {
    console.log('imported data');
    console.log(noteData);
  }, []);
  
  const importData = (note: Note) => {
    setNoteData([...noteData, note]); 
  };
  
  const updateData = (note: any) => {
    if (note) {
      setNoteData([...note]);
    }
  };

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        children={() => <HomePageNavigator noteData={noteData} updateData={updateData} />}
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

      {/* <BottomTab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="settings" color={color} />,
        }}
      /> */}
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
  const {noteData, updateData} = props;

  return (
    <HomePageStack.Navigator>
      <HomePageStack.Screen
        name="TabOneScreen"
        children={() => <HomePage noteData={noteData} updateData={updateData} />}
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
        options={{ headerTitle: 'New Note Page' }}
      />
    </NewNoteStack.Navigator>
  );
}

// const SettingsStack = createStackNavigator();

// function SettingsNavigator() {
//   return (
//     <SettingsStack.Navigator>
//       <SettingsStack.Screen
//         name="TabTwoScreen"
//         component={Settings}
//         options={{ headerTitle: 'Settings' }}
//       />
//     </SettingsStack.Navigator>
//   );
// }
