import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon_FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Icon_Octicons from "react-native-vector-icons/Octicons";

import Login from "./screen/Login";
import SingUp from "./screen/SingUp";
import Home from "./screen/Home";
import NewDonate from "./screen/NewDonate";
import Profile from "./screen/Profile";
import Donations from "./screen/Donations";

Icon.loadFont();

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      Sign: createSwitchNavigator({ Login, SingUp }),
      App: createMaterialBottomTabNavigator(
        {
          Home: {
            screen: Home,
            navigationOptions: () => ({
              tabBarIcon: ({ focused }) => (
                <Icon name="home" size={20} color={focused ? "#000" : "#fff"} />
              ),
            }),
          },

          Donate: {
            screen: NewDonate,
            navigationOptions: () => ({
              tabBarIcon: ({ focused }) => (
                <Icon_FontAwesome5
                  name="donate"
                  size={20}
                  color={focused ? "#000" : "#fff"}
                />
              ),
            }),
          },

          Donations: {
            screen: Donations,
            navigationOptions: () => ({
              tabBarIcon: ({ focused }) => (
                <Icon_FontAwesome5
                  name="list"
                  size={20}
                  color={focused ? "#000" : "#fff"}
                />
              ),
            }),
          },

          Profile: {
            screen: Profile,
            navigationOptions: () => ({
              tabBarIcon: ({ focused }) => (
                <Icon_Octicons
                  name="person"
                  size={20}
                  color={focused ? "#000" : "#fff"}
                />
              ),
            }),
          },
        },
        {
          activeColor: '#000',
          barStyle: { backgroundColor: '#88b6a3' },
        }
      ),
    },
    {
      initialRouteName: "Sign",
    }
  )
);

export default Routes;
