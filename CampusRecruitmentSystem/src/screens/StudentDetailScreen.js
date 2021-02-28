import React from 'react';
import {StyleSheet, View, Linking} from 'react-native';

import {CardItem, Body, Button, Text, Container} from 'native-base';
import {CardContent} from '../components/CardItems';

import globalStyle from '../styles/styles';

const std = ({route}) => {
  // const std = route.params;

  const std = {
    name: 'ali',
    collage: 'collage',
    standard: 'standard',
    marks: 'marks',
    phone: '03313616378',
    address: 'address',
  };

  return (
    <Container>
      <CardItem>
        <Body>
          <CardContent item="Name" value={std.name} />
          <CardContent item="Collage" value={std.collage} />
          <CardContent item="Standard" value={std.standard} />
          <CardContent item="Marks" value={std.marks} />
          <CardContent item="Phone" value={std.phone} />
          <CardContent item="Address" value={std.address} />

          {true ? (
            <View style={styles.btnContent}>
              <Button
                medium
                full
                style={{...globalStyle.button, ...globalStyle.themeBlueBack}}
                onPress={() => {}}>
                <Text>Edit</Text>
              </Button>
              <Button
                full
                medium
                style={{...globalStyle.button, ...globalStyle.themeRedBack}}
                onPress={() => {}}>
                <Text>Delete</Text>
              </Button>
            </View>
          ) : null}
        </Body>
      </CardItem>
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
