import { mockData } from '../mockData/mockData';
import axios from 'axios'

async function getSuggestions(query) {
  if (window.location.href.startsWith('http://localhost')) {
    return [
      {
        city: 'Denver',
        country: 'us',
        localized_country_name: 'USA',
        state: 'CO',
        name_string: 'Denver, Colorado, USA',
        zip: '80201',
        lat: 39.7,
        lon: -105.08
      },
      {
        city: 'Denver',
        country: 'us',
        localized_country_name: 'USA',
        state: 'NC',
        name_string: 'Denver, North Carolina, USA',
        zip: '28037',
        lat: 35.51,
        lon: -81.02
      },
      {
        city: 'Denver',
        country: 'us',
        localized_country_name: 'USA',
        state: 'PA',
        name_string: 'Denver, Pennsylvania, USA',
        zip: '17517',
        lat: 40.24,
        lon: -76.14
      }
    ];
  }

  const token = await getAccessToken();
  if (token) {
    const url = 'https://api.meetup.com/find/locations?&sign=true&photo-host=public&query='
      + query
      + '&access_token=' + token;
    const result = await axios.get(url)
    return result.data
  }
  return []
}

async function getEvents(lat, lon, page) {
  if (window.location.href.startsWith('http://localhost')) {
    return mockData.events;
  }

  //checking to see if online
  if (!navigator.onLine) {
    const events = localStorage.getItem('lastEvents');
    return JSON.parse(events);
  }

  const token = await getAccessToken();
  if (token) {
    let url = 'https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public' + '&access_token=' + token;

    if (lat && lon) {
      url += '&lat=' + lat + '&lon=' + lon;
    }

    if (page) {
      url += '&page=' + page;
    }

    const result = await axios.get(url);
    const events = result.data.events;

    if (events.length) {
      localStorage.setItem('lastEvents', JSON.stringify(events));
    }

    return events
  }
  return [];
}

//ACCESS TOKEN CHECKING
async function getOrRenewAccessToken(type, key) {
  let url;
  if (type === 'get') {
    //lambda endpoint to get token by code
    url = 'https://myikzrb4pe.execute-api.us-east-2.amazonaws.com/dev/api/token/' + key;
  } else if (type === 'renew') {
    //Lambda endpoint to get refresh token
    url = 'https://myikzrb4pe.execute-api.us-east-2.amazonaws.com/dev/api/refresh/' + key;
  }
  //axios to get request to endpoint
  const tokenInfo = await axios.get(url);

  //save tokens to localStorage together with timestamp
  localStorage.setItem('access_token', tokenInfo.data.access_token);
  localStorage.setItem('refresh_token', tokenInfo.data.refresh_token);
  localStorage.setItem('last_saved_time', Date.now());

  //return the access token
  return tokenInfo.data.access_token;
}

async function getAccessToken() {
  const accessToken = localStorage.getItem('access_token');

  if (!accessToken) {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code')

    if (!code) {
      window.location.href = 'https://secure.meetup.com/oauth2/authorize?client_id=kjrtsjp9sat50ld3gp43kdm367&response_type=code&redirect_uri=https://chrisxkoch.github.io/meetupnew'
      return null
    }
    return getOrRenewAccessToken('get', code);
  }

  const lastSavedTime = localStorage.getItem('last_saved_time');

  if (accessToken && (Date.now() - lastSavedTime < 3600000)) {
    return accessToken;
  }

  const refreshToken = localStorage.getItem('refresh_token');
  return getOrRenewAccessToken('renew', refreshToken);
}

export { getSuggestions, getEvents }; 
