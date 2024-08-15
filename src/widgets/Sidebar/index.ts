import {Sidebar} from "./ui/Sidebar/Sidebar";
import {inject, observer} from "mobx-react";

const SidebarWithStore = inject('sidebarStore')(observer(Sidebar))

export {
    SidebarWithStore as Sidebar
}

