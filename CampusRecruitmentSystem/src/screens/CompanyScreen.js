import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {StyleSheet, ActivityIndicator} from 'react-native';
import {Container, Content} from 'native-base';

import {getCompanyData} from '../redux/actions/actions';
import firebase from '../config/firebase';

import Box from '../components/Box';
import globalStyle from '../styles/styles';

const CompanyScreen = () => {
  const dispatch = useDispatch();
  let state = useSelector((state) => state.userReducer);

  useEffect(() => {
    const get = () => {
      let comp;
      try {
        firebase
          .database()
          .ref('users/company')
          .on('value', (snapshot) => {
            comp = snapshot.val();
            comp = Object.values(comp ? comp : {});
            // console.log('GET', comp);
            dispatch(getCompanyData(comp));
          });
      } catch (e) {
        console.log('ERROR CompanyScreen Firebase', e);
      }
    };
    get();
  }, []);

  // console.log('STATE => ', state);

  return state.length ? (
    <Container style={styles.container}>
      <Content>
        {state.map((comp, i) => (
          <Box key={i} comp={comp} />
        ))}
      </Content>
    </Container>
  ) : (
    <Container style={globalStyle.midContainer}>
      <ActivityIndicator size="large" color="#333" />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderWidth: 1,
    backgroundColor: '#f3f3f3',
  },

  text: {
    textAlign: 'center',
    marginTop: 30,
    color: '#ee2f25',
  },
});

export default CompanyScreen;
