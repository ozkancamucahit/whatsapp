
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import chats from '@/assets/data/chats.json'
import { defaultStyles } from '@/constants/Styles'
import ChatRow from '@/components/ChatRow'


type Props = {}

const Chats = (props: Props) => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingBottom: 30, backgroundColor: '#FFF' }}
    >
      <FlatList data={chats} 
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={[defaultStyles.separator, {marginLeft: 90}]} />}
        renderItem={({item}) => <ChatRow {...item} /> }>

      </FlatList>
    </ScrollView>
  );
}

export default Chats

const styles = StyleSheet.create({})