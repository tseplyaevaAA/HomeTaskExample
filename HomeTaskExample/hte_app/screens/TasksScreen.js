import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal, Text, TextInput } from 'react-native';
import BackgroundView from '../components/BackgroundView';
import LightButton from '../components/LightButton';
import SeparatorView from '../components/SeparatorView';
import TaskTypeView from '../components/TaskTypeView';
import { ADD_BTN_TITLE, ADD_SUBJECT, CANCEL, SAVE, SPECIFY_TASK, TASK, TITLE } from '../utility/strings';
import { TASK_FILTER_TYPE, TASK_TYPE_CHOSEN } from '../utility/constants';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setTaskType } from '../../redux/actions';
import { DIALOG_BACKGROUND_COLOR, MODAL_VIEW_BACKGROUND_COLOR, WHITE_COLOR } from '../styles/color';
import CustomButton from '../components/CustomButton';
import DialogButton from '../components/DialogButton';
import { scale } from '../utility/utility';

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

const TasksScreen = (props) => {

    const [ligthBtnText, setLigthBtnText] = useState('');
    const [modalDialogVisible, setModalDialogVisible] = useState(false);
    const [modalAddTaskVisible, setModalAddTaskVisible] = useState(false);
    const taskType = useSelector((state) => state.taskTypeReducer)
    const dispatch = useDispatch()

    const [title, onChangeTitle] = useState('');
    const [task, onChangeTask] = useState('');

    useEffect(() => {
        console.log('Hello world TasksScreen')
        setLigthBtnText(taskType.taskType)
    }, [taskType]);

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

    function addNewTask() {
        let newTask = {newTitle: title, newTask: task}
        setModalAddTaskVisible(false)
        console.log('newTask is: ', newTask)
        onChangeTask('')
        onChangeTitle('')
    }

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
                    visible={true}
                >
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

});

export default TasksScreen;