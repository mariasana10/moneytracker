import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from "react-native-safe-area-context";
import Login from './src/views/Login/Login';
import SignUpForm from './src/views/Login/SignUp';
import DashBoard from './src/views/DashBoard';
import SalaryForm from './src/views/salary';
import WeeklyReport from './src/views/DashBoard/weekly';
const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Login"
        >
          {/* Login */}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={SignUpForm} />

          {/* DashBoard */}
          <Stack.Screen name="Dashboard" component={DashBoard} />

          {/* Salary */}
          <Stack.Screen name="Salary" component={SalaryForm} />

          {/* Report */}
          <Stack.Screen name="WeeklyReport" component={WeeklyReport} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
