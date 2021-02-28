import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {Container} from 'native-base';

// import styles from '../styles/styles';
import {Logo} from '../components/Fields';

function SplashScreen() {
  return (
    <Container style={styles.container}>
      <Logo />
      <View style={{marginTop: 20}}>
        <Text h5 style={{color: 'gray', marginBottom: 10, alignSelf: 'center'}}>
          Created By
        </Text>
        <Text h5 style={{color: '#333', alignSelf: 'center'}}>
          Muhammad Saleem Raza
        </Text>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default SplashScreen;
