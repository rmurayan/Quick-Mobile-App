// FoodItemsContext.js
import React, { createContext, useState } from 'react';

const FoodItemsContext = createContext();

export const FoodItemsProvider = ({ children }) => {
  const [foodItems, setFoodItems] = useState([]);
  return (
    <FoodItemsContext.Provider value={{ foodItems, setFoodItems }}>
      {children}
    </FoodItemsContext.Provider>
  );
};

export default FoodItemsContext;
