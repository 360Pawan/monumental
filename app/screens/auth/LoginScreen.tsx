import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import {ImageBackground, TouchableOpacity, StyleSheet} from 'react-native';
import {
  HStack,
  ScrollView,
  Text,
  Input,
  InputField,
  Divider,
  Box,
  Spinner,
} from '@gluestack-ui/themed';
import {z} from 'zod';
import {SvgUri} from 'react-native-svg';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';

import {supabase} from '@app/lib/supabase';
import {loginBgImage} from '@app/assets/images/login/loginImages';
import GoogleSignInButton from './GoogleSignInButton';

const loginSchema = z.object({
  email: z.string().email('Email is not valid.'),
  password: z
    .string()
    .min(6, 'Password should be more than 6 characters.')
    .max(20, 'Password should be less than 20 characters.'),
});

type loginSchemaType = z.infer<typeof loginSchema>;

const LoginScreen = ({
  navigation,
}: {
  navigation?: {navigate: (routeName: string) => void};
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const handlePasswordVisibility = () => {
    setIsVisible(!isVisible);
  };

  const onSubmit: SubmitHandler<loginSchemaType> = async form => {
    try {
      setLoading(true);

      const {error} = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (error) {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: error.message,
        });

        return;
      }

      setLoading(false);
      reset();
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'Welcome back 😊 Continue your journey.',
      });
    } catch (error: any) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error.message,
      });
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.container}>
      <Box h="$full" bg="#fff">
        <ImageBackground source={loginBgImage} resizeMode="cover">
          <Box p="$5" mt="$40">
            <Text
              fontSize="$3xl"
              textAlign="center"
              fontFamily="Klasik-Regular"
              lineHeight="$2xl"
              color="#573353">
              WELCOME TO Monumental habits
            </Text>
            <GoogleSignInButton />
          </Box>
          <Box bg="#fff" borderTopLeftRadius="$3xl" borderTopRightRadius="$3xl">
            <Text
              textAlign="center"
              p="$5"
              color="#573353"
              fontFamily="Manrope-Medium"
              fontSize="$lg">
              Log in with email
            </Text>
            <Divider height="$0.5" bgColor="#FFF3E9" />
            <Box p="$5" w="$full">
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <>
                    <Box
                      w="$full"
                      bg="#FFF6ED"
                      py="$3"
                      px="$5"
                      borderRadius="$2xl"
                      flexDirection="row"
                      alignItems="center"
                      gap="$2">
                      <SvgUri uri="https://lsyzogojqjdbyncurpza.supabase.co/storage/v1/object/public/App-Images/email.svg" />
                      <Input w="$full" size="md" borderWidth="$0">
                        <InputField
                          placeholder="Email"
                          fontSize="$md"
                          fontFamily="Manrope-Bold"
                          color="#FDA758"
                          placeholderTextColor="#573353"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      </Input>
                    </Box>
                    {errors.email ? (
                      <Text mt="$3" ml="$3" color="$red400">
                        {errors.email.message === 'Required'
                          ? 'Email is required.'
                          : errors.email.message}
                      </Text>
                    ) : null}
                  </>
                )}
                name="email"
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <>
                    <Box
                      mt="$4"
                      w="$full"
                      bg="#FFF6ED"
                      py="$3"
                      px="$5"
                      borderRadius="$2xl"
                      flexDirection="row"
                      alignItems="center"
                      gap="$2">
                      <SvgUri uri="https://lsyzogojqjdbyncurpza.supabase.co/storage/v1/object/public/App-Images/lock.svg" />
                      <Input w="70%" size="md" borderWidth="$0">
                        <InputField
                          type={isVisible ? 'text' : 'password'}
                          placeholder="Password"
                          fontSize="$md"
                          fontFamily="Manrope-Bold"
                          color="#FDA758"
                          placeholderTextColor="#573353"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      </Input>
                      {isVisible ? (
                        <TouchableOpacity onPress={handlePasswordVisibility}>
                          <Text
                            color="#573353"
                            fontFamily="Manrope-Medium"
                            fontSize="$md"
                            textDecorationColor="#573353"
                            underline>
                            Hide
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity onPress={handlePasswordVisibility}>
                          <Text
                            color="#573353"
                            fontFamily="Manrope-Medium"
                            fontSize="$md"
                            textDecorationColor="#573353"
                            underline>
                            Show
                          </Text>
                        </TouchableOpacity>
                      )}
                    </Box>
                    {errors.password ? (
                      <Text mt="$3" ml="$3" color="$red400">
                        {errors.password.message === 'Required'
                          ? 'Password is required.'
                          : errors.password.message}
                      </Text>
                    ) : null}
                  </>
                )}
                name="password"
              />
              {loading ? (
                <Spinner size="large" mt="$5" color="#FDA758" />
              ) : (
                <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                  <Text
                    textAlign="center"
                    color="#573353"
                    fontFamily="Manrope-Bold"
                    fontSize="$md"
                    bg="#FDA758"
                    w="$full"
                    mt="$5"
                    p="$5"
                    borderRadius="$2xl">
                    Login
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => navigation?.navigate('ForgotPassword')}>
                <Text
                  textAlign="center"
                  color="#573353"
                  mt="$4"
                  fontFamily="Manrope-Medium"
                  fontSize="$md">
                  Forgot Password?
                </Text>
              </TouchableOpacity>
              <HStack mt="$2" justifyContent="center">
                <Text
                  color="#573353"
                  fontFamily="Manrope-Medium"
                  fontSize="$md">
                  Don’t have an account?{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation?.navigate('SignUp')}>
                  <Text
                    fontFamily="Manrope-Bold"
                    fontSize="$md"
                    color="#573353">
                    Sign up
                  </Text>
                </TouchableOpacity>
              </HStack>
            </Box>
          </Box>
        </ImageBackground>
      </Box>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
