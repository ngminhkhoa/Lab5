import React from 'react';
import LoginScreen from './views/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './views/Home';
import AddServiceScreen from './views/AddService';
import DetailServiceScreen from './views/DetailService';
import { MenuProvider } from 'react-native-popup-menu';
import UpdateServiceScreen from './views/UpdateService';
const Stack = createStackNavigator();

function App() {
  return (
    <MenuProvider>
      <NavigationContainer >
        <Stack.Navigator initialRouteName="Home" >
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Add" component={AddServiceScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Update" component={UpdateServiceScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Detail" component={DetailServiceScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}

export default App;
