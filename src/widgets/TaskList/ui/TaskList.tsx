import {classNames} from "shared/lib/classNames/classNames";
import cls from './TaskList.module.scss'
import React, {useEffect, useState} from "react";
import {TaskItem} from "widgets/TaskItem";
import {sidebarStore} from "app/stores/SidebarStore/SidebarStore";

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

    return (
        <div className={classNames(cls.TaskList, {}, [className])}>
            {taskData.subtasks.map((item) =>
                <TaskItem key={item.id}
                          task={item}
                          hidden={false}
                          updateTaskData={handleUpdateTaskData}
                />
            )}
        </div>
    );
};


