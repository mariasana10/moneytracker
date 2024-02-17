import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const AnimatedGirlDoll = ({message}) => {
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <FontAwesome name="comment" size={80} color="#fff" style={styles.icon} />
        <Text style={styles.text}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubble: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AnimatedGirlDoll;
