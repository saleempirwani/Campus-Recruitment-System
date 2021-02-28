import React from 'react';
import {Container, Content, List, ListItem, Text} from 'native-base';

const StudentListScreen = ({navigation}) => {
  const data = ['gddgdgh', 'xffgdg', 'dfgdgdfg'];

  return (
    <Container>
      <Content>
        <List>
          {data.map((d, i) => (
            <ListItem
              key={i}
              onPress={() => navigation.navigate('Student Details')}>
              <Text>{d}</Text>
            </ListItem>
          ))}
        </List>
      </Content>
    </Container>
  );
};

export default StudentListScreen;
