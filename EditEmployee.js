import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployee } from "./employeeSlice";
import { useNavigation, useRoute } from "@react-navigation/native";

const EditEmployee = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;
  const employee = useSelector((state) =>
    state.employees.find((emp) => emp.id === id)
  );

  const [name, setName] = useState(employee ? employee.name : "");
  const [role, setRole] = useState(employee ? employee.role : "");
  const [email, setEmail] = useState(employee ? employee.email : "");
  const [gender, setGender] = useState(employee ? employee.gender : "");

  const handleSubmit = () => {
    const updatedEmployee = { id, name, role, email, gender };
    dispatch(updateEmployee({ id, employee: updatedEmployee }));
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Employee</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Role</Text>
      <TextInput
        style={styles.input}
        placeholder="Role"
        value={role}
        onChangeText={setRole}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Gender</Text>
      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
      />

      <Button title="Save" onPress={handleSubmit} color="#007BFF" />
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
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#FFF",
  },
});

export default EditEmployee;
