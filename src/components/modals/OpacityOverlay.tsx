import LoadingButtonIcon from 'components/LoadingAndNotFound/LoadingButtonIcon';
import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';
import Color from 'styles/lofftColorPallet.json';

type OpacityOverlayProps = {
  loadingState: boolean;
  icon?: boolean;
};

const OpacityOverlay = ({loadingState, icon = false}: OpacityOverlayProps) => {
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  console.log('loadingState: ', loadingState);

  useEffect(() => {
    Animated.timing(overlayOpacity, {
      toValue: loadingState ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [loadingState, overlayOpacity]);

  if (!loadingState) {
    return;
  }

  return (
    <Animated.View style={[styles.overlay, {opacity: overlayOpacity}]}>
      {icon && <LoadingButtonIcon size="large" color={Color.Lavendar[100]} />}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Color.White[50],
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
});

export default OpacityOverlay;
