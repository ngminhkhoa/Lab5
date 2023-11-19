import { View, Text, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { BASE_URL, token } from '../general/generla';
import axios from 'axios';

const AddServiceScreen = () => {

    const [nameService, setNameService] = useState("");
    const [priceService, setPriceService] = useState(0);

    function addService() {
        console.log(nameService);
        console.log(priceService);

        const data = {
            name: nameService,
            price: priceService
        };

        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        axios.post(BASE_URL + "services", data, {
            headers
        })
            .then(response => {
                console.log('Response:', response.data);
                console.log(response.status);
                Alert.alert(
                    'Message',
                    'Add new service successful',
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
            });
    }

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <Text style={{ color: 'black', fontSize: 25 }}>Add Service</Text>
            <Text>Service name</Text>
            <TextInput style={{ backgroundColor: '#ff0033' }} onChangeText={(data) => setNameService(data)} value={nameService} placeholderTextColor="black" placeholder='Input a service name' />
            <Text>Price</Text>
            <TextInput style={{ backgroundColor: '#ff0033' }} keyboardType='numeric' onChangeText={(data) => setPriceService(data)} value={`${priceService}`} placeholderTextColor="black" placeholder='0' />
            <Button onPress={() => addService()} title='Add' />
        </View>
    )
}

export default AddServiceScreen