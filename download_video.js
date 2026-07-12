import fs from 'fs';
import https from 'https';

const url = "https://assets.mixkit.co/videos/preview/mixkit-delivery-man-riding-a-scooter-in-the-city-4091-large.mp4";
const dest = "./public/delivery.mp4";

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://mixkit.co/'
  }
};

https.get(url, options, (response) => {
  if (response.statusCode === 200 || response.statusCode === 206) {
    const file = fs.createWriteStream(dest);
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log('Download complete!');
    });
  } else if (response.statusCode > 300 && response.statusCode < 400 && response.headers.location) {
    console.log('Redirecting to: ' + response.headers.location);
    https.get(response.headers.location, options, (res2) => {
      if (res2.statusCode === 200 || res2.statusCode === 206) {
        const file = fs.createWriteStream(dest);
        res2.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log('Download complete after redirect!');
        });
      } else {
        console.error('Failed after redirect: ' + res2.statusCode);
      }
    });
  } else {
    console.error('Failed to download: ' + response.statusCode);
  }
}).on('error', (err) => {
  console.error('Error: ', err.message);
});
