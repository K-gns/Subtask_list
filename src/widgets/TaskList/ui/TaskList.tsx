import {classNames} from "shared/lib/classNames/classNames";
import cls from './TaskList.module.scss'
import React, {useState} from "react";
import {TaskItem} from "widgets/TaskItem";
import useNode from "widgets/useTaskTree/useTaskTree";

interface TaskListProps {
    className?: string;
}

export type Task = {
    id: number;
    label: string;
    subtasks?: Task[];
}

const taskData: Task = {
    id: 1,
    label: "root",
    subtasks: [
        {
            id: 101,
            label: "Task 1",
            subtasks: []
        },
        {
            id: 102,
            label: "Task 2",
            subtasks:
                [
                    {id: 103, label: "Subtask 1", subtasks: []},
                    {id: 104, label: "Subtask 2", subtasks: []}
                ]
        },
        {
            id: 105,
            label: "Task 3",
            subtasks:
                [
                    {id: 106, label: "Subtask 1", subtasks: []},
                    {id: 107, label: "Subtask 2", subtasks: []},
                    {
                        id: 108,
                        label: "Subtask 3",
                        subtasks: [
                            {id: 109, label: "Subsubtask 1", subtasks: []},
                            {id: 110, label: "Subsubtask 2", subtasks: []}
                        ]
                    }
                ]
        },
        {
            id: 111,
            label: "Task 4",
            subtasks:
                [
                    {id: 112, label: "Subtask 1", subtasks: []},
                    {id: 113, label: "Subtask 2", subtasks: []}
                ]
        },
        {
            id: 114,
            label: "Task 5",
            subtasks: []
        },

    ]
}

export const TaskList = ({className}: TaskListProps) => {
    const [commentsData, setCommentsData] = useState(taskData);
    const {insertNode, editNode, deleteNode} = useNode();

    const handleDeleteNode = (folderId: number) => {
        const finalStructure = deleteNode(commentsData, folderId);
        const temp = {...finalStructure};
        setCommentsData(temp);
    };

    return (
        <div className={classNames(cls.TaskList, {}, [className])}>
            {taskData.subtasks.map((item) =>
                <TaskItem key={item.id}
                          task={item}
                          hidden={false}
                          deleteNode={handleDeleteNode}
                />
            )}
        </div>
    );
};


