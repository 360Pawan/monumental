import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  Box,
  Divider,
  HStack,
  Image,
  Input,
  InputField,
  ScrollView,
  Spinner,
  Text,
} from '@gluestack-ui/themed';
import {z} from 'zod';
import {SvgUri} from 'react-native-svg';
import Toast from 'react-native-toast-message';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';

import {supabase} from '@app/lib/supabase';
import GoogleSignInButton from './GoogleSignInButton';
import {signUpBgImage} from '@app/assets/images/signUp/signUpImages';

const signUpSchema = z.object({
  email: z.string().email('Email is not valid.'),
  password: z
    .string()
    .min(6, 'Password should be more than 6 characters.')
    .max(20, 'Password should be less than 20 characters.'),
});

type signUpSchemaType = z.infer<typeof signUpSchema>;

const SignUpScreen = ({
  navigation,
}: {
  navigation?: {navigate: (routeName: string) => void};
}) => {
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<signUpSchemaType>({resolver: zodResolver(signUpSchema)});

  const handlePasswordVisibility = () => {
    setIsVisible(!isVisible);
  };

  const onSubmit: SubmitHandler<signUpSchemaType> = async form => {
    try {
      setLoading(true);

      let {data, error} = await supabase
        .from('PROFILES')
        .select('EMAIL')
        .eq('EMAIL', form.email);

      if (error) {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Signup Failed',
          text2: error.message,
        });

        return;
      }

      if (data?.length !== 0) {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Signup Failed',
          text2: 'Email is already used.',
        });

        return;
      }

      const {error: userError} = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (userError) {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Signup Failed',
          text2: userError.message,
        });

        return;
      }

      navigation?.navigate('Login');
      setLoading(false);
      reset();
      Toast.show({
        type: 'success',
        text1: 'Signup Successful',
        text2: 'Verify your email to get started.',
      });
    } catch (error: any) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Signup Failed',
        text2: error.message,
      });
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.container}>
      <Box bg="#FFF3E9" h="$full" px="$5" py="$10">
        <Image
          w="$full"
          h="$56"
          source={signUpBgImage}
          alt="Sign up image"
          alignSelf="center"
          resizeMode="contain"
        />
        <Text
          mt="$8"
          fontSize="$3xl"
          textAlign="center"
          fontFamily="Klasik-Regular"
          lineHeight="$2xl"
          color="#573353">
          Create your account
        </Text>
        <Box mt="$8">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="email"
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <Box
                  mt="$3"
                  w="$full"
                  bg="#fff"
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
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="password"
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <Box
                  mt="$3"
                  w="$full"
                  bg="#FFF"
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
                mt="$7"
                p="$5"
                borderRadius="$2xl">
                Create Account
              </Text>
            </TouchableOpacity>
          )}
          <HStack mt="$5" alignItems="center">
            <Divider w="30%" height={1} bgColor="#573353" />
            <Text
              textAlign="center"
              w="40%"
              color="#573353"
              fontFamily="Manrope-Bold"
              fontSize="$md">
              Or sign in with
            </Text>
            <Divider w="30%" height={1} bgColor="#573353" />
          </HStack>
          <GoogleSignInButton />
          <HStack mt="$5" justifyContent="center">
            <Text color="#573353" fontFamily="Manrope-Medium" fontSize="$md">
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation?.navigate('Login')}>
              <Text fontFamily="Manrope-Bold" fontSize="$md" color="#573353">
                Sign In
              </Text>
            </TouchableOpacity>
          </HStack>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
