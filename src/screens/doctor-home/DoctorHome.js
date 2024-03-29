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
import DmzButton from '../../components/atoms/SwitchButton/SwitchButton';

export default function DoctorHome() {
    const navigation = useNavigation();
    return (
        <>
            <ScrollView style={{ backgroundColor: 'white', paddingTop: 10, paddingBottom: 70 }}>
                <DoctorHeader showIcon={false} text="Doctor's for 'Bad Stomach'" />
                <View style={{ paddingHorizontal: 16 }}>
                    <DoctorSearch onPress={() => { navigation.navigate("DoctorSearchScreen") }} />
                    <View style={{ height: 8 }} />
                    {
                        [1, 2, 3, 4, 5, 6].map((data, index) => {
                            return (
                                <View key={index}>
                                    <BuildCustomCardComponent
                                        navigation={navigation}
                                        drName="Dr. Co Ekaterine"
                                        drInfo="Dynaecologist | MBBS, NBD"
                                        rating="4.5"
                                        image='https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                                        desc="English, Hindi, Gujarati, Maharathi"
                                    />
                                </View>
                            );
                        })
                    }
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {/* <DmzButton
                        text="Book Appointment"
                        style={{
                            Container: {
                                width: '95%',
                                alignSelf: 'center',
                                backgroundColor: Colors.ORANGE,
                                borderRadius: 2,
                                height: 54
                            },
                            Text: {
                                fontSize: 16,
                                color: '#fff',
                                fontWeight: 'normal'
                            },
                        }}
                    /> */}
                    {/* <AwesomeButton width={windowWidth - 10} height={58}
                        backgroundColor={"#EFA860"} justifyContent='center' alignItems='center'
                        backgroundShadow={"#fff"} activeOpacity={0.5} backgroundDarker="#fff"
                        onPress={() => { navigation.navigate("DoctorProfileScreen") }}
                    >
                        <Text style={{ fontSize: 18, color: 'white', fontFamily: 'Montserrat-Regular', }}>
                            Book Appointment
                        </Text>
                    </AwesomeButton> */}
                </View>
                <View style={{ height: 64 }} />
            </ScrollView>

        </>
    )
}

const BuildCardButtonComponent = ({ image, text }) => {
    return (
        <TouchableOpacity style={styles.button_shadow}>
            <Image
                source={image}
                style={{ width: 16, height: 16, tintColor: '#FF0000' }}
            />
            <Text style={{ fontSize: 11, color: 'black', marginLeft: 4, fontFamily: 'Montserrat-Regular', }}>
                {text}
            </Text>
        </TouchableOpacity>
    );
}

const BuildCustomCardComponent = ({ navigation, drName, drInfo, desc, rating, image }) => {
    return (
        <Card style={{ elevation: 4, marginVertical: 8, shadowColor: "#999", paddingBottom: 10 }}>
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
                        <View style={{ width: '68%' }}>
                            <CustomTextComponent
                                text={drName} fs={16} fw={"bold"} textColor={Colors.BLACK}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                            <Image
                                source={require("../../../assets/star.png")}
                                style={{ width: 20, height: 20 }}
                            />
                            <View style={{ width: 8 }} />
                            <CustomTextComponent
                                text={rating} fs={16} fw={"bold"} textColor={Colors.BLACK}
                            />
                            <View style={{ width: 8 }} />
                            <Image
                                source={require("../../../assets/heart.png")}
                                style={{ width: 22, height: 22, tintColor: Colors.SILVER }}
                            />
                        </View>
                    </View>
                    <CustomTextComponent
                        text={drInfo} fs={13} fw={"300"} textColor={Colors.gray}
                    />
                    <View style={{ height: 8 }} />

                    <View style={{ flexDirection: 'row', marginVertical: 4 }}>
                        <View style={{ width: '50%' }}>
                            <BuildCardButtonComponent
                                image={require("../../../assets/location.png")}
                                text={"Ahmedabad, IN"}
                            />
                        </View>
                        <View style={{ width: 6 }} />
                        <View style={{ width: '28%' }}>
                            <BuildCardButtonComponent
                                image={require("../../../assets/user.png")}
                                text={"8 Years"}
                            />
                        </View>
                    </View>
                    <View style={{ height: 8 }} />

                    <View style={{ flexDirection: 'row', marginVertical: 4 }}>
                        <View style={{ width: '47%' }}>
                            <BuildDoctorAvailibility
                                text="Available in 48  min"
                            />
                        </View>
                        <View style={{ width: 6 }} />
                        <View style={{ width: '52%' }}>
                            <BuildDoctorAvailibility
                                text="Treated 800+ patients"
                            />
                        </View>
                    </View>
                    {/* <View style={{ height: 8 }} /> */}

                    {/* <View style={{ flexDirection: 'row', alignItems: "flex-start", width: "80%" }}>
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
                            text={desc} fs={12.5} fw={"normal"} textColor={"silver"}
                        />
                    </View> */}
                    {/* <View style={{ height: 5 }} /> */}
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
                <CustomTextComponent
                    text="₹ 700" fs={22} fw="600"
                    textColor={"black"}
                />
                <DmzButton
                    text="Book Appointment"
                    style={{
                        Container: {
                            width: '50%',
                            alignSelf: 'center',
                            backgroundColor: Colors.BLUE2,
                            borderRadius: 30,
                            height: 42,
                        },
                        Text: {
                            fontSize: 16,
                            color: '#fff',
                            fontWeight: 'normal'
                        },
                    }}
                    onPress={() => { navigation.navigate("DoctorProfileScreen") }}
                />
                {/* <AwesomeButton width={180} height={48} borderRadius={100} backgroundColor={Colors.BLUE2}
                    backgroundShadow={"#368edd"} activeOpacity={0.5} backgroundDarker={"#3d7fba"}
                    onPress={() => {  }}
                >
                    <Text style={{
                        fontSize: 15, color: 'white', marginLeft: 4, fontFamily: 'Montserrat-Regular',
                    }}>
                        Book Appointment
                    </Text>
                </AwesomeButton> */}
            </View>
        </Card>
    );
}

const BuildDoctorAvailibility = ({ text }) => {
    return (
        <View style={{ paddingHorizontal: 6, paddingVertical: 6, backgroundColor: '#f7f8f9', borderRadius: 6 }}>
            <Text style={{ fontSize: 11, fontFamily: 'Montserrat-Regular', fontWeight: '800' }}>{text}</Text>
        </View>
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
        borderRadius: 6,
        backgroundColor: '#f7f8f9',
        paddingHorizontal: 6,
        paddingVertical: 5,
        alignItems: 'center',
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
