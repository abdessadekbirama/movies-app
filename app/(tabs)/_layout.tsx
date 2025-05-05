import { View, Text, ImageBackground, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "@/constants/icons";

const TabIcon = ({ focused, title, icon }: any) => {
  if (focused) {
    return (
      <View className="flex flex-row gap-2 items-center justify-center  overflow-hidden min-w-[100px] bg-[#352eff] p-4 rounded-full">
        <Image source={icon} tintColor="white"/>
        <Text className="text-white">{title} updtated</Text>
      </View>
    );
  } else {
    return (
      <View className="flex flex-row w-full flex-1 min-w-[112px] min-h-14 justify-center items-center rounded-full overflow-hidden">
        <Image source={icon} tintColor="white" style={{ width: 20, height: 20 }} />
      </View>
    );
  }
};

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard:true,
        tabBarShowLabel: false,
        tabBarStyle:{
          height:50,
          backgroundColor:"#3e0230",
          paddingTop:5,
          borderRadius:9999,
          overflow:'hidden',
          marginHorizontal:10,
          marginBottom:10,
          position:"absolute"

        }
      }}
      
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "home",
          headerShown: false,
          tabBarIcon({ focused }) {
            return <TabIcon focused={focused} icon={icons.home} title="Home" />;
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "search",
          headerShown: false,
          tabBarIcon({ focused }) {
            return (
              <TabIcon focused={focused} icon={icons.search} title="Search" />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "profile",
          headerShown: false,
          tabBarIcon({ focused }) {
            return (
              <TabIcon focused={focused} icon={icons.person} title="Profile" />
            );
          },
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "saved",
          headerShown: false,
          tabBarIcon({ focused }) {
            return (
              <TabIcon focused={focused} icon={icons.save} title="saved" />
            );
          },
        }}
      />
    </Tabs>
  );
};

export default _Layout;
