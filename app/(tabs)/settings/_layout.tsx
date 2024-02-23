
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import Colors from '@/constants/Colors'

type Props = {}

const _layout = (props: Props) => {
  return (
    <Stack>
      <Stack.Screen name='index' 
      options={{
        title: 'Settings',
        headerLargeTitle: true,
        headerShadowVisible: false,
        headerStyle: {backgroundColor: Colors.background},
        headerSearchBarOptions:{
          placeholder: 'Search'
        }
        }} />
    </Stack>
  )
}

export default _layout

const styles = StyleSheet.create({})



