import React from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees, deleteEmployee } from "./employeeSlice";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const employees = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
  };

  const handleRefresh = () => {
    dispatch(fetchEmployees());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Employees</Text>
      <Button
        title="Add Employee"
        onPress={() => navigation.navigate("AddEmployee")}
        color="#007BFF"
      />
      <Button
        title="Refresh"
        onPress={handleRefresh}
        color="#28A745"
        style={styles.refreshButton}
      />
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Details", { id: item.id })}
            >
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
            <View style={styles.buttonGroup}>
              <Button
                title="Edit"
                onPress={() =>
                  navigation.navigate("EditEmployee", { id: item.id })
                }
                color="#FFC107"
              />
              <Button
                title="Delete"
                onPress={() => handleDelete(item.id)}
                color="#DC3545"
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  refreshButton: {
    marginTop: 10,
    marginBottom: 20,
  },
  itemContainer: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: "#FFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Home;
