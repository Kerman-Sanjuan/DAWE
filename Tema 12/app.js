const express = require('express')
const app = express()
const fs = require('fs')
const https = require('https')
const http = require('http')

app.use(express.static(__dirname + '/public', { dotfiles: 'allow' }))

app.get('/', (req, res) => {
  res.send('Hello HTTPS!');
})

http.createServer(app).listen(80, () => {
  console.log('Listening...')
})

https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/kermansanjuan.me/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/kermansanjuan.me/fullchain.pem')
}, app).listen(443, () => {
  console.log('Listening to https...')
})

