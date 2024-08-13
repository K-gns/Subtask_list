import {classNames} from "shared/lib/classNames/classNames";
import cls from './TaskList.module.scss'

interface TaskListProps {
    className?: string;
}

type Task = {
    label: string;
    subtask?: Task[];
}

const taskData = [
    {label: "Task 1"},
    {label: "Task 2",
        subtask: [{label: "Subtask 1"}, {label: "Subtask 2"}]
    },
    {label: "Task 3",
        subtask: [
            {label: "Sub task 1"},
            {label: "Sub task 2"},
            {label: "Sub task 3"},
            {
                label: "Sub task 3",
                subtask: [{label: "Sub sub task 1"}, {label: "Sub sub task 2"}]
            }
        ]
    },
    {label: "Task 4",
        subtask: [{label: "Subtask 1"}, {label: "Subtask 2"}]
    },
]

export const TaskList = ({className}: TaskListProps) => {

    const toggleSubtask = () => {
       console.log("clicked")
    }

    const renderSubtask = (subtask : Task[]) => {
        console.log("subtask is", subtask)
        subtask.map((item) => {
            console.log("item is", item)
        })
        return <ul>
            {subtask.map((item, index) =>
                <li key={index} onClick={toggleSubtask}>
                    {item.label}
                    {item.subtask && renderSubtask(item.subtask)}
                </li>
            )}
        </ul>
    }

    return (
        <div className={classNames(cls.TaskList, {}, [className])}>
            <ul>
                {taskData.map((item, index) =>
                    <li key={index} onClick={toggleSubtask}>
                        {item.label}
                        {item.subtask && renderSubtask(item.subtask)}
                    </li>
                )}
            </ul>
        </div>
    );
};


