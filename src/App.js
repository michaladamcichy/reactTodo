import 'bootstrap/dist/css/bootstrap.min.css';
import Database from './Database';
import { useEffect, useState } from 'react';
import './style.scss';
import Task from './Task';

const App = () => {
  const [tasks, setTasks] = useState([]);  
  const [tab, setTab] = useState('all');

  const updateTasks = () => {
       let f;

      if(tab == 'todo') {
        f = () => Database.todo();
      } else if(tab == 'done') {
        f = () => Database.done();
      } else {
        f = () => Database.all();
      }

      f().then(tasks => {
        setTasks(tasks);
      });
  };

  useEffect(() => {
    console.log('start');
    updateTasks();
  }, [tab]);
  
  return (
    <div className='container mainContainer'>
      <h1 className='container header'>TODO list</h1>
      <div className='container row text-center'>
        <div onClick={() => setTab('all')} className="col-2 tabSwitch">
          <h4 style={tab=='all' ? {textDecoration: 'underline'} : {}}>All</h4>
        </div>
        <div onClick={() => setTab('todo')} className="col-2 tabSwitch">
          <h4 style={tab=='todo' ? {textDecoration: 'underline'} : {}}>To do</h4>
        </div>
        <div onClick={() => setTab('done')} className="col-2 tabSwitch">
          <h4 style={tab=='done' ? {textDecoration: 'underline'} : {}}>Done</h4>
        </div>
      </div>
      <div className='container taskContainer'>
        {tab!= 'done' &&
        <Task setTasks={tasks => {if(tasks.tab == tab) setTasks(tasks.tasks); else updateTasks();}} tab={tab} />}
        <div>
        {tasks.map((task, key) => <Task key={key} id={task.id} task={task} setTasks={tasks => {if(tasks.tab == tab) setTasks(tasks.tasks); else updateTasks()}} tab={tab} pos={key + 1} />)}
        </div>
      </div>
      <div className="container footer">
        <h4>Michał Cichy 2021. All rights reserved. What a great weather we have today!</h4>
      </div>
      </div>
  );
}

export default App;