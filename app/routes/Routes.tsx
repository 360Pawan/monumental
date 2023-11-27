import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector, useDispatch} from 'react-redux';

import SplashScreen from '@app/screens/splash/SplashScreen';
import IntroductionScreen from '@app/screens/splash/introduction/IntroductionScreen';
import LoginScreen from '@app/screens/auth/LoginScreen';
import HomeScreen from '@app/screens/main/home/HomeScreen';
import {RootState} from '@app/store/store';
import {supabase} from '@app/lib/supabase';
import {setAuthLoading, setUser} from '@app/store/authSlice';
import SignUpScreen from '@app/screens/auth/SignUpScreen';
import ForgotPasswordScreen from '@app/screens/auth/ForgotPasswordScreen';
import ProfileScreen from '@app/screens/main/profile/ProfileScreen';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(setAuthLoading(true));

    if (user) {
      dispatch(setAuthLoading(false));
      return;
    }

    const getUser = async () => {
      try {
        supabase.auth.onAuthStateChange((_event, session) => {
          dispatch(setUser(session));
          dispatch(setAuthLoading(false));
        });
      } catch (error) {
        dispatch(setAuthLoading(false));
      }
    };

    getUser();
  }, [dispatch, user]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Profile"
        screenOptions={{headerShown: false}}>
        {!user ? (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Introduction" component={IntroductionScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
