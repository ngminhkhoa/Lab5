import { View, Text, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import { BASE_URL } from '../general/generla';

const LoginScreen = ({ navigation }) => {

    const data = {
        phone: '0373007856',
        password: '123'
    };

    function login() {
        axios.post(BASE_URL + "auth", data)
            .then(response => {
                console.log('Response:', response.data);
                console.log(response.status);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 20, }}>
            <Text style={{ fontSize: 30 }}>Login</Text>
            <TextInput
                placeholder='Phone'
                onChangeText={(data) => { console.log(data); }} />
            <TextInput
                placeholder='Password'
                onChangeText={(data) => { console.log(data); }} />
            <Button onPress={() => login()} title='Login' />
        </View>
    )
}

export default LoginScreen