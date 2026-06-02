const fs = require('fs');
const https = require('https');
const path = require('path');

const icons = {
  whatsapp: 'https://img.icons8.com/ios/50/4b5563/whatsapp.png',
  mail: 'https://img.icons8.com/ios/50/4b5563/mail.png',
  instagram: 'https://img.icons8.com/ios/50/4b5563/instagram-new.png',
  telegram: 'https://img.icons8.com/ios/50/4b5563/telegram-app.png',
  facebook: 'https://img.icons8.com/ios/50/4b5563/facebook-new.png',
  twitter: 'https://img.icons8.com/ios/50/4b5563/x-twitter.png',
  youtube: 'https://img.icons8.com/ios/50/4b5563/youtube-play.png',
  linkedin: 'https://img.icons8.com/ios/50/4b5563/linkedin.png'
};

const dir = path.join(__dirname, 'server', 'icons');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

Object.entries(icons).forEach(([name, url]) => {
  const file = fs.createWriteStream(path.join(dir, `${name}.png`));
  https.get(url, function(response) {
    response.pipe(file);
  });
});
