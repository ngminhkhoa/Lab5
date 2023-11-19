import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons'
import axios from 'axios';
import { BASE_URL, token } from '../general/generla';

const DetailServiceScreen = ({ route, navigation }) => {
    const [currentService, setCurrentService] = useState(null);

    useEffect(() => {
        const service = route.params.service
        console.log(service);
        setCurrentService(service)
    }, [route.params])

    const handleAction = () => {
        // Action to perform when the action button is pressed
        console.log('Action button pressed');
        // You can add your action logic here
    };

    function deleteService() {
        console.log(currentService);
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        axios.delete(BASE_URL + `services/${currentService._id}`, {
            headers
        })
            .then(response => {
                console.log('Response:', response.data);
                console.log(response.status);
                Alert.alert(
                    'Message',
                    'Delete service successful',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        {
                            text: 'OK',
                            onPress: () => console.log('OK Pressed'),
                        },
                    ],
                    { cancelable: false }
                );
            })
            .catch(error => {
                console.error('Error:', error);
                Alert.alert(
                    'Message',
                    error,
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        {
                            text: 'OK',
                            onPress: () => console.log('OK Pressed'),
                        },
                    ],
                    { cancelable: false }
                );
            });
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: '#fff', padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: 'black', fontSize: 25 }}>Detail Service</Text>
                <Menu>
                    <MenuTrigger>
                        <Icon name="ellipsis-vertical-outline" size={20} color={'black'} />
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption onSelect={() => navigation.navigate('Update', { service: currentService })} text="Update" />
                        <MenuOption onSelect={() => deleteService()} text="Delete" />
                    </MenuOptions>
                </Menu>
            </View>
            <View style={{ flex: 1, padding: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'black', fontSize: 20 }}>Service name: {currentService?.name}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'black', fontSize: 20 }}>Price: {currentService?.price} đ</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'black', fontSize: 20 }}>Time: {currentService?.time}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'black', fontSize: 20 }}>Final update: {currentService?.updatedAt}</Text>
                </View>
            </View>
        </View>
    )
}

export default DetailServiceScreen