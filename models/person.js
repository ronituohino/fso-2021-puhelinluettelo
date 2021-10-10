const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')

let url = ''

switch (process.env.NODE_ENV) {
case 'production':
  url = process.env.DB_URI
  break
case 'development':
  url = process.env.DB_DEV_URI
  break
case 'test':
  url = process.env.DB_TEST_URI
  break
}

mongoose
  .connect(url)
  .then((res) => {
    console.log('connected to db')
  })
  .catch((err) => {
    console.log(`error connecting to db: ${err}`)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
  },
})

personSchema.plugin(mongooseUniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)