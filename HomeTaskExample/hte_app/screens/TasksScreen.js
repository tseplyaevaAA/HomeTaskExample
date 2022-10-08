import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal, Text, TextInput, FlatList, Image } from 'react-native';
import BackgroundView from '../components/BackgroundView';
import LightButton from '../components/LightButton';
import SeparatorView from '../components/SeparatorView';
import TaskTypeView from '../components/TaskTypeView';
import { ADD_BTN_TITLE, ADD_SUBJECT, CANCEL, SAVE, SPECIFY_TASK, TASK, TITLE } from '../utility/strings';
import { TASK_FILTER_TYPE, TASK_KEY, TASK_TYPE_CHOSEN } from '../utility/constants';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setTaskType } from '../../redux/actions';
import { DIALOG_BACKGROUND_COLOR, MODAL_VIEW_BACKGROUND_COLOR, WHITE_COLOR } from '../styles/color';
import CustomButton from '../components/CustomButton';
import DialogButton from '../components/DialogButton';
import { scale } from '../utility/utility';
import { CHECKED_IMAGE, DELETE_IMAGE, UNCHECKED_IMAGE } from '../styles/images';
import { TouchableOpacity } from 'react-native';

let taskTypeData = [
    {
        type: TASK_FILTER_TYPE.ALL,
    },
    {
        type: TASK_FILTER_TYPE.COMPLETED,
    },
    {
        type: TASK_FILTER_TYPE.NOT_COMPLETED,
    }
]

let exampleData = [{ title: 'Math', task: 'this is a math task', checked: true }, { title: 'Physics', task: 'This is a loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong physics task', checked: false }]
let allTasks = []

const TasksScreen = (props) => {

    const [ligthBtnText, setLigthBtnText] = useState('');
    const [modalDialogVisible, setModalDialogVisible] = useState(false);
    const [modalAddTaskVisible, setModalAddTaskVisible] = useState(false);
    const taskType = useSelector((state) => state.taskTypeReducer)
    const dispatch = useDispatch()

    const [title, onChangeTitle] = useState('');
    const [task, onChangeTask] = useState('');
    const [tasks, setTasks] = useState('');

    useEffect(() => {
        setLigthBtnText(taskType.taskType)
        filterTasks()
    }, [taskType]);

    useEffect(() => {
        getTasks()
    } , [])

    async function getTasks() {
        let tasks = await AsyncStorage.getItem(TASK_KEY)
        if (tasks != null) {
            tasks = JSON.parse(tasks)
            tasks.forEach(element => {
                allTasks.push(element)
            });
        } else {
            exampleData.forEach(element => {
                allTasks.push(element)
            });
        }
        filterTasks()
    }

    function filterTasks(){
        let updatedList = []
        switch (taskType.taskType) {
            case TASK_FILTER_TYPE.ALL:
                updatedList = [...allTasks];
                setTasks(updatedList)
                break;
            case TASK_FILTER_TYPE.COMPLETED:
                updatedList = [...allTasks];
                updatedList = updatedList.filter((item) => item.checked)
                setTasks(updatedList)
                break;
            case TASK_FILTER_TYPE.NOT_COMPLETED:
                updatedList = [...allTasks];
                updatedList = updatedList.filter((item) => !item.checked)
                setTasks(updatedList)
                break;
        }
    }
 
    function showTaskTypeDialog() {
        setModalDialogVisible(true)
    }

    function showAddTaskDialog() {
        setModalAddTaskVisible(true)
    }

    async function setNewTaskType(index) {
        AsyncStorage.setItem(TASK_TYPE_CHOSEN, taskTypeData[index].type)
        dispatch(setTaskType(taskTypeData[index].type))
        setModalDialogVisible(false)
    }

    function cancelNewTaskDialog() {
        onChangeTask('')
        onChangeTitle('')
        setModalAddTaskVisible(false)
    }

    async function addNewTask() {
        let newTask = { title: title, task: task, checked: false }
        setModalAddTaskVisible(false)
        allTasks.push(newTask)
        AsyncStorage.setItem(TASK_KEY, JSON.stringify(allTasks))
        onChangeTask('')
        onChangeTitle('')
        filterTasks()
    }

    function deleteTask(key){
        allTasks = allTasks.filter((item) => (item.title+item.task) != key)
        AsyncStorage.setItem(TASK_KEY, JSON.stringify(allTasks))
        filterTasks()
    }

    function changeStatusTask(key){
        allTasks.forEach((item)=>{
            if ((item.title+item.task) == key){
                item.checked = !item.checked
            }
        })
        AsyncStorage.setItem(TASK_KEY, JSON.stringify(allTasks))
        filterTasks()
    }

    const renderItem = ({ item }) => (
        <>
            <View style={styles.taskItemStyle}>
                <TouchableOpacity
                    onPress={() => { changeStatusTask(item.title + item.task) }}>
                    <Image style={styles.imageStyle}
                        source={item.checked ? CHECKED_IMAGE : UNCHECKED_IMAGE}>
                    </Image>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={styles.taskHeaderStyle}
                        numberOfLines={1}>{item.title}
                    </Text>
                    <Text numberOfLines={10}
                        style={item.checked ? styles.taskSubheaderCompletedStyle : styles.taskSubheaderStyle}>{item.task}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => { deleteTask(item.title + item.task) }}>
                    <Image style={styles.imageStyle}
                        source={DELETE_IMAGE}>
                    </Image>
                </TouchableOpacity>
            </View>
            <SeparatorView taskType={true}></SeparatorView>
        </>
    );

    return (
        <>
            {modalDialogVisible && <Modal
                animationType="fade"
                transparent={true}
                visible={true}
            >
                <View style={styles.modalViewStyle}>
                    <View style={styles.taskTypeContainer}>
                        <TaskTypeView
                            text={taskTypeData[0].type}
                            isHighlighted={taskTypeData[0].type == taskType.taskType}
                            action={() => { setNewTaskType(0) }}>
                        </TaskTypeView>
                        <SeparatorView taskType={true} />
                        <TaskTypeView
                            text={taskTypeData[1].type}
                            isHighlighted={taskTypeData[1].type == taskType.taskType}
                            action={() => { setNewTaskType(1) }}>
                        </TaskTypeView>
                        <SeparatorView taskType={true} />
                        <TaskTypeView
                            text={taskTypeData[2].type}
                            isHighlighted={taskTypeData[2].type == taskType.taskType}
                            action={() => { setNewTaskType(2) }}>
                        </TaskTypeView>
                    </View>
                </View>
            </Modal>}
            {modalAddTaskVisible &&
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={true}>
                    <View style={styles.modalViewStyle}>
                        <View style={styles.addTaskContainer}>
                            <Text style={styles.textHeaderStyle}>{ADD_SUBJECT}</Text>
                            <Text style={styles.textSubheaderStyle}>{SPECIFY_TASK}</Text>
                            <TextInput
                                style={styles.textInputStyle}
                                placeholder={TITLE}
                                value={title}
                                onChangeText={onChangeTitle}
                                maxLength={40}
                            >
                            </TextInput>
                            <TextInput
                                style={styles.textInputStyle}
                                placeholder={TASK}
                                value={task}
                                onChangeText={onChangeTask}
                                maxLength={150}>
                            </TextInput>
                            <View style={styles.cancelOkContainer}>
                                <DialogButton text={CANCEL}
                                    action={() => { cancelNewTaskDialog() }}>
                                </DialogButton>
                                <DialogButton text={SAVE}
                                    isHighlighted={true}
                                    action={() => { addNewTask() }}>
                                </DialogButton>
                            </View>
                        </View>
                    </View>
                </Modal>}
            <BackgroundView>
                <View style={styles.tasksOptionsContainer}>
                    <View style={styles.lightButtonContainer}>
                        <LightButton
                            text={ligthBtnText}
                            action={showTaskTypeDialog}>
                        </LightButton>
                    </View>
                </View>
                <SeparatorView />
                <View style={styles.contentContainer}>
                    <FlatList
                        style={styles.tasksContainerStyle}
                        data={tasks}
                        renderItem={renderItem}
                        keyExtractor={item => item.title + item.task}></FlatList>
                </View>
                <View style={styles.bottomView}>
                    <View style={styles.buttonContainer}>
                        <CustomButton
                            text={ADD_BTN_TITLE}
                            action={showAddTaskDialog}>
                        </CustomButton>
                    </View>
                </View>
            </BackgroundView>
        </>
    )
}

