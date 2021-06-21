import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TaskListView } from '../components/Components'
import { readTasksFromFirebaseAsync } from '../services/FirebaseApi';

const imgDone = require('../assets/done.png');

export default class DoneTasks extends Component {

    static navigationOptions = {
        tabBarLabel: 'Done',
        tabBarIcon: ({ tintColor }) => (
            <Image source = {imgDone}
                style = {[ styles.icon, {tintColor}]} />
        )
    }

    state = {
        tasks: [],
    };

    componentDidMount() {
        readTasksFromFirebaseAsync(this._fetchTasks.bind(this));
    };

    _fetchTasks(tasks) {
        const tasksToDo = tasks.filter(t => t.isDone);
        this.setState({ tasks: tasksToDo });
    };

    render() {
        return(
            <View style = { styles.container }>
                 <TaskListView 
                    tasks = {this.state.tasks} 
                    navigation = { this.props.navigation }
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white'
    },

    icon: {
        width: 26,
        height:26
    },

    img: {
        width: 50,
        height: 50
    }
})