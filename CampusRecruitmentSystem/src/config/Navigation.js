import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  restoreToken,
  singOut,
  getCompanyData,
  getStudentData,
} from '../redux/actions/actions';

import {Button, Text} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import globalStyle from '../styles/styles';
import Splash from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import StudentDetailScreen from '../screens/StudentDetailScreen';
import CompanyScreen from '../screens/CompanyScreen';
import MenuScreen from '../screens/MenuScreen';
import StudentListScreen from '../screens/StudentListScreen';

const Stack = createStackNavigator();

function Navigation() {
  const state = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken, userType;

      try {
        userToken = await AsyncStorage.getItem('userToken');
        userType = await AsyncStorage.getItem('userType');
      } catch (e) {
        console.log('Error: ', e.message);
      }
      dispatch(restoreToken(userToken, userType));
    };

    bootstrapAsync();

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? (
        <Splash />
      ) : state.userToken === null ? (
        <AuthStack />
      ) : state.userType === 'student' ? (
        <CompanyStack />
      ) : state.userType === 'company' ? (
        <StudentStack />
      ) : (
        <AdminStack />
      )}
    </NavigationContainer>
  );
}

// Authentication Screens
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

// Admin Screens:
const AdminStack = () => {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          headerStyle: {
            backgroundColor: globalStyle.themeBlueBack.backgroundColor,
          },
          headerTintColor: '#fff',
          headerLeft: null,
          headerRight: () => (
            <Button
              small
              style={{backgroundColor: '#fff', marginRight: 10}}
              onPress={() => {
                dispatch(singOut());
              }}>
              <Text>Logout</Text>
            </Button>
          ),
        }}
      />

      <Stack.Screen
        name="Companies"
        component={CompanyScreen}
        options={{
          headerStyle: {
            backgroundColor: globalStyle.themeBlueBack.backgroundColor,
          },
          headerTintColor: '#fff',
          headerLeft: null,
          headerRight: () => (
            <Button
              small
              style={{backgroundColor: '#fff', marginRight: 10}}
              onPress={() => {
                dispatch(singOut());
                dispatch(getCompanyData([]));
                dispatch(getStudentData([]));
              }}>
              <Text>Logout</Text>
            </Button>
          ),
        }}
      />
      <Stack.Screen
        name="Students"
        component={StudentListScreen}
        options={{
          headerStyle: {
            backgroundColor: globalStyle.themeBlueBack.backgroundColor,
          },
          headerTintColor: '#fff',
          headerLeft: null,
          headerRight: () => (
            <Button
              small
              style={{backgroundColor: '#fff', marginRight: 10}}
              onPress={() => {
                dispatch(singOut());
                dispatch(getStudentData([]));
                dispatch(getCompanyData([]));
              }}>
              <Text>Logout</Text>
            </Button>
          ),
        }}
      />

      <Stack.Screen name="Student Details" component={StudentDetailScreen} />
    </Stack.Navigator>
  );
};

// CompanyScreen

const CompanyStack = () => {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Companies"
        component={CompanyScreen}
        options={{
          headerStyle: {
            backgroundColor: globalStyle.themeBlueBack.backgroundColor,
          },
          headerTintColor: '#fff',
          headerLeft: null,
          headerRight: () => (
            <Button
              small
              style={{backgroundColor: '#fff', marginRight: 10}}
              onPress={() => {
                dispatch(singOut());
                dispatch(getCompanyData([]));
              }}>
              <Text>Logout</Text>
            </Button>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

// StudentScreen Screens
const StudentStack = () => {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Students"
        component={StudentListScreen}
        options={{
          headerStyle: {
            backgroundColor: globalStyle.themeBlueBack.backgroundColor,
          },
          headerTintColor: '#fff',
          headerLeft: null,
          headerRight: () => (
            <Button
              small
              style={{backgroundColor: '#fff', marginRight: 10}}
              onPress={() => {
                dispatch(singOut());
                dispatch(getStudentData([]));
              }}>
              <Text>Logout</Text>
            </Button>
          ),
        }}
      />

      <Stack.Screen name="Student Details" component={StudentDetailScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;
