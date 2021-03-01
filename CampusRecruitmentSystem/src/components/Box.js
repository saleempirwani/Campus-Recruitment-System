import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, CardItem, Body} from 'native-base';
import {CardContent} from './CardItems';

const Box = ({comp}) => {
  return (
    <Card style={styles.card}>
      <CardItem>
        <Body>
          <CardContent item="Company Name" value={comp.compName} />
          <CardContent item="Looking for" value={comp.standard + ' students'} />
        </Body>
      </CardItem>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  btn: {
    marginTop: 10,
    borderRadius: 5,
  },
});

export default Box;