const styles = StyleSheet.create({

    tasksOptionsContainer: {
        height: scale(40), //'14%',
        justifyContent: 'center',
        marginTop: '6%',
        alignItems: 'center',
    },
    lightButtonContainer: {
        height: '36%',
        width: '90%',
    },
    taskTypeContainer: {
        height: '22%',
        width: '80%',
        backgroundColor: DIALOG_BACKGROUND_COLOR,
        borderRadius: 14,
    },
    modalViewStyle: {
        flex: 1,
        //height: '22%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: MODAL_VIEW_BACKGROUND_COLOR,
    },
    addTaskContainer: {
        height: scale(90),//'34%',
        width: scale(100),//'80%',
        backgroundColor: DIALOG_BACKGROUND_COLOR,
        borderRadius: 14,
        flexDirection: 'column',
        alignItems: 'center',
    },
    contentContainer: {
        //flex: 0.85,
        height: scale(205)
    },
    bottomView: {
        //flex: 0.15,
        height: scale(30),
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        height: '50%',
        width: '90%',
    },
    cancelOkContainer: {
        flex: 1,
        width: '100%',
        borderRadius: 7,
        marginTop: '8%',
        flexDirection: 'row'
    },
    textHeaderStyle: {
        fontFamily: 'Roboto',
        color: '#3B3B3B',
        fontSize: 17,
        marginTop: '5%',
        alignSelf: 'center',
        marginBottom: '1%',
    },
    textSubheaderStyle: {
        fontFamily: 'Roboto',
        color: '#737A82',
        fontSize: 13,
        alignSelf: 'center',
        marginBottom: '3%'
    },
    textInputStyle: {
        height: '18%',
        width: '90%',
        marginTop: '3%',
        backgroundColor: WHITE_COLOR,
        borderRadius: 7,
        borderColor: '#737A8230',
        borderWidth: 1,
        paddingHorizontal: '3%',
    },
    taskItemStyle: {
        height: 'auto',//scale(30),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: scale(5)
        //justifyContent:'space-between'
    },
    tasksContainerStyle: {
        paddingHorizontal: '5%',
        marginTop: '5%',
    },
    imageStyle: {
        height: scale(20),
        width: scale(20),
    },
    textContainer: {
        height: 'auto',//scale(20),
        width: scale(88),
        flexDirection: 'column',
        paddingHorizontal: scale(2)
    },
    taskHeaderStyle: {
        fontFamily: 'Roboto',
        color: '#3B3B3B',
        fontSize: 17,
        //alignSelf: 'center',
        marginBottom: scale(2),
        fontWeight: '400'
    },
    taskSubheaderStyle: {
        fontFamily: 'Roboto',
        color: '#3B3B3B',
        fontSize: 13,
    },
    taskSubheaderCompletedStyle: {
        fontFamily: 'Roboto',
        color: '#6F767E',
        fontSize: 13,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
    }

});

export default TasksScreen;