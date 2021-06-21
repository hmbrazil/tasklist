import { CommonActions } from '@react-navigation/native';
import React, { useState } from 'react';
import { 
    KeyboardAvoidingView,
    View,
    Image,
    TextInput,
    Button,
    Text,
    StyleSheet, 
    Alert
} from 'react-native';
import { signInOnFirebaseAsync } from '../services/FirebaseApi';

const img = require('../assets/TodoList.png');

const Login = props => {

    const [email, setEmail] = useState(props.email);
    const [password, setPassword] = useState('');

    const signInAsync = async () => {
        try {
            const user = await signInOnFirebaseAsync(email, password);
            Alert.alert(
                `Usuário Autenticado`,
                `O usuário ${user.user.email} foi autenticado com sucesso!`
            );

            props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'TaskList' }]
                }),
            );

        } catch (error) {
            Alert.alert(`Falha no login`, error.message);
        }
    };

    return(
        <KeyboardAvoidingView style = {styles.container} behavior = "padding">
            <View style = {styles.topView}>
                <Image style = {styles.img} source = { img } />
            </View>
            <View style = {styles.bottomView}>
                <TextInput
                    style = {styles.input}
                    placeholder = "Email"
                    value = { email }
                    keyboardType = { 'email-address' }
                    autoCaptalize = "none"
                    onChangeText = { text => setEmail(text) }
                />
                <TextInput
                    style = {styles.input}
                    placeholder = "Password"
                    securityTextEntry = {true}
                    value = { password }
                    onChangeText = { password => setPassword(password) }
                />
                <Button 
                    title = "Entrar" 
                    onPress = { () =>
                        signInAsync()
                    }
                />
                <View style = {styles.textConteiner}>
                    <Text>Não é membro?</Text>
                    <Text style = {styles.textRegister}
                        onPress= { () => {
                            props.navigation.navigate('Register');
                        }}>
                        Registre-se
                    </Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },

    topView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
    },

    img: {
        width: 200,
        height: 200
    },

    bottomView: {
        flexDirection: 'column',
        paddingRight: 20,
        paddingLeft: 20
    },

    input: {
        marginBottom: 20
    },

    textConteiner: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },

    textRegister: {
        fontWeight: 'bold'
    }
});

export default Login;