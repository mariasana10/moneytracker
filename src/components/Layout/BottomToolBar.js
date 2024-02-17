import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BottomToolbar = ({ updateMenuState, setSidebarOpen }) => {
  const navigation = useNavigation()
  return (
    <View style={styles.toolbar}>
      <TouchableOpacity onPress={() => updateMenuState()}>
        <Ionicons name="menu" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        setSidebarOpen(false)
        navigation.navigate("Salary")
      }}>
        <Ionicons name="md-receipt" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        setSidebarOpen(false)
        navigation.navigate("Dashboard")
      }}>
        <Ionicons name="home" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default BottomToolbar;
