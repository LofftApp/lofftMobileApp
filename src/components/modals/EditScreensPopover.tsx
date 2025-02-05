import React from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import PopoverContent from './PopoverContent';
import Popover, {
  PopoverMode,
  PopoverPlacement,
} from 'react-native-popover-view';
import Color from 'styleSheets/lofftColorPallet.json';
import {size} from 'react-native-responsive-sizes';

type EditScreensPopoverProps = {
  showPopover: boolean;
  setShowPopover: (value: boolean) => void;
};

const EditScreensPopover = ({
  showPopover,
  setShowPopover,
}: EditScreensPopoverProps) => {
  const {width, height} = useWindowDimensions();
  return (
    <Popover
      mode={PopoverMode.RN_MODAL}
      popoverStyle={[
        styles.popoverContainer,
        {width: width * 0.95, height: height * 0.15},
      ]}
      isVisible={showPopover}
      placement={PopoverPlacement.TOP}
      arrowSize={{width: 0, height: 0}}
      onRequestClose={() => setShowPopover(false)}>
      <PopoverContent
        text1="You have unsaved changes"
        icon1="info-circle"
        text2="To keep the changes, click on Continue and then Save."
        setShowPopover={setShowPopover}
        button
      />
    </Popover>
  );
};

const styles = StyleSheet.create({
  popoverContainer: {
    backgroundColor: Color.Mint[20],
    paddingHorizontal: size(10),
    borderRadius: 12,
    borderColor: Color.Mint[20],

    flexDirection: 'row',
    alignItems: 'center',
  },
  popoverContent: {
    flex: 1,
    paddingHorizontal: size(8),
    justifyContent: 'center',
    gap: size(10),
  },
});

export default EditScreensPopover;
