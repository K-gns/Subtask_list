import {classNames} from "shared/lib/classNames/classNames";
import cls from './TaskList.module.scss'
import React, {useEffect, useState} from "react";
import {TaskItem} from "widgets/TaskItem";
import {sidebarStore} from "app/stores/SidebarStore/SidebarStore";
import {Checkbox} from "@mui/material";

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

    // useEffect(() => {
    //     setTaskData(sidebarStore.taskData)
    // }, [sidebarStore.taskData]);


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

    return (
        <>
            <div className={cls.taskListHeader}>
                <Checkbox
                    checked={sidebarStore.areAllTasksSelected()}
                    onChange={handleSelectAllTasks}
                />
                <span>Selected: {sidebarStore.selectedTasksCount} tasks</span>
                <button onClick={handleDeleteSelected} disabled={sidebarStore.selectedTasksCount === 0}>
                    Delete Selected
                </button>
            </div>

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


