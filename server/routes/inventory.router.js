const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const bodyParser = require('body-parser');

router.get('/:id', function (request, response){
    const id = request.params.id
    console.log(id);
    const sqlText = 'SELECT * FROM inventory WHERE user_id=$1 ORDER BY type, id';
    pool.query(sqlText, [id])
    .then(function(result){
        console.log('Getting inventory items');
        response.send(result.rows);
    })
    .catch(function(error){
        console.log('Error getting inventory items', error);
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

router.delete('/delete/:id', function(request,response){
    const id = request.params.id;
    const sqlText = `DELETE FROM inventory WHERE id=$1`;
    pool.query(sqlText, [id])
        .then(function(result){
            console.log('Inventory item deleted');
            response.sendStatus(200);
        })
        .catch(function(error){
            console.log('Inventory item not deleted', error);
            response.sendStatus(500);
        })
})

router.put('/:id', function(request,response){
    const id = request.params.id;
    const item = request.body.item;
    console.log('Updated item', item);
    const sqlText =  `UPDATE inventory SET type=$1, item=$2, description=$3, notes=$4, user_id=$5 WHERE id=$6 `;
    pool.query(sqlText, [item.type, item.item, item.description, item.notes, item.user_id, item.id])
        .then(function(result){
            console.log('Inventory item updated');
            response.sendStatus(201);
        })
        .catch(function(error){
            console.log('Inventory item not updated', error);
            response.sendStatus(500);
        })
})

module.exports = router;