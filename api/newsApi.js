import { BASE_API_URL } from "../constants/constants"

export const getNews = async (currentPage) => {
  const news = await fetch(`${BASE_API_URL}/api/news?${new URLSearchParams({
    currentPage
  })}`)
  return await news.json();
}