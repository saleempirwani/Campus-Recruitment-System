import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  restoreToken,
  singOut,
  getCompanyData,
  getStudentData,
} from '../redux/actions/actions';

import {Button} from 'native-base';
import {Text} from 'react-native';
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
import EditStudent from '../screens/EditStudent';
import CompanyStdMenuScreen from '../screens/CompanyStdMenuScreen';
import SelectedStudentListScreen from '../screens/SelectedStudentListScreen';

const Stack = createStackNavigator();

function Navigation() {
  const state = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken, userType, standard;

      try {
        userToken = await AsyncStorage.getItem('userToken');
        userType = await AsyncStorage.getItem('userType');
        standard = await AsyncStorage.getItem('standard');
      } catch (e) {
        console.log('Error: ', e.message);
      }
      dispatch(restoreToken(userToken, userType, standard));
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
          headerRight: () => (
            <Button
              small
              style={{backgroundColor: '#fff', marginRight: 10, padding: 7}}
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
          headerRight: () => (
            <Button
              small
              style={{backgroundColor: '#fff', marginRight: 10, padding: 7}}
              onPress={() => {
                dispatch(singOut());
                dispatch(getCompanyData([]));
                dispatch(getStudentData([]));
              }}>
              <Text dark>Logout</Text>
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
          headerRight: () => (
            <Button
              small
              style={{backgroundColor: '#fff', marginRight: 10, padding: 7}}
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

      <Stack.Screen
        name="Edit Student"
        component={EditStudent}
        options={{
          headerStyle: {
            backgroundColor: globalStyle.themeBlueBack.backgroundColor,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="Student Details"
        component={StudentDetailScreen}
        options={{
          headerStyle: {
            backgroundColor: globalStyle.themeBlueBack.backgroundColor,
          },
          headerTintColor: '#fff',
        }}
      />
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
              style={{backgroundColor: '#fff', marginRight: 10, padding: 7}}
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

// StudentScreen
const StudentStack = () => {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Student Type"
        component={CompanyStdMenuScreen}
        options={{
          headerStyle: {
            backgroundColor: globalStyle.themeBlueBack.backgroundColor,
          },
          headerTintColor: '#fff',
          headerLeft: null,
          headerRight: () => (
            <Button
              small
              style={{backgroundColor: '#fff', marginRight: 10, padding: 7}}
              onPress={() => {
                dispatch(singOut());
                dispatch(getStudentData([]));
              }}>
              <Text>Logout</Text>
            </Button>
          ),
        }}
      />

      <Stack.Screen
        name="Selected Students"
        component={SelectedStudentListScreen}
        options={{
          headerStyle: {
            backgroundColor: globalStyle.themeBlueBack.backgroundColor,
          },
          headerTintColor: '#fff',
          // headerLeft: null,
          headerRight: () => (
            <Button
              small
              style={{backgroundColor: '#fff', marginRight: 10, padding: 7}}
              onPress={() => {
                dispatch(singOut());
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
          // headerLeft: null,
          headerRight: () => (
            <Button
              small
              style={{backgroundColor: '#fff', marginRight: 10, padding: 7}}
              onPress={() => {
                dispatch(singOut());
                dispatch(getStudentData([]));
              }}>
              <Text>Logout</Text>
            </Button>
          ),
        }}
      />

      <Stack.Screen
        name="Student Details"
        component={StudentDetailScreen}
        options={{
          headerStyle: {
            backgroundColor: globalStyle.themeBlueBack.backgroundColor,
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
