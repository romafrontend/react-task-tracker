import {useState} from 'react';
// Types
import {TaskType, NewTaskType} from '../App';
type Props = {
    onAdd: (newTask: NewTaskType) => void;
}

const AddTask: React.FC<Props> = ({onAdd}) => {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);


    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if(!text) {
          alert('Please add a task');
          return;
        }

        onAdd({text, day, reminder});

        setText('');
        setDay('');
        setReminder(false);
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input type='text' placeholder='Add Task' value={text} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)} />
            </div>
            <div className='form-control'>
                <label>Day & Time</label>
                <input type='text' placeholder='Add Day & Time' value={day}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDay(e.target.value)} />
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type='checkbox' checked={reminder}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReminder(e.currentTarget.checked)} />
            </div>

            <input type='submit' value='Save Task' 
            className='btn btn-block' />
        </form>
    )
}

export default AddTask
