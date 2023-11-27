import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Box, Center, HStack, Image, Text} from '@gluestack-ui/themed';

import Layout from '@app/layout/Layout';
import {SvgUri} from 'react-native-svg';

const ProfileScreen = ({
  navigation,
  route,
}: {
  navigation?: {navigate: (routeName: string) => void};
  route?: {name: string};
}) => {
  return (
    <Layout navigation={navigation} route={route}>
      <Box h="$full" bg="#FFF3E9" p="$5">
        <HStack justifyContent="space-between">
          <TouchableOpacity>
            <Center overflow="hidden">
              <SvgUri uri="https://lsyzogojqjdbyncurpza.supabase.co/storage/v1/object/public/App-Images/Back%20Icon.svg" />
            </Center>
          </TouchableOpacity>
          <Text fontFamily="Manrope-Bold" color="#573353" fontSize="$lg">
            Profile
          </Text>
          <TouchableOpacity>
            <Center overflow="hidden">
              <SvgUri uri="https://lsyzogojqjdbyncurpza.supabase.co/storage/v1/object/public/App-Images/Edit.svg" />
            </Center>
          </TouchableOpacity>
        </HStack>
        <Box bg="#fff" mt="$6" p="$5" borderRadius="$lg">
          <HStack>
            <SvgUri uri="https://lsyzogojqjdbyncurpza.supabase.co/storage/v1/object/public/App-Images/profile.svg" />
            <Box>
              <Text color="#573353" fontSize="$lg" fontFamily="Manrope-Bold">
                Marilyn Aminoff
              </Text>
              <Text color="#573353" fontSize="$sm" fontFamily="Manrope-Medium">
                Name
              </Text>
            </Box>
          </HStack>
          <Text>This week</Text>
          <Box>
            <Text>Total work hours</Text>
            <Text>18</Text>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
