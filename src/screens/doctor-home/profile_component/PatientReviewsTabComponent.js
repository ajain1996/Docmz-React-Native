import React from 'react';
import { View, Text, Image } from 'react-native';
import CustomTextComponent from '../../../components/CustomTextComponent';
import { Colors } from '../../../utils/Colors';
import { Rating, AirbnbRating } from 'react-native-ratings';

export const PatientReviewsTitleComponent = () => {
    return (
        <View style={{
            flexDirection: 'row', justifyContent: 'space-between',
            alignItems: 'center', paddingHorizontal: 22, marginBottom: 8
        }}>
            <CustomTextComponent
                text={"Patient Reviews"} fs={14} fw={"700"} textColor={Colors.BLACK90}
            />
            <View style={{
                width: 24, height: 24, backgroundColor: Colors.GREEN,
                borderRadius: 100, justifyContent: 'center', alignItems: 'center'
            }}>
                <Text style={{ color: '#fff', fontSize: 20 }}>+</Text>
            </View>
        </View>
    )
}


export const PatientReviewCardComponent = ({ image, name, info, days }) => {
    return (
        <View style={{ borderBottomColor: '#eee', borderBottomWidth: 1, padding: 24 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 12 }}>
                <Image
                    source={{ uri: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" }}
                    style={{ width: 70, height: 70, borderRadius: 100 }}
                />
                <View style={{ marginLeft: 10, width: '76%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <CustomTextComponent
                            text={"Maggie Rhee"} fs={17} fw={"700"} textColor={"#000"}
                        />
                        <CustomTextComponent
                            text={"16 days age"} fs={12} fw={"600"} textColor={Colors.BLUE2}
                        />
                    </View>
                    <View style={{ height: 4 }} />
                    <CustomTextComponent
                        text={"Visited for Pain"} fs={13} fw={"600"} textColor={"#000"}
                    />
                    <View style={{ alignItems: 'flex-start', marginTop: -48 }}>
                        <AirbnbRating
                            count={5}
                            defaultRating={4}
                            reviews={["", "", "", "", "", "", "", "", "", "", ""]}
                            size={16}
                        />
                    </View>
                </View>
            </View>
            <CustomTextComponent
                text={'"Great caring doctor & practice. Very accessible, especially during these times. Highly recommended"'} fs={12} fw={"700"} textColor={"#000"} lineHeight={17}
            />
        </View>
    );
}

