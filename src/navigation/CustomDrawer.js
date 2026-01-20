import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useSelector } from "react-redux";

export default function CustomDrawer(props) {
  const user = useSelector((state) => state.user);

  // ✅ FIXED ACTIVE ROUTE LOGIC
  const drawerRoute = props.state.routeNames[props.state.index];
  const nestedRoute =
    props.state.routes[props.state.index]?.state?.routes[
      props.state.routes[props.state.index]?.state?.index
    ]?.name;

  const icons = {
    Home: require("../assets/icons/home.png"),
    Profile: require("../assets/icons/user.png"),
    "Critical Tasks": require("../assets/icons/tasks.png"),
    "Tech Support": require("../assets/icons/support.png"),
    Logout: require("../assets/icons/hidden.png"),
  };

  const MenuItem = ({ label, navigateTo }) => {
    const isActive =
      navigateTo === "HomeTabs"
        ? nestedRoute === label
        : drawerRoute === navigateTo;

    return (
      <Pressable
        android_ripple={{ color: "#E3EBFF" }}
        onPress={() => {
          if (navigateTo === "HomeTabs") {
            props.navigation.navigate("HomeTabs", { screen: label });
          } else {
            props.navigation.navigate(navigateTo);
          }
        }}
        style={[
          styles.menuItem,
          isActive && styles.activeItem,
        ]}
      >
        {/* LEFT ACTIVE BAR */}
        {isActive && <View style={styles.activeBar} />}

        <Image
          source={icons[label]}
          style={[
            styles.icon,
            isActive && styles.activeIcon,
          ]}
        />

        <Text
          style={[
            styles.menuLabel,
            isActive && styles.activeLabel,
          ]}
        >
          {label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>

      {/* ================= HEADER ================= */}
      <View style={styles.header}>
        <Image
          source={{
            uri:
              user.profilePic ||
              "https://cdn-icons-png.flaticon.com/512/4140/4140037.png",
          }}
          style={styles.profilePic}
        />

        <Text style={styles.userName}>{user.name || "Abhay Kumar"}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>

      {/* ================= MENU ================= */}
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.menuContainer}
      >
        <MenuItem label="Home" navigateTo="HomeTabs" />
        <MenuItem label="Profile" navigateTo="HomeTabs" />
        <MenuItem label="Critical Tasks" navigateTo="Critical Tasks" />
        <MenuItem label="Tech Support" navigateTo="Tech Support" />
      </DrawerContentScrollView>

      {/* ================= LOGOUT ================= */}
      <Pressable style={styles.logoutContainer}>
        <Image source={icons.Logout} style={styles.logoutIcon} />
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>

    </View>
  );
}

/* ================= PROFESSIONAL STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
  },

  /* HEADER */
  header: {
    paddingVertical: 36,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderColor: "#E6EAF0",
  },

  profilePic: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 2,
    borderColor: "#E6EAF0",
    marginBottom: 12,
  },

  userName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },

  userEmail: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },

  /* MENU */
  menuContainer: {
    paddingTop: 16,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginHorizontal: 12,
    marginVertical: 4,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },

  activeItem: {
    backgroundColor: "#EEF4FF",
  },

  activeBar: {
    width: 4,
    height: "100%",
    backgroundColor: "#2563EB",
    borderRadius: 4,
    marginRight: 12,
  },

  icon: {
    width: 22,
    height: 22,
    tintColor: "#6B7280",
    marginRight: 16,
  },

  activeIcon: {
    tintColor: "#2563EB",
  },

  menuLabel: {
    fontSize: 15,
    color: "#1F2937",
    fontWeight: "600",
  },

  activeLabel: {
    color: "#2563EB",
    fontWeight: "700",
  },

  /* LOGOUT */
  logoutContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    margin: 14,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F1F3F6",
  },

  logoutIcon: {
    width: 22,
    height: 22,
    tintColor: "#DC2626",
    marginRight: 12,
  },

  logoutText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#DC2626",
  },
});
