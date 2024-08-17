import {TaskList} from "widgets/TaskList/ui/TaskList";
import {inject, observer} from "mobx-react";

const TasklistWithStore = inject('sidebarStore')(observer(TaskList))

export {
    TasklistWithStore as TaskList
}