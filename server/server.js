const { Sequelize, DataTypes, TableHints} = require('sequelize');

const sequelize = new Sequelize('todo', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });

const Task = sequelize.define(
    'Task', {
        task: {
            type: DataTypes.STRING,
            allowNull: false
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }
);

Task.sync();


const express = require('express');
const app = express();
const port = 4000;
const bp = require('body-parser')

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))


const cors = require('cors');

app.use(cors());

app.get('/all', (req, res) => {
    Task.findAll().then(tasks => res.json(tasks));
});

app.get('/todo', (req, res) => {
    Task.findAll({where:{completed: false}}).then(tasks => res.json(tasks));
});

app.get('/done', (req, res) => {
    Task.findAll({where:{completed: true}}).then(tasks => res.json(tasks));
});

app.post('/add', (req, res) => {
    console.log('add');
    console.log(req.body);
    Task.create({task: req.body.task, completed: false}).then(result => {
        let params = {};
        if(req.body.tab == 'completed') {
            params = {where: {completed: true}};
        } else if(req.body.tab == 'todo') {
            params = {where: {completed: false}};
        }

        Task.findAll(params).then(tasks => res.json({tasks: tasks, tab: req.body.tab}   ));
    }).catch(error => {
        console.log(error);
        res.json({status: 'error'});
    });
});

app.patch('/update', (req, res) => {
    console.log('PATCH');
    const newTask = req.body;
    console.log(newTask);

    Task.findByPk(newTask.id).then(task => {
        if(task != null) {
            task.update(newTask).then(() => {
                let params = {};
                if(req.body.tab == 'done') {
                    params = {where: {completed: true}};
                } else if(req.body.tab == 'todo') {
                    params = {where: {completed: false}};
                }

                Task.findAll(params).then(tasks => res.json({tasks: tasks, tab: req.body.tab}));
            }).catch(error => console.log(error));
        }
    }).catch(error => {
        console.log(error);
        res.json({status: 'error'});
    });
});

app.delete('/delete/:id', (req, res) => {
    Task.findByPk(parseInt(req.params.id)).then(task => {
        if(task != null) {
            task.destroy().then(() => {
                let params = {};
                if(req.body.tab == 'done') {
                    params = {where: {completed: true}};
                } else if(req.body.tab == 'todo') {
                    params = {where: {completed: false}};
                }

                Task.findAll(params).then(tasks => res.json({tasks: tasks, tab: req.body.tab}));
            });
        }
    }).catch(error => {
        console.log(error);
        res.json({status: 'error'});
    });
});

app.listen(port, () => {
    console.log('Server running');
});
