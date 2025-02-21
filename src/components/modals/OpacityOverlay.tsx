import LoadingButtonIcon from 'components/LoadingAndNotFound/LoadingButtonIcon';
import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import Color from 'styles/lofftColorPallet.json';

type OpacityOverlayProps = {
  loadingState: boolean;
  icon?: boolean;
};

const OpacityOverlay = ({loadingState, icon = false}: OpacityOverlayProps) => {
  const overlayOpacity = React.useMemo(
    () => new Animated.Value(loadingState ? 1 : 0),
    [loadingState],
  );

  React.useEffect(() => {
    Animated.timing(overlayOpacity, {
      toValue: loadingState ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [loadingState, overlayOpacity]);

  return (
    <Animated.View style={[styles.overlay, {opacity: overlayOpacity}]}>
      {icon && <LoadingButtonIcon size="large" color={Color.Lavendar[100]} />}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Color.White[50], // Semi-transparent black
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OpacityOverlay;
