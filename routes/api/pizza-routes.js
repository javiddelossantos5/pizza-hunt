const router = require('express').Router();

const {
    getAllPizza,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza
} = require('../../controllers/pizza-controller');

// Set up Get all and Post at /api/pizzas
// /api/pizzas
router
    .route('/')
    .get(getAllPizza)
    .post(createPizza);

// Set up Get one, PUT, and DELETE at /api/pizzas/:id
// /api/pizzas/:id
router
    .route('/:id')
    .get(getPizzaById)
    .put(updatePizza)
    .delete(deletePizza);

    
module.exports = router;