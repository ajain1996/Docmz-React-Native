import React, { Component } from "react";
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { NEW_PRIMARY_BACKGROUND, INPUT_PLACEHOLDER, GREY_OUTLINE } from "../../../styles/colors";
import { CheckBox } from 'react-native-elements'
import { TextInputMask } from 'react-native-masked-text';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../../../styles/colorsV2';
import { connect } from "react-redux";
import { Local, setLocale } from '../../../i18n';
import AnimatedErrorText from "../../atoms/animatedErrorText/AnimatedErrorText";

export class Alternate extends Component {
  constructor(props) {
    super(props);
    this.theme = this.props.theme;
    this.array = []
  }
  onDaysChange = (e, index, value) => {
    const {
      onDaysChange
    } = this.props
    if (typeof onDaysChange === "function") {
      onDaysChange(e, index, value)
    }
  }

  onStartTimeChange = time => {
    const {
      onStartTimeChange
    } = this.props
    if (typeof onStartTimeChange === "function") {
      onStartTimeChange(time)
    }
  }
  onLunchStartChange = time => {
    const {
      onLunchStartChange
    } = this.props
    if (typeof onLunchStartChange === "function") {
      onLunchStartChange(time)
    }
  }
  onLunchEndChange = time => {
    const {
      onLunchEndChange
    } = this.props
    if (typeof onLunchEndChange === "function") {
      onLunchEndChange(time)
    }
  }
  onEndTimeChange = time => {
    const {
      onEndTimeChange
    } = this.props
    if (typeof onEndTimeChange === "function") {
      onEndTimeChange(time)
    }
  }
  onAdd = () => {
    const {
      onAdd,
      index
    } = this.props
    if (typeof onAdd === "function") {
      onAdd(index || 0)
    }
  }
  onRemove = () => {
    const {
      onRemove,
      index
    } = this.props
    if (typeof onRemove === "function") {
      onRemove(index || 0)
    }
  }

