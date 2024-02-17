import React from "react";
import { StyleSheet, View, Text, TextInput as RNTextInput } from "react-native";
import { Controller } from 'react-hook-form';

const TextInput = ({ control, name, placeholder, secureTextEntry, onChangeText, keyboardType, values }) => {
    return (
        <View style={{ paddingVertical: 10 }}>
            <Controller
                control={control}
                name={name}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <View>
                        <RNTextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                onChange(e)
                                onChangeText && onChangeText(e)
                            }}
                            onBlur={onBlur}
                            value={value || values}
                            placeholder={placeholder}
                            keyboardType={keyboardType ? keyboardType :"default"}
                            secureTextEntry={secureTextEntry}
                        />
                        {error && <Text style={styles.errorText}>This field is required.</Text>}
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        color: "black",
        height: 50,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#dadae8",
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginTop: 5,
    },
});

export default TextInput;
