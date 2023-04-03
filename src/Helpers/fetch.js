const API_KEY = '33764189-9b4498a919581aaa78e0499bc';
const BASE_URL = 'https://pixabay.com/api/';

export function getImages(searchQuery = '', currentPage = 1) {
  return fetch(
    `${BASE_URL}?q=${searchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => res.json());
}
