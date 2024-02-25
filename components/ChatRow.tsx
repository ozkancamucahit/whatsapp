import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React, { FC } from 'react'
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import { format } from 'date-fns';
import AppleStyleSwipeableRow from './AppleStyleSwipeableRow';

export interface ChatRowProps {
  id: string;
  from: string;
  date: string;
  img: string;
  msg: string;
  read: boolean;
  unreadCount: number;
}

const ChatRow = (props: ChatRowProps) => {
  return (
    <AppleStyleSwipeableRow>
      <Link href={`/(tabs)/chats/${props.id}`} asChild>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor={Colors.lightGray}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 14,
              paddingLeft: 10,
              paddingVertical: 10,
            }}
          >
            <Image
              source={{ uri: props.img }}
              style={{ width: 50, height: 50, borderRadius: 50 }}
            />

            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {props.from}
              </Text>
              <Text style={{ fontSize: 16, color: Colors.gray }}>
                {props.msg.length > 40
                  ? `${props.msg.substring(0, 40)}...`
                  : props.msg}
              </Text>
            </View>

            <Text
              style={{
                fontSize: 12,
                color: Colors.gray,
                paddingRight: 8,
                alignSelf: "flex-start",
              }}
            >
              {format(props.date, "dd.MM.yyyy")}
            </Text>
          </View>
        </TouchableHighlight>
      </Link>
    </AppleStyleSwipeableRow>
  );
}

export default ChatRow

const styles = StyleSheet.create({})