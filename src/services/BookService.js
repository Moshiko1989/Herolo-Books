import axios from 'axios';

function getBooks(query = null) {
    if (!query) query = 'java script';
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
}

export default {
    getBooks,
}