import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import FoodCard from "../Cards/FoodCard";

const ProductListView = ({
  foods,
  size,
  horizontal,
  didSelectItem,
  didAddToCart,
  didAddRemove,
  cartItems,
  disable,
}) => {
  return (
    <FlatList
      horizontal={horizontal ? true : false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={foods}
      renderItem={(item, i) => (
        <FoodCard
          key={`${i}`}
          size={size}
          data={item}
          cartItems={cartItems}
          disable={disable}
          onSelect={didSelectItem}
          onAddToCart={didAddToCart}
          didAddRemove={didAddRemove}
        />
      )}
      keyExtractor={(item) => item._id}
    />
  );
};

export default ProductListView;
