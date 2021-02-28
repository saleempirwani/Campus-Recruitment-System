import firebase from '../../config/firebase';
import {storeData, removeData} from '../../storage/storage';

import {
  RESTORE_TOKEN,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  GET_COMP_DATA,
  GET_STD_DATA,
} from '../../constants';

// SIGN_IN FUNCTION HERE...
export const signIn = ({email, password}, userType = null) => async (
  dispatch,
) => {
  let token = null,
    some = true;
  /*
  try {
    let response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    if (response && response.user) {
      token = response.user.uid;
    }
  } catch (e) {
    alert(e.message);
    some = false;
  }*/

  if (true && userType) {
    try {
      firebase
        .database()
        .ref(`users/${userType}`)
        .on('value', (snapshot) => {
          let users = snapshot.val();
          let isUserExist;
          isUserExist = Object.values(users).map((user) =>
            user.email === email ? true : false,
          );
          console.log('users =>', isUserExist);
        });
    } catch (e) {
      console.log('ERROR action.js/signIn', e.message);
    }
  }

  if (userType) {
    storeData('userToken', token);

    if (userType === 'admin') {
      userType = null;
    } else if (userType === 'student') {
      userType = 'donor';
      storeData('userType', userType);
    } else if (userType === 'company') {
      userType = 'donor';
      storeData('userType', userType);
    }
  } else {
    if (some) alert('Something went wrong, could not sign in.');
    token = null;
  }

  console.log('token', token, 'Type', userType);

  return dispatch({
    type: SIGN_IN,
    payload: {
      token: token,
      userType: userType,
    },
  });
};

// SIGN_UP FUNCTION HERE...
export const signUp = (data, userType = null) => async (dispatch) => {
  let token = null,
    path = null,
    some = true;

  // Firebase SignUp Code
  try {
    let response = await firebase
      .auth()
      .createUserWithEmailAndPassword(
        data.credential.email,
        data.credential.password,
      );
    if (response) {
      token = response.user.uid;
    }
  } catch (e) {
    alert(e.message);
    some = false;
  }

  // console.log('USER DATA @ SIGNUP', data);
  if (token && userType) {
    if (userType === 'student') {
      path = 'users/student';
    } else if (userType === 'company') {
      path = '/users/company';
      storeData('userType', userType);
    } else {
      alert('Something went wrong');
    }
  }

  if (path) {
    try {
      const id = firebase.database().ref().child(path).push().key;
      const users = {};
      users[`${path}/${id}`] = {...data.profile, id};
      firebase.database().ref().update(users);
      storeData('userToken', token);
    } catch (e) {
      console.log('Error @ SIGNUP', e);
    }
  } else {
    if (some) alert('Something went wrong! could not register.');
    token = null;
  }

  console.log('token', token, 'path', path, data, userType);

  return dispatch({
    type: SIGN_UP,
    payload: {
      token: token,
      userType: userType,
    },
  });
};

export const singOut = () => async (dispatch) => {
  await firebase.auth().signOut();
  removeData('userToken');
  removeData('userType');
  return dispatch({type: SIGN_OUT});
};

export const restoreToken = (userToken, userType) => {
  return {
    type: RESTORE_TOKEN,
    payload: {
      token: userToken,
      userType: userType,
    },
  };
};

// GETTING DATA

export const getCompanyData = (comp) => {
  console.log('getCompanyData', comp);

  return {
    type: GET_COMP_DATA,
    payload: comp,
  };
};

export const getStudentData = (std) => {
  console.log('getStudentData', std);

  return {
    type: GET_COMP_DATA,
    payload: std,
  };
};
