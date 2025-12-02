import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { DrawerContentScrollView, useDrawerStatus } from '@react-navigation/drawer';
import { useNavigationState } from '@react-navigation/native';

export default function CustomDrawer(props) {

  const handleLogout = () => {
    console.log('Logout pressed');
  };

  const currentRoute = props.state.routeNames[props.state.index];

  const icons = {
    home: require('../assets/icons/home.png'),
    user: require('../assets/icons/user.png'),
    tasks: require('../assets/icons/tasks.png'),
    support: require('../assets/icons/support.png'),
    logout: require('../assets/icons/hidden.png'),
  };

  const profileImage = require('../assets/icons/user.png');

  const MenuItem = ({ label, icon, navigateTo }) => {
    const isActive = currentRoute === navigateTo;

    return (
      <Pressable
        android_ripple={{ color: '#e5e5e5' }}
        onPress={() => {
          if (navigateTo === "HomeTabs" || navigateTo === "ProfileTab") {
            props.navigation.navigate("HomeTabs", { screen: label });
          } else {
            props.navigation.navigate(navigateTo);
          }
        }}
        style={[
          styles.menuItem,
          isActive && { backgroundColor: "#e8f0ff" }, // highlight color
        ]}
      >
        
        
        <Image
          source={icon}
          style={[
            styles.icon,
            isActive && { tintColor: "#0a57ff" }
          ]}
        />
        <Text
          style={[
            styles.menuLabel,
            isActive && { color: "#0a57ff", fontWeight: "800" }
          ]}
        >
          {label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1 }}>

      {/* TOP PROFILE */}
      <View style={styles.header}>
        <Image source={profileImage} style={styles.profilePic} />
        <Text style={styles.userName}>Abhay Kumar</Text>
        <Text style={styles.userEmail}>abhay@gamil.com</Text>
      </View>

      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>

        <MenuItem label="Home" icon={icons.home} navigateTo="HomeTabs" />

        <MenuItem label="Profile" icon={icons.user} navigateTo="HomeTabs" />

        <MenuItem label="Critical Tasks" icon={icons.tasks} navigateTo="Critical Tasks" />

        <MenuItem label="Tech Support" icon={icons.support} navigateTo="Tech Support" />

      </DrawerContentScrollView>

      {/* LOGOUT */}
      <Pressable
        style={styles.logoutBtn}
        android_ripple={{ color: "#ffe0e0" }}
        onPress={handleLogout}
      >
        <Image source={icons.logout} style={styles.icon} />
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>

    </View>
  );
}


const styles = StyleSheet.create({
  header: {
    paddingVertical: 40,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  userEmail: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
    marginVertical: 2,
  },
  menuLabel: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
    fontWeight: '600',
  },
  icon: {
    width: 22,
    height: 22,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  logoutText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#ff3333',
    fontWeight: '700',
  },
});
