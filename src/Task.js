import { useEffect, useState, useRef } from 'react';
import Database from './Database';
import TextareaAutosize from 'react-textarea-autosize';

const Task = props => {
    const [task, setTask]  = useState('');
    const input = useRef();
    const [checkbox, setCheckbox] = useState(props.task ? props.task.completed : false);

    const onChange = e => {
        console.log(e.nativeEvent);
        let value = input.current.value.trim(); 
        setTask(value);
        if(e.nativeEvent.inputType == "insertLineBreak") {
            onSubmit(value);
        }
    };

    const onSubmit = value => {
        const submission = value ? value : task;
        if(submission.length > 0) {
            Database.add({task: value ? value : task, tab: props.tab}).then(tasks => props.setTasks(tasks)).catch(error =>console.log(error));
            input.current.value = '';
            setTask('');
        }
    };

    const onCheck = e => {
        console.log(e.target.value);
        const checked = e.target.checked;
        
        if(props.tab == 'all') {
            setCheckbox(checked);
        } else if(props.tab == 'todo') {
            setCheckbox('forceChecked');
        } else {
            setCheckbox('forceUnchecked');
        }

        const task = {
            id: props.id,
            completed: checked,
            tab: props.tab,
        };

        Database.update(task).then(tasks => {
            setTimeout(() => {
                props.setTasks(tasks);
            }, 500);
        }).catch(error => console.log(error));
    };

    const onDelete = () => {
        Database.delete({id: props.id, tab: props.tab}).then(tasks => {
            console.log(tasks);
            props.setTasks(tasks);
        }).catch(error => console.log(error));
    };

    useEffect(() => {
       
      }, []);

    if(props.task) {
        console.log(props.task);
        const task = props.task.task.charAt(0).toUpperCase() + props.task.task.slice(1);
    
        return <div className='container task'>
            <div className="row">
            <div className="col-7">
                <p>{`${props.pos}. ${task}`}</p>
            </div>
            <div className="col-2">
                <input checked={checkbox == 'forceChecked' ? true : checkbox == 'forceUnchecked' ? false :   props.tab == 'all' ? checkbox : props.tab == 'todo' ? false : true} onChange={e => onCheck(e)} type="checkbox" className="checkbox taskField" />
            </div>
            <div className="col-2 taskField">
                <button className="deleteButton taskField" onClick={() => onDelete()}> X </button>
            </div>
            </div>
        </div>;
    } else {
        return <div className='container task'>
            <div className="row">
            <div className="col-8">
                <TextareaAutosize ref={input} onChange={e => onChange(e)} placeholder={'New...'} className="input" />
                {/* <textarea ref={input} onChange={e => onChange(e)} placeholder={'New...'} resize className="input" /> */}
            </div>
            <div className="col-2 taskField">
                {task && <button className="submitButton taskField" onClick={() => {onSubmit()}}> {'>'} </button>}  
            </div>
            </div>
        </div>;
    }
    
};

export default Task;