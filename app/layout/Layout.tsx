import React from 'react';
import {ScrollView} from '@gluestack-ui/themed';
import {StyleSheet} from 'react-native';
import Footer from './Footer';

const Layout = ({
  children,
  navigation,
  route,
}: {
  children: React.ReactElement;
  navigation?: {navigate: (routeName: string) => void};
  route?: {name: string};
}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {children}
      <Footer navigation={navigation} route={route} />
    </ScrollView>
  );
};

export default Layout;

const styles = StyleSheet.create({container: {flexGrow: 1}});
