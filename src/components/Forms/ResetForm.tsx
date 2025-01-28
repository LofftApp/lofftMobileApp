import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

// Redux 🧠
import {useResetPasswordInstructionsMutation} from 'reduxFeatures/auth/authApi';

// Components 🪢
import InputFieldText from 'components/coreComponents/inputField/InputFieldText';
import ErrorMessage from 'components/LoadingAndNotFound/ErrorMessage';
import {CoreButton} from 'components/buttons/CoreButton';
import LoadingButtonIcon from 'components/LoadingAndNotFound/LoadingButtonIcon';

// StyleSheets 🖼️
import Color from 'styleSheets/lofftColorPallet.json';
import {fontStyles} from 'styleSheets/fontStyles';

// Helpers 🤝
import {size} from 'react-native-responsive-sizes';
import IconButton from 'components/buttons/IconButton';
import {resetPasswordSchema} from 'lib/zodSchema';

type SignInFormProps = {
  clearErrors: boolean;
  setClearErrors: React.Dispatch<React.SetStateAction<boolean>>;
};

const ResetForm = ({clearErrors, setClearErrors}: SignInFormProps) => {
  const [email, setEmail] = useState('');

  const [errorEmail, setErrorEmail] = useState('');
  const [signInError, setSignInError] = useState('');
  const [successResetEmailSend, setSuccessResetEmailSend] = useState(false);

  const [devMessage, setDevMessage] = useState('');

  const [resetPasswordInstructions, {isLoading}] =
    useResetPasswordInstructionsMutation();

  useEffect(() => {
    if (clearErrors) {
      setErrorEmail('');
      setSignInError('');
    }
    setClearErrors(false);
  }, [clearErrors, setClearErrors]);

  const handleEmailChange = (input: string) => {
    setEmail(input);
    setErrorEmail('');
    setSignInError('');
    setDevMessage('');
  };

  const handleResetPassword = async () => {
    const validation = resetPasswordSchema.safeParse({email});
    if (!validation.success) {
      const errEmail = validation.error.flatten().fieldErrors.email?.[0];
      if (errEmail) {
        setErrorEmail(errEmail);
      }
      return;
    }

    try {
      const response = await resetPasswordInstructions({
        email: email,
      }).unwrap();
      setEmail('');
      if (response.status === 'ok') {
        setSuccessResetEmailSend(true);
      }
    } catch (error) {
      const typedError = error as {
        status?: number | 'FETCH_ERROR';
      };
      if (typedError.status === 400 || typedError.status === 404) {
        setSignInError('Invalid email');
      } else if (typedError.status === 'FETCH_ERROR') {
        setSignInError('Network error. Please check connection or server');
      } else if (typedError.status === 403) {
        setSignInError('Wrong tokens. Check environment variables');
      } else {
        setSignInError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={fontStyles.headerMedium}>Reset Password</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color={Color.Black[100]} />
      ) : successResetEmailSend ? (
        <View>
          <IconButton
            icon="check-verified-02"
            iconSize={size(60)}
            text="Reset email send"
            isActive
            color={Color.Mint[100]}
            onPress={() => {}}
          />
          <Text style={[fontStyles.bodyMedium, styles.descriptionText]}>
            Almost there, now head to your {'\n'}email & follow the instructions
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.inputsContainer}>
            <View style={styles.inputContainer}>
              <InputFieldText
                value={email}
                onChangeText={handleEmailChange}
                placeholder="Email"
                type="email"
                keyboardType="email-address"
                errorMessage={errorEmail || signInError}
              />
              <ErrorMessage isInputField message={errorEmail} />
            </View>
          </View>
          <View style={styles.signInContainer}>
            <CoreButton
              value={isLoading ? '' : 'Reset password'}
              icon={isLoading ? <LoadingButtonIcon /> : undefined}
              onPress={handleResetPassword}
              disabled={isLoading}
            />
            <ErrorMessage message={signInError || devMessage} />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: size(55),
    alignItems: 'center',
    flex: 1,
    gap: size(20),
  },
  descriptionText: {
    marginTop: 10,
  },
  inputsContainer: {
    width: '100%',
    gap: size(10),
  },
  inputContainer: {
    gap: size(3),
  },
  forgotPassText: {
    alignSelf: 'flex-end',
    color: Color.Blue['100'],
  },
  signInContainer: {
    width: '100%',
    gap: size(5),
  },
});

export default ResetForm;
