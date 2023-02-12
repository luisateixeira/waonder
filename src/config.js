import keys from './keys';

const vimeo = {
  sortBy: ['featured', 'likes', 'relevant'].sort(() => 0.5 - Math.random())[0]
}

const flickr = {
  groupId: '341060@N25',
  total: 100,
  extras: 'url_l,url_t,owner_name,path_alias'
}

export default {
  description: 'A visual journey experiment that will take you around the world',
  localStorage: {
    appKey: 'waonder-'
  },
  api: {
    countries: {
      uri: 'https://restcountries.com/v2/all',
      storage: true,
    },
    facebook: {
      appId: keys.facebook.appId
    },
    vimeo: {
      uri: 'https://api.vimeo.com/categories/travel/videos?filter=embeddable&filter_embeddable=true&per_page=100&fields=tags,link,uri,user.name,user.link&sort=' + vimeo.sortBy,
      player: 'https://player.vimeo.com/video/',
      bgRequestMax: 8,
      bgRequestDelay:10000,
      storage: { // stores vimeo responses to minimize API requests
        expirationMin: 10000 //expires within a week
      },
      headers : [{
          name: 'Accept',
          value: 'application/vnd.vimeo.*+json;version=3.2'
        }, {
          name: 'Authorization',
          value: 'basic ' + btoa(keys.vimeo.clientId + ':' + keys.vimeo.clientSecret)
        }]
    },
    flickr: {
      uri: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + keys.flickr.apiKey + '&text={query}&safe_search=1&content_type=1&accuracy=3&in_gallery=true&licence=2,3,4,6,7&media=photos&extras='+flickr.extras+'&per_page=' + flickr.total + '&group_id=' + flickr.groupId + '&format=json&nojsoncallback=1',
      link: 'https://www.flickr.com/photos/'
    }
  }
}
