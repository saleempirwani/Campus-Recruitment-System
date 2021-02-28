import React from 'react';
import {Image, Text} from 'react-native-elements';

import {StyleSheet} from 'react-native';
import logo from '../images/logo.png';
import globalStyles from '../styles/styles';

const Logo = () => (
  <Image resizeMode="contain" source={logo} style={styles.image} />
);

const Heading = ({text}) => (
  <Text h2 style={globalStyles.themeBlueFront}>
    {text}
  </Text>
);

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    margin: 5,
  },
  text: {
    color: '#ee2f25',
  },
});

export {Logo, Heading};
