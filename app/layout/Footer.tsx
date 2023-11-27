import React from 'react';
import {SvgUri} from 'react-native-svg';
import {Box, Center, HStack, Image} from '@gluestack-ui/themed';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';

import {
  communityGrayscaleImage,
  courseGrayscaleImage,
  footerBgImage,
  homeGrayscaleImage,
  settingGrayscaleImage,
} from '@app/assets/images/layout/layoutImages';

const Footer = ({
  navigation,
  route,
}: {
  navigation?: {navigate: (routeName: string) => void};
  route?: {name: string};
}) => {
  return (
    <Box position="absolute" zIndex={1} bottom="$0" left="$0" right="$0">
      <Center position="absolute" right="40%" top="-$1/2" zIndex={2} w="20%">
        <TouchableOpacity>
          <Center
            bg="#FC9D45"
            w="$12"
            h="$12"
            borderRadius="$full"
            style={{
              shadowColor: '#fc9d45',
              shadowOffset: {
                width: 0,
                height: 6,
              },
              shadowOpacity: 0.21,
              shadowRadius: 6.65,
              elevation: 9,
            }}>
            <SvgUri uri="https://lsyzogojqjdbyncurpza.supabase.co/storage/v1/object/public/App-Images/plus.svg" />
          </Center>
        </TouchableOpacity>
      </Center>
      <ImageBackground source={footerBgImage} style={{padding: 15}}>
        <HStack justifyContent="space-between" alignItems="center">
          <HStack w="$1/3" justifyContent="space-between" alignItems="center">
            <TouchableOpacity onPress={() => navigation?.navigate('Home')}>
              <Center overflow="hidden" h="$10" w="$10">
                {route?.name === 'Home' ? (
                  <SvgUri uri="https://lsyzogojqjdbyncurpza.supabase.co/storage/v1/object/public/App-Images/home.svg" />
                ) : (
                  <Image
                    source={homeGrayscaleImage}
                    alt="Home"
                    resizeMode="contain"
                  />
                )}
              </Center>
            </TouchableOpacity>
            <TouchableOpacity>
              <Center overflow="hidden" h="$10" w="$10">
                {/* <SvgUri uri="https://lsyzogojqjdbyncurpza.supabase.co/storage/v1/object/public/App-Images/Courses.svg" /> */}
                <Image
                  source={courseGrayscaleImage}
                  alt="Home"
                  resizeMode="contain"
                />
              </Center>
            </TouchableOpacity>
          </HStack>
          <HStack w="$1/3" justifyContent="space-between" alignItems="center">
            <TouchableOpacity>
              <Center overflow="hidden" h="$10" w="$10">
                {/* <SvgUri uri="https://lsyzogojqjdbyncurpza.supabase.co/storage/v1/object/public/App-Images/Community.svg" /> */}
                <Image
                  source={communityGrayscaleImage}
                  alt="Home"
                  resizeMode="contain"
                />
              </Center>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation?.navigate('Profile')}>
              <Center overflow="hidden" h="$10" w="$10">
                {route?.name === 'Profile' ? (
                  <SvgUri uri="https://lsyzogojqjdbyncurpza.supabase.co/storage/v1/object/public/App-Images/Settings.svg" />
                ) : (
                  <Image
                    source={settingGrayscaleImage}
                    alt="Home"
                    resizeMode="contain"
                  />
                )}
              </Center>
            </TouchableOpacity>
          </HStack>
        </HStack>
      </ImageBackground>
    </Box>
  );
};

export default Footer;

const styles = StyleSheet.create({});
