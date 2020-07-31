import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
  Image,
} from "react-native";
import colors from "./colors";
import { AntDesign } from "@expo/vector-icons";
import TodoList from "./Components/TodoList";
import AddListModal from "./Components/AddListModal";
import Fire from "./Fire";

export default class App extends React.Component {
  state = {
    addTodoVisible: false,
    lists: [],
    user: {},
    loading: true,
  };

  listEmptyComponent = () => (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
      }}
    >
      <Image
        style={[
          styles.addList,
          {
            height: 150,
            width: 150,
            alignSelf: "center",
            marginBottom: 30,
            borderColor: colors.nice,
            borderRadius: 150,
          },
        ]}
        source={require("./assets/icon.png")}
      />
      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          color: colors.blue,
          fontWeight: "bold",
        }}
      >
        Add a new List to start!
      </Text>
    </View>
  );

  componentDidMount() {
    firebase = new Fire((error, user) => {
      if (error) {
        return alert("Ups, something went wrong, sorry!");
      }

      firebase.getLists((lists) => {
        this.setState({ lists, user }, () => {
          this.setState({ loading: false });
        });
      });

      this.setState({ user });
    });
  }

  componentWillUnmount() {
    firebase.detach();
  }

  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }

  renderList = (list) => {
    return (
      <TodoList
        list={list}
        updateList={this.updateList}
        deleteList={this.deleteList}
      />
    );
  };

  addList = (list) => {
    firebase.addList({
      name: list.name,
      color: list.color,
      todos: [],
    });
  };

  updateList = (list) => {
    firebase.updateList(list);
  };

  deleteList = (list) => {
    firebase.deleteList(list);
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.blue} />
          <Text
            style={{
              paddingTop: 50,
              color: colors.blue,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Loading your lists!
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Modal
          animationType="fade"
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodoModal()}
        >
          <AddListModal
            closeModal={() => this.toggleAddTodoModal()}
            addList={this.addList}
          />
        </Modal>

        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            My{" "}
            <Text style={{ fontWeight: "300", color: colors.blue }}>Lists</Text>
          </Text>
          <View style={styles.divider} />
        </View>

        <View style={{ marginVertical: 48 }}>
          <TouchableOpacity
            style={styles.addList}
            onPress={() => this.toggleAddTodoModal()}
          >
            <AntDesign name="plus" size={20} color={colors.blue} />
          </TouchableOpacity>

          <Text style={styles.add}>Add List</Text>
        </View>

        <View style={{ height: 275, justifyContent: "center" }}>
          <FlatList
            data={this.state.lists}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.renderList(item)}
            keyboardShouldPersistTaps="always"
            ListEmptyComponent={() => this.listEmptyComponent()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: colors.lighBlue,
    height: 2,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: colors.black,
    paddingHorizontal: 64,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lighBlue,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
  },
  add: {
    color: colors.blue,
    fontWeight: "bold",
    marginTop: 8,
  },
});
