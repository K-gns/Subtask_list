import React from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './Navbar.module.scss';
import {ThemeSwitcher} from "shared/ui/ThemeSwitcher";

interface NavbarProps {
    className?: string;
}

export const Navbar = ({className}: NavbarProps) => {
    return (
        <div className={classNames(cls.navbar, {}, [className])}>
            <div className={cls.headerContainer}>
                <div className="flexDummy"></div>
                <h1>Task-subtask app</h1>
                <div className={cls.themeSwitcherContainer}>
                    <ThemeSwitcher/>
                </div>
            </div>
        </div>
    );
};
