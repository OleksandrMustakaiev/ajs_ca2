// import React from 'react';
// import { StyleSheet } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import Home from './home/index';
// import Search from './search/index';
// import Profile from './profile';
// // import Categories from './categories/index';

// const Tab = createBottomTabNavigator();

// export default function Nav() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen
//         name="home"
//         component={Home}
//         options={{
//           tabBarLabel: '',
//           headerShown: false,
//           tabBarIcon: ({ color, size }) => {
//             return <Icon name="home" size={size} color={color} />;
//           },
//         }}
//       />
//       <Tab.Screen
//         name="search"
//         component={Search}
//         options={{
//           tabBarLabel: '',
//           headerShown: false,
//           tabBarIcon: ({ color, size }) => {
//             return <Icon name="search-web" size={size} color={color} />;
//           },
//         }}
//       />
//       <Tab.Screen
//         name="profile"
//         component={Profile}
//         options={{
//           tabBarLabel: '',
//           headerShown: false,
//           tabBarIcon: ({ color, size }) => {
//             return <Icon name="account" size={size} color={color} />;
//           },
//         }}
//       />
//       {/* <Tab.Screen
//         name="categories"
//         component={Categories}
//         options={{
//           headerShown: false,
//           tabBarButton: () => null,
//         }}
//       /> */}
//     </Tab.Navigator>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });


import { Tabs } from 'expo-router/tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useEffect } from 'react';
// import { useNavigation } from '@react-navigation/native';
export default function AppLayout() {
  // const navigation = useNavigation();

  // useEffect(() => {
  //   navigation.setOptions({ headerShown: false });
  // }, [navigation]);

  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          href: '/',
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          href: '/search',
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return <Icon name="search-web" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: '/profile',
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return <Icon name="account" size={size} color={color} />;
          },
        }}
      />
    </Tabs>
  );
}
