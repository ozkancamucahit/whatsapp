
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

type Props = {}

const _layout = (props: Props) => {
  return (
    <Stack>
      <Stack.Screen name='index' 
      options={{
        title: 'Calls',
        headerLargeTitle: true,
        headerShadowVisible: false,
        headerRight: () => (
          <TouchableOpacity>
            <Ionicons name='call-outline' color={Colors.primary} size={30} />
          </TouchableOpacity>
        ),
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



