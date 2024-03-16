// Home.js
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { useEffect,useContext } from "react";
import { getUserId, firestore } from "../Ultis/DB";
import { collection, getDocs } from "firebase/firestore";
import FoodItemsContext from '../FoodItemsContext';
import ScreenTab from "./ScreenTab";
import { showToast } from "../Ultis/utilities";

const Tab = createBottomTabNavigator();

const Home = () => {
  const userUid = getUserId();
  const { foodItems,setFoodItems } = useContext(FoodItemsContext);

  const getItemsByCategory = (category) => {
    return foodItems
      ? foodItems.filter((item) => item.category === category)
      : [];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foodItemsCollection = collection(
          firestore,
          "users",
          userUid,
          "foodItems"
        );

        const querySnapshot = await getDocs(foodItemsCollection);

        const data = querySnapshot.docs.map((doc) => doc.data().items);

        const foodItemsArray = await data.map((item) => JSON.parse(item));
        const flattenedFoodItems = foodItemsArray.flat();
        setFoodItems(flattenedFoodItems);
      } catch (error) {
        showToast("Error", `fetching food items from Firestore`);
      }
    };

    fetchData();
  }, [setFoodItems, userUid]);

  const iconTabSize = 30;
  const iconTabColor = "#FB5F43";
  const headerTabTitleStyle = {
    fontWeight: 700,
    fontSize: 22,
    marginLeft: -10,
  };
  if (foodItems.length === 0) {
    return null;
  }
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#FB5F43",
        headerTitleAlign: "left",
        headerTintColor: "#FB5F43",
        showIcon: true,
        showLabel: false,
        iconStyle: {
          width: 20,
          height: 20,
        },
        tabStyle: {
          margin: 0.2,
          borderRadius: 2,
        },
        tabBarStyle: {
          borderTopWidth: 0,
        },
        headerStyle: {
          backgroundColor: "#fff",
          shadowColor: "#000",
          shadowOpacity: 0.4,
          borderBottomColor: "#54A695",
          borderBottomWidth: 3,
        },
        headerTitleStyle: {
          fontWeight: "700",
          fontSize: 20,
          marginLeft: 5,
        },
      }}
    >
      <Tab.Screen
        name="Fruits"
        options={{
          headerTitleStyle: headerTabTitleStyle,
          headerTitle: "Fruits",
          headerRight: () => null,
          headerLeft: () => (
            <FontAwesome5Icon
              size={iconTabSize}
              color={iconTabColor}
              name="carrot"
              style={{
                marginLeft: 15,
              }}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5Icon size={size} color={color} name="carrot" />
          ),
        }}
      >
        {() => (
          <ScreenTab
            items={getItemsByCategory("Fruit")}
            allIems={foodItems}
            setItems={setFoodItems}
            category={"Fruit"}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Meat"
        options={{
          headerTitleStyle: headerTabTitleStyle,
          headerTitle: "Meat",
          headerLeft: () => (
            <FontAwesome5Icon
              size={iconTabSize}
              color={iconTabColor}
              name="drumstick-bite"
              style={{
                marginLeft: 15,
              }}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5Icon size={size} color={color} name="drumstick-bite" />
          ),
        }}
      >
        {() => (
          <ScreenTab
            items={getItemsByCategory("Meat")}
            allIems={foodItems}
            setItems={setFoodItems}
            category={"Meat"}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Juices"
        options={{
          headerTitleStyle: {
            fontWeight: 700,
            fontSize: 22,
            marginLeft: -10,
          },
          headerTitle: "Juices",
          headerLeft: () => (
            <FontAwesome5Icon
              size={iconTabSize}
              color={iconTabColor}
              name="glass-cheers"
              style={{
                marginLeft: 15,
              }}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5Icon size={size} color={color} name="glass-cheers" />
          ),
        }}
      >
        {() => (
          <ScreenTab
            items={getItemsByCategory("Juice")}
            setItems={setFoodItems}
            category={"Juice"}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Bakery"
        options={{
          headerTitleStyle: headerTabTitleStyle,
          headerTitle: "Bakery",
          headerLeft: () => (
            <FontAwesome5Icon
              size={iconTabSize}
              color={iconTabColor}
              name="bread-slice"
              style={{
                marginLeft: 15,
              }}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5Icon size={size} color={color} name="bread-slice" />
          ),
        }}
      >
        {() => (
          <ScreenTab
            items={getItemsByCategory("Bakery")}
            setItems={setFoodItems}
            category={"Bakery"}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default Home;
