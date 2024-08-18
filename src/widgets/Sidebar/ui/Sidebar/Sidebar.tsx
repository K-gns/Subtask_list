import {classNames} from 'shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import React, {ChangeEvent} from "react";
import {sidebarStore} from "app/stores/SidebarStore/SidebarStore";
import debounce from "lodash/debounce";

interface SidebarProps {
    className?: string;
}

export const Sidebar = ({className}: SidebarProps) => {

    const onLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
        sidebarStore.changeTaskTitle(event.target.value)
    }

    const onDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        sidebarStore.changeTaskDescription(event.target.value)
    };

    const handleSave = () => {
        sidebarStore.toggleSidebar()
    }

    const handleDelete = () => {
        sidebarStore.deleteCurrentSidebarTask()
    }

    return (
        <div
            className={classNames(cls.Sidebar, {[cls.collapsed]: !sidebarStore.toggle}, [className])}
        >
            <div className={cls.sidebarContainer}>
                <div className={cls.sidebarHeader}>
                    <input
                        type="text"
                        className={cls.sidebarTitle}
                        value={sidebarStore.label}
                        onChange={onLabelChange}
                        placeholder="Enter task title here..."
                    />
                </div>
                <div className={cls.sidebarContent}>
                <textarea
                    className={cls.sidebarDescription}
                    placeholder="Enter task description here..."
                    onChange={onDescriptionChange}
                    value={sidebarStore.description}
                ></textarea>
                </div>
                <div className={cls.sidebarActions}>
                    <button className={cls.saveButton} onClick={handleSave}>Save</button>
                    {/*<button className={cls.deleteButton} onClick={handleDelete}>Delete</button>*/}
                </div>
            </div>
        </div>
    );
};


