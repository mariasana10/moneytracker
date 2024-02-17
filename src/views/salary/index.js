import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Layout from '../../components/Layout';
import { useForm } from 'react-hook-form';
import TextInput from '../../components/InputText';
import apiClient from '../../apiClient';
import { endpoints } from '../../helper/ApiEndPoint';
import AsyncStorageObject from '../../lib/AsyncStorage';
import AsyncStorage from '../../helper/AsyncStorage';
import { useNavigation } from '@react-navigation/native';

const SalaryForm = () => {
    const [detail, setDetail] = useState(null);
    const [totalRemainingAmount, setTotalRemainingAmount] = useState(detail?.rechargeAmount || "");
    const [salary, setSalary] = useState("")
    const [pg, setPg] = useState("")
    const [recharge, setRecharge] = useState(detail?.rechargeAmount || "")
    const navigation = useNavigation();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({});

    useEffect(() => {
        getDetails();
    }, []);

    const Submit = async (values) => {
        const userId = await AsyncStorageObject.getItem(AsyncStorage.USER_ID);
        let data = {
            pgAmount: values.pg,
            rechargeAmount: values.recharge,
            salary: values.salary,
            userId: userId,
            remainingAmount : totalRemainingAmount
        };
        apiClient.post(`${endpoints().salaryAPI}/create`, data, async (error, response) => {
            if (response && response.data) {
                navigation.navigate('Dashboard');
            }
        });
    };

    const getDetails = async () => {
        const userId = await AsyncStorageObject.getItem(AsyncStorage.USER_ID);
        apiClient.get(`${endpoints().salaryAPI}/${userId}`, async (error, response) => {
            if (response && response.data) {
                setDetail(response.data);
                calculateRemainingAmount(response.data.salary, response.data.pgAmount, response.data.rechargeAmount);
            }
        });
    };

    const handleSalaryChange = (value) => {
        setSalary(value);
        setTotalRemainingAmount(value)
    }

    const handlePgChange = (value) => {
        setPg(value)
        setTotalRemainingAmount(salary - value)
    }

    const handleRechargeChange = (value) => {
        setRecharge(value)
        setTotalRemainingAmount(salary - pg - value)
    }

    return (
        <Layout title={'Salary'} bottomToolBar>
            <ScrollView>
                <View style={styles.container}>
                    <TextInput
                        title="Salary"
                        required
                        name={'salary'}
                        keyboardType="numeric"
                        placeholder={'Enter Salary'}
                        values={salary ? salary : detail?.salary}
                        control={control}
                        onChangeText={(value) => handleSalaryChange(value)}
                    />

                    <TextInput
                        title="PG Amount"
                        name={'pg'}
                        required
                        keyboardType="numeric"
                        values={pg ? pg : detail?.pagAmount}
                        placeholder={'Enter PG Amount'}
                        control={control}
                        onChangeText={(value) => handlePgChange(value)}
                    />

                    <TextInput
                        title="Recharge Amount"
                        name={'recharge'}
                        keyboardType="numeric"
                        values={recharge ? recharge : detail?.rechargeAmount}
                        required
                        placeholder={'Enter Recharge Amount'}
                        control={control}
                        onChangeText={(value) => handleRechargeChange(value)}
                    />

                    <TextInput
                        title="Total Remaining Amount"
                        name={'totalRemainingAmount'}
                        keyboardType="numeric"
                        values={totalRemainingAmount ? totalRemainingAmount.toString() : detail?.remaining_amount.toString()}
                        editable={false}
                        control={control}
                    />
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit(Submit)}>
                <Text style={styles.saveButtonText}>Save Common Expenses</Text>
            </TouchableOpacity>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 16,
        width: '100%',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#dadae8',
        marginBottom: 12,
        paddingHorizontal: 10,
    },
    saveButton: {
        backgroundColor: 'green',
        borderRadius: 4,
        paddingVertical: 12,
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default SalaryForm;
