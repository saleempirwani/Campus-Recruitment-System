import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  midContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    marginVertical: 25,
  },
  input: {
    width: '100%',
    paddingHorizontal: 3,
    // paddingVertical: 0,
    marginBottom: 20,
    borderRadius: 5,
    borderColor: '#000',
  },
  button: {
    backgroundColor: '#34b5e3',
    borderRadius: 50,
    marginBottom: 20,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginBottom: 20,
  },

  themeRedFront: {
    color: '#e04244',
  },

  themeRedBack: {
    backgroundColor: '#e04244',
  },

  themeBlueFront: {
    color: '#34b5e3',
  },

  themeBlueBack: {
    backgroundColor: '#34b5e3',
  },
});

export default styles;