  isValid = (value) => {
    const split = value.split(':');
    const hours = split[0] ? parseInt(split[0]) : null;
    const mins = split[1] ? parseInt(split[1]) : null;
    let valid = true
    //don't use && when there's change that any of the operand could be 0(as valid)
    
    if (value.length == 5 && hours < 24 && mins < 59 ) {
      valid = true;
    } else if(hours > 23 || mins > 59) {
      valid = false;
    }
    return valid
  }


render() {
  const {
    onWeekTimeChange,
    startTime,
    endTime,
    weekdays,
    hideRemove,
    hideAdd,
    lunchStart,
    lunchEnd,
    index,
    theme
  } = this.props;

  return (
    <View>
      <View style={{ marginTop: '8%' }}>
        <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: "Montserrat-SemiBold", color: Colors.primary_text_color[theme], }}>{Local("doctor.availablity.working_hours")}</Text>
        <View style={{ flexDirection: "row", justifyContent: 'space-around', marginTop: '4%' }}>
          <Text style={{
            fontFamily: 'Montserrat-Regular',
            color: Colors.primary_text_color[theme],
            fontSize: 16,
          }} >{Local("doctor.availablity.start_time")}</Text>
          <TextInputMask
            type={'datetime'}
            options={{
              format: 'HH:mm',
            }}
            value={typeof startTime == "string" ? startTime : moment(startTime).format('HH:ss')}
            onChangeText={(time) => onWeekTimeChange(time, index, "startTime")}
            style={{
              padding: 5,
              borderRadius: 30,
              borderColor: GREY_OUTLINE,
              borderWidth: 1,
              width: "60%",
              fontFamily: 'Montserrat-Regular',
              color: Colors.primary_text_color[theme],
              fontSize: 16,
              paddingHorizontal: 10,
              textAlign: 'center',
              height: 35,
            }}
          />
        </View>
        {!this.isValid(startTime) && (
              <AnimatedErrorText
                style={{width: '55%', alignSelf: 'flex-end'}}
                text={'Please enter a valid time'}
              />
            )}
        <View style={{ flexDirection: "row", justifyContent: 'space-around', marginTop: '4%' }}>
          <Text style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: 16,
            color: Colors.primary_text_color[theme],
          }} >{Local("doctor.availablity.end_time")}</Text>
          <TextInputMask
            type={'datetime'}
            options={{
              format: 'HH:mm',
            }}
            value={typeof endTime == "string" ? endTime : moment(endTime).format('HH:ss')}
            onChangeText={this.onEndTimeChange}
            style={{
              padding: 5,
              borderRadius: 30,
              borderColor: GREY_OUTLINE,
              borderWidth: 1,
              width: "60%",
              fontFamily: 'Montserrat-Regular',
              fontSize: 16,
              color: Colors.primary_text_color[theme],
              paddingHorizontal: 10,
              textAlign: 'center',
              height: 35,
            }}
          />
        </View>
        {!this.isValid(endTime) && (
              <AnimatedErrorText
                style={{width: '55%', alignSelf: 'flex-end'}}
                text={'Please enter a valid time'}
              />
            )}
      </View >

      <View style={{ marginTop: '8%' }}>
        <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: "Montserrat-SemiBold", color: Colors.primary_text_color[theme], }}>{Local("doctor.availablity.break_hours")}</Text>
        <View style={{ flexDirection: "row", justifyContent: 'space-around', marginTop: '4%' }}>
          <Text style={{ color: Colors.primary_text_color[theme], }}>{Local("doctor.availablity.start_time")}</Text>
          <TextInputMask
            type={'datetime'}
            options={{
              format: 'HH:mm',
            }}
            value={typeof lunchStart == "string" ? lunchStart : moment(lunchStart).format('HH:ss')}
            onChangeText={this.onLunchStartChange}
            style={{
              padding: 5,
              borderRadius: 30,
              borderColor: GREY_OUTLINE,
              borderWidth: 1,
              width: "60%",
              fontFamily: 'Montserrat-Regular',
              fontSize: 16,
              color: Colors.primary_text_color[theme],
              paddingHorizontal: 10,
              textAlign: 'center',
              height: 35,
            }}
          />
        </View>
        {!this.isValid(lunchStart) && (
              <AnimatedErrorText
                style={{width: '55%', alignSelf: 'flex-end'}}
                text={'Please enter a valid time'}
              />
            )}
        <View style={{ flexDirection: "row", justifyContent: 'space-around', marginTop: '4%' }}>
          <Text style={{ color: Colors.primary_text_color[theme], }}>{Local("doctor.availablity.end_time")}</Text>
          <TextInputMask
            type={'datetime'}
            options={{
              format: 'HH:mm',
            }}
            value={typeof lunchEnd == "string" ? lunchEnd : moment(lunchEnd).format('HH:ss')}
            onChangeText={this.onLunchEndChange}
            style={{
              padding: 5,
              borderRadius: 30,
              borderColor: GREY_OUTLINE,
              borderWidth: 1,
              width: "60%",
              fontFamily: 'Montserrat-Regular',
              fontSize: 16,
              color: Colors.primary_text_color[theme],
              paddingHorizontal: 10,
              textAlign: 'center',
              height: 35,
            }}
          />
        </View>
        {!this.isValid(lunchEnd) && (
              <AnimatedErrorText
                style={{width: '55%', alignSelf: 'flex-end'}}
                text={'Please enter a valid time'}
              />
            )}
      </View >

      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '8%',
        alignItems: "center",
        marginLeft: '12%'
      }}>
        <View style={{}}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: 'Montserrat-Regular', marginTop: 12, fontSize: 16, color: Colors.primary_text_color[theme], }}>{Local("doctor.availablity.monday")}</Text>
            <CheckBox
              containerStyle={{ marginLeft: '24%' }}
              name="weekDays"
              checkedColor={NEW_PRIMARY_BACKGROUND}
              checked={weekdays.includes("monday")}
              onPress={(e) => this.onDaysChange(e, index, "monday")}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: 'Montserrat-Regular', marginTop: 12, fontSize: 16, color: Colors.primary_text_color[theme], }}>{Local("doctor.availablity.wednesday")}</Text>
            <CheckBox
              containerStyle={{ marginLeft: '10%' }}
              name="weekDays"
              checkedColor={NEW_PRIMARY_BACKGROUND}

              checked={weekdays.includes("wednesday")}
              onPress={(e) => this.onDaysChange(e, index, "wednesday")}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: 'Montserrat-Regular', marginTop: 12, fontSize: 16, color: Colors.primary_text_color[theme], }}>{Local("doctor.availablity.friday")}</Text>
            <CheckBox
              name="weekDays"
              containerStyle={{ marginLeft: '31%' }}
              checkedColor={NEW_PRIMARY_BACKGROUND}

              checked={weekdays.includes("friday")}
              onPress={(e) => this.onDaysChange(e, index, "friday")}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: 'Montserrat-Regular', marginTop: 12, fontSize: 16, color: Colors.primary_text_color[theme], }}>{Local("doctor.availablity.sunday")}</Text>
            <CheckBox
              name="weekDays"
              containerStyle={{ marginLeft: '26%' }}
              checkedColor={NEW_PRIMARY_BACKGROUND}

              checked={weekdays.includes("sunday")}
              onPress={(e) => this.onDaysChange(e, index, "sunday")}
            />
          </View>
        </View >
        <View style={{}}>

          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: 'Montserrat-Regular', marginTop: 12, fontSize: 16, color: Colors.primary_text_color[theme], }}>{Local("doctor.availablity.tuesday")}</Text>
            <CheckBox
              containerStyle={{ marginLeft: '12%' }}
              name="weekDays"
              checked={weekdays.includes("tuesday")}
              checkedColor={NEW_PRIMARY_BACKGROUND}

              onPress={(e) => this.onDaysChange(e, index, "tuesday")}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: 'Montserrat-Regular', marginTop: 12, fontSize: 16, color: Colors.primary_text_color[theme], }}>{Local("doctor.availablity.thursday")}</Text>
            <CheckBox
              name="weekDays"
              checked={weekdays.includes("thursday")}
              checkedColor={NEW_PRIMARY_BACKGROUND}

              onPress={(e) => this.onDaysChange(e, index, "thursday")}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: 'Montserrat-Regular', marginTop: 12, fontSize: 16, color: Colors.primary_text_color[theme], }}>{Local("doctor.availablity.saturday")}</Text>
            <CheckBox
              name="weekDays"
              containerStyle={{ marginLeft: '8%' }}
              checked={weekdays.includes("saturday")}
              checkedColor={NEW_PRIMARY_BACKGROUND}

              onPress={(e) => this.onDaysChange(e, index, "saturday")}
            />
          </View>
        </View >
      </View>
      <View style={{ flexDirection: 'row', marginBottom: 10, marginLeft: '8%' }}>
        {!hideAdd &&
          <TouchableOpacity
            onPress={this.onAdd}>
            <View
              style={{
                height: 35,
                width: 35,
                borderWidth: 1,
                borderColor: GREY_OUTLINE,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Feather name="plus" size={20} color={Colors.input_placeholder_color[theme]} />
            </View>
          </TouchableOpacity>
        }
        {!hideRemove && (
          <TouchableOpacity
            onPress={this.onRemove}>
            <View
              style={{
                height: 35,
                width: 35,
                borderWidth: 1,
                borderColor: GREY_OUTLINE,
                borderRadius: 30,
                marginLeft: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Feather name="minus" size={20} color={Colors.input_placeholder_color[theme]} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View >
  );
}
}



Alternate.defaultProps = {
  weekdays: []
}

const mapProps = (state) => {
  return {
    theme: state.AuthReducer.theme,
  }
}

export default connect(mapProps)(Alternate)

const styles = StyleSheet.create({
  icons: {
    position: 'relative',
    display: "flex",
    flexDirection: "row",
    left: '-18%'
  },
  smallText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    color: INPUT_PLACEHOLDER,
    alignSelf: 'flex-start',
  },
  inputText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
    padding: 4,
    width: '94%',
    borderColor: NEW_PRIMARY_BACKGROUND,
    borderBottomWidth: 1.5,
  },
});