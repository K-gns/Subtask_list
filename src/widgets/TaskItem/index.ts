import {TaskItem} from "widgets/TaskItem/ui/TaskItem";
import {inject, observer} from "mobx-react";

const TaskItemWithStore = inject('sidebarStore')(observer(TaskItem))

export {
    TaskItemWithStore as TaskItem
}