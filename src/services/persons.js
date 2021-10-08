import axios from 'axios'

const baseUrl = '/api/persons'

const all = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (newNumber) => {
  const request = axios.post(baseUrl, newNumber)
  return request.then((response) => response.data)
}

const del = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

const replace = (id, newPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, newPerson)
  return request.then((response) => response.data)
}

const deleteAll = () => {
  const request = axios.delete(`${baseUrl}`)
  return request.then((response) => response.data)
}

const exportedObject = {
  all,
  create,
  del,
  replace,
  deleteAll
}

export default exportedObject
