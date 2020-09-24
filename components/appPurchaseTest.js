import React, {useState} from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';

export default function AppPurchaseTest({productId, setProductId}) {
  return (
    <View>
      <Button
        title="purchased"
        onPress={() => setProductId('android.test.purchased')}
      />
      <Button
        title="canceled"
        onPress={() => setProductId('android.test.canceled')}
      />
      <Button
        title="refunded"
        onPress={() => setProductId('android.test.refunded')}
      />
      <Button
        title="item_unavailable"
        onPress={() => setProductId('android.test.item_unavailable')}
      />
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
