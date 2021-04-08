## torrents-test-client

This application allows users to share audio files

One user can seed the audio file, other users can download the seeded file using the special download link produced by the application

Stack: [Webtorrent](https://webtorrent.io), [jQuery](https://jquery.com), [Express](http://expressjs.com)

DEV: http://localhost:9900

STAGE: https://torrents-test-client.herokuapp.com

### Deploy

```shell script
git clone https://github.com/peterdee/torrents-test-client
cd ./torrents-test-client
nvm use 14
npm i
```

### Launch

```shell script
npm run dev
```

### Heroku

The `stage` branch is deployed to Heroku automatically

### License

[MIT](LICENSE)
