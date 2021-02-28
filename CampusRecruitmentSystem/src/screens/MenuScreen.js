import {Container} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';
import globalStyle from '../styles/styles';

const MenuScreen = () => {
  return (
    <Container style={styles.container}>
      <TouchableOpacity
        onPress={() => alert('dfdfgdfg')}
        style={{...styles.box, ...globalStyle.themeRedBack}}>
        <Text h3 style={{color: 'white'}}>
          Students
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => alert('dfdfgdfg')}
        style={{...styles.box, ...globalStyle.themeBlueBack}}>
        <Text h3 style={{color: 'white'}}>
          Companies
        </Text>
      </TouchableOpacity>
    </Container>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '50%',
    paddingVertical: 30,
    marginBottom: 50,
    borderRadius: 5,
    alignItems: 'center',
  },
});
