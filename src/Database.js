const Database = function() {};

// Database.key = '60ab8209318a330b62f5863f';
// Database.url = 'https://todoapi-d452.restdb.io/rest/todo';
Database.url = 'http://127.0.0.1:4000/';

Database.headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
};

Database.seed = () => {
    console.log('seed');
    fetch(Database.url + 'seed');
};

Database.all = () => {
    return fetch(Database.url + 'all', {
        method: 'GET',
        headers: Database.headers,  
    }).then(res => res.json());
};

Database.todo = () => {
    return fetch(Database.url + 'todo', {
        method: 'GET',
        headers: Database.headers,  
    }).then(res => res.json());
};

Database.done = () => {
    return fetch(Database.url + 'done', {
        method: 'GET',
        headers: Database.headers,  
    }).then(res => res.json());
};

Database.add = (task) => {
    console.log('add');
    return fetch(Database.url + 'add', {
        method: 'POST',
        headers: Database.headers,
        body: JSON.stringify(task),  
    }).then(res => res.json());
};

Database.update = task => {
    return fetch(Database.url + 'update', {
        method: 'PATCH',
        headers: Database.headers,
        body: JSON.stringify(task),  
    }).then(res => res.json());
};

Database.delete = (task) => {
    return fetch(Database.url + `delete/${task.id}`, {
        method: 'DELETE',
        headers: Database.headers,
        body: JSON.stringify(task)
    }).then(result => result.json());
};

Database.getMock = () => {
    return  new Promise((resolve, reject) => {
        resolve(
            [
                {
                    task: 'wyprowadzić psa na spacer',
                    completed: false
                },
                {
                    task: 'kupić mydło',
                    completed: false
                },

                {
                    task: 'sprzedać samochód',
                    completed: true
                },

                {
                    task: 'pojechać w Bieszczady',
                    completed: true
                },

        ]);
    });
}

export default Database;