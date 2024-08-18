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
                        description: "",
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

//Функции взаимодействия с деревом задач
const findTaskInTree = (tree: Task, id: number): [string, string] | null => {
    if (tree.id === id) {
        return [tree.label ?? "undefined", tree.description ?? ""];
    }

    for (let i = 0; i < tree.subtasks.length; i++) {
        const currentItem = tree.subtasks[i];
        const result = findTaskInTree(currentItem, id);
        if (result) {
            return result
        }
    }

    return null;
};

const insertTaskInTree = function (tree: Task, taskId: number, item : {label: string, description: string}) : Task {
    if (tree.id === taskId) {
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
        return insertTaskInTree(ob, taskId, item);
    });

    return {...tree, subtasks: latestNode};
};

const editTaskFromTree = (tree: Task, taskId: number, label: string, description: string) => {
    if (tree.id === taskId) {
        tree.label = label;
        tree.description = description
        return tree;
    }

    tree.subtasks.map((ob: any) => {
        return editTaskFromTree(ob, taskId, label, description);
    });

    return {...tree};
};

const deleteTaskFromTree = (tree: Task, id: number) : Task => {
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
    taskData: Task = {id: 1, label: "root"}
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

    addUntitledTask(parentId?: number) {
        let folderId = parentId || 1
        let updatedTree = insertTaskInTree(this.taskData, folderId,
            {label: "Untitled", description: ""})
        this.taskData = {...updatedTree}
        this.saveToLocalStorage();
        return {...this.taskData}

    }

    changeCurrentTask(id: number) {
        this.taskId = id
        console.log(id)
        let result = findTaskInTree(this.taskData, this.taskId)

        if (result) {
            const [label, description] = result;
            this.label = label;
            this.description = description;
        } else {
            console.error(`Task with ID ${id} not found.`);
            this.label = "Task not found";
            this.description = "";
            this.toggle = false;
        }

        this.saveToLocalStorage();
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
        console.log(`delete task: ${id == this.taskId}`)
        if (id == this.taskId) {

            this.toggleSidebar()
        }
        console.log(id)
        this.saveToLocalStorage();
        return {...this.taskData}
    }

    deleteCurrentSidebarTask() {
        this.taskData = deleteTaskFromTree(this.taskData, this.taskId);
        this.saveToLocalStorage();
        this.toggle = false;
        return {...this.taskData}
    }

    saveToLocalStorage() {
        localStorage.setItem('taskData', JSON.stringify(this.taskData));
    }

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
