const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// phonebook info
app.get('/info', (request, response) => {
  const numPeople = persons.length

  response.send(
  `<p>Phonebook has info for ${numPeople} people </p>
  <p>${new Date}</p>`
  )

})

// person info
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)

  if(person) {
    response.json(person)
  }
  else {
    response.status(404).end()
  }
})

// delete person from phonebook
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  person = persons.filter(p => p.id !== id)
  response.status(204).end()
})

// generate a new id for the phonebook entry
const generateId = () => {
  return Math.round(Math.random()*99999999)
}

// add person to phonebook
app.post('/api/persons', (request, response) => {

    if(request.body.name && request.body.number) { 
        const id = generateId()
        const person = request.body
        person.id = id

        persons.concat(person)
        response.json(person)
    }
    else {
        return response.status(400).json({ 
            error: 'Information missing'
        })
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})