import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Card } from "react-native-paper";
import { Colors } from '../../utils/Colors';
import { windowWidth } from '../../utils/utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import CustomTextComponent from '../../components/CustomTextComponent';
import AwesomeButton from "react-native-really-awesome-button";
import DoctorSearch from './DoctorSearch';
import DoctorHeader from '../../components/DoctorHeader';

export default function DoctorHome() {
    const navigation = useNavigation();
    return (
        <>
            <ScrollView style={{ backgroundColor: 'white', paddingTop: 10 }}>
                <DoctorHeader showIcon={false} text="Doctor's for 'Bad Stomach'" />
                <View style={{ paddingHorizontal: 16 }}>
                    <DoctorSearch onPress={() => { navigation.navigate("DoctorSearchScreen") }} />
                    {
                        [1, 2, 3, 4, 5, 6].map((data, index) => {
                            return (
                                <View key={index}>
                                    <BuildCustomCardComponent
                                        navigation={navigation}
                                        drName="Dr. Co Ekaterine"
                                        drInfo="Dynaecologist | MBBS, NBD"
                                        image='https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                                        desc="English, Hindi, Gujarati, Maharathi"
                                    />
                                </View>
                            );
                        })
                    }
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <AwesomeButton width={windowWidth - 10} height={58}
                        backgroundColor={"#EFA860"} justifyContent='center' alignItems='center'
                        backgroundShadow={"#fff"} activeOpacity={0.5} backgroundDarker="#fff"
                        onPress={() => { navigation.navigate("DoctorProfileScreen") }}
                    >
                        <Text style={{ fontSize: 18, color: 'white' }}>Book Appointment</Text>
                    </AwesomeButton>
                </View>
                <Text />
            </ScrollView>

        </>
    )
}

const BuildCardButtonComponent = ({ image, text }) => {
    return (
        <TouchableOpacity style={styles.button_shadow}>
            <Image
                source={image}
                style={{ width: 18, height: 18, tintColor: '#3387d2' }}
            />
            <Text style={{ fontSize: 12, color: 'black', marginLeft: 4 }}>{text}</Text>
        </TouchableOpacity>
    );
}

const BuildCustomCardComponent = ({ navigation, drName, drInfo, desc, rating, image }) => {
    return (
        <Card style={{ elevation: 10, marginVertical: 16, shadowColor: "silver", paddingBottom: 10 }}>
            <View style={styles.shadow}>
                <View>
                    <Image
                        source={{ uri: image }}
                        style={{ width: 75, height: 75, borderRadius: 100 }}
                    />
                    <Card style={{
                        width: 14, height: 14, backgroundColor: '#51B7B7',
                        borderRadius: 100, position: 'absolute',
                        right: 0, top: 54, borderWidth: 2, borderColor: 'white',
                        elevation: 4, shadowColor: '#999'
                    }} />
                </View>
                <View style={{ flexDirection: 'column', width: windowWidth - 148 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <CustomTextComponent
                            text={drName} fs={16} fw={"bold"} textColor={Colors.BLACK}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                            <Image
                                source={require("../../../assets/star.png")}
                                style={{ width: 20, height: 20 }}
                            />
                            <CustomTextComponent
                                text={rating} fs={16} fw={"bold"} textColor={Colors.BLACK}
                            />
                            <View style={{ width: 12 }} />
                            <Image
                                source={require("../../../assets/heart.png")}
                                style={{ width: 22, height: 22, tintColor: Colors.SILVER }}
                            />
                        </View>
                    </View>
                    <CustomTextComponent
                        text={drInfo} fs={14} fw={"300"} textColor={Colors.BLACK}
                    />
                    <View style={{ height: 8 }} />

                    <View style={{ flexDirection: 'row', marginVertical: 4 }}>
                        <BuildCardButtonComponent
                            image={require("../../../assets/user.png")}
                            text={"8 Years"}
                        />
                        <View style={{ width: 12 }} />
                        <BuildCardButtonComponent
                            image={require("../../../assets/location.png")}
                            text={"Ahmedabad, IN"}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 6 }}>
                        <Image
                            source={require('../../../assets/globe.png')}
                            style={{
                                width: 16, height: 16, tintColor: "#51B7B7",
                                marginRight: 4,
                            }}
                        />
                        <CustomTextComponent
                            text={"Speaks: "} fs={13} fw={"bold"} textColor={Colors.BLACK}
                        />
                        <CustomTextComponent
                            text={desc} fs={13} fw={"normal"} textColor={"silver"}
                        />
                    </View>
                </View>
            </View>
            <View style={{ alignItems: 'center' }}>
                <View style={{
                    width: windowWidth - 70, backgroundColor: '#eee', height: 1.3,
                    marginTop: -8,
                }} />
            </View>
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between',
                alignItems: 'center', marginTop: 8, paddingHorizontal: 20,
            }}>
                <Text style={{ fontSize: 26, color: 'black', fontWeight: '600' }}>₹ 700</Text>
                <AwesomeButton width={160} height={50} borderRadius={100} backgroundColor={Colors.BLUE2}
                    backgroundShadow={"#368edd"} activeOpacity={0.5} backgroundDarker={"#3d7fba"}
                    onPress={() => { navigation.navigate("DoctorProfileScreen") }}
                >
                    <Text style={{ fontSize: 16, color: 'white', marginLeft: 4 }}>Book Appointment</Text>
                </AwesomeButton>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    shadow: {
        flexDirection: 'row', justifyContent: 'space-between',
        marginVertical: 20,
        width: windowWidth - 32,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    button_shadow: {
        flexDirection: 'row',
        shadowColor: "#999999",
        shadowOpacity: 0.1,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
        elevation: 4,
        borderRadius: 30,
        backgroundColor: 'white',
        paddingHorizontal: 12,
        paddingVertical: 6
    },
    button_bookAppointment: {
        flexDirection: 'row',
        shadowColor: "#000000",
        shadowOpacity: 0.1,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
        elevation: 12,
        borderRadius: 30,
        backgroundColor: '#3893e4',
        paddingHorizontal: 16,
        paddingVertical: 12
    }
});
