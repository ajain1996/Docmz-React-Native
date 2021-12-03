import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { windowWidth } from '../utils/utils';
import { useNavigation } from '@react-navigation/native';

export default function DoctorHeader({ showIcon, text }) {

    const navigation = useNavigation();

    return (
        <View style={{
            width: windowWidth, backgroundColor: 'white', flexDirection: 'row',
            alignItems: 'center', height: 52, paddingHorizontal: 20, justifyContent: 'space-between'
        }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity>
                    <Image
                        source={require("../../assets/arrow-back.png")}
                        style={{ width: 12, height: 20, tintColor: '#51B7B7' }}
                    />
                </TouchableOpacity>
                <View style={{ width: showIcon ? "29%" : 20 }} />
                <Text style={{ fontSize: 18, color: showIcon ? "#000" : '#51B7B7' }}>
                    {text}
                </Text>
            </View>
            {showIcon
                ? <TouchableOpacity
                    style={{
                        justifyContent: 'center', alignItems: 'center',
                        width: 25, height: 25, borderWidth: 1,
                        borderColor: 'black', borderRadius: 100,
                    }}
                    onPress={() => {
                        navigation.navigate("ScreenTwo")
                    }}
                >
                    <Image
                        source={require("../../assets/user.png")}
                        style={{ width: 22, height: 22, tintColor: '#000' }}
                    />
                </TouchableOpacity> : <></>}
        </View>
    )
}
