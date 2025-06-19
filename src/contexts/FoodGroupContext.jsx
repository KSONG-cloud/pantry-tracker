import React, { useState, createContext, useContext } from "react";



// 1. Create context
const FoodGroupContext = createContext();


// 2. Create provider component
export const FoodGroupProvider = ({ children }) => {
  const [foodGroups, setFoodGroups] = useState([
    'Vegetables',
    'Fruits',
    'Dairy & Eggs',
    'Meat & Seafood',
    'Grains & Pasta',
    'Baked Goods',
    'Legumes & Beans',
    'Oils & Fats',
    'Baking & Spices',
    'Snacks & Sweets',
    'Beverages',
    'Condiments & Sauces',
    'Frozen',
    'Other'
  ]);

  const addGroup = (newGroup) => {
    if (!foodGroups.includes(newGroup)) {
      setFoodGroups(prev => [...prev, newGroup]);
    }
  };

  const renameGroup = (oldName, newName) => {
    setFoodGroups(groups =>
      groups.map(group => (group === oldName ? newName : group))
    );
  };

    const deleteGroup = (index) => {
        const updatedGroups = [...foodGroups];
        updatedGroups.splice(index, 1);
        setFoodGroups(updatedGroups);
    };


  return (
    <FoodGroupContext.Provider value={{ foodGroups, addGroup, renameGroup, deleteGroup }}>
      {children}
    </FoodGroupContext.Provider>
  );
};

// 3. Custom hook to use the context
export const useFoodGroups = () => useContext(FoodGroupContext);

