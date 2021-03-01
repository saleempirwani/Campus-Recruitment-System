import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {View} from 'react-native';

import {Container, Content, Form, Item, Input, Button, Text} from 'native-base';
import {Picker} from '@react-native-picker/picker';
import firebase from '../config/firebase';
// import {updateStudent} from '../redux/actions/actions';
import globalStyles from '../styles/styles';
import {
  nameValidation,
  addressValidation,
  phoneValidation,
  emptyFieldValidation,
} from '../validation/validation';

function Register({navigation, route}) {
  const std = route.params;
  const standardTypes = ['1st year', '2nd year', '3rd year', '4th year'];


  // States...
  const [stdName, setStdName] = useState(std.stdName);
  const [stdCollage, setStdCollage] = useState(std.stdCollage);
  const [stdPhone, setStdPhone] = useState(std.stdPhone);
  const [marks, setMarks] = useState(std.marks);
  const [standard, setStandard] = useState(std.standard);
  const [stdAddress, setStdAddress] = useState(std.stdAddress);

  // Register into Firebase

  const update = () => {
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

    const profile = {
      stdName,
      stdCollage,
      stdAddress,
      stdPhone,
      standard,
      marks,
    };
    updateStudent(profile, std.id, navigation);
    clear();
  };

  // Clear Fields
  const clear = () => {
    setStdCollage('');
    setStdName('');
    setMarks('');
    setStandard('1st Year');
    setStdPhone('');
    setStdAddress('');
  };

  return (
    <Container style={{...globalStyles.container, paddingTop: 50}}>
      <Content>
        <Form>
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
                <Picker.Item key={i} label={std + ' student'} value={std} />
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
          <View style={{marginTop: 20}}>
            <Button
              onPress={() => update()}
              medium
              full
              style={globalStyles.button}>
              <Text>update</Text>
            </Button>
          </View>
        </Form>
      </Content>
    </Container>
  );
}

export default Register;

// UPDATING STUDENT DATA

const updateStudent = (profile, userId, navigation) => {
  try {
    firebase
      .database()
      .ref('users/student/' + userId)
      .update({
        ...profile,
      });

    navigation.navigate('Students');
  } catch (error) {
    console.log('updateStudent => ', error);
  }
};
