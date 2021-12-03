import React from 'react';
import { Animated, StyleSheet, Image, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { PRIMARY, NEW_HEADER_TEXT } from '../../../styles/colors';
import { Colors } from '../../../styles/colorsV2';

import DmzText from '../../atoms/DmzText/DmzText';

function TopNavBar({
  onLeftButtonPress = () => navigation.goBack(),
  onRightButtonPress = () => navigation.openDrawer(),
  headerText,
  LeftComp,
  RightComp,
  navigation,
  style,
  hideRightComp,
  hideLeftComp,
}) {
  const { theme } = useSelector((state) => state.AuthReducer);
  return (
    <Animated.View
      style={[
        Styles.Container,
        {backgroundColor: Colors.secondary_background[theme],},
        hideLeftComp && hideRightComp ? { justifyContent: 'center' } : null,
        style ? style.Container : null,
      ]}>
      {!hideLeftComp && (
        <TouchableOpacity
          style={Styles.TouchableOpacity}
          onPress={onLeftButtonPress}>
          {!LeftComp ? (
            <Image
              source={require('../../../assets/icons/back.png')}
              style={[Styles.BackButton, style ? style.BackButton : null]}
            />
          ) : (
              // <Iconicons name="chevron-back" size={20} />
              LeftComp
            )}
        </TouchableOpacity>
      )}
      <DmzText
        text={headerText}
        numberOfLines={1}
        // adjustsFontSizeToFit
        style={[
          {
            fontSize: 20,
            color: Colors.primary_text_color[theme],
            //alignSelf: 'center',
            // justifyContent:'center',
            textAlign: 'center',
            fontFamily: 'Montserrat-Medium',
            marginLeft: 24,
          },
          style ? style.Header : null,
        ]}
      />
      {!hideRightComp ? (
        <TouchableOpacity
          style={Styles.TouchableOpacity}
          // onPress={() => onRightButtonPress()}>
          onPress={() => onRightButtonPress()}>
          {!RightComp ? (
            <Image
              source={require('../../../assets/icons/hamburger_menu.png')}
              style={[
                Styles.HamburgerButton,
                style ? style.HamburgerButton : null,
              ]}
            />
          ) : (
              RightComp
            )}
        </TouchableOpacity>
      ) : (
          <View />
        )}
    </Animated.View>
  );
}

const Styles = StyleSheet.create({
  Container: {
    zIndex: 900,
    // marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 5,
    paddingVertical: 2,
    // marginTop: 5,
    
  },
  TouchableOpacity: {
    padding: 10,
    borderRadius: 20,
  },
  BackButton: { height: 19, width: 10 },
  HamburgerButton: { height: 19, width: 24 },
});
export default TopNavBar;
