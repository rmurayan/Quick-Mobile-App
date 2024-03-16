import { RootSiblingParent } from "react-native-root-siblings";
import Navigator from "./Navigator";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { FoodItemsProvider } from './FoodItemsContext';
import { LogBox } from 'react-native';
const Stack = createStackNavigator();

export default function App() {
  LogBox.ignoreLogs(['onAnimatedValueUpdate']);

  return (
    <RootSiblingParent>
      <FoodItemsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Navigator" screenOptions={{ headerShown: false }} >
          <Stack.Screen name="Navigator" component={Navigator} />
        </Stack.Navigator>
      </NavigationContainer>
      </FoodItemsProvider>
    </RootSiblingParent>
  );
}
