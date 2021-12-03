import React, { useContext, useState } from "react";
import {
    StyleSheet,
    TextInput,
    View,
    Image,
    TouchableOpacity
} from "react-native";
import { Colors } from "../../utils/Colors";


const DoctorSearch = ({ onPress }) => {
    return (
        <View style={styles.searchContainer}>
            <TextInput
                style={styles.searchInput}
                onChangeText={(text) => { }}
                placeholder="Search by doctor name or location"
                placeholderTextColor={Colors.ICONCOLOR}
            />
            <TouchableOpacity onPress={onPress} style={{
                justifyContent: 'center', alignItems: "center",
                position: 'absolute', right: 20,
            }}>
                <Image
                    source={require("../../../assets/mail-filter.png")}
                    style={styles.singleIcon}
                />
            </TouchableOpacity>
        </View>
    );
};

export default DoctorSearch;

const styles = StyleSheet.create({
    searchInput: {
        backgroundColor: Colors.WHITE, height: 50,
        color: "white", width: "100%", paddingLeft: 24,
        borderRadius: 10,
    },
    searchContainer: {
        flexDirection: 'row', alignItems: 'center', marginTop: 10,
        borderRadius: 10,
        elevation: 5, shadowColor: '#999', overflow: 'hidden',
    },
    singleIcon: {
        width: 28, height: 28,
        tintColor: Colors.BLACK,
    },
});