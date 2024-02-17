import React from "react";
import { View, Button, StyleSheet } from "react-native";
import TextInput from "../../components/TextInput";
import { useForm } from "react-hook-form";
import apiClient from "../../apiClient";
import { endpoints } from "../../helper/ApiEndPoint";
import { useNavigation } from "@react-navigation/native";

const SignUpForm = () => {

    const navigation = useNavigation()
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (values) => {

        let data = { email: values.Email, password: values.Password, name: values.name, phone: values.phone }
        if (values.Password !== values.confirm_password) {
            return alert("Password not matched")
        }
        apiClient.post(`${endpoints().userAPI}/signup`,data, async(error, response)=>{
            if(response){
                navigation.navigate("Login")
            }

        })
    };

    return (
        <View style={styles.container}>

            <TextInput
                name={"Email"}
                placeholder="Email"
                control={control}
            />

            <TextInput
                name={"Password"}
                placeholder="Password"
                secureTextEntry={true}
                control={control}

            />

            <TextInput
                name={"confirm_password"}
                placeholder="Confirm Password"
                secureTextEntry
                control={control}

            />

            <TextInput
                name={"name"}
                placeholder="Full Name"
                control={control}

            />

            <TextInput
                name={"phone"}
                placeholder="Phone Number"
                control={control}
                keyboardType="numeric"
            />
            <Button title="Sign Up" onPress={handleSubmit(onSubmit)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
});

export default SignUpForm;
