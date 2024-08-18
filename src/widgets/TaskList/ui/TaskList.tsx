import {classNames} from "shared/lib/classNames/classNames";
import cls from './TaskList.module.scss'
import React, {useEffect, useState} from "react";
import {TaskItem} from "widgets/TaskItem";
import {sidebarStore} from "app/stores/SidebarStore/SidebarStore";
import {Checkbox} from "@mui/material";
import AddIcon from "shared/assets/icons/addIcon16x16.svg";
import DropdownIconCollapsed from "shared/assets/icons/dropdown_icon_collapsed_16x16.svg";

interface TaskListProps {
    className?: string;
}

export type Task = {
    id: number;
    label: string;
    description?: string;
    subtasks?: Task[];
}

export const TaskList = ({className}: TaskListProps) => {
    const [taskData, setTaskData] = useState(sidebarStore.taskData);
    const [isHintHidden, setIsHintHidden] =
        useState(localStorage.getItem("hintHidden") == "true");

    const handleUpdateTaskData = (taskData: Task[]) => {
        //@ts-ignore
        setTaskData(taskData);
    };

    const handleSelectAllTasks = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        sidebarStore.toggleSelectAll(isChecked);
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, taskId: number) => {
        const isChecked = event.target.checked;
        console.log(taskId)
        sidebarStore.toggleTaskSelection(taskId, isChecked);
    };

    const handleDeleteSelected = () => {
        let newTaskData = sidebarStore.deleteSelectedTasks();
        setTaskData(newTaskData)
    }

    const addTask = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        e.stopPropagation()
        let newTaskData = sidebarStore.addUntitledTask(1)
        //@ts-ignore
        updateTaskData(newTaskData)
    }

    const handleCloseHint = () => {
        setIsHintHidden(true)
        localStorage.setItem("hintHidden", "true")
    }

    return (
        <>
            {/*Подсказки по использованию*/}
            <div className={classNames(cls.hint, {}, [isHintHidden ? cls.hidden : "" ])}>
                <p>Для использования приложения: кликните на задачу, чтобы изменить её, или
                    используйте иконки около задач для управления ими. Используйте <DropdownIconCollapsed /> , чтобы развернуть список подзадач. </p>
                <button className={cls.closeHintButton} onClick={handleCloseHint }>Понятно, закрыть</button>
            </div>

            {/*Вспомогательная верхняя строка*/}
            <div className={cls.taskListHeader}>
                <Checkbox
                    checked={sidebarStore.areAllTasksSelected()}
                    onChange={handleSelectAllTasks}
                />
                <span>Selected: {sidebarStore.selectedTasksCount} tasks</span>
                <button className={cls.deleteButton} onClick={handleDeleteSelected} disabled={sidebarStore.selectedTasksCount === 0}>
                    Delete Selected
                </button>
                <span className={cls.addIcon} onClick={addTask}><AddIcon/></span>
            </div>

            {/*Рендер тасок*/}
            <div className={classNames(cls.TaskList, {}, [className])}>
                {taskData.subtasks.map((item) =>
                    <TaskItem key={item.id}
                              task={item}
                              hidden={false}
                              updateTaskData={handleUpdateTaskData}
                              onCheckboxChange={handleCheckboxChange}
                    />
                )}
            </div>
        </>
    )
};


