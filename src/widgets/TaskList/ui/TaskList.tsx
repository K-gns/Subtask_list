import {classNames} from "shared/lib/classNames/classNames";
import cls from './TaskList.module.scss'
import React from "react";
import DropdownIconCollapsed from 'shared/assets/icons/dropdown_icon_collapsed_16x16.svg'
import DropdownIconExpanded from 'shared/assets/icons/dropdown_icon_expanded_16x16.svg'

interface TaskListProps {
    className?: string;
}

type Task = {
    label: string;
    subtask?: Task[];
}

const taskData = [
    {label: "Task 1"},
    {label: "Task 2",
        subtask: [{label: "Subtask 1"}, {label: "Subtask 2"}]
    },
    {label: "Task 3",
        subtask: [
            {label: "Subtask 1"},
            {label: "Subtask 2"},
            {
                label: "Subtask 3",
                subtask: [{label: "Subsubtask 1"}, {label: "Subsubtask 2"}]
            }
        ]
    },
    {label: "Task 4",
        subtask: [{label: "Subtask 1"}, {label: "Subtask 2"}]
    },
    {label: "Task 5"},
]

export const TaskList = ({className}: TaskListProps) => {

    const toggleSubtask = (e : React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        e.stopPropagation()
        let subtask = (e.target as HTMLElement).querySelector("ul")

        if (!subtask) return
        subtask.style.display = subtask.style.display  !== "block" ? "block" : "none";
    }

    const renderSubtask = (subtask : Task[]) => {

        return (
        <ul className={classNames("", {}, [cls.subtask])}>
            {subtask.map((item, index) =>
                <li key={index} onClick={toggleSubtask} className={item.subtask ? cls.haveSubtasks : cls.noSubtasks}>
                    {item.subtask && <span className={cls.dropdownIcon}><DropdownIconCollapsed /></span>}
                    {item.label}
                    {item.subtask && renderSubtask(item.subtask)}
                </li>
            )}
        </ul>
    )}

    return (
        <div className={classNames(cls.TaskList, {}, [className])}>
            <ul>
                {taskData.map((item, index) =>
                    <li key={index} onClick={toggleSubtask} className={item.subtask ? cls.haveSubtasks : cls.noSubtasks}>
                        {item.subtask && <span className={cls.dropdownIcon}><DropdownIconCollapsed /></span>}
                        {item.label}
                        {item.subtask && renderSubtask(item.subtask)}
                    </li>
                )}
            </ul>
        </div>
    );
};


