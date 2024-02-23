import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

type Props = {}
 
export type BoxedIconProps = {
  name : typeof Ionicons.defaultProps;
  backgroundColor :string;
};

const BoxedIcon = ({name, backgroundColor}: BoxedIconProps) => {



  return (
    <View style={{backgroundColor, padding: 4, borderRadius: 6}}>
      <Ionicons name={name} size={20} color="white" />
    </View>
  )
}

export default BoxedIcon

const styles = StyleSheet.create({})