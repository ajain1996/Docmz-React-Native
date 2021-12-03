import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import { INPUT_PLACEHOLDER, NEW_PRIMARY_COLOR } from '../../../styles/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DeleteAllergies } from '../../../reduxV2/action/PatientAction'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import Popconfirm from '../Modal/PopConfirm';
import {Local, setLocale} from '../../../i18n';
import {Colors} from '../../../styles/colorsV2';

const AllergiesItem = ({ data, handleEdit }) => {
  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const isDoctor = false
  const { patient } = useSelector(state => state.PatientReducer)
  const dispatch = useDispatch();

  const handleDelete = (_id) => {
    dispatch(
      DeleteAllergies({
        id: patient.meta._id,
        surgery: data._id
      }))
  }
  const [askConfirmation, setaskConfirmation] = useState(false);

  return (<>

    <Popconfirm
      onUpdate={() => {
        handleDelete()
        setaskConfirmation(false)
      }}
      onCancel={() => { setaskConfirmation(false) }}
      visible={askConfirmation}>
    </Popconfirm>
    <View
      style={{
        // backgroundColor: 'white',
        backgroundColor: Colors.secondary_background[theme],
        paddingHorizontal: 20,
        borderRadius: 13,
        marginVertical: 10,
        elevation: 2,
        flexDirection: 'row',
        paddingVertical: 15,
      }}>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 17,
            color: Colors.primary_text_color[theme],
            paddingVertical: 2,
          }}>
          {data.allergyName}
        </Text>
        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            fontSize: 13,
            color: Colors.primary_text_color[theme],
            paddingVertical: 2,
          }}>
          {Local("doctor.medical_history.reaction")}: {data.reaction}
        </Text>
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            color: Colors.primary_text_color[theme],
            fontSize: 11,
          }}>
          {Local("doctor.medical_history.severity")}: {data.severity}
        </Text>
      </View>

      {/* <View style={{ justifyContent: 'center' }}>
      <Text
        style={{
          fontFamily: 'Montserrat-Regular',
          fontSize: 11,
        }}>
        Severity: {data.severity}
      </Text>
    </View> */}

      <View style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>

        <View style={{ justifyContent: 'center' }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              color: Colors.patient_time[theme],
              fontSize: 11,
            }}>
            {'Updated on : '}{moment(data.date).format("DD MMM 'YY")}
          </Text>
        </View>

        {
          !isDoctor && <View style={{ flexDirection: 'row' }}>

          <TouchableOpacity onPress={() => {
            setaskConfirmation(true)
          }}>
            <MaterialCommunityIcons
              name="trash-can-outline"
              style={{ fontSize: 22, color: NEW_PRIMARY_COLOR, marginHorizontal: 4 }}>
            </MaterialCommunityIcons>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleEdit(data)}>
            <MaterialIcons
              name="edit"
              style={{ fontSize: 22, color: NEW_PRIMARY_COLOR, marginHorizontal: 4 }}>
            </MaterialIcons>
          </TouchableOpacity>

        </View>
        }

      </View>

    </View>

  </>)
};

export default AllergiesItem;
