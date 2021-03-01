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
    isUserExist = [],
    standard = null,
    some = true;

  try {
    let response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    let uid = response.user.uid;
    if (uid) {
      token = uid;
    }
  } catch (e) {
    alert(e.message);
    some = false;
  }

  console.log('******', token);
  if (token && userType) {
    try {
      firebase
        .database()
        .ref(`users/${userType}`)
        .on('value', (snapshot) => {
          let users = snapshot.val();

          isUserExist = Object.values(users).map((user) =>
            user.email === email ? true : false,
          );
          console.log('users =>', isUserExist);

          if (userType === 'company') {
            standard = Object.values(users).map((user) =>
              user.email === email ? user.standard : null,
            )[0];
            storeData('standard', standard[0]);
          }
        });
    } catch (e) {
      console.log('ERROR action.js/signIn', e.message);
    }
  }
  // console.log(isUserExist);
  if (isUserExist.length && isUserExist[0]) {
    // isUserExist = [];
    storeData('userToken', token);
    storeData('userType', userType);
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
      standard: standard,
    },
  });
};

// SIGN_UP FUNCTION HERE...
export const signUp = (data, userType = null) => async (dispatch) => {
  let token = null,
    standard = null,
    path = null,
    some = true;

  if (userType === 'company') standard = data.profile.standard;

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
      users[`${path}/${id}`] = {...data.profile, id: id};
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
      standard: standard,
    },
  });
};

export const singOut = () => async (dispatch) => {
  await firebase.auth().signOut();
  removeData('userToken');
  removeData('userType');
  removeData('standard');
  return dispatch({type: SIGN_OUT});
};

export const restoreToken = (userToken, userType, standard) => {
  return {
    type: RESTORE_TOKEN,
    payload: {
      token: userToken,
      userType: userType,
      standard: standard,
    },
  };
};

// // UPDATING STUDENT DATA

// export const updateStudent = (profile, userId) => {
//   try {
//     firebase
//       .database()
//       .ref('users/student/' + userId)
//       .set({
//         ...profile,
//       });
//   } catch (error) {
//     console.log('updateStudent => ', error);
//   }
// };

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
