import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const HomeTab = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to Home Page</Text>
        </View>
    )
}

export default HomeTab

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#213743',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
})
