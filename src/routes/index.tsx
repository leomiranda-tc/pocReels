import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Preview from '@src/screens/Preview';
import Trim from '@src/screens/Trim';
import Record from '@src/screens/Record';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Record" component={Record} />
        <Stack.Screen name="Preview" component={Preview} />
        <Stack.Screen name="Trim" component={Trim} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
