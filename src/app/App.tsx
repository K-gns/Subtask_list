import React, {useState} from 'react';
import './styles/index.scss';
import {classNames} from "shared/lib/classNames/classNames";
import {useTheme} from "app/providers/ThemeProvider";
import {AppRouter} from "app/providers/router";
import {Navbar} from "widgets/Navbar";
import {Sidebar} from "widgets/Sidebar";
import {Provider} from "mobx-react";
import {sidebarStore} from 'app/stores/SidebarStore/SidebarStore'



const App = () => {
    const [sidebarToggle, setSidebarToggle] = useState(true)

    const {theme} = useTheme();
    const toggleSidebar = () => {
        setSidebarToggle((state) => !state)
    }

    return (
        <Provider sidebarStore={sidebarStore}>
            <div className={classNames('app', {}, [theme])}>
                <Navbar/>
                <div className="content-page">
                    <Sidebar toggled={sidebarToggle}/>
                    <AppRouter/>
                </div>
            </div>
        </Provider>
    );
};

export default App;
