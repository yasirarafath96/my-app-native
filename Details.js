import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useRoute, useNavigation } from "@react-navigation/native";

const Details = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;
  const employee = useSelector((state) =>
    state.employees.find((emp) => emp.id === id)
  );

  if (!employee) {
    return <Text style={styles.errorText}>Employee not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Employee Details</Text>
      <Text style={styles.detail}>Name: {employee.name}</Text>
      <Text style={styles.detail}>Role: {employee.role}</Text>
      <Text style={styles.detail}>Email: {employee.email}</Text>
      <Text style={styles.detail}>Gender: {employee.gender}</Text>
      <Button
        title="Back"
        onPress={() => navigation.navigate("Home")}
        color="#007BFF"
      />
      <View style={styles.buttonSpacing}>
        <Button
          title="Edit"
          onPress={() =>
            navigation.navigate("EditEmployee", { id: employee.id })
          }
          color="#28a745"
        />
      </View>
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
  detail: {
    fontSize: 18,
    marginBottom: 10,
    color: "#555",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  buttonSpacing: {
    marginTop: 10,
  },
});

export default Details;
