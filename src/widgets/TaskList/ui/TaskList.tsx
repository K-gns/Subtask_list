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
    subtask?: Task[];
}

const taskData = [
    {
        id: 101,
        label: "Task 1"
    },
    {
        id: 102,
        label: "Task 2",
        subtask: [
            {id: 103, label: "Subtask 1"},
            {id: 104, label: "Subtask 2"}
        ]
    },
    {
        id: 105,
        label: "Task 3",
        subtask: [
            {id: 106, label: "Subtask 1"},
            {id: 107, label: "Subtask 2"},
            {
                id: 108,
                label: "Subtask 3",
                subtask: [
                    {id: 109, label: "Subsubtask 1"},
                    {id: 110, label: "Subsubtask 2"}
                ]
            }
        ]
    },
    {
        id: 111,
        label: "Task 4",
        subtask: [
            {id: 112, label: "Subtask 1"},
            {id: 113, label: "Subtask 2"}
        ]
    },
    {
        id: 114,
        label: "Task 5"
    },
]

export const TaskList = ({className}: TaskListProps) => {

    const toggleSubtask = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        e.stopPropagation()
        let subtask = (e.target as HTMLElement).querySelector("ul")

        if (!subtask) return
        subtask.style.display = subtask.style.display !== "block" ? "block" : "none";
    }

    const renderSubtask = (subtask: Task[], isMainList: boolean) => {

        return (
            <ul className={classNames("", {}, [!isMainList ? cls.subtask : ""])}>
                {subtask.map((item, index) =>
                    <li key={item.id} onClick={toggleSubtask}
                        className={item.subtask ? cls.haveSubtasks : cls.noSubtasks}>
                        {item.subtask && <span className={cls.dropdownIcon}><DropdownIconCollapsed/></span>}
                        {item.label}
                        {item.subtask && renderSubtask(item.subtask, false)}
                    </li>
                )}
            </ul>
        )
    }

    return (
        <div className={classNames(cls.TaskList, {}, [className])}>
            {renderSubtask(taskData, true)}
        </div>
    );
};


