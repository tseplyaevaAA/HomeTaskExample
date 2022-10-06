import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TasksScreen from './hte_app/screens/TasksScreen';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from "redux";
import taskTypeReducer from './redux/taskTypeReducer';
import thunk from "redux-thunk";
import { TASK_FILTER_TYPE, TASK_TYPE_CHOSEN } from './hte_app/utility/constants';
import { setTaskType } from './redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const AppWrapper = () => {
  const rootReducer = combineReducers({ taskTypeReducer });
  const store = createStore(rootReducer, applyMiddleware(thunk));

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    getTaskType()
  });

  async function getTaskType() {
    let taskType = await AsyncStorage.getItem(TASK_TYPE_CHOSEN)
    switch (taskType) {
      case TASK_FILTER_TYPE.ALL: case null:
        dispatch(setTaskType(TASK_FILTER_TYPE.ALL))
        break;
      case TASK_FILTER_TYPE.COMPLETED:
        dispatch(setTaskType(TASK_FILTER_TYPE.COMPLETED))
        break;
      case TASK_FILTER_TYPE.NOT_COMPLETED:
        dispatch(setTaskType(TASK_FILTER_TYPE.NOT_COMPLETED))
        break;
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TasksScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="TasksScreen" component={TasksScreen} options={{ animationEnabled: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppWrapper;
