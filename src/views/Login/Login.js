import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import TextInput from "../../components/TextInput";
import { useForm } from "react-hook-form";
import apiClient from "../../apiClient";
import { endpoints } from "../../helper/ApiEndPoint";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "../../helper/AsyncStorage";
import AsyncStorageObject from "../../lib/AsyncStorage";

const LoginForm = () => {
    const navigation = useNavigation()

    useEffect(() => {
        (async () => {
            const sessionToken = await AsyncStorageObject.getItem(AsyncStorage.SESSION_TOKEN)
            if (sessionToken) {
                navigation.navigate("Dashboard");
            }
        })();
    }, []);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleLogin = () => {
        let data = { email: email.toLowerCase(), password: password };
        apiClient.post(`${endpoints().userAPI}/login`, data, async (err, response) => {
            if (response && response.data) {
                await AsyncStorageObject.setItem(AsyncStorage.EMAIL, response.data.email)
                await AsyncStorageObject.setItem(AsyncStorage.PHONENUMBER, response.data.phoneNumber)
                await AsyncStorageObject.setItem(AsyncStorage.USERNAME, response.data.fullName)
                await AsyncStorageObject.setItem(AsyncStorage.SESSION_TOKEN, response.data.session_id)
                await AsyncStorageObject.setItem(AsyncStorage.USER_ID, response.data.id.toString())
                navigation.navigate("Dashboard")
                setEmail("")
                setPassword("")
            }
        });
    };

    const handleSignUp = () => {
        navigation.navigate("Signup")
    };

    return (
        <View style={styles.container}>
            <TextInput
                name="Email"
                placeholder="Email"
                value={email}
                control={control}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                name="Password"
                placeholder="Password"
                value={password}
                control={control}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            <Button color="green" title="Login" onPress={handleLogin} />
            <Text style={styles.signUpText}>
                Don't have an account?{" "}
                <Text style={styles.signUpButton} onPress={handleSignUp}>
                    Sign Up
                </Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    signUpText: {
        marginTop: 10,
        textAlign: "center",
    },
    signUpButton: {
        color: "blue",
        textDecorationLine: "underline",
    },
});

export default LoginForm;
