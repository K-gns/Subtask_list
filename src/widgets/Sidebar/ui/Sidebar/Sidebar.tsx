import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import React, {useEffect, useState} from "react";
import {ThemeSwitcher} from "shared/ui/ThemeSwitcher";
import {sidebarStore} from "app/stores/SidebarStore/SidebarStore";
import {inject, observer} from "mobx-react";

interface SidebarProps {
    className?: string;
    toggled: boolean;
}

export const Sidebar = ({className, toggled}: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(toggled)

    const onToggle = () => {
        sidebarStore.toggleSidebar()
    }

    return (
        <div
            className={classNames(cls.Sidebar, {[cls.collapsed]: sidebarStore.toggle}, [className])}
        >
            <button onClick={onToggle}>toggle</button>
        </div>
    );
};


