import React from 'react';
import { View, Text, Image } from 'react-native';
import { Card } from 'react-native-paper';
import CustomTextComponent from '../../../components/CustomTextComponent';
import { Colors } from '../../../utils/Colors';

export const OverviewTabComponent = ({ image, title, info, image2, showMoreText }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <BuildOverviewTabIcon
                image={image}
            />
            <View style={{ width: 20 }} />
            <View style={{ width: "80%" }}>
                <CustomTextComponent
                    text={title} fs={16} fw={"700"} textColor={"#000"} lineHeight={20}
                />
                <View style={{ marginTop: 8 }} />
                {image2 ? <View style={{}}>
                    <Card style={{
                        elevation: 2, shadowColor: '#999', borderRadius: 100, height: 70,
                        justifyContent: 'center', alignItems: 'center', width: 70,
                    }}>
                        <View style={{
                            backgroundColor: '#fff', justifyContent: 'center',
                            alignItems: 'center', borderRadius: 100,
                            width: 70, height: 70,
                        }}>
                            <Image
                                source={image2}
                                style={{ width: 40, height: 40, tintColor: Colors.GREEN }}
                            />
                        </View>
                    </Card>
                </View> : <></>}
                {image2 ? <View style={{ marginTop: 10 }} /> : <></>}
                <View style={{}}>
                    <CustomTextComponent
                        text={info} fs={14} fw={"600"} textColor={"#000"} lineHeight={20}
                    />
                    {showMoreText ? <View style={{ position: 'absolute', bottom: 2, left: 100 }}>
                        <CustomTextComponent
                            text={"Show More"} fs={12} fw={"500"} textColor={Colors.red}
                        />
                    </View> : <></>}
                </View>
            </View>
        </View>
    )
}

const BuildOverviewTabIcon = ({ image }) => {
    return (
        <View style={{}}>
            <Card style={{
                elevation: 4, shadowColor: '#999', borderRadius: 100,
                justifyContent: 'center', alignItems: 'center'
            }}>
                <View style={{
                    backgroundColor: '#fff', justifyContent: 'center',
                    alignItems: 'center', borderRadius: 100,
                    width: 36, height: 36,
                }}>
                    <Image
                        source={image}
                        style={{ width: 22, height: 22, tintColor: Colors.GREEN }}
                    />
                </View>
            </Card>
        </View>
    );
}


export const OverviewTabExperience = ({ image, title, year1, year2 }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <BuildOverviewTabIcon
                image={image}
            />
            <View style={{ width: 20 }} />
            <View style={{ width: "85%" }}>
                <CustomTextComponent
                    text={title} fs={16} fw={"700"} textColor={"#000"}
                />
                <View style={{ marginTop: 8 }} />
                <CustomTextComponent
                    text={"2003 - 2004"} fs={14} fw={"600"} textColor={"#000"}
                />
                <View style={{ marginTop: 4 }} />
                <CustomTextComponent
                    text={year1} fs={12} fw={"400"} textColor={Colors.black}
                />
                <View style={{ marginTop: 6 }} />
                <CustomTextComponent
                    text={"2004 - Present"} fs={14} fw={"600"} textColor={"#000"}
                />
                <View style={{ marginTop: 4 }} />
                <CustomTextComponent
                    text={year2} fs={12} fw={"400"} textColor={Colors.black}
                />
            </View>
        </View>
    )
}


export const OverviewTabEducation = ({ image, title, education1, education2 }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <BuildOverviewTabIcon
                image={image}
            />
            <View style={{ width: 20 }} />
            <View style={{ width: "85%" }}>
                <CustomTextComponent
                    text={title} fs={16} fw={"700"} textColor={"#000"}
                />
                <View style={{ marginTop: 8 }} />
                <CustomTextComponent
                    text={"MBBS"} fs={14} fw={"600"} textColor={"#000"}
                />
                <View style={{ marginTop: 4 }} />
                <CustomTextComponent
                    text={education1} fs={12} fw={"400"} textColor={Colors.black}
                />
                <View style={{ marginTop: 6 }} />
                <CustomTextComponent
                    text={"NBD"} fs={14} fw={"600"} textColor={"#000"}
                />
                <View style={{ marginTop: 4 }} />
                <CustomTextComponent
                    text={education2} fs={12} fw={"400"} textColor={Colors.black}
                />
            </View>
        </View>
    )
}

