import {classNames} from "shared/lib/classNames/classNames";
import cls from './TaskItem.module.scss'
import {Task} from 'widgets/TaskList/ui/TaskList'
import DropdownIconCollapsed from "shared/assets/icons/dropdown_icon_collapsed_16x16.svg";
import DropdownIconExpanded from 'shared/assets/icons/dropdown_icon_expanded_16x16.svg'
import AddIcon from 'shared/assets/icons/addIcon16x16.svg'
import { sidebarStore } from 'app/stores/SidebarStore/SidebarStore';


import React, {ChangeEvent, useEffect, useState} from "react";
import {MenuPopup} from "shared/ui/Popup/MenuPopup";
import {Checkbox} from "@mui/material";


interface TaskProps {
    className?: string;
    task: Task;
    hidden: boolean;
    updateTaskData: (taskData: Task[]) => void;
    onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>, taskId: number) => void;
    toggleSubtask?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
}

export const TaskItem = ({className, task, hidden, updateTaskData, onCheckboxChange,  }: TaskProps) => {
    const [expanded, setExpanded] = useState(false)

    const handleDelete = () => {
        let taskData = sidebarStore.deleteTask(task.id)
        //@ts-ignore
        updateTaskData(taskData)
    }

    const expandSubtasks = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        e.stopPropagation()
        setExpanded((state) => !state)
    }

    const addTask = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        e.stopPropagation()
        let newTaskData = sidebarStore.addUntitledTask(task.id)
        if (!expanded) {
            setExpanded(true)
        }
        //@ts-ignore
        updateTaskData(newTaskData)
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation()
        const isChecked = event.target.checked;
        sidebarStore.toggleTaskSelection(task.id, isChecked);
    };

    const openSideBar = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
         //ToDo: Refactor
        e.stopPropagation()
        if (task.label != sidebarStore.label && sidebarStore.toggle == true) {
            sidebarStore.changeCurrentTask(task.id)
        } else {
            sidebarStore.toggleSidebar()
            sidebarStore.changeCurrentTask(task.id)
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
                <Checkbox
                    checked={sidebarStore.selectedTasks.has(task.id)}
                    onChange={handleCheckboxChange}
                    onClick={(e) => e.stopPropagation()}
                />
                <span className={cls.taskName}>{task.label}</span>
                <MenuPopup Menu1Name="Delete" Menu1Func={handleDelete} />
                <span className={cls.addIcon} onClick={addTask}><AddIcon/></span>
            </li>

            {/*Рендер дочерних комментариев*/}
            {task.subtasks?.length > 0 && task.subtasks.map((item, index) =>
                <TaskItem key={item.id} task={item}
                          hidden={!expanded}
                          updateTaskData={updateTaskData}
                          onCheckboxChange={handleCheckboxChange}
                />
            )}
        </ul>

    )
};