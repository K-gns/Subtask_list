import {classNames} from "shared/lib/classNames/classNames";
import cls from './TaskItem.module.scss'
import { Task } from 'widgets/TaskList/ui/TaskList'
import DropdownIconCollapsed from "shared/assets/icons/dropdown_icon_collapsed_16x16.svg";
import React from "react";
interface TaskProps {
    className?: string;
    task: Task;
    toggleSubtask: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
}

export const TaskItem = ({className, task, toggleSubtask}: TaskProps) => {

    return
};