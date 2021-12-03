import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-paper";
import { Colors } from "../utils/Colors";
import { windowWidth } from "../utils/utils";
import CustomTextComponent from "./CustomTextComponent";

export const BuildIntroductionComponent = ({ image, isOnline, name, info, location, time }) => {
    return (
        <View style={styles.container}>
            <View>
                <Image
                    source={{ uri: image }}
                    style={{ width: 100, height: 100, borderRadius: 100 }}
                />
                <Card style={styles.activeGreenBtn} />
            </View>
            <View style={{ flexDirection: 'column', width: windowWidth - 162, marginLeft: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <CustomTextComponent
                        text={name} fs={20} fw={"600"} textColor={Colors.BLACK}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Image
                            source={require("../../assets/heart-fill.png")}
                            style={{ width: 20, height: 20, tintColor: "#ff0000" }}
                        />
                        <View style={{ width: 10 }} />
                        <Image
                            source={require("../../assets/share.png")}
                            style={{ width: 22, height: 22 }}
                        />
                    </View>
                </View>
                <CustomTextComponent
                    text={info} fs={15} fw={"300"} textColor={Colors.BLACK}
                />
                <View style={{ height: 4 }} />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 6 }}>
                    <Image
                        source={require('../../assets/location.png')}
                        style={{
                            width: 20, height: 20, tintColor: "#51B7B7",
                            marginRight: 4, marginLeft: -4,
                        }}
                    />
                    <CustomTextComponent
                        text={`Location: ${location}`} fs={13} fw={"300"} textColor={Colors.BLACK}
                    />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 6 }}>
                    <Image
                        source={require('../../assets/clock.png')}
                        style={{
                            width: 13, height: 13, tintColor: "#51B7B7",
                            marginRight: 8,
                        }}
                    />
                    <CustomTextComponent
                        text={"Available Time: "} fs={13} fw={"300"} textColor={Colors.BLACK}
                    />
                    <CustomTextComponent
                        text={time} fs={13} fw={"300"} textColor={"#51B7B7"}
                    />
                </View>
            </View>
        </View>
    );
}


export const BuildPersonalInfoComponent = ({ text1, image1, text2, image2, text3, image3 }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <PersonalInfoCardComponent
                image={image1} text={text1} title="Patients"
            />

            <PersonalInfoCardComponent
                image={image2} text={text2} title="Experience"
            />

            <PersonalInfoCardComponent
                image={image3} text={text3} title="Rating"
            />
        </View>
    );
}


export const PersonalInfoCardComponent = ({ title, text, image }) => {
    return (
        <Card style={{
            flexDirection: 'column', elevation: 4, shadowColor: 'silver', height: 75,
            paddingHorizontal: 16, paddingTop: 11, width: windowWidth / 3 - 25,
            justifyContent: 'center', alignItems: 'center', borderRadius: 14
        }}>
            <CustomTextComponent
                text={title} fs={14} fw={"300"} textColor={"grey"} textAign={"center"}
            />
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                <Image
                    source={image}
                    style={{ width: 20, height: 20, marginRight: 6, tintColor: Colors.BLUE2 }}
                />
                <CustomTextComponent
                    text={text} fs={16} fw={"600"} textColor={"black"}
                />
            </View>
        </Card>
    );
}


export const BuildTabCardComponent = ({ showTab, onPress, text, selectedVal }) => {
    return (
        <Card style={{
            elevation: showTab === selectedVal ? 5 : 0,
            shadowColor: '#999', paddingHorizontal: 20, paddingVertical: 12,
        }}>
            <TouchableOpacity activeOpacity={0.5} style={{
                flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'
            }} onPress={() => onPress()}>
                <CustomTextComponent
                    text={text} fs={14} fw={"300"} textColor={Colors.BLUE}
                />
                <View style={{ marginRight: 20 }} />
                <Image
                    source={require("../../assets/arrow-down.png")}
                    style={{ width: 15, height: 15, tintColor: Colors.BLUE }}
                />
            </TouchableOpacity>
        </Card>
    );
}


export const BuildTimeSlotsComponent = ({ text1, text2, selectedVal, onPress, showTimeTab }) => {
    return (
        <TouchableOpacity style={{
            flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 8,
            borderBottomWidth: showTimeTab === selectedVal ? 3 : 0,
            borderBottomColor: Colors.BLUE, paddingBottom: 4
        }} onPress={() => onPress()}>
            <CustomTextComponent
                text={text1} fs={12.5} fw={"600"} textColor={"black"}
            />
            <View style={{ marginRight: 6 }} />
            <CustomTextComponent
                text={text2} fs={12.5} fw={"600"} textColor={Colors.BLUE}
            />
        </TouchableOpacity>
    );
}


export const BuildSlotsTabComponent = ({ text, onPress, isSelected }) => {
    return (
        <TouchableOpacity style={{
            width: '30%', height: 50, justifyContent: 'center', alignItems: 'center',
            backgroundColor: isSelected ? Colors.BLUE2 : Colors.WHITE,
            borderRadius: 12, elevation: 6, shadowColor: '#999',
        }} onPress={() => onPress()}>
            <CustomTextComponent
                text={text} fs={16} fw={"normal"} textColor={isSelected ? "white" : Colors.LIGHTGRAY}
            />
        </TouchableOpacity>
    );
}


export const OverviewTabBlock = ({ text, onPress, selectedVal, showTab }) => {
    return (
        <Card style={{
            elevation: selectedVal === showTab ? 5 : 0,
            shadowColor: '#999', width: "33.3%", paddingVertical: 11,
            backgroundColor: selectedVal === showTab ? '#fff' : '#f7f8f9',
        }}>
            <TouchableOpacity onPress={() => onPress()}>
                <CustomTextComponent
                    text={text} fs={16} fw={"normal"} textColor={Colors.BLUE} textAign="center"
                />
                <View style={{ marginRight: 20 }} />
            </TouchableOpacity>
        </Card>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', marginVertical: 20,
        paddingHorizontal: 16, borderRadius: 8,
        justifyContent: 'space-between',
        width: windowWidth - 32,
        backgroundColor: 'white'
    },
    activeGreenBtn: {
        width: 14, height: 14,
        backgroundColor: '#51B7B7',
        borderRadius: 100, right: 5,
        position: 'absolute',
        bottom: 22, borderWidth: 2,
        borderColor: 'white',
        elevation: 4, shadowColor: '#999',
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
        paddingHorizontal: 32,
        paddingVertical: 18
    }
});

