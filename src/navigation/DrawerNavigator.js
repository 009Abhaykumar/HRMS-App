import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import TabNavigator from './TabNavigator';
import CustomDrawer from './CustomDrawer';

// Drawer-only screens
import ProfileScreen from '../screens/Bottomtabs/ProfileScreen';
import CriticalTasks from '../screens/DrawerTabs/CriticalTasks';
import TechSupport from '../screens/DrawerTabs/TechSupport';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="HomeTabs" component={TabNavigator} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Critical Tasks" component={CriticalTasks} />
      <Drawer.Screen name="Tech Support" component={TechSupport} />
    </Drawer.Navigator>
  );
}
