import React from 'react';
import {StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {Provider} from 'react-redux';
import Toast, {BaseToast, BaseToastProps} from 'react-native-toast-message';

import Routes from './routes/Routes';
import {store} from './store/store';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <GluestackUIProvider config={config}>
        <Provider store={store}>
          <Routes />
        </Provider>
        <Toast config={toastConfig} />
      </GluestackUIProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const toastConfig = {
  error: ({...rest}: BaseToastProps) => (
    <BaseToast
      {...rest}
      style={styles.errorBorderColor}
      contentContainerStyle={styles.padding}
      text1Style={styles.errorText1}
      text2Style={styles.text2}
    />
  ),
  success: ({...rest}: BaseToastProps) => (
    <BaseToast
      {...rest}
      style={styles.successBorderColor}
      contentContainerStyle={styles.padding}
      text1Style={styles.successText1}
      text2Style={styles.text2}
    />
  ),
  info: ({...rest}: BaseToastProps) => (
    <BaseToast
      {...rest}
      style={styles.infoBorderColor}
      contentContainerStyle={styles.padding}
      text1Style={styles.infoText1}
      text2Style={styles.text2}
    />
  ),
};

const styles = StyleSheet.create({
  container: {flex: 1},

  errorText1: {color: '#d44000', fontSize: 16},

  errorBorderColor: {borderLeftColor: '#d44000'},

  successText1: {color: '#79AC78', fontSize: 16},

  successBorderColor: {borderLeftColor: '#79AC78'},

  infoText1: {color: '#FDA758', fontSize: 16},

  infoBorderColor: {borderLeftColor: '#FDA758'},

  padding: {paddingHorizontal: 15},

  text2: {fontSize: 14},
});
