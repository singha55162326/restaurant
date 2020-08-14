import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { Text, Rating } from "react-native-elements";
import AppButton from "../Buttons/AppButton";
import ButtonAddRemove from "../Buttons/AddRemoveButton";

import { urlImage } from "../../utils/AppConst";

const deviceWidth = Math.round(Dimensions.get("window").width);

const FoodCard = ({
  size,
  data,
  onSelect,
  disable = false,
  onAddToCart,
  canAdd = true,
  didAddRemove,
  cartItems,
}) => {
  const { item } = data;

  const { _id, name, images, description, price, readyTime, category } = item;

  let isAdded = false;
  let currentQty = 1;

  let image = urlImage(images[0]);

  const didAddItem = () => {
    onAddToCart();
  };

  const didRemoveItem = () => {};

  const mediumCard = () => {
    return (
      <View style={styles.root}>
        <TouchableOpacity onPress={() => onSelect(item)}>
          <Image style={styles.foodImage} source={{ uri: image }} />
        </TouchableOpacity>
        <Text style={styles.title}>{name}</Text>
      </View>
    );
  };

  const smallCard = () => {
    return (
      <TouchableOpacity
        style={smallStyles.smallCard}
        onPress={() => onSelect(item)}
        disabled={disable}
      >
        <Image style={smallStyles.foodImageSmall} source={{ uri: image }} />
        <View style={smallStyles.productInfo}>
          <Text style={smallStyles.title}>{name}</Text>
          <Text style={smallStyles.resturentTitle}>
            {category.toString().toUpperCase()}
          </Text>
          <Rating
            style={smallStyles.rating}
            type="heart"
            readonly
            ratingCount={5}
            imageSize={20}
          />
        </View>
        <View style={smallStyles.shopView}>
          <Text style={smallStyles.productSize}>₹{price}</Text>
          {cartItems !== undefined &&
            cartItems.map((item) => {
              if (item.food._id.toString() === _id.toString()) {
                isAdded = true;
                currentQty = item.qty;
              }
            })}
          {canAdd && !isAdded && (
            <AppButton
              title="Add"
              width={70}
              onTap={() => onAddToCart(data.item)}
            />
          )}

          {isAdded && (
            <View style={styles.countView}>
              <ButtonAddRemove
                title="-"
                onTap={() => didAddRemove(item, --currentQty)}
              />

              <Text
                h4
                style={{ alignSelf: "center", margin: 5, fontWeight: "600" }}
              >
                {currentQty}
              </Text>
              <ButtonAddRemove
                title="+"
                onTap={() => didAddRemove(item, ++currentQty)}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  switch (size) {
    case "small": // wide card
      return smallCard();
    case "medium": // medium card
      return mediumCard();
    default:
      return mediumCard();
  }
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 10,
  },
  foodImage: {
    borderRadius: 20,
    height: 220,
    width: deviceWidth - 30,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#581845",
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: 10,
    color: "#636363",
  },
  countView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 8,
  },
});

const smallStyles = StyleSheet.create({
  smallCard: {
    flex: 1,
    height: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "white",
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: "500",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  resturentTitle: {
    fontSize: 16,
    display: "flex",
    color: "#565555",
  },
  price: {
    fontSize: 18,
    fontWeight: "400",
    display: "flex",
    color: "#EA5656",
  },
  foodImageSmall: {
    borderRadius: 10,
    height: 99,
    width: 99,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#581845",
    alignSelf: "center",
  },
  rating: {
    alignSelf: "flex-start",
  },
  productInfo: {
    flex: 1,
    padding: 5,
    justifyContent: "space-around",
  },
  shopView: {
    justifyContent: "space-around",
    padding: 10,
    alignItems: "center",
  },
  productSize: {
    fontSize: 20,
    fontWeight: "600",
    color: "#848484",
  },
});

export default FoodCard;
