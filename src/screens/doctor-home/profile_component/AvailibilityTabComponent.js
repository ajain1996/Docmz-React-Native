import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import AwesomeButton from 'react-native-really-awesome-button';
import CustomTextComponent from '../../../components/CustomTextComponent';
import SearchComponent from '../../../components/SearchComponent';
import { availableTimeSlots, availableTimeSlots2, availableTimeSlots3, dummyDaysData } from '../../../constants/dummyData';
import { Colors } from '../../../utils/Colors';
import { windowWidth } from '../../../utils/utils';

const BuildArrowComponent = ({ image }) => {
    return (
        <View style={{
            width: 24, height: 24, backgroundColor: Colors.GREEN,
            justifyContent: 'center', alignItems: 'center', borderRadius: 100
        }}>
            <Image
                source={image}
                style={{
                    width: 10, height: 10, tintColor: '#fff'
                }}
            />
        </View>
    );
}

export default function AvailibilityTabComponent() {
    const [day, setDay] = useState("");
    const [showCalander, setShowCalander] = useState(false);

    const vacation = { key: 'vacation', color: 'green', selectedDotColor: 'blue' };
    const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
    const workout = { key: 'workout', color: 'yellow' };

    const renderDaysCardComponent = () => {
        return (
            <>
                <View style={{ height: 16 }} />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <BuildArrowComponent
                        image={require('../../../../assets/arrow-back.png')}
                    />
                    <View style={{ width: 16 }} />
                    <TouchableOpacity onPress={() => { setShowCalander(!showCalander) }}>
                        <BuildTitleComponent title="November 2021" />
                    </TouchableOpacity>
                    <Image
                        source={require('../../../../assets/arrow-down.png')}
                        style={{
                            width: 13, height: 13,
                            marginLeft: 5
                        }}
                    />
                    <View style={{ width: 16 }} />
                    <BuildArrowComponent
                        image={require('../../../../assets/arrow-forward.png')}
                    />
                </View>
                <View style={{ height: 16 }} />

                {showCalander
                    ? <Card style={{
                        elevation: 4, shadowColor: Colors.SILVER, borderRadius: 10, paddingVertical: 4
                    }}>
                        <Calendar
                            current={new Date()}
                            minDate={'1912-05-10'}
                            maxDate={'2050-05-30'}
                            onDayPress={(day) => { console.log('selected day', day.dateString) }}
                            monthFormat={'yyyy-MM-dd'}
                            onMonthChange={(month) => { console.log('month changed', month.month) }}
                            hideArrows={true}
                            hideExtraDays={true}
                            disableMonthChange={true}
                            firstDay={1}
                            hideDayNames={false}
                            showWeekNumbers={false}
                            onPressArrowLeft={subtractMonth => subtractMonth()}
                            onPressArrowRight={addMonth => addMonth()}
                            disableArrowLeft={true}
                            disableArrowRight={true}
                            disableAllTouchEventsForDisabledDays={true}
                            renderHeader={(date) => { }}
                            markedDates={{
                                '2021-12-25': { dots: [vacation, massage, workout], selected: true, selectedColor: Colors.GREEN },
                                '2021-12-16': {
                                    selected: true, marked: true, selectedColor: Colors.BLUE2
                                },
                                '2021-12-26': { dots: [massage, workout], disabled: true }
                            }}
                            enableSwipeMonths={true}
                            style={{ borderRadius: 30 }}
                        />
                    </Card> : <></>}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {
                        dummyDaysData.map((data, index) => {
                            return (
                                <BuildDaysCardComponent key={index}
                                    data={data} index={index}
                                    day={day} setDay={setDay}
                                />
                            );
                        })
                    }
                </View>
            </>
        );
    }


    return (
        <View>
            <FlatList
                columnWrapperStyle={{
                    flex: 1,
                    justifyContent: 'flex-start',
                }}
                numColumns={4}
                data={availableTimeSlots}
                keyExtractor={item => `${item.id}`}
                keyboardDismissMode="on-drag"
                itemC
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View style={{ marginHorizontal: 10 }}>
                        <SearchComponent bgHeight={0} />
                        {renderDaysCardComponent()}
                        <Text />
                        <BuildTitleComponent title="Available Time" />
                        <Text />
                        <CustomTextComponent
                            text={"Morning"} fs={15} fw={"700"} textColor={Colors.BLUE2}
                        />
                    </View>
                }
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ marginHorizontal: 6 }}>
                            <BuildShowTimeSlot
                                item={item} index={index} day={day} setDay={setDay}
                            />
                        </View>
                    );
                }}
                ListFooterComponent={
                    <View style={{ marginVertical: 30 }}>
                        <FlatList
                            columnWrapperStyle={{
                                flex: 1,
                                justifyContent: 'flex-start',
                            }}
                            numColumns={4}
                            data={availableTimeSlots2}
                            keyExtractor={item => `${item.id}`}
                            keyboardDismissMode="on-drag"
                            showsVerticalScrollIndicator={false}
                            ListHeaderComponent={
                                <View style={{ paddingHorizontal: 8 }}>
                                    <CustomTextComponent
                                        text={"Afternoon"} fs={15} fw={"700"} textColor={Colors.BLUE2}
                                    />
                                </View>
                            }
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ marginHorizontal: 6 }}>
                                        <BuildShowTimeSlot
                                            item={item} index={index} day={day} setDay={setDay}
                                        />
                                    </View>
                                );
                            }}
                            ListFooterComponent={
                                <View style={{ marginVertical: 30 }}>
                                    <FlatList
                                        columnWrapperStyle={{
                                            flex: 1,
                                            justifyContent: 'flex-start',
                                        }}
                                        numColumns={4}
                                        data={availableTimeSlots3}
                                        keyExtractor={item => `${item.id}`}
                                        keyboardDismissMode="on-drag"
                                        showsVerticalScrollIndicator={false}
                                        ListHeaderComponent={
                                            <View style={{ paddingHorizontal: 8 }}>
                                                <CustomTextComponent
                                                    text={"Evening"} fs={15} fw={"700"} textColor={Colors.BLUE2}
                                                />
                                            </View>
                                        }
                                        renderItem={({ item, index }) => {
                                            return (
                                                <View style={{ marginHorizontal: 6 }}>
                                                    <BuildShowTimeSlot
                                                        item={item} index={index} day={day} setDay={setDay}
                                                    />
                                                </View>
                                            );
                                        }}
                                        ListFooterComponent={
                                            <FlatList
                                                columnWrapperStyle={{
                                                    flex: 1,
                                                    justifyContent: 'flex-start',
                                                }}
                                                numColumns={4}
                                                data={availableTimeSlots3}
                                                keyExtractor={item => `${item.id}`}
                                                keyboardDismissMode="on-drag"
                                                showsVerticalScrollIndicator={false}
                                                ListHeaderComponent={
                                                    <View style={{ paddingHorizontal: 8, marginTop: 30 }}>
                                                        <CustomTextComponent
                                                            text={"Night"} fs={15} fw={"700"}
                                                            textColor={Colors.BLUE2}
                                                        />
                                                    </View>
                                                }
                                                renderItem={({ item, index }) => {
                                                    return (
                                                        <View style={{ marginHorizontal: 6 }}>
                                                            <BuildShowTimeSlot
                                                                item={item} index={index} day={day} setDay={setDay}
                                                            />
                                                        </View>
                                                    );
                                                }}
                                            />
                                        }
                                    />
                                </View>
                            }
                        />
                    </View>
                }
            />
        </View>
    )
}


