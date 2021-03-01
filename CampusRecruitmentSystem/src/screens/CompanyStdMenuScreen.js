import {Container} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';
import globalStyle from '../styles/styles';

const CompanyStdMenu = ({navigation}) => {
  return (
    <Container style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Selected Students')}
        style={{...styles.box, ...globalStyle.themeRedBack}}>
        <Text h3 style={{color: 'white'}}>
          Selected Students
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Students')}
        style={{...styles.box, ...globalStyle.themeBlueBack}}>
        <Text h3 style={{color: 'white'}}>
          All Students
        </Text>
      </TouchableOpacity>
    </Container>
  );
};

export default CompanyStdMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '70%',
    paddingVertical: 30,
    marginBottom: 50,
    borderRadius: 5,
    alignItems: 'center',
  },
});
