import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import Carousel, {TCarouselProps} from 'react-native-reanimated-carousel';
import {Box, Button, HStack, Image, Text} from '@gluestack-ui/themed';
import Animated, {FadeInDown} from 'react-native-reanimated';

import {slidesData} from './slidesData';

const IntroductionScreen = ({
  navigation,
}: {
  navigation?: {navigate: (routeName: string) => void};
}) => {
  const width = Dimensions.get('window').width;
  const carouselRef = useRef<any>(null);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const backButtonHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation?.navigate('Introduction');

        return true;
      },
    );

    return () => {
      backButtonHandler.remove();
    };
  }, [navigation]);

  const handlePressNext = () => {
    if (!carouselRef.current) return;

    carouselRef.current.scrollTo({index: currentSlide + 1});
    setCurrentSlide(currentSlide + 1);
  };

  return (
    <Box bg="#fff" flex={1} justifyContent="center">
      <Carousel
        ref={carouselRef}
        loop={false}
        width={width}
        height={448}
        data={slidesData}
        scrollAnimationDuration={100}
        onSnapToItem={index => setCurrentSlide(index)}
        renderItem={({item}) => (
          <Box p="$10">
            <Animated.View entering={FadeInDown.duration(700)}>
              <Text
                fontSize="$3xl"
                textAlign="center"
                fontFamily="Klasik-Regular"
                lineHeight="$2xl"
                color="#573353">
                {item.heading}
              </Text>
            </Animated.View>
            <Animated.View entering={FadeInDown.duration(800)}>
              <Image
                h="$96"
                aspectRatio={1}
                source={item.imageUrl}
                alt="Monumental"
                resizeMode="contain"
              />
            </Animated.View>
          </Box>
        )}
      />
      <Box p="$10">
        <Animated.View entering={FadeInDown.duration(1000)}>
          <Text
            fontSize="$md"
            textAlign="center"
            lineHeight="$xl"
            textTransform="uppercase"
            fontFamily="Manrope-Bold"
            color="#573353">
            We can{' '}
            <Text
              color="#FC9D45"
              fontFamily="Manrope-Bold"
              fontSize="$md"
              lineHeight="$xl">
              help you{' '}
            </Text>
            to be a better version of{' '}
            <Text
              color="#FC9D45"
              fontFamily="Manrope-Bold"
              fontSize="$md"
              lineHeight="$xl">
              yourself.
            </Text>
          </Text>
          <HStack>
            {currentSlide === 3 ? (
              <Button
                bg="#FC9D45"
                w="$full"
                mt="$10"
                py="$4"
                h="$16"
                borderRadius="$lg"
                onPress={() => navigation?.navigate('Login')}>
                <Text fontSize="$xl" fontFamily="Manrope-Bold" color="#573353">
                  Get Started
                </Text>
              </Button>
            ) : (
              <HStack justifyContent="space-between" w="$full" mt="$5">
                <TouchableOpacity onPress={() => navigation?.navigate('Login')}>
                  <Text
                    fontSize="$xl"
                    textAlign="center"
                    fontFamily="Manrope-Bold"
                    color="#573353">
                    Skip
                  </Text>
                </TouchableOpacity>
                <HStack gap="$1">
                  {[...new Array(4).keys()].map((_, i) => (
                    <Box
                      key={i}
                      bgColor={i === currentSlide ? '#573353' : '#F9B566'}
                      w="$4"
                      h="$4"
                      borderRadius="$full"
                    />
                  ))}
                </HStack>
                <TouchableOpacity onPress={handlePressNext}>
                  <Text
                    fontSize="$xl"
                    textAlign="center"
                    fontFamily="Manrope-Bold"
                    color="#573353">
                    Next
                  </Text>
                </TouchableOpacity>
              </HStack>
            )}
          </HStack>
        </Animated.View>
      </Box>
    </Box>
  );
};

export default IntroductionScreen;

const styles = StyleSheet.create({});
