
import {initializeApp, getApps} from 'firebase/app';
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from "firebase/auth";
import { showToast } from './utilities';
const firebaseConfig = {
  apiKey: "AIzaSyB1Gggit9sRA9EAF58s-X1K4A4B41F5ylc",
  authDomain: "finalapp-f57da.firebaseapp.com",
  projectId: "finalapp-f57da",
  storageBucket: "finalapp-f57da.appspot.com",
  messagingSenderId: "621366101619",
  appId: "1:621366101619:web:8264a4c8ae12cf0a2dcc06",
  measurementId: "G-X21GMN7SE2",
};

var app;
if (!getApps().length){
  app = initializeApp(firebaseConfig); // If no app exists.
}
else{
  const APPS = getApps();
  app = APPS[0]; // Choose the first app from the array.
}

initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export const getUserId =()=>{
  return auth.currentUser.uid;
}

export const getCurrentUserInfo = ()=> {
    return auth.currentUser;
}

export const handleLogout = () => {
  signOut(auth)
    .then(() => {
      showToast("success", `You have successfully logged out`);
    })
    .catch((error) => {
      showToast("error", ` Unsuccessful logout attempt`);
    });
}

