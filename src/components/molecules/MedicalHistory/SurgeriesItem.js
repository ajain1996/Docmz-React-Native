import React, {useState}  from 'react';
import { Text, View, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import { INPUT_PLACEHOLDER, NEW_PRIMARY_COLOR } from '../../../styles/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DeleteSurguries } from '../../../reduxV2/action/PatientAction'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import Popconfirm from '../Modal/PopConfirm';
import {Colors} from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';


const SurgeriesItem = ({ data, handleEdit }) => {
  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const isDoctor = false
  const { patient } = useSelector(state => state.PatientReducer)
  const dispatch = useDispatch();

  const handleDelete = (_id) => {
    dispatch(
      DeleteSurguries({
        id: patient.meta._id,
        surgery: data._id
      }))
  }
  const [askConfirmation, setaskConfirmation] = useState(false);

  return (
    <>
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
            {data.surgeryName}
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              fontSize: 13,
              color: Colors.primary_text_color[theme],
              paddingVertical: 2,
            }}>
            {data.surgeonName}
          </Text>
        </View>
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

    </>
  )
};

export default SurgeriesItem;
