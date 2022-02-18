//https://www.flickr.com/services/api/flickr.photos.search.html (Поиск без параметров поиска, но с extras - обычный вывод, с параметрами - поиск, так же есть пагинация)
//https://www.flickr.com/services/api/flickr.photos.getInfo.html (В этой API можно получить всю инфу о фотке по id фотки)
//https://www.flickr.com/services/api/flickr.people.getInfo.html(информация об авторе)
//Вспомогательный URL flickr.photos.search
//Вспомогательный URL flickr.photos.getInfo
//API key
// d1187e5b69a6bda6da67e1d2be5cf348
// Secret:
// a59e95780bcb1514
import axios from 'axios'

export const APIKey = 'd1187e5b69a6bda6da67e1d2be5cf348'
const APISecret = 'a59e95780bcb1514'

const NET = axios.create({
    baseURL: `https://api.flickr.com/services/rest/`,
    responseType: 'json',
    headers: {'Content-Type': 'application/json'},
})

NET.interceptors.request.use((config) => {
    config.params = {api_key: APIKey, format: 'json', secret: APISecret,  ...config.params}
    return config
}, console.log)

export default NET