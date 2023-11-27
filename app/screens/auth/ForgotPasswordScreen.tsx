import {z} from 'zod';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  Box,
  Center,
  HStack,
  Image,
  Input,
  InputField,
  ScrollView,
  Spinner,
  Text,
} from '@gluestack-ui/themed';
import Toast from 'react-native-toast-message';
import {supabase} from '@app/lib/supabase';
import {SvgUri} from 'react-native-svg';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';

import {forgotPasswordImage} from '@app/assets/images/forgotPassword/forgotPasswordImages';

const forgotPasswordSchema = z.object({
  email: z.string().email('Email is not valid.'),
});

type forgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordScreen = ({
  navigation,
}: {
  navigation?: {navigate: (routeName: string) => void};
}) => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<forgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<forgotPasswordSchemaType> = async form => {
    try {
      setLoading(true);

      await supabase.auth.resetPasswordForEmail(form.email, {
        redirectTo: 'https://monumental-web.vercel.app/reset-password',
      });

      navigation?.navigate('Login');
      setLoading(false);
      reset();
      Toast.show({
        type: 'success',
        text1: 'Email Sent',
        text2: 'Reset password link sent to your registered email.',
      });
    } catch (error: any) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Forgot Password Failed',
        text2: error.message,
      });
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.container}>
      <Box bg="#FFF3E9" h="$full" px="$5" py="$10">
        <TouchableOpacity onPress={() => navigation?.navigate('Login')}>
          <Center mb="$5" bg="#EEE0DA" w="$12" h="$12" borderRadius="$full">
            <SvgUri uri="https://lsyzogojqjdbyncurpza.supabase.co/storage/v1/object/public/App-Images/Back%20Icon.svg" />
          </Center>
        </TouchableOpacity>
        <Text
          fontSize="$3xl"
          textAlign="center"
          fontFamily="Klasik-Regular"
          lineHeight="$2xl"
          color="#573353">
          Forgot your password?
        </Text>
        <Image
          mt="$8"
          w="$full"
          h="$56"
          source={forgotPasswordImage}
          alt="Sign up image"
          alignSelf="center"
          resizeMode="contain"
        />
        <Box mt="$8" bg="#fff" p="$5" borderRadius="$2xl">
          <Text
            textAlign="center"
            color="#573353"
            mt="$4"
            fontFamily="Manrope-Medium"
            fontSize="$md">
            Enter your registered email below to receive password reset
            instruction
          </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="email"
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <Box
                  mt="$8"
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
                Send Reset Link
              </Text>
            </TouchableOpacity>
          )}
        </Box>
        <HStack mt="$8" justifyContent="center">
          <Text color="#573353" fontFamily="Manrope-Medium" fontSize="$md">
            Remember password?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation?.navigate('Login')}>
            <Text fontFamily="Manrope-Bold" fontSize="$md" color="#573353">
              Login
            </Text>
          </TouchableOpacity>
        </HStack>
      </Box>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
