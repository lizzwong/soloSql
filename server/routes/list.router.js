const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const bodyParser = require('body-parser');

router.get('/:id', function(request,response){
    const id = request.params.id;
    console.log(id);
    
    const sqlText = 'SELECT * FROM trips WHERE user_id=$1 ORDER BY id';
    pool.query(sqlText, [id])
    .then(function(result){
        console.log('Getting lists');
        response.send(result.rows);
    })
    .catch(function(error){
        console.log('Error getting lists', error);
        response.sendStatus(500);
    })
})

router.post('/', function(request, response){
    const newList = request.body;
    console.log('Adding list', request.body);
    const sqlText = `INSERT INTO trips (title, departure, duration, destination, method, reminders, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    pool.query(sqlText, [newList.title, newList.departure, newList.duration, newList.destination, newList.method, newList.reminders, newList.user_id])
    .then(function(result){
        console.log('List added');
        response.sendStatus(201);
    })
    .catch(function(error){
        console.log('Could not add list', error);
        response.sendStatus(500);
    })
})

router.delete('/delete/:id', function (request, response){
    const id = request.params.id;
    const sqlText = `DELETE FROM trips WHERE id=$1`;
    pool.query(sqlText, [id])
    .then(function(result){
        console.log('List deleted');
        response.sendStatus(200);
    })
    .catch(function(error){
        console.log('List not deleted', error);
        response.sendStatus(500);
    })
})

router.put('/:id', function(request, response){
    const id = request.params.id;
    const list = request.body.list;
    console.log('Updated list', list);
    const sqlText = `UPDATE trips SET title=$1, departure=$2, duration=$3, destination=$4, method=$5, reminders=$6, user_id=$7 WHERE id=$8`;
    pool.query(sqlText, [list.title, list.departure, list.duration, list.destination, list.method, list.reminders, list.user_id, list.id])
    .then(function(result){
        console.log('List updated');
        response.sendStatus(201);
    })
    .catch(function(error){
        console.log('Error updating list', error);
        response.sendStatus(500);
    })
})

router.put('/archive/:id', function (request, response) {
    const id = request.params.id;
   // console.log('Updated list', list);
    const sqlText = `UPDATE trips SET finished=TRUE WHERE id=$1`;
    pool.query(sqlText, [id])
    .then(function (result) {
        console.log('List finished');
        response.sendStatus(201);
    })
    .catch(function (error) {
        console.log('Error finishing list', error);
        response.sendStatus(500);
    })
})

router.get('/', function (request, response){
    console.log('Get universal');
    const sqlText = `SELECT * FROM universal ORDER BY id`;
    pool.query(sqlText)
    .then(function(result){
        console.log('Getting universal list');
        response.send(result.rows)
    })
    .catch(function(error){
        console.log('Error getting universal list', error);
        response.sendStatus(500);
    })
})


router.post('/progress', function(request,response){
    console.log('Add to progress');
    const addItem = request.body;
    console.log('Adding item', addItem);
    const sqlText = `INSERT INTO progress (item_id, item, description, category, type, trip_id)
            VALUES ($1, $2, $3, $4, $5, $6)`;
    pool.query(sqlText, [addItem.item_id, addItem.item, addItem.description, addItem.category, addItem.type, addItem.trip_id])
    .then(function(result){
        console.log('Adding item success');
        response.sendStatus(201);
    })
    .catch(function(error){
        console.log('Error adding to progress', error);
        response.sendStatus(500);
    })
})

router.get('/view/:id', function(request,response){
    console.log('Getting recent list');
    const id = request.params.id;
    const sqlText = `SELECT * FROM progress WHERE trip_id=$1 ORDER BY id`;
    pool.query(sqlText, [id])
    .then(function(result){
        console.log('Got list view items');
        response.send(result.rows);
    })
    .catch(function(error){
        console.log('Error getting list view', error);
        response.sendStatus(500);
    })
})

router.delete('/deletelistitem/:id', function(request,response){
    console.log('Deleting list item');
    const id = request.params.id;
    const sqlText = `DELETE FROM progress WHERE id=$1`;
    pool.query(sqlText, [id])
    .then(function(result){
        console.log('Item deleted');
        response.sendStatus(200)
    })
    .catch(function(error){
        console.log('Error deleting item', error);
        response.sendStatus(500);
    })
})

router.put('/completeitem/:id', function(request,response){
    console.log('Completing item');
    const id = request.params.id;
    const sqlText =  `UPDATE progress SET packed=!packed WHERE id=$1`;
    pool.query(sqlText, [id])
    .then(function(result){
        console.log('Item completed');
        response.sendStatus(200)
    })
    .catch(function(error){
        console.log('Error completing item', error);
        response.sendStatus(500);
    })
})
module.exports = router;