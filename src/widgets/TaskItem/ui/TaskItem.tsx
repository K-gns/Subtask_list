import {classNames} from "shared/lib/classNames/classNames";
import cls from './TaskItem.module.scss'
import {Task} from 'widgets/TaskList/ui/TaskList'
import DropdownIconCollapsed from "shared/assets/icons/dropdown_icon_collapsed_16x16.svg";
import DropdownIconExpanded from 'shared/assets/icons/dropdown_icon_expanded_16x16.svg'
import { inject, observer } from 'mobx-react';
import { sidebarStore } from 'app/stores/SidebarStore/SidebarStore';

import DeleteIcon from 'shared/assets/icons/delete_button.svg'

import React, {useState} from "react";
import {MenuPopup} from "shared/ui/Popup/MenuPopup";


interface TaskProps {
    className?: string;
    task: Task;
    hidden: boolean;
    deleteNode: (folderId: number) => void;
    toggleSubtask?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
}

export const TaskItem = ({className, task, hidden, deleteNode}: TaskProps) => {
    const [expanded, setExpanded] = useState(false)

    const handleDelete = () => {
        deleteNode(task.id)
    }

    const expandSubtasks = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        e.stopPropagation()
        setExpanded((state) => !state)
    }

    const openSideBar = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
         //ToDo: Refactor
        e.stopPropagation()
        if (task.label != sidebarStore.label && sidebarStore.toggle == false) {
            sidebarStore.changeCurrentTask(task.id, task.label, task.description)
        } else {
            sidebarStore.toggleSidebar()
            sidebarStore.changeCurrentTask(task.id, task.label, task.description)
        }
    }

    return (
        <ul className={classNames("", {}, [hidden ? cls.hidden : ""])}>

            {/*Рендер самого комментария*/}
            <li key={task.id} onClick={openSideBar}
                className={task.subtasks?.length > 0 ? cls.haveSubtasks : cls.noSubtasks}>
                {task.subtasks?.length > 0 &&
                    <span className={cls.dropdownIcon} onClick={ expandSubtasks}>
                        {expanded ? <DropdownIconExpanded/> : <DropdownIconCollapsed/>}
                    </span>}
                {task.label}
                <MenuPopup Menu1Name="Delete" Menu1Func={handleDelete}></MenuPopup>
            </li>

            {/*Рендер дочерних комментариев*/}
            {task.subtasks?.length > 0 && task.subtasks.map((item, index) =>
                <TaskItem key={item.id} task={item} hidden={!expanded} deleteNode={deleteNode}/>
            )}
        </ul>

    )
};