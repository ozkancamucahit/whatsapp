
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
              <Link href="(modals)/NewChat" asChild>
                <TouchableOpacity>
                  <Ionicons name="add-circle" color={Colors.primary} size={30} />
                </TouchableOpacity>
              </Link>
            </View>
          ),
        }}
      />

      <Stack.Screen name='[id]' options={{
        title: '',
        headerBackTitleVisible: false,
        headerStyle: {backgroundColor: Colors.background},
        headerRight: ( ) => (
          <View style={{ flexDirection: 'row', gap: 30 }}>
              <TouchableOpacity>
                <Ionicons name="videocam-outline" color={Colors.primary} size={30} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="call-outline" color={Colors.primary} size={30} />
              </TouchableOpacity>
            </View>
        ),
        headerTitle: () => (
          <View style={{
            flexDirection: 'row',
            gap:10,
            paddingBottom: 4,
            alignItems: 'center',
            width: 220
          }}>
            <Image source={{uri: 'asdas'}} style={{width: 40, height: 40, borderRadius: 50}} />
            <Text style={{fontSize: 16, fontWeight: '500'}}>Meccu Ozkanca</Text>
          </View>
        )
      }} />

    </Stack>
  );
}

export default _layout

const styles = StyleSheet.create({})



