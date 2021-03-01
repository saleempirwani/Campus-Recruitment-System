import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Container, Content, List, ListItem, Text} from 'native-base';
import {ActivityIndicator} from 'react-native';

import firebase from '../config/firebase';
import {getStudentData} from '../redux/actions/actions';
import globalStyle from '../styles/styles';

const SelectedStudentList = ({navigation}) => {
  const dispatch = useDispatch();
  let state = useSelector((state) => state.userReducer);
  let stateAuth = useSelector((state) => state.authReducer);

  useEffect(() => {
    const get = () => {
      let std;
      try {
        firebase
          .database()
          .ref('users/student')
          .on('value', (snapshot) => {
            std = snapshot.val();
            std = Object.values(std ? std : {});
            // console.log('GET', std);
            dispatch(getStudentData(std));
          });
      } catch (e) {
        console.log('ERROR StudentScreen Firebase', e);
      }
    };
    get();
  }, []);

  console.log('STATE => ', stateAuth.standard);

  return stateAuth.standard !== null ? (
    <Container>
      <Content>
        <List>
          {state
            .filter((std) => std.standard === stateAuth.standard)
            .map((std, i) => (
              <ListItem
                key={i}
                onPress={() => navigation.navigate('Student Details', std)}>
                <Text>{std.stdName}</Text>
              </ListItem>
            ))}
        </List>
      </Content>
    </Container>
  ) : (
    <Container style={globalStyle.midContainer}>
      <ActivityIndicator size="large" color="#333" />
    </Container>
  );
};

export default SelectedStudentList;
