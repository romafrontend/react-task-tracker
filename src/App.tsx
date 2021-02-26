import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
// Components
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';
// Types
export type TaskType = {
  id: number;
  text: string;
  day: string;
  reminder: boolean;
}

export type NewTaskType = {
  text: string;
  day: string;
  reminder: boolean;
}

const App = () => {
    const [showAddTask, setShowAddTask] = useState(false);

    const [tasks, setTasks] = useState<TaskType[]>([]);

    useEffect(() => {
      const getTasks = async () => {
        const tasksFromServer = await fetchTasks();
        setTasks(tasksFromServer)
      }

      getTasks();
    }, []);

    // Fetch Tasks
    const fetchTasks = async (): Promise<TaskType[]> => {
      const res = await fetch('http://localhost:5000/tasks');
      const data = await res.json();
      return data;
    }

    // Fetch Task
    const fetchTask = async (id: number): Promise<TaskType> => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`);
      const data = await res.json();
      return data;
    }

    // Add Task
    const addTask = async (task: NewTaskType) => {
      const res = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(task)
      });

      const data = await res.json();

      setTasks([...tasks, data]);
    }

    // Delete Task
    const deleteTask = async (id: number) => {
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE'
      });

      setTasks(tasks.filter((task) => task.id !== id));
    }

    // Toggle Reminder
    const toggleReminder = async (id: number) => {
      const taskToToggle = await fetchTask(id);
      const updTask = {... taskToToggle, reminder: !taskToToggle.reminder};
      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updTask)
      });

      const data = await res.json();

      setTasks(
          tasks.map((task) => task.id === id ?
            {...task, reminder: data.reminder} : task
          )
      )
    }

    return (
      <Router>
          <div className="container">
              <Header
                onAdd={() => setShowAddTask(!showAddTask)}
                showAdd={showAddTask} />
              <Route path='/' exact render={(props: any) => (
                  <> 
                      {showAddTask && <AddTask onAdd={addTask} />}
                      {tasks.length > 0 ? (
                          <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
                      ) : ('No Tasks To Show')}
                  </>
              )} />
              <Route path='/about' component={About} />
              <Footer />
          </div>
      </Router> 
    );
}

export default App
