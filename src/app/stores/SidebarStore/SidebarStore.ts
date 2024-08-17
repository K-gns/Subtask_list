import {makeAutoObservable} from 'mobx';
import {Task} from "widgets/TaskList/ui/TaskList";
import debounce from "lodash/debounce";

const taskDataMock: Task = {
    id: 1,
    label: "root",
    subtasks: [
        {
            id: 101,
            label: "Task 1",
            description: "Task 1 description",
            subtasks: []
        },
        {
            id: 102,
            label: "Task 2",
            description: "Task 2 description",
            subtasks:
                [
                    {id: 103, label: "Subtask 1", description: "Subtask 1 description", subtasks: []},
                    {id: 104, label: "Subtask 2", description: "Subtask 2 description", subtasks: []}
                ]
        },
        {
            id: 105,
            label: "Task 3",
            description: "Task 3 description",
            subtasks:
                [
                    {id: 106, label: "Subtask 1", description: "Empty description", subtasks: []},
                    {id: 107, label: "Subtask 2", description: "Subtask 2 description", subtasks: []},
                    {
                        id: 108,
                        label: "Subtask 3",
                        subtasks: [
                            {id: 109, label: "Subsubtask 1", description: "Subsubtask 1 description", subtasks: []},
                            {id: 110, label: "Subsubtask 2", description: "Subsubtask 2 description", subtasks: []}
                        ]
                    }
                ]
        },
        {
            id: 111,
            label: "Task 4",
            description: "Task 4 description",
            subtasks:
                [
                    {id: 112, label: "Subtask 1", description: "another description", subtasks: []},
                    {id: 113, label: "Subtask 2", description: "and another description", subtasks: []}
                ]
        },
        {
            id: 114,
            label: "Task 5",
            description: "Last description",
            subtasks: []
        },

    ]
}

//Функции взаимодействия с деревом комменатариев
//@ts-ignore
const insertTaskInTree = function (tree, commentId, item) {
    if (tree.id === commentId) {
        tree.subtasks.push({
            id: new Date().getTime(),
            label: item.label,
            description: item.description,
            subtasks: [],
        });

        return tree;
    }

    let latestNode = [];
    latestNode = tree.subtasks.map((ob: any) => {
        return insertTaskInTree(ob, commentId, item);
    });

    return {...tree, subtasks: latestNode};
};

//@ts-ignore
const editTaskFromTree = (tree, commentId, label, description) => {
    if (tree.id === commentId) {
        tree.label = label;
        tree.description = description
        return tree;
    }

    tree.subtasks.map((ob: any) => {
        return editTaskFromTree(ob, commentId, label, description);
    });

    return {...tree};
};

//@ts-ignore
const deleteTaskFromTree = (tree, id) => {
    for (let i = 0; i < tree.subtasks.length; i++) {
        const currentItem = tree.subtasks[i];
        if (currentItem.id === id) {
            tree.subtasks.splice(i, 1);
            return tree;
        } else {
            deleteTaskFromTree(currentItem, id);
        }
    }
    return tree;
};


class SidebarStore {
    //@ts-ignore
    taskData: Task = []

    toggle = false;

    taskId = 0
    label = "Task title"
    description = "test description"

    constructor() {
        makeAutoObservable(this);
        this.taskData = taskDataMock

        this.loadFromLocalStorage();
        this.saveToLocalStorage = debounce(this.saveToLocalStorage, 500);
    }

    toggleSidebar() {
        this.toggle = !this.toggle;
    }

    changeCurrentTask(id: number, label: string, taskDescription: string) {
        this.taskId = id
        this.label = label
        this.description = taskDescription
        this.saveToLocalStorage();
    }

    changeTaskID(id: number) {
        this.taskId = id
    }

    changeTaskTitle(label: string) {
        this.label = label
        this.taskData = editTaskFromTree(this.taskData, this.taskId, this.label, this.description)
        this.saveToLocalStorage();
    }

    changeTaskDescription(taskDescription: string) {
        this.description = taskDescription
        editTaskFromTree(this.taskData, this.taskId, this.label, this.description)
        this.saveToLocalStorage();
    }

    deleteTask(id: number) {
        this.taskData = deleteTaskFromTree(this.taskData, id);
        this.saveToLocalStorage();
        return {...this.taskData}
    }

    saveToLocalStorage() {
        localStorage.setItem('taskData', JSON.stringify(this.taskData));
    }

    // Метод для загрузки данных из localStorage
    loadFromLocalStorage() {
        const storedData = localStorage.getItem('taskData');
        if (storedData) {
            this.taskData = JSON.parse(storedData);
        } else {
            this.taskData = taskDataMock; // Если данных нет, используем mock
        }
    }
}

export const sidebarStore = new SidebarStore();
