import React from 'react';
import { Image, Text, Animated, View, Pressable } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// Screens
import HomeScreen from '../screens/Bottomtabs/HomeScreen';
import ProfileScreen from '../screens/Bottomtabs/ProfileScreen';
import Attendance from '../screens/Bottomtabs/Attendance';
import Imprest_Expense from '../screens/Bottomtabs/Imprest_Expense';

const Tab = createBottomTabNavigator();

// Icons
const icons = {
  home: require('../assets/icons/home.png'),
  user: require('../assets/icons/user.png'),
  attendance: require('../assets/icons/attendance.png'),
  imprest: require('../assets/icons/imprest.png'),
  tasks: require('../assets/icons/tasks.png'),
  support: require('../assets/icons/support.png'),
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 75,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarShowLabel: true,
        tabBarButton: (props) => (
          <AnimatedTabButton {...props} route={route} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Attendance" component={Attendance} />
      <Tab.Screen name="Imprest" component={Imprest_Expense} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Custom Animated Tab Button Component
function AnimatedTabButton({ route, onPress }) {
  const isFocused = useIsFocused();

  const scaleAnim = React.useRef(
    new Animated.Value(isFocused ? 1.2 : 1)
  ).current;

  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: isFocused ? 1.2 : 1,
      useNativeDriver: true,
      speed: 12,
      bounciness: 6,
    }).start();
  }, [isFocused]);

  const iconSource =
    route.name === 'Home'
      ? icons.home
      : route.name === 'Attendance'
        ? icons.attendance
        : route.name === 'Imprest'
          ? icons.imprest
          : route.name === 'Profile'
            ? icons.user
            : icons.user;

  return (
    <Pressable
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={onPress}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Image
          source={iconSource}
          style={{
            width: isFocused ? 28 : 24,
            height: isFocused ? 28 : 24,
            tintColor: isFocused ? '#000' : '#888',
          }}
        />
      </Animated.View>

      <Text
        style={{
          fontSize: isFocused ? 13 : 11,
          color: isFocused ? '#000' : '#888',
          fontWeight: isFocused ? '700' : '500',
          marginTop: 2,
        }}
      >
        {route.name}
      </Text>
    </Pressable>
  );
}
