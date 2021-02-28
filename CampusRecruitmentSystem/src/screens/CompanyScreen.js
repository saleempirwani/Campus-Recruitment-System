import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {Container, Content} from 'native-base';
// import {getCompaniesData} from '../redux/actions/actions';

import firebase from '../config/firebase';
import Box from '../components/Box';
import globalStyle from '../styles/styles';

const CompanyScreen = () => {
  const dispatch = useDispatch();
  let state = useSelector((state) => state.userReducer);
  // const database = firebase.database();

  useEffect(() => {
    const get = () => {
      let donor;
      /* try {
        database.ref('users/donor').on('value', (snapshot) => {
          donor = snapshot.val();
          donor = donor ? donor : {};
          // console.log('GET', donor);
          let keys = Object.keys(donor);
          donor = keys.map((k) => donor[k]);
          dispatch(getCompaniesData(donor));
        });
      } catch (e) {
        console.log('ERROR HomeScreen Firebase', e);
      }*/
    };
    get();
  }, []);

  // console.log('STATE => ', state);

  // const getCompanies = () =>
  //   state.filter((donor) => donor.blood === selectedBloodGroup);

  const getCompanies = () => [];

  return (
    <Container style={styles.container}>
      {getCompanies().length ? (
        <Content>
          {getCompanies().map((comp, i) => (
            <Box key={i} comp={comp} />
          ))}
        </Content>
      ) : (
        <Text h4 style={styles.text}>
          No Companies Available
        </Text>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderWidth: 1,
  },

  text: {
    textAlign: 'center',
    marginTop: 30,
    color: '#ee2f25',
  },
});

export default CompanyScreen;
