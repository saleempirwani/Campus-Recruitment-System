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
  const [userType, setUserType] = useState('student');
  const [stdName, setStdName] = useState('');
  const [stdCollage, setStdCollage] = useState('');
  const [stdPhone, setStdPhone] = useState('');
  const [marks, setMarks] = useState('');
  const [standard, setStandard] = useState('1st year');
  const [stdAddress, setStdAddress] = useState('');
  const [compName, setCompName] = useState('');

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

    if (userType === 'student') {
      if (
        !(emptyFieldValidation(stdName),
        emptyFieldValidation(marks),
        emptyFieldValidation(stdPhone),
        emptyFieldValidation(stdAddress))
      ) {
        return;
      }

      let check =
        nameValidation(stdName) &&
        addressValidation(stdAddress) &&
        phoneValidation(stdPhone);

      if (!check) {
        return;
      }

      user = {
        credential,
        profile: {
          email: credential.email,
          stdName,
          stdCollage,
          stdAddress,
          stdPhone,
          standard,
          marks,
          userType,
        },
      };
    } else if (userType === 'company') {
      if (!emptyFieldValidation(compName)) {
        return;
      }

      user = {
        credential,
        profile: {
          email: credential.email,
          standard,
          compName,
          userType,
        },
      };
    }
    // console.log(userType, user);
    dispatch(signUp(user, userType));
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
    setUserType('student');
    setStdCollage('');
    setStdName('');
    setMarks('');
    setStandard('1st Year');
    setStdPhone('');
    setStdAddress('');
    setCompName('');
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
                    value={stdName}
                    onChangeText={(text) => setStdName(text)}
                  />
                </Item>

                <Item regular style={globalStyles.input}>
                  <Input
                    placeholder="Collage *"
                    value={stdCollage}
                    onChangeText={(text) => setStdCollage(text)}
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
                    placeholder="Student Marks *"
                    keyboardType="numeric"
                    value={marks}
                    onChangeText={(text) => setMarks(text)}
                  />
                </Item>

                <Item regular style={globalStyles.input}>
                  <Input
                    placeholder="Student Phone *"
                    keyboardType="numeric"
                    value={stdPhone}
                    onChangeText={(text) => setStdPhone(text)}
                  />
                </Item>

                <Item regular style={globalStyles.input}>
                  <Input
                    placeholder="Student Address *"
                    value={stdAddress}
                    onChangeText={(text) => setStdAddress(text)}
                  />
                </Item>
              </>
            ) : (
              <>
                <View style={globalStyles.content}>
                  <TextView h4 style={globalStyles.themeBlueFront}>
                    Add Company Info
                  </TextView>
                </View>

                <Item regular style={globalStyles.input}>
                  <Input
                    placeholder="Company Name *"
                    value={compName}
                    onChangeText={(text) => setCompName(text)}
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
                      <Picker.Item
                        key={i}
                        label={'Looking for ' + std + ' students'}
                        value={std}
                      />
                    ))}
                  </Picker>
                </View>
              </>
            )}

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
