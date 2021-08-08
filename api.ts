import axios from 'axios'

export default axios.create({
  baseURL: 'https://dummyapi.io/data/api/',
  headers: {
    'app-id': '610b0a51cc67fd2a239b6a98',
  },
})
