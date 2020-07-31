import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Image,
  Alert,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import colors from "../colors";

export default class TodoModal extends Component {
  state = {
    newTodo: "",
  };

  toggleTodoCompleted = (index) => {
    let list = this.props.list;
    list.todos[index].completed = !list.todos[index].completed;

    this.props.updateList(list);
  };

  addTodo = () => {
    let list = this.props.list;
    list.todos.push({ title: this.state.newTodo, completed: false });

    this.props.updateList(list);
    this.setState({ newTodo: "" });

    Keyboard.dismiss();
  };

  deleteTodo = (index) => {
    let list = this.props.list;
    list.todos.splice(index, 1);

    this.props.updateList(list);
  };

  CheckTextInput = () => {
    //Handler for the Submit onPress
    if (this.state.newTodo != "") {
      //Check for the Name TextInput
      if (this.state.newTodo != "") {
        //Check for the Email TextInput
        this.addTodo();
      }
    } else {
      Alert.alert("It's empty! ", "Please insert a task :) ");
    }
  };

  listEmptyComponent = () => (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        resizeMode: "stretch",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        style={{
          width: 250,
          height: 250,
          justifyContent: "center",
          paddingBottom: 15,
        }}
        source={require("../assets/spacerocket.png")}
      />
      <Text
        style={{
          marginTop: 50,
          fontSize: 18,
          textAlign: "center",
          color: colors.blue,
          fontWeight: "bold",
        }}
      >
        Uh Oh! You don't have any task to be accomplished! To take off, please
        insert a new task and enjoy having full control of your time!
      </Text>
    </View>
  );

  renderTodo = (todo, index) => {
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
          <Ionicons
            name={todo.completed ? "ios-checkbox" : "ios-square-outline"}
            size={24}
            color={todo.completed ? colors.green : colors.gray}
            style={{ width: 32 }}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.todo,
            { color: todo.completed ? colors.gray : colors.black },
            { textDecorationLine: todo.completed ? "line-through" : "none" },
          ]}
        >
          {todo.title}
        </Text>
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}
        >
          <TouchableOpacity onPress={() => this.deleteTodo(index)}>
            <AntDesign name="delete" size={16} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const list = this.props.list;

    const taskCount = list.todos.length;
    const completedCount = list.todos.filter((todo) => todo.completed).length;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={{ position: "absolute", top: 54, right: 32, zIndex: 10 }}
            onPress={this.props.closeModal}
          >
            <AntDesign name="close" size={24} color={colors.black} />
          </TouchableOpacity>

          <View
            style={[
              styles.section,
              styles.header,
              { borderBottomColor: list.color },
            ]}
          >
            <View>
              <Text style={styles.title}>{list.name}</Text>
              <Text style={styles.taskCount}>
                {completedCount} of {taskCount} tasks completed!
              </Text>
            </View>
          </View>

          <View style={[styles.section, { flex: 3 }]}>
            <FlatList
              data={list.todos}
              renderItem={({ item, index }) => this.renderTodo(item, index)}
              keyExtractor={(_, index) => index.toString()}
              contentContainerStyle={{
                paddingHorizontal: 28,
                paddingVertical: 38,
              }}
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={() => this.listEmptyComponent()}
            />
          </View>

          <View style={[styles.section, styles.footer]}>
            <TextInput
              style={[styles.input, { borderColor: list.color }]}
              onChangeText={(text) => this.setState({ newTodo: text })}
              value={this.state.newTodo}
            />

            <TouchableOpacity
              style={[styles.addTodo, { backgroundColor: list.color }]}
              onPress={this.CheckTextInput}
            >
              <AntDesign name="plus" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
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
  section: {
    alignSelf: "stretch",
  },
  header: {
    paddingTop: 50,
    justifyContent: "flex-end",
    marginLeft: 64,
    borderBottomWidth: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: colors.gray,
    fontWeight: "bold",
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 2,
    borderRadius: 12,
    marginRight: 8,
    paddingHorizontal: 8,
    marginBottom: 30,
  },
  addTodo: {
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  todo: {
    color: colors.black,
    fontWeight: "700",
    fontSize: 16,
  },
});
