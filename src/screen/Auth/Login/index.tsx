import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';

interface IInputValue {
  email: string;
  password: string;
  errorEmail: null;
  errorPassword: null;
}

export default function LoginPage() {
  const [inputValues, setInputValues] = useState<IInputValue>({
    email: '',
    password: '',
    errorEmail: null,
    errorPassword: null,
  });

  const handleChangeInput = (
    key: 'email' | 'password' | 'errorEmail' | 'errorPassword',
    value: string | null,
  ) => {
    setInputValues(prevState => ({...prevState, [key]: value}));
  };

  const checkEmail = () => {
    const emailValidator = new RegExp(
      '^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6})*$',
    );

    if (!emailValidator.test(inputValues.email)) {
      handleChangeInput('errorEmail', 'Not valid email');
    } else {
      handleChangeInput('errorEmail', null);
    }
  };

  const checkPassword = (text: string) => {
    if (text.length < 8) {
      handleChangeInput('errorPassword', 'Password must be at least 8 symbols');
    } else {
      handleChangeInput('errorPassword', null);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={[styles.mainWrapper]}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.select({android: 20, ios: 90})}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Раді тебе вітати!</Text>
            <Text style={styles.welcomeText}>
              Кожен пухнастик заслуговує на дбайливих господарів.Ми допоможемо
              тобі знайти друга.
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.loginBtn}>
              <Text style={styles.authText}>Вхід</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registrationBtn}>
              <Text style={styles.authText}>Реєстрація</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder={'Email'}
                style={styles.input}
                placeholderTextColor={'#838383'}
                value={inputValues.email}
                onChangeText={text => handleChangeInput('email', text)}
                onBlur={() => {
                  checkEmail();
                }}
              />
              {inputValues.errorEmail && <Text>{inputValues.errorEmail}</Text>}
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder={'Password'}
                style={styles.input}
                placeholderTextColor={'#838383'}
                value={inputValues.password}
                onChangeText={text => {
                  handleChangeInput('password', text);
                  checkPassword(text);
                }}
                secureTextEntry={true}
              />
              {inputValues.errorPassword && (
                <Text>{inputValues.errorPassword}</Text>
              )}
            </View>
          </View>
          <TouchableOpacity style={styles.loginBtnContainer}>
            <Text style={styles.loginText}>Увійти</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
