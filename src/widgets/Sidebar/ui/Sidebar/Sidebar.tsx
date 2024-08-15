import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import React, {useEffect, useState} from "react";
import {ThemeSwitcher} from "shared/ui/ThemeSwitcher";

interface SidebarProps {
    className?: string;
    toggled: boolean;
}

export const Sidebar = ({className, toggled}: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(toggled)

    useEffect(() => {
        setCollapsed(prev => !prev);
    }, [toggled])

    const onToggle = () => {
        setCollapsed(prev => !prev);
    }

    return (
        <div
            className={classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [className])}
        >
            <button onClick={onToggle}>toggle</button>
        </div>
    );
};

