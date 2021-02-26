import Task from './Task';

// Types
import {TaskType} from '../App';

type Props = {
    tasks: TaskType[];
    onDelete: (id: number) => void;
    onToggle: (id: number) => void
}

const Tasks: React.FC<Props> = ({tasks, onDelete, onToggle}) => {
    return (
        <>
            {tasks.map((task) => (
                <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
            ))}
        </>
    )
}

export default Tasks
