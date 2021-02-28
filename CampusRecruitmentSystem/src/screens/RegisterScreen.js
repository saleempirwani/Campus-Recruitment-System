import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {View} from 'react-native';
import {Text as TextView} from 'react-native-elements';

import {Container, Content, Form, Item, Input, Button, Text} from 'native-base';
import {Picker} from '@react-native-picker/picker';
import * as Progress from 'react-native-progress';

import {signUp} from '../redux/actions/actions';
import {Logo, Heading} from '../components/Fields';
import globalStyles from '../styles/styles';
import {
  emailValidation,
  passwordValidation,
  nameValidation,
  addressValidation,
  phoneValidation,
  emptyFieldValidation,
} from '../validation/validation';

function Register({navigation}) {
  const standardTypes = ['1st year', '2nd year', '3rd year', '4th year'];
  const dispatch = useDispatch();

  let user;

  // States...
  const [next, setNext] = useState(false);
  const [userType, setUserType] = useState('company');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [marks, setMarks] = useState('');
  const [standard, setStandard] = useState('1st year');
  const [address, setAddress] = useState('');

  const [credential, setCredential] = useState({
    email: '',
    password: '',
    cmfPassword: '',
  });

  // Register into Firebase

  const register = () => {
    // Checking for Credential

    if (
      !(
        emptyFieldValidation(credential.email) &&
        emptyFieldValidation(credential.password) &&
        emptyFieldValidation(credential.cmfPassword)
      )
    ) {
      return;
    }

    if (!validateCredential(credential)) {
      return;
    }

    if (
      !(emptyFieldValidation(name),
      emptyFieldValidation(marks),
      emptyFieldValidation(phone),
      emptyFieldValidation(address))
    ) {
      return;
    }

    if (userType === 'student') {
      let check =
        nameValidation(name) &&
        addressValidation(address) &&
        phoneValidation(phone);

      if (!check) {
        return;
      }

      user = {
        credential,
        profile: {
          email: credential.email,
          name,
          address,
          phone,
          userType,
        },
      };
    } else if (userType === 'acceptor') {
      user = {
        credential,
        profile: {
          email: credential.email,
          userType,
        },
      };
    }
    // dispatch(signUp(user, userType));
    clear();
  };

  // Validation Credentials
  const validateCredential = (credential) => {
    const {email, password, cmfPassword} = credential;
    if (emailValidation(email) && passwordValidation(password, cmfPassword)) {
      return true;
    }
  };

  // Clear Fields
  const clear = () => {
    setCredential({email: '', password: '', cmfPassword: ''});
    setUserType('company');
    setName('');
    setMarks('');
    setStandard('');
    setPhone('');
    setAddress('');
    setNext(false);
  };

  return (
    <Container
      style={next ? globalStyles.midContainer : globalStyles.container}>
      {next ? (
        <Progress.CircleSnail color={['red', 'green', 'blue']} size={60} />
      ) : (
        <Content>
          <View style={globalStyles.content}>
            <Logo />
            <Heading text="Register" />
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

            <Item regular style={globalStyles.input}>
              <Input
                placeholder="Confirm Password *"
                onChangeText={(text) =>
                  setCredential({...credential, cmfPassword: text})
                }
                value={credential.cmfPassword}
                secureTextEntry={true}
              />
            </Item>

            <View style={globalStyles.picker}>
              <Picker
                selectedValue={userType}
                style={{height: 50, width: '100%'}}
                onValueChange={(itemValue) => setUserType(itemValue)}>
                <Picker.Item label="Company" value="company" />
                {/* <Picker.Item label="Admin" value="admin" /> */}
                <Picker.Item label="Student" value="student" />
              </Picker>
            </View>

            {userType === 'student' ? (
              <>
                <View style={globalStyles.content}>
                  <TextView h4 style={globalStyles.themeBlueFront}>
                    Add Profile Info
                  </TextView>
                </View>

                <Item regular style={globalStyles.input}>
                  <Input
                    placeholder="Name *"
                    value={name}
                    onChangeText={(text) => setName(text)}
                  />
                </Item>

                <View style={globalStyles.picker}>
                  <Picker
                    selectedValue={standard}
                    style={{height: 50, width: '100%'}}
                    onValueChange={(itemValue) => {
                      setStandard(itemValue);
                    }}>
                    {standardTypes.map((std, i) => (
                      <Picker.Item key={i} label={std} value={std} />
                    ))}
                  </Picker>
                </View>

                <Item regular style={globalStyles.input}>
                  <Input
                    placeholder="Marks *"
                    keyboardType="numeric"
                    value={marks}
                    onChangeText={(text) => setMarks(text)}
                  />
                </Item>

                <Item regular style={globalStyles.input}>
                  <Input
                    placeholder="Phone *"
                    keyboardType="numeric"
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                  />
                </Item>

                <Item regular style={globalStyles.input}>
                  <Input
                    placeholder="Address *"
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                  />
                </Item>
              </>
            ) : null}

            <View style={{marginTop: 20}}>
              <Button
                onPress={() => register()}
                medium
                full
                style={globalStyles.button}>
                <Text>Register</Text>
              </Button>

              <Button
                onPress={() => navigation.navigate('Login')}
                medium
                full
                style={{...globalStyles.button, ...globalStyles.themeRedBack}}>
                <Text>Login</Text>
              </Button>
            </View>
          </Form>
        </Content>
      )}
    </Container>
  );
}

export default Register;
