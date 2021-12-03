import React, {useState, useEffect, useRef} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  NEW_PRIMARY_BACKGROUND,
  INPUT_PLACEHOLDER,
  SECONDARY_COLOR,
  NEW_PRIMARY_COLOR,
  GREY_BACKGROUND,
} from '../../../styles/colors';
import moment from 'moment';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {Host} from '../../../utils/connection';
import {useSelector} from 'react-redux';
import {socket} from '../../../utils/socket';
import {Colors} from '../../../styles/colorsV2';


const AppointmentUpcomingItem = ({style, item, navigation}) => {
  const Socket = useRef(socket);
  const {doctor} = item;
  const [ImageSource, setImageSource] = useState('');
  const {userData, theme} = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    if (doctor.picture?.length) {
      setImageSource({
        uri: `${Host}${doctor.picture[0]
          .replace('public', '')
          .replace('\\\\', '/')}`,
      });
    } else {
      setImageSource(require('../../../assets/jpg/person1.jpg'));
    }
  }, [doctor]);

  
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DoctorProfile', {data: doctor})}>
      <View style={[styles.mainContainer, style ?? {}]}>
        <Image
          source={ImageSource}
          style={{height: 70, width: 70, borderRadius: 35, margin: 10}}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'space-evenly',
            margin: 10,
          }}>
          <Text style={[styles.docName, {color: Colors.primary_text_color[theme],}]}>{doctor.basic.name}</Text>
          <Text style={[styles.docSpeciality, {color: Colors.primary_text_color[theme],}]}>{doctor.specialty}</Text>
          <Text style={[styles.appointmentName, {color: Colors.primary_text_color[theme],}]}>{doctor.appointmentName}</Text>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => {
              Socket.current.emit('add_empty_convo', {
                from: userData._id,
                to: doctor._id,
                message: '',
                toType: 'doctor',
                fromType: 'patient',
              });
              setTimeout(() => {
                navigation.navigate('Chats');
              }, 3000);
            }}>
            <Image
              source={require('../../../assets/icons/chat.png')}
              style={{
                height: 25,
                width: 25,
                marginBottom: 7,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginRight: '4%',
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 12,
                  color: '#ef786e',
                }}>
                {moment(item.bookedFor).format('dddd, ')}
              </Text>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 12,
                  color: '#ef786e',
                }}>
                {moment(item.bookedFor).format('MMM DD')}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 10,
                color: '#ef786e',
                textAlign: 'right',
              }}>
              {moment(item.bookedFor).format('hh:mm a')}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ConfirmAppointment', {
                showOnlyData: item,
                showOnly: true,
                onBackPress: () => {
                  navigation.navigate('Appointments');
                },
              })
            }>
            <View
              style={[
                {marginTop: '12%'},
                // styles.iconContainer,
                // { backgroundColor: NEW_PRIMARY_BACKGROUND },
              ]}>
              <Image
                source={require('../../../assets/icons/back.png')}
                style={{
                  height: 17,
                  width: 17,
                  transform: [{rotateZ: '180deg'}],
                }}
                resizeMode="contain"
              />
              {/* <Image
                  source={require('../../../assets/icons/doc.png')}
                  style={{
                    height: 15,
                    width: 12,
                  }}
                  resizeMode="contain"
                /> */}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AppointmentUpcomingItem;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    padding: 7,
    borderRadius: 14,
    flexDirection: 'row',
    // borderWidth: 1,
  },
  docName: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
  },
  docSpeciality: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
  },
  appointmentName: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: NEW_PRIMARY_BACKGROUND,
  },
});
