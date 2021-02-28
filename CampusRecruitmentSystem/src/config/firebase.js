import * as Firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyBmuwxe6I4MYIJRqiW6z0_vujq9yu9eE6Y',
  authDomain: 'campus-recruitment-syste-47c65.firebaseapp.com',
  projectId: 'campus-recruitment-syste-47c65',
  storageBucket: 'campus-recruitment-syste-47c65.appspot.com',
  messagingSenderId: '1033355349829',
  appId: '1:1033355349829:web:067d2da2123fb3d4aab82c',
};
// Initialize Firebase

export default !Firebase.apps.length
  ? Firebase.initializeApp(config)
  : Firebase.app();
