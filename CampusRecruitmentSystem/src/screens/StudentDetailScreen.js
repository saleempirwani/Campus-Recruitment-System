import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

import {CardItem, Body, Button, Text, Container, Content} from 'native-base';
import {CardContent} from '../components/CardItems';

import firebase from '../config/firebase';
import globalStyle from '../styles/styles';

const std = ({navigation, route}) => {
  const std = route.params;

  const state = useSelector((state) => state.authReducer);

  return (
    <Container>
      <Content>
        <CardItem>
          <Body>
            <CardContent item="Name" value={std.stdName} />
            <CardContent item="Collage" value={std.stdCollage} />
            <CardContent item="Standard" value={std.standard} />
            <CardContent item="Marks" value={std.marks} />
            <CardContent item="Phone" value={std.stdPhone} />
            <CardContent item="Address" value={std.stdAddress} />

            {state.userType === 'admin' ? (
              <View style={styles.btnContent}>
                <Button
                  medium
                  full
                  style={{...globalStyle.button, ...globalStyle.themeBlueBack}}
                  onPress={() => {
                    navigation.navigate('Edit Student', std);
                  }}>
                  <Text>Edit</Text>
                </Button>
                <Button
                  full
                  medium
                  style={{...globalStyle.button, ...globalStyle.themeRedBack}}
                  onPress={() => {
                    deleteStudent(std.id, navigation);
                  }}>
                  <Text>Delete</Text>
                </Button>
              </View>
            ) : null}
          </Body>
        </CardItem>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  btnContent: {
    marginTop: 20,
    width: '100%',
  },
});

export default std;

const deleteStudent = (userId, navigation) => {
  firebase
    .database()
    .ref('users/student/' + userId)
    .remove();

  navigation.navigate('Students');
};
