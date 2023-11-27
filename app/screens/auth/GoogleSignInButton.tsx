import React, {useState} from 'react';
import {SvgUri} from 'react-native-svg';
import Toast from 'react-native-toast-message';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Box, HStack, Spinner, Text} from '@gluestack-ui/themed';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {supabase} from '@app/lib/supabase';
import {googleClientId} from '@app/environment/config';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  webClientId: googleClientId,
});

const GoogleSignInButton = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo.idToken) {
        const {data, error} = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: userInfo.idToken,
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

        let {data: profile, error: profileError} = await supabase
          .from('PROFILES')
          .select('USER_ID')
          .eq('USER_ID', data.user.id);

        if (profileError) {
          setLoading(false);
          Toast.show({
            type: 'error',
            text1: 'Login Failed',
            text2: profileError.message,
          });

          return;
        }

        if (profile?.length === 0) {
          const {error: userError} = await supabase.from('PROFILES').insert([
            {
              USER_ID: data.user.id,
              NAME: userInfo.user.name,
              EMAIL: data.user.email,
              PROFILE_URL: userInfo.user.photo,
              EMAIL_ME: false,
            },
          ]);

          if (userError) {
            setLoading(false);
            Toast.show({
              type: 'error',
              text1: 'Login Failed',
              text2: userError.message,
            });

            return;
          }
        }

        setLoading(false);
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: 'Welcome back 😊 Continue your journey.',
        });
      } else {
        throw new Error('no ID token present!');
      }
    } catch (error: any) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error.message,
      });
    }
  };

  return loading ? (
    <Spinner size="large" mt="$5" color="#FDA758" />
  ) : (
    <TouchableOpacity onPress={handleGoogleSignIn}>
      <HStack bg="#fff" mt="$5" p="$5" borderRadius="$2xl" gap="$5">
        <Box w="20%">
          <SvgUri
            style={styles.margin}
            width={24}
            height={24}
            uri="https://lsyzogojqjdbyncurpza.supabase.co/storage/v1/object/public/App-Images/google.svg"
          />
        </Box>
        <Text w="80%" color="#573353" fontFamily="Manrope-Bold" fontSize="$md">
          Continue with Google
        </Text>
      </HStack>
    </TouchableOpacity>
  );
};

export default GoogleSignInButton;

const styles = StyleSheet.create({
  margin: {
    marginLeft: 'auto',
  },
});
