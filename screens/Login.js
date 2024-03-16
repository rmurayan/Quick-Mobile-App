import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import { auth } from '../Ultis/DB';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRoute } from '@react-navigation/native';
import { isEmailValid } from '../Ultis/utilities';
import { loginRegisterstyles } from '../Ultis/Styles';
import { showToast } from '../Ultis/utilities';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const route = useRoute();
  useEffect(() => {
    if (route.params && route.params.email) {
      const registeredEmail = route.params.email;
      setEmail(registeredEmail);
    }
  }, [route.params]);

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Empty', 'The Email and Password is Empty');
      return;
    }

    if (!isEmailValid(email)) {
      Alert.alert('Invalid Email', 'The email address is not valid.');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((fireUser) => {
        showToast('success', 'Authentication has been successfully verified.');
        setEmail('');
        setPassword('');
        setTimeout(() => {
          navigation.navigate('Home');
        }, 1000);
      })
      .catch(function (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        switch (errorCode) {
          case 'auth/wrong-password':
            Alert.alert('Wrong password.');
            break;

          case 'auth/user-not-found':
            Alert.alert('User not found. Please check your email.');
            break;

          case 'auth/invalid-email':
            Alert.alert('Invalid email address.');
            break;

          case 'auth/too-many-requests':
            Alert.alert('Too many failed attempts. Please try again later.');
            break;
          case 'auth/invalid-login-credentials':
            Alert.alert('Invalid login credentials.');
            break;

          default:
            // Handle other errors
            Alert.alert(errorMessage);
        }
      });
  };

  const handleRegister = () => {
    navigation.navigate('Register');
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
                Sign In for QuickPickList
              </Text>
            </View>
            <View style={loginRegisterstyles.inputContainer}>
              <Text style={loginRegisterstyles.label}>Email</Text>
              <TextInput
                style={loginRegisterstyles.input}
                value={email}
                onChangeText={(val) => setEmail(val)}
                placeholder="Email"
              />
              <Text style={loginRegisterstyles.label}>Password</Text>
              <TextInput
                style={loginRegisterstyles.input}
                secureTextEntry
                value={password}
                onChangeText={(val) => setPassword(val)}
                placeholder="Password"
              />
              <Pressable onPress={handleLogin}>
                <Text style={loginRegisterstyles.button}>Login</Text>
              </Pressable>
              <Pressable onPress={handleRegister}>
                <Text style={loginRegisterstyles.buttonRgister}>
                  Not registered? Create an account
                </Text>
              </Pressable>
            </View>
          </View>
        </ImageBackground>
      </View>
    </>
  );
}
