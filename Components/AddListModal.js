import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../colors";

export default class AddListModal extends Component {
  backgroundColors = [
    "#6E44FF",
    "#F45B69",

    "#2f8965",
    "#336699",

    "#00A6A6",
    "#283D3B",

    "#9AA0A8",
    "#565676",
  ];

  state = {
    name: "",
    color: this.backgroundColors[0],
  };

  createTodo = () => {
    const { name, color } = this.state;

    const list = { name, color };

    this.props.addList(list);

    this.setState({ name: "" });
    this.props.closeModal();
  };
  CheckTextInput = () => {
    //Handler for the Submit onPress
    if (this.state.name != "") {
      //Check for the Name TextInput
      this.createTodo();
    } else {
      Alert.alert("Uh, Oh!  ", "Please insert a List Name! :) ");
    }
  };

  renderColors() {
    return this.backgroundColors.map((color) => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.colorSelect, { backgroundColor: color }]}
          onPress={() => this.setState({ color })}
        />
      );
    });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <TouchableOpacity
          style={{ position: "absolute", top: 54, right: 32 }}
          onPress={this.props.closeModal}
        >
          <AntDesign name="close" size={24} color={colors.black} />
        </TouchableOpacity>

        <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
          <Text style={styles.title}>
            New{" "}
            <Text style={{ fontWeight: "bold", color: this.state.color }}>
              List
            </Text>
          </Text>
          <TextInput
            style={[styles.input, { borderColor: this.state.color }]}
            placeholder="List Name"
            onChangeText={(text) => this.setState({ name: text })}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 14,
              width: " 90%",
              alignSelf: "center",
            }}
          >
            {this.renderColors()}
          </View>

          <TouchableOpacity
            style={[styles.create, { backgroundColor: this.state.color }]}
            onPress={this.CheckTextInput}
          >
            <Text style={{ color: colors.white, fontWeight: "bold" }}>
              Create!
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "400",
    color: colors.black,
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: 2,
    borderRadius: 12,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
    width: "90%",
    alignSelf: "center",
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    alignSelf: "center",
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 8,
  },
});
