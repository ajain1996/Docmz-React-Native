import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import { BuildIntroductionComponent, BuildPersonalInfoComponent, BuildSlotsTabComponent, BuildTabCardComponent, BuildTimeSlotsComponent, OverviewTabBlock } from '../../components/Components';
import CustomTextComponent from '../../components/CustomTextComponent';
import { Colors } from '../../utils/Colors';
import { windowWidth } from '../../utils/utils';
import AwesomeButton from "react-native-really-awesome-button";
import DoctorHeader from '../../components/DoctorHeader';
import { OverviewTabComponent, OverviewTabEducation, OverviewTabExperience } from './profile_component/OverviewTabComponent';
import AvailibilityTabComponent from './profile_component/AvailibilityTabComponent';
import { PatientReviewCardComponent, PatientReviewsTitleComponent } from './profile_component/PatientReviewsTabComponent';

export default function DoctorProfileScreen() {

    const [showTab, setShowTab] = useState("tab1");
    const [showTimeTab, setShowTimeTab] = useState("val1");
    const [showOverviewTab, setShowOverviewTab] = useState("overview");

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={{ height: 10 }} />
            <DoctorHeader showIcon={true} text="Doctor's Profile" />
            <BuildIntroductionComponent
                image='https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                name="Dr. Co Ekaterine"
                info="Gynaecologist | MBBS, NBD"
                location="Delhi, India"
                time="9:00 am to 10:00 am"
            />

            <BuildPersonalInfoComponent
                text1="1000+"
                image1={require("../../../assets/users.png")}
                text2="10 yes+"
                image2={require("../../../assets/scholar.png")}
                text3="4.5"
                image3={require("../../../assets/star.png")}
            />
            <View style={{ height: 10 }} />

            {/* <Card style={{ elevation: 5, shadowColor: '#999', marginTop: 10, marginHorizontal: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <BuildTabCardComponent
                        showTab={showTab}
                        selectedVal="tab1"
                        onPress={() => { setShowTab("tab1"); setShowTimeTab("val1") }}
                        text="April"
                    />

                    <BuildTabCardComponent
                        showTab={showTab}
                        selectedVal="tab2"
                        onPress={() => { setShowTab("tab2"); setShowTimeTab("") }}
                        text="2021"
                    />

                    <CustomTextComponent
                        text={"₹ 500"} fs={20} fw={"normal"} textColor={Colors.BLUE2}
                    />
                </View>

                {showTab === "tab1"
                    ? <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <BuildTimeSlotsComponent
                            text1="Today"
                            text2="11 Slots"
                            selectedVal="val1"
                            showTimeTab={showTimeTab}
                            onPress={() => { setShowTimeTab("val1") }}
                        />

                        <BuildTimeSlotsComponent
                            text1="Tomorrow"
                            text2="40 Slots"
                            selectedVal="val2"
                            showTimeTab={showTimeTab}
                            onPress={() => { setShowTimeTab("val2") }}
                        />

                        <BuildTimeSlotsComponent
                            text1="10 May"
                            text2="No Slots"
                            selectedVal="val3"
                            showTimeTab={showTimeTab}
                            onPress={() => { setShowTimeTab("val3") }}
                        />
                    </View>
                    : <></>}

                {showTab === "tab2" ? <View style={styles.extraBlockStyle}>
                    <CustomTextComponent
                        text={"No data"} fs={20} fw={"normal"} textColor={Colors.BLACK90}
                    />
                </View> : <></>}

                {showTimeTab === "val1"
                    ? <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 30 }}>
                        <BuildSlotsTabComponent
                            text="11:00 AM"
                            isSelected={true}
                            onPress={() => { }}
                        />

                        <BuildSlotsTabComponent
                            text="11:30 AM"
                            isSelected={false}
                            onPress={() => { }}
                        />

                        <BuildSlotsTabComponent
                            text="12:00 AM"
                            isSelected={false}
                            onPress={() => { }}
                        />
                    </View>
                    : <></>}

                {showTimeTab === "val2" ? <View style={styles.extraBlockStyle}>
                    <CustomTextComponent
                        text={"No Slots"} fs={20} fw={"normal"} textColor={Colors.BLACK90}
                    />
                </View> : <></>}

                {showTimeTab === "val3" ? <View style={styles.extraBlockStyle}>
                    <CustomTextComponent
                        text={"No Slots"} fs={20} fw={"normal"} textColor={Colors.BLACK90}
                    />
                </View> : <></>}
                <Text />
            </Card> */}
            {/* <Text /> */}

            <Card style={{ elevation: 4, shadowColor: '#999', margin: 16, borderRadius: 6 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <OverviewTabBlock
                        text="Overview"
                        showTab={showOverviewTab}
                        image={require("../../../assets/overview.png")}
                        selectedVal="overview"
                        onPress={() => { setShowOverviewTab("overview") }}
                    />

                    <OverviewTabBlock
                        text="Availibility"
                        showTab={showOverviewTab}
                        image={require("../../../assets/availibility.png")}
                        selectedVal="availibility"
                        onPress={() => { setShowOverviewTab("availibility") }}
                    />

                    <OverviewTabBlock
                        text="Fees"
                        showTab={showOverviewTab}
                        image={require("../../../assets/fees.png")}
                        selectedVal="fees"
                        onPress={() => { setShowOverviewTab("fees") }}
                    />

                    <OverviewTabBlock
                        text="Reviews"
                        showTab={showOverviewTab}
                        image={require("../../../assets/reviews.png")}
                        selectedVal="reviews"
                        onPress={() => { setShowOverviewTab("reviews") }}
                    />
                </View>

                {showOverviewTab === "overview"
                    ? <View style={{ padding: 16, flexDirection: 'row', }}>
                        <View style={{ width: 1, backgroundColor: '#eee', height: "85%", marginLeft: 14 }} />
                        <View style={{ marginLeft: -17 }}>
                            <OverviewTabComponent
                                image={require("../../../assets/overview.png")}
                                title={"About Dr. Co Ekartine"}
                                info={"Dr. Co Ekartine is the topmost Gynecologist in Medicare Hospital. She has achieved several awards for her wonderful..."}
                                showMoreText={true}
                            />
                            <View style={{ height: 24 }} />

                            <OverviewTabComponent
                                image={require("../../../assets/overview.png")}
                                title={"Hospital Details"}
                                info={"Everything Gynaec, Vile Parie West"}
                            />

                            <View style={{ height: 24 }} />

                            <OverviewTabComponent
                                image={require("../../../assets/overview.png")}
                                title={"Specializes In"}
                                info={"Gastroenterologist"}
                                image2={require("../../../assets/stomach.png")}
                            />

                            <View style={{ height: 24 }} />

                            <OverviewTabExperience
                                image={require("../../../assets/overview.png")}
                                title={"Experience"}
                                year1={"Consultant"}
                                year2={"Gynaec at Everything Gynaec"}
                            />

                            <View style={{ height: 24 }} />

                            <OverviewTabEducation
                                image={require("../../../assets/overview.png")}
                                title={"Education"}
                                education1={"Jawharlal Nehru Medical - 2001"}
                                education2={"Medical College - 2007"}
                            />
                        </View>
                    </View>
                    : <></>}

                {showOverviewTab === "availibility"
                    ? <View style={{ paddingHorizontal: 8 }}>
                        <AvailibilityTabComponent />
                    </View> : <></>}

                {showOverviewTab === "fees"
                    ? <Card style={{ paddingHorizontal: 15, elevation: 5, shadowColor: '#999' }}>
                        <BuildFeesComponent
                            title="In-Clinic Appointment"
                            image={require("../../../assets/home-plus.png")}
                            feesInDollar={"80.70"}
                            feesInRupees={"1400"}
                        />
                        <BuildFeesComponent
                            title="Virtual Appointment"
                            image={require("../../../assets/overview.png")}
                            feesInDollar={"80.70"}
                            feesInRupees={"1400"}
                        />
                        <Text />
                    </Card> : <></>}

                {showOverviewTab === "reviews" ?
                    <View style={{ paddingVertical: 16 }}>
                        <PatientReviewsTitleComponent />

                        <View style={{ backgroundColor: '#dcdcdc', height: 1.4, marginHorizontal: 22 }} />

                        <PatientReviewCardComponent />

                        <PatientReviewCardComponent />

                        <PatientReviewCardComponent />

                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text />
                            <TouchableOpacity>
                                <Text style={{ color: Colors.BLUE2, fontSize: 18 }}>See More</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 6 }} />
                    </View> : <></>}


                {/* {showTimeTab === "val1"
                    ? <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 30 }}>
                        <BuildSlotsTabComponent
                            text="11:00 AM"
                            isSelected={true}
                            onPress={() => { }}
                        />

                        <BuildSlotsTabComponent
                            text="11:30 AM"
                            isSelected={false}
                            onPress={() => { }}
                        />

                        <BuildSlotsTabComponent
                            text="12:00 AM"
                            isSelected={false}
                            onPress={() => { }}
                        />
                    </View>
                    : <></>} */}
            </Card>

            {showOverviewTab === "availibility"
                ? <Card style={{ elevation: 4, shadowColor: '#999', paddingVertical: 12, marginHorizontal: 16 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require("../../../assets/calendar.png")}
                            style={{ width: 24, height: 24, tintColor: Colors.GREEN }}
                        />
                        <Text style={{ marginLeft: 6 }}>14 Nov 2021, 12:30 PM</Text>
                    </View>
                </Card>
                : <></>}


            <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 25 }}>
                <AwesomeButton
                    width={240} height={52} backgroundShadow={"#368edd"}
                    backgroundColor={Colors.BLUE2} borderRadius={100}
                    activeOpacity={0.5} backgroundDarker={"#3d7fba"}
                    onPress={() => { }} raiseLevel={2.5}
                >
                    <CustomTextComponent
                        text={"Book Appointment"} fs={16} fw={"normal"} textColor={"#fff"}
                    />
                </AwesomeButton>
            </View>
            <View style={{ height: 60 }} />
        </ScrollView>
    )
}


const BuildFeesComponent = ({ image, title, feesInDollar, feesInRupees }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <Card style={{ elevation: 4, shadowColor: '#999', marginTop: 20, width: "100%", }}>
                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    paddingHorizontal: 15, paddingVertical: 10, justifyContent: 'space-between',
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{
                            width: 26, backgroundColor: '#eee', justifyContent: 'center',
                            alignItems: 'center', height: 26, borderRadius: 200,
                        }}>
                            <Image
                                source={image}
                                style={{ width: 14, height: 14, tintColor: Colors.BLUE }}
                            />
                        </View>
                        <Text style={{ fontSize: 13, marginLeft: 6, fontFamily: 'Montserrat-Regular', }}>
                            {title}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                        <CustomTextComponent
                            text={`Fees: $ ${feesInDollar}`} fs={12} fw={"300"} textColor={Colors.LIGHTGRAY}
                        />

                        <CustomTextComponent
                            text={`₹ ${feesInRupees}`} fs={12} fw={"300"} textColor={Colors.LIGHTGRAY}
                        />
                    </View>
                </View>
            </Card>
        </View>
    );
}


const styles = StyleSheet.create({
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
        paddingHorizontal: 32,
        paddingVertical: 18
    },
});

