import {
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { auth } from '../Ultis/DB';
import { isEmailValid } from '../Ultis/utilities';
import { loginRegisterstyles } from '../Ultis/Styles';
import { showToast } from '../Ultis/utilities';

import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleRegister = async () => {
    if (email === '' || password === '' || confirmPassword === '') {
      Alert.alert('Warning', 'Email and Password is empty');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Warning', 'Password does not match');
      return;
    }
    if (!isEmailValid(email)) {
      Alert.alert('Invalid Email', 'The email address is not valid.');
      return;
    }

    if (password.length < 7 || confirmPassword.length < 7) {
      Alert.alert('Warning', 'Password must be at least 7 characters long');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((_firebaseUser) => {
        showToast(
          'success',
          'Congratulations! Your account has been successfully created.'
        );
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          navigation.navigate('Login', { email: email });
        }, 1000);
      })
      .catch(function (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        switch (errorCode) {
          case 'auth/weak-password':
            Alert.alert(
              'Weak Password',
              'The password is too weak. Please choose a stronger password.'
            );
            break;

          case 'auth/email-already-in-use':
            Alert.alert(
              'Email Already in Use',
              'The email address is already in use by another account.'
            );
            break;

          case 'auth/invalid-email':
            Alert.alert('Invalid Email', 'The email address is not valid.');
            break;

          default:
            Alert.alert('Registration Failed', errorMessage);
        }
      });
  };
  return (
    <>
      <View style={loginRegisterstyles.container}>
        <ImageBackground
          source={require('../assets/BG.jpg')}
          style={{
            flex: 1,
          }}
        >
          <View style={loginRegisterstyles.contentWrapper}>
            <View style={loginRegisterstyles.topContainer}>
              <Image
                style={loginRegisterstyles.logo}
                source={require('../assets/logo.png')}
              />
              <Text style={loginRegisterstyles.text}>
                Sign Up for QuickPickList
              </Text>
            </View>
            <View style={loginRegisterstyles.inputContainer}>
              <Text style={loginRegisterstyles.label}>Email</Text>
              <TextInput
                style={loginRegisterstyles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Email"
              />
              <Text style={loginRegisterstyles.label}>Password</Text>
              <TextInput
                style={loginRegisterstyles.input}
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Password"
              />
              <Text style={loginRegisterstyles.label}>Confirm Password</Text>
              <TextInput
                style={loginRegisterstyles.input}
                secureTextEntry
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                placeholder="Confirm Password"
              />
            </View>
            <Pressable onPress={handleRegister}>
              <Text style={loginRegisterstyles.button}>Register</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </View>
    </>
  );
}
