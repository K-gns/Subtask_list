import {classNames} from "shared/lib/classNames/classNames";
import cls from './TaskItem.module.scss'
import {Task} from 'widgets/TaskList/ui/TaskList'
import DropdownIconCollapsed from "shared/assets/icons/dropdown_icon_collapsed_16x16.svg";
import React, {useState} from "react";

interface TaskProps {
    className?: string;
    task: Task;
    isInMainList: boolean;
    hidden: boolean;
    toggleSubtask?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
}

export const TaskItem = ({className, task, isInMainList, hidden}: TaskProps) => {
    const [childsHidden, setChildsHidden] = useState(true)

    const expandChildrensComment = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        e.stopPropagation()
        setChildsHidden((state) => !state)
    }

    return (
        <ul className={classNames("", {}, [hidden ? cls.hidden : ""])}>

            {/*Рендер самого комментария*/}
            <li key={task.id} onClick={expandChildrensComment}
                className={task.subtasks ? cls.haveSubtasks : cls.noSubtasks}>
                {task.subtasks && <span className={cls.dropdownIcon}><DropdownIconCollapsed/></span>}
                {task.label}
            </li>

            {/*Рендер дочерних комментариев*/}
            {task.subtasks && task.subtasks.map((item, index) =>
                <TaskItem key={item.id} task={item} isInMainList={true} hidden={childsHidden}/>
            )}
        </ul>


    )
};