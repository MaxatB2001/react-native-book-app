import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API_URL } from "../constants/constants";

export const searchBooks = async (query) => {
  const books = await fetch(`${BASE_API_URL}/api/book/search?query=${query}`);
  return await books.json();
};

export const getBook = async (id) => {
  const book = await fetch(`${BASE_API_URL}/api/book/${id}`);
  return await book.json();
};

export const getBooksFromStorage = async () => {
  const books = await AsyncStorage.getItem("library");
  return JSON.parse(books);
}

export const setBookCurrentPageById = async (id, newCurrentPage) => {
  const books = JSON.parse(await AsyncStorage.getItem("library"));
  for (let i = 0; i < books.length; i++) {
    if (books[i]._id == id) {
      books[i].currentPage = newCurrentPage;
      break;
    }
  }
  await AsyncStorage.setItem("library", JSON.stringify(books));
}

export const getGenres = async () => {
  const genres = await fetch(`${BASE_API_URL}/api/genre`);
  return await genres.json();
}

export  const getByGenres = async (id) => {
  const books = await fetch(`${BASE_API_URL}/api/book/byGenre/${id}`);
  return await books.json();
}