const BuildTitleComponent = ({ title, color }) => {
    return (
        <Text style={{
            color: color ? color : Colors.BLACK, fontSize: 20,
            fontFamily: 'Montserrat-Regular', fontWeight: '700',
        }}>
            {title}
        </Text>
    );
}


const BuildDaysCardComponent = ({ data, index, day, setDay }) => {
    return (
        <Card key={index} style={[styles.daysCardContainerStyle, {
            backgroundColor: day === data.name ? Colors.GREEN : "#EEEEEE"
        }]}>
            <AwesomeButton
                backgroundColor={day === data.name ? Colors.GREEN : "#EEEEEE"}
                backgroundShadow={day === data.name ? Colors.GREEN : "#EEEEEE"}
                activeOpacity={0.5} width={48} elevation={8}
                backgroundDarker={day === data.name ? Colors.GREEN : "#EEEEEE"}
                borderRadius={12} onPress={() => { setDay(data.name) }}
            >
                <View style={{ flexDirection: 'column' }}>
                    <Text style={[styles.daysCardNumberStyle, {
                        color: day === data.name ? Colors.WHITE : Colors.GREEN,
                        fontFamily: 'Montserrat-Regular',
                    }]}>
                        {data.id}
                    </Text>
                    <Text style={[styles.daysCardTextStyle, {
                        color: day === data.name ? Colors.WHITE : Colors.GREEN,
                        fontFamily: 'Montserrat-Regular',
                    }]}>
                        {data.name}
                    </Text>
                </View>
            </AwesomeButton>
        </Card>
    );
}


