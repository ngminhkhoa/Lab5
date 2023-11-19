import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BASE_URL } from '../general/generla';
import Icon from 'react-native-vector-icons/Ionicons'


const HomeScreen = ({ navigation }) => {

    const [services, setServices] = useState([])

    function getServices() {
        axios.get(BASE_URL + "services")
            .then(response => {
                console.log('Response:', response.data);
                console.log(response.status);
                setServices(response.data)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        getServices()
    },[])

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: 'black', fontSize: 25 }}>Danh sách dịch vụ</Text>
                <View style={{ flex: 1 }}></View>
                <TouchableOpacity onPress={() => navigation.navigate("Add")}>
                    <View style={{
                        width: 35,
                        height: 35,
                        borderRadius: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'red'
                    }}>
                        <Icon name="add-outline" size={20} color={'white'} />
                    </View>
                </TouchableOpacity>
            </View>
            {
                services.length === 0 ? <Text style={{ color: 'black' }}>Not find any services</Text> :
                    <FlatList
                        style={{ marginTop: 15 }}
                        data={services}
                        keyExtractor={(item, index) => index}
                        renderItem={(item) => {
                            const service = item.item;
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate('Detail', { service })}>
                                    <View style={{
                                        borderColor: 'black',
                                        borderWidth: 2,
                                        borderRadius: 5,
                                        padding: 10,
                                        margin: 5,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ flex: 1, fontSize: 19, color: 'black' }}>{service.name}</Text>
                                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 17, color: 'black' }}>{service.price} đ</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }} />
            }

        </View>
    )
}

export default HomeScreen