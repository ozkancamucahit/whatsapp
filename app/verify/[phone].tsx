import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

interface Props {

}

const Page = (props: Props) => {

  const {phone, signin} = useLocalSearchParams<{phone :string, signin: string}>();
  const [code, setCode] = useState('');

  


  return (
    <View>
      <Text>[phone]</Text>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({})