const BuildShowTimeSlot = ({ item, index, day, setDay }) => {
    return (
        <Card key={index} style={{ elevation: 3, marginTop: 14, borderRadius: 10 }}>
            <AwesomeButton
                backgroundColor={day === item.time ? "#4CABAB" : "#EEEEEE"}
                backgroundShadow={day === item.time ? "#52BABA" : "#EEEEEE"}
                activeOpacity={0.5} elevation={8} height={38} width={windowWidth / 4 - 24}
                backgroundDarker={day === item.time ? "#52BABA" : "#EEEEEE"}
                borderRadius={8} onPress={() => { setDay(item.time) }} raiseLevel={3}
            >
                <Text style={{
                    color: day === item.time ? Colors.WHITE : Colors.GREEN,
                    marginTop: 4, fontFamily: 'Montserrat-Regular', fontSize: 13
                }}>
                    {item.time}
                </Text>
            </AwesomeButton>
        </Card>
    );
}

{/* <Card key={index} style={{ elevation: 3, marginTop: 14, borderRadius: 10 }}>
    <TouchableOpacity onPress={() => { setDay(item.time) }} raiseLevel={2.5}
        style={{
            width: windowWidth / 4 - 24, height: 38, borderRadius: 8,
            backgroundColor: day === item.time ? Colors.GREEN : Colors.WHITE,
            justifyContent: 'center', alignItems: 'center'
        }}
    >
        <LinearGradient colors={["#62D0D0", "#62D0D0", "#49A2A2"]} locations={[0.3, 0, 0]}>
        <Text style={{
            color: day === item.time ? Colors.WHITE : Colors.GREEN,
            fontFamily: 'Montserrat-Regular', fontSize: 13
        }}>
            {item.time}
        </Text>
        </LinearGradient>
    </TouchableOpacity>
</Card> */}


const styles = StyleSheet.create({
    daysCardContainerStyle: {
        elevation: 4, marginTop: 16, shadowColor: '#999',
        borderRadius: 12, padding: 1,
        justifyContent: 'center', alignItems: 'center',
    },
    daysCardNumberStyle: {
        color: Colors.GREEN, fontSize: 16,
        fontWeight: '600', textAlign: 'center',
    },
    daysCardTextStyle: {
        color: Colors.GREEN, fontSize: 11,
        marginTop: 4, fontWeight: '400',
    },
    inputCardStyle: {
        elevation: 5, shadowColor: '#999',
        borderRadius: 10, overflow: 'hidden',
    },
    textareaInputStyle: {
        width: '100%', height: 190,
        paddingHorizontal: 18, color: "black",
        borderRadius: 10, paddingBottom: 16,
        marginTop: -70, fontFamily: 'Montserrat-Regular',
    }
});

