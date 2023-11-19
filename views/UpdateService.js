import { View, Text, Button, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import { BASE_URL, token } from '../general/generla';

const UpdateServiceScreen = ({ route, navigation }) => {

    const [currentService, setCurrentService] = useState(null);
    const [nameService, setNameService] = useState("");
    const [priceService, setPriceService] = useState(0);

    useEffect(() => {
        const service = route.params.service
        console.log(service);
        setCurrentService(service)
        setNameService(service.name)
        setPriceService(service.price)
    }, [route.params])

    function updateService() {
        console.log();

        const data = {
            id: currentService._id,
            name: nameService,
            price: priceService
        }

        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        axios.put(BASE_URL + `services/${currentService._id}`, data, {
            headers
        })
            .then(response => {
                console.log('Response:', response.data);
                console.log(response.status);
                Alert.alert(
                    'Message',
                    'Update service successful',
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
        <View style={{ flex: 1, padding: 10 }}>
            <Text style={{ color: 'black', fontSize: 25 }}>Update Service</Text>
            <Text>Service name</Text>
            <TextInput style={{ backgroundColor: '#ff0033' }} onChangeText={(data) => setNameService(data)} value={nameService} placeholderTextColor="black" placeholder='Input a service name' />
            <Text>Price</Text>
            <TextInput style={{ backgroundColor: '#ff0033' }} keyboardType='numeric' onChangeText={(data) => setPriceService(data)} value={`${priceService}`} placeholderTextColor="black" placeholder='0' />
            <Button onPress={() => updateService()} title='Update' />
        </View>
    )
}

export default UpdateServiceScreen