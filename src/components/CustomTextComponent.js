import React from 'react';
import { View, Text } from 'react-native';
import { windowWidth } from '../utils/utils';

export default function CustomTextComponent({ text, fs, fw, textColor, textAign, lineHeight }) {
    var fsn = 0;
    if (windowWidth < 380) {
        fsn = fs - 2;
    } else {
        fsn = fs;
    }
    return (
        <Text style={{
            fontSize: fsn, fontWeight: fw, color: textColor,
            textAlign: textAign, lineHeight: lineHeight,
        }}>
            {text}
        </Text>
    );
}
