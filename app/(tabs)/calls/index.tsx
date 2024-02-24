import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

import calls from '@/assets/data/calls.json'
import { defaultStyles } from '@/constants/Styles'
import { format } from 'date-fns'
import { SegmentedControl } from '@/components/SegmentedControl'
import Animated, { CurvedTransition, FadeInUp, FadeOutUp } from 'react-native-reanimated'

type Props = {}


const transition = CurvedTransition.delay(60);


const Calls = (props: Props) => {

  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState(calls);
  const [selectedOption, setselectedOption] = useState('All');

  const onEdit = () => {
    let editingNew = !isEditing;
    setIsEditing(editingNew);

  }

  useEffect(() => {
  
    if(selectedOption === 'All'){
      setItems(calls);
    }else{
      setItems(calls.filter((item) => item.missed));
    }



  }, [selectedOption]);
  


  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <SegmentedControl
              options={["All", "Missed"]}
              selectedOption={selectedOption}
              onOptionPress={setselectedOption}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={onEdit}>
              <Text style={{ color: Colors.primary, fontSize: 17 }}>
                {isEditing ? "Done" : "Edit"}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View style={defaultStyles.block}>
          <Animated.FlatList
            data={items}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            itemLayoutAnimation={transition}
            skipEnteringExitingAnimations
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
            renderItem={({ item }) => (
              <Animated.View entering={FadeInUp} exiting={FadeOutUp} >
                <View
                  style={[
                    defaultStyles.item,
                    { backgroundColor: Colors.background },
                  ]}
                >
                  <Image source={{ uri: item.img }} style={styles.avatar} />

                  <View style={{ flex: 1, gap: 2, flexDirection: "column" }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: item.missed ? Colors.red : "#000",
                      }}
                    >
                      {item.name}
                    </Text>
                    <View style={{ flexDirection: "row", gap: 4 }}>
                      <Ionicons
                        name={item.video ? "videocam" : "call"}
                        size={16}
                        color={Colors.gray}
                      />
                      <Text style={{ color: Colors.gray, flex: 1 }}>
                        {item.incoming ? "Incoming" : "Outgoing"}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      gap: 6,
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: Colors.gray }}>
                      {format(item.date, "dd.MM.yy")}
                    </Text>
                    <Ionicons
                      name="information-circle-outline"
                      size={24}
                      color={Colors.primary}
                    />
                  </View>
                </View>
              </Animated.View>
            )}
          ></Animated.FlatList>
        </View>
      </ScrollView>
    </View>
  );
}

export default Calls

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});