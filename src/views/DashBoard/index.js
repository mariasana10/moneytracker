import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '../../components/Layout';
import apiClient from '../../apiClient';
import { endpoints } from '../../helper/ApiEndPoint';
import AsyncStorageObject from '../../lib/AsyncStorage';
import AsyncStorage from '../../helper/AsyncStorage';
import { format, endOfDay } from 'date-fns';
import AnimatedGirlDoll from '../../components/AnimatedGirlDoll';

const DashBoard = () => {
  const [detail, setDetail] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [userName, setUserName] = useState("");

  const remainingAmount = detail?.remaining_amount - totalAmount;

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    const userId = await AsyncStorageObject.getItem(AsyncStorage.USER_ID);
    const userName = await AsyncStorageObject.getItem(AsyncStorage.USERNAME);
    setUserName(userName)

    apiClient.get(`${endpoints().salaryAPI}/${userId}`, async (error, response) => {
      if (response && response.data) {
        setDetail(response.data);
      }
    });
    apiClient.get(`${endpoints().reportAPI}/search?today=true&object_id=${userId}`, async (error, response) => {
      if (response && response.data && response.data.totalAmount) {
        setTotalAmount(response.data.totalAmount);
      }
    });
  };

  return (
    <Layout
      title={"Dashboard"}
      sidebarOpen={true}
      bottomToolBar={true}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to MoneyTracker {userName}!</Text>
        <Text style={styles.amountText}>
           Your possible remaining amount is: ₹{remainingAmount}
        </Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  amountText: {
    fontSize: 14,
    marginBottom: 20,
  },
});

export default DashBoard;
