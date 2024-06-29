const express = require('express')
const { Todo } = require('../mongo')
const router = express.Router()
const { getAsync, setAsync } = require('../redis')
const { get } = require('mongoose')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos)
})

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  })
  res.send(todo)

  // Retrieve the current count or initialize it to 0 if not present
  let addedTodos = await getAsync('added_todos')

  addedTodos = Number(addedTodos)
  if (isNaN(addedTodos)) {
    console.error(
      'Expected a numeric value for added_todos, but got:',
      addedTodos
    )
    addedTodos = 0
  }

  // Increment and update the added_todos in Redis
  addedTodos += 1
  await setAsync('added_todos', addedTodos)
  console.log('Added todos:', addedTodos)
})

const singleRouter = express.Router()

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  console.log(id)
  req.todo = await Todo.findById(id)
  console.log('----------', req.todo)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200)
})

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  console.log(req)
  res.send(req.todo)

  // res.sendStatus(405); // Implement this
})

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  req.todo.text = req.body.text
  req.todo.done = req.body.done
  await req.todo.save()
  res.send(req.todo)

  // res.sendStatus(405); // Implement this
})

// GET statistics at /statistics, which returns the count of added todos
router.get('/statistics', async (req, res) => {
  let added_todos = await getAsync('added_todos')
  added_todos = parseInt(added_todos, 10)
  if (isNaN(added_todos)) {
    added_todos = 0
  }
  res.send({ added_todos })
})

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router
