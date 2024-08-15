import {classNames} from "shared/lib/classNames/classNames";
import cls from './TaskList.module.scss'
import React from "react";
import DropdownIconCollapsed from 'shared/assets/icons/dropdown_icon_collapsed_16x16.svg'
import DropdownIconExpanded from 'shared/assets/icons/dropdown_icon_expanded_16x16.svg'
import {TaskItem} from "widgets/TaskItem";

interface TaskListProps {
    className?: string;
}

export type Task = {
    id: number;
    label: string;
    subtasks?: Task[];
}

const taskData = {
    id: 1,
    subtasks: [
        {
            id: 101,
            label: "Task 1"
        },
        {
            id: 102,
            label:
                "Task 2",
            subtasks:
                [
                    {id: 103, label: "Subtask 1"},
                    {id: 104, label: "Subtask 2"}
                ]
        },
        {
            id: 105,
            label:
                "Task 3",
            subtasks:
                [
                    {id: 106, label: "Subtask 1"},
                    {id: 107, label: "Subtask 2"},
                    {
                        id: 108,
                        label: "Subtask 3",
                        subtasks: [
                            {id: 109, label: "Subsubtask 1"},
                            {id: 110, label: "Subsubtask 2"}
                        ]
                    }
                ]
        },
        {
            id: 111,
            label:
                "Task 4",
            subtasks:
                [
                    {id: 112, label: "Subtask 1"},
                    {id: 113, label: "Subtask 2"}
                ]
        },
        {
            id: 114,
            label:
                "Task 5"
        },

    ]
}

export const TaskList = ({className}: TaskListProps) => {

    const toggleSubtask = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        e.stopPropagation()
        let subtasks = (e.target as HTMLElement).querySelector("ul")

        if (!subtasks) return
        subtasks.style.display = subtasks.style.display !== "block" ? "block" : "none";
    }


    return (
        <div className={classNames(cls.TaskList, {}, [className])}>
            {taskData.subtasks.map((item) =>
                <TaskItem key={item.id} task={item} isInMainList={true} hidden={false}/>
            )}
        </div>
    );
};


