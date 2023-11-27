import React from 'react';
import {Text, Box, Image, Center} from '@gluestack-ui/themed';
import {Swipeable} from 'react-native-gesture-handler';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {useSelector} from 'react-redux';

import Animation from './Animation';
import {firstSplashImage} from '@app/assets/images/splash/splashImages';
import {RootState} from '@app/store/store';

const SplashScreen = ({
  navigation,
}: {
  navigation?: {navigate: (routeName: string) => void};
}) => {
  const {loading} = useSelector((state: RootState) => state.auth);

  const onSwipeableOpen = (direction: string) => {
    if (direction === 'right') {
      navigation?.navigate('Introduction');
    }
  };

  if (loading) {
    return <Animation />;
  }

  return (
    <Swipeable
      renderRightActions={Animation}
      onSwipeableOpen={direction => onSwipeableOpen(direction)}>
      <Box>
        <Box
          position="absolute"
          w="$full"
          h="$full"
          bg="#FFF2E9"
          opacity={0.4}
          zIndex={1}
        />
        <Center position="absolute" w="$full" top="$1/4" zIndex={2}>
          <Animated.View entering={FadeInDown.duration(700)}>
            <Text
              fontSize="$5xl"
              textAlign="center"
              fontFamily="Klasik-Regular"
              lineHeight="$4xl"
              color="#573353">
              WELCOME TO Monumental habits
            </Text>
          </Animated.View>
          <Animated.View entering={FadeInDown.duration(900)}>
            <Text
              mt="$5"
              fontSize="$xl"
              textAlign="center"
              fontFamily="Klasik-Regular"
              lineHeight="$4xl"
              color="#573353">
              SWIPE TO START BUILDING HABITS
            </Text>
          </Animated.View>
        </Center>
        <Image
          w="$full"
          h="$full"
          aspectRatio={1}
          source={firstSplashImage}
          alt="Monumental"
        />
      </Box>
    </Swipeable>
  );
};

export default SplashScreen;
