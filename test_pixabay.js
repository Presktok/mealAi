import https from 'https';

const url = "https://cdn.pixabay.com/video/2021/08/21/85817-591559858_tiny.mp4";

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': '*/*'
  }
};

https.get(url, options, (response) => {
  console.log('Status Code:', response.statusCode);
  if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
    console.log('Redirect location:', response.headers.location);
  }
}).on('error', (err) => {
  console.error('Error: ', err.message);
});
