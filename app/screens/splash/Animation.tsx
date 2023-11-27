import React from 'react';

import LottieView from 'lottie-react-native';
import {Box} from '@gluestack-ui/themed';

const Animation = () => {
  return (
    <Box w="$full" h="$full">
      <LottieView
        style={{flex: 1}}
        source={require('./animationJson.json')}
        autoPlay
        loop
      />
    </Box>
  );
};

export default Animation;
