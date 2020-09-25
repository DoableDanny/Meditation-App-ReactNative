import React, {useState} from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';

export default function AppPurchaseTest({productId, setProductId}) {
  return (
    <View>
      <Button title="test_1" onPress={() => setProductId('test_1')} />
      <Button title="test_2" onPress={() => setProductId('test_2')} />
      <Button title="test_3" onPress={() => setProductId('test_3')} />
      <Button title="test_4" onPress={() => setProductId('test_4')} />
      <Button title="test_5" onPress={() => setProductId('test_5')} />
      <Text style={styles.text}>{productId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 25,
    margin: 30,
    textAlign: 'center',
  },
});
