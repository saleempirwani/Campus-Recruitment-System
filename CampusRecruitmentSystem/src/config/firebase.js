import * as Firebase from 'firebase';

const config = {
  //  add your firebase configuration here...
};
// Initialize Firebase

export default !Firebase.apps.length
  ? Firebase.initializeApp(config)
  : Firebase.app();
