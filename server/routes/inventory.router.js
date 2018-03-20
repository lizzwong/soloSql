const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const bodyParser = require('body-parser');

router.get('/', function (request, response){
    const sqlText = 'SELECT * FROM inventory ORDER BY user_id';
    pool.query(sqlText)
    .then(function(result){
        response.send(result.rows);
    })
    .catch(function(error){
        console.log('Error on get', error);
        response.sendStatus(500);
    })
})

router.post('/', function(request, response){
    const inventoryItem = request.body;
    console.log('Adding to inventory', request.body);
    const sqlText = `INSERT INTO inventory (type, item, description, notes, user_id)
        VALUES ($1, $2, $3, $4, $5)`;
    pool.query(sqlText, [inventoryItem.type, inventoryItem.item, inventoryItem.description, inventoryItem.notes, inventoryItem.user_id])
    .then(function(result){
        console.log('Inventory item added');
        response.sendStatus(201);
    })
    .catch(function(error){
        console.log('Could not add Inventory Item', error);
        response.sendStatus(500);
    })
})


module.exports = router;