import {classNames} from 'shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import React, {ChangeEvent} from "react";
import {ThemeSwitcher} from "shared/ui/ThemeSwitcher";
import {sidebarStore} from "app/stores/SidebarStore/SidebarStore";
import {inject, observer} from "mobx-react";

interface SidebarProps {
    className?: string;
}

export const Sidebar = ({className}: SidebarProps) => {

    const onToggle = () => {
        sidebarStore.toggleSidebar()
    }

    const onLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
        sidebarStore.changeTaskTitle(event.target.value)
    }

    const onDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        sidebarStore.changeTaskDescription(event.target.value)
    };

    return (
        <div
            className={classNames(cls.Sidebar, {[cls.collapsed]: sidebarStore.toggle}, [className])}
        >
            {/*<button onClick={onToggle}>toggle</button>*/}
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
                    <button className={cls.saveButton} >Save</button>
                    <button className={cls.deleteButton}>Delete</button>
                </div>
            </div>
        </div>
    );
};


