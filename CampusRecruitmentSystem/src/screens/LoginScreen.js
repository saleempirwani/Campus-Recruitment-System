import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {View} from 'react-native';
import {Container, Content, Form, Item, Input, Button, Text} from 'native-base';
import {Picker} from '@react-native-picker/picker';

import {signIn} from '../redux/actions/actions';
import {Logo, Heading} from '../components/Fields';
import globalStyles from '../styles/styles';
import {emailValidation, emptyFieldValidation} from '../validation/validation';

function Login({navigation}) {
  const [userType, setUserType] = useState('admin');
  const [credential, setCredential] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  // Login into Firebase
  const login = () => {
    dispatch(signIn(credential, userType));
    const {email, password} = credential;
    if (
      emptyFieldValidation(email) &&
      emptyFieldValidation(password) &&
      emailValidation(email)
    ) {
      clear();
    }
  };

  // Clear Fields
  const clear = () => {
    setCredential({
      email: '',
      password: '',
    });
  };

  return (
    <Container style={globalStyles.container}>
      <Content>
        <View style={globalStyles.content}>
          <Logo />
          <Heading text="Login" />
        </View>
        <Form>
          <Item regular style={globalStyles.input}>
            <Input
              placeholder="Email *"
              value={credential.email}
              onChangeText={(text) =>
                setCredential({...credential, email: text.toLowerCase()})
              }
            />
          </Item>
          <Item regular style={globalStyles.input}>
            <Input
              placeholder="Password *"
              onChangeText={(text) =>
                setCredential({...credential, password: text})
              }
              value={credential.password}
              secureTextEntry={true}
            />
          </Item>

          <View style={globalStyles.picker}>
            <Picker
              selectedValue={userType}
              style={{height: 50, width: '100%'}}
              onValueChange={(itemValue) => setUserType(itemValue)}>
              <Picker.Item label="Admin" value="admin" />
              <Picker.Item label="Student" value="student" />
              <Picker.Item label="Company" value="company" />
            </Picker>
          </View>
          <View style={{paddingTop: 20}}>
            <Button
              onPress={() => login()}
              medium
              full
              style={globalStyles.button}>
              <Text>Login</Text>
            </Button>

            <Button
              onPress={() => navigation.navigate('Register')}
              medium
              full
              style={{...globalStyles.button, ...globalStyles.themeRedBack}}>
              <Text>register</Text>
            </Button>
          </View>
        </Form>
      </Content>
    </Container>
  );
}

export default Login;
