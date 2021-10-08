require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

const morganConfig = (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
    JSON.stringify(req.body),
  ].join(' ')
}

app.use(morgan(morganConfig))

app.get('/info', (request, response) => {
  Person.find({}).then((result) => {
    response.send(
      `<p>Phonebook has info for ${result.length} people</p>
                <p>${new Date()}</p>`
    )
  })
})

app.get('/health', (request, response) => {
  response.send('ok')
})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons)
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then((result) => {
      response.json(result)
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

if (process.env.NODE_ENV === 'test') {
  app.delete('/api/persons/', (request, response, next) => {
    Person.deleteMany({})
      .then((result) => {
        response.status(204).end()
      })
      .catch((error) => next(error))
  })
} else {
  app.delete('/api/persons/', (request, response) => {
    response.status(400).send({ error: 'Server not in test mode' }).end()
  })
}

app.put('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndUpdate(
    request.params.id,
    { number: request.body.number },
    { new: true }
  )
    .then((result) => {
      response.json(result)
    })
    .catch((error) => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
  console.log(error)

  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: `${error.message}` })
  }

  return response.status(500).send({ error: `${error.message}` })
}

app.use(errorHandler)
