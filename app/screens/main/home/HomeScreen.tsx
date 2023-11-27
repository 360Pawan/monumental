import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Box, Text} from '@gluestack-ui/themed';

import {supabase} from '@app/lib/supabase';
import Layout from '@app/layout/Layout';

const HomeScreen = ({
  navigation,
  route,
}: {
  navigation?: {navigate: (routeName: string) => void};
  route?: {name: string};
}) => {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Layout navigation={navigation} route={route}>
      <Box>
        <Text>HomeScreen</Text>
        <TouchableOpacity onPress={handleSignOut}>
          <Text>Signout</Text>
        </TouchableOpacity>
      </Box>
    </Layout>
  );
};

export default HomeScreen;
