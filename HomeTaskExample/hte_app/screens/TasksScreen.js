import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import BackgroundView from '../components/BackgroundView';
import LightButton from '../components/LightButton';
import SeparatorView from '../components/SeparatorView';
import TaskTypeView from '../components/TaskTypeView';
import { TASK_FILTER_TYPE, TASK_TYPE_CHOSEN } from '../utility/constants';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setTaskType } from '../../redux/actions';
import { DIALOG_BACKGROUND_COLOR, MODAL_VIEW_BACKGROUND_COLOR } from '../styles/color';

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
    const [modalVisible, setModalVisible] = useState(false);
    const taskType = useSelector((state) => state.taskTypeReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        //console.log('Hello world TasksScreen')
        setLigthBtnText(taskType.taskType)
    }, [taskType]);

    function showTaskTypeDialog() {
        setModalVisible(true)
    }

    async function setNewTaskType(index) {
        AsyncStorage.setItem(TASK_TYPE_CHOSEN, taskTypeData[index].type)
        dispatch(setTaskType(taskTypeData[index].type))
        setModalVisible(false)
    }

    return (
        <>
            {modalVisible && <Modal
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
            </BackgroundView>
        </>
    )
}

const styles = StyleSheet.create({

    tasksOptionsContainer: {
        height: '18%',
        justifyContent: 'center',
        marginTop: '6%',
        alignItems: 'center',
    },
    lightButtonContainer: {
        height: '28%',
        width: '80%',
    },
    taskTypeContainer: {
        height: '22%',
        width: '80%',
        backgroundColor: DIALOG_BACKGROUND_COLOR,
        borderRadius: 14,
    },
    modalViewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: MODAL_VIEW_BACKGROUND_COLOR,
    }

});

export default TasksScreen;