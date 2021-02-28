import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, CardItem, Body} from 'native-base';
import {CardContent} from './CardItems';

const Box = ({comp}) => {
  return (
    <Card style={styles.card}>
      <CardItem>
        <Body>
          <CardContent item="Company Name" value={comp.name} />
          <CardContent item="Looking for" value={comp.need} />
          <CardContent item="Phone" value={comp.phone} />
          <CardContent item="Address" value={comp.address} />
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
