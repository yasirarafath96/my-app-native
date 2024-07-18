import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { addEventListener } from "@react-native-community/netinfo";
import NetInfo from "@react-native-community/netinfo";
import store from "./store";
import Home from "./Home";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
import Details from "./Details";
import NoConnection from "./NoConnection";
import { fetchEmployees } from "./employeeSlice";

const Stack = createStackNavigator();

const MainApp = () => {
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(true);
  const employeesStatus = useSelector((state) => state.employees.status);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    dispatch(fetchEmployees());

    return () => unsubscribe();
  }, [dispatch]);

  if (!isConnected || employeesStatus === "failed") {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="NoConnection" component={NoConnection} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddEmployee" component={AddEmployee} />
        <Stack.Screen name="EditEmployee" component={EditEmployee} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => (
  <Provider store={store}>
    <MainApp />
  </Provider>
);

export default App;
