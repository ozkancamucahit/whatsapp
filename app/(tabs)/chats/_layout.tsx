
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

type Props = {}

const _layout = (props: Props) => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Chats",
          headerLargeTitle: true, 
          headerTransparent: true,
          headerBlurEffect: 'regular',
          headerShown: true,
          headerStyle: { backgroundColor: '#FFF' },
          headerSearchBarOptions: {
            placeholder: "Search",
            textColor: 'black'
          },
          headerLeft: () => (
            <TouchableOpacity>
              <Ionicons 
                name='ellipsis-horizontal-circle-outline'
                color={Colors.primary}
                size={30} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 30 }}>
              <TouchableOpacity>
                <Ionicons name="camera-outline" color={Colors.primary} size={30} />
              </TouchableOpacity>
              <Link href="/" asChild>
                <TouchableOpacity>
                  <Ionicons name="add-circle" color={Colors.primary} size={30} />
                </TouchableOpacity>
              </Link>
            </View>
          ),
        }}
      />
    </Stack>
  );
}

export default _layout

const styles = StyleSheet.create({})



