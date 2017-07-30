## FBPlaylist -> easily create a playlist of youtube videos from facebook event/group/page

This repo and the project sadly is no longer supported ;(

```bash
git clone git@bitbucket.org:altras/playlist-app.git
cd playlist-app
# install the project's dependencies
npm install
# watches your files and uses livereload by default
npm start
# api document for the app
# npm run build.docs

# to start deving with livereload site and coverage as well as continuous testing
npm run start.deving

# dev build
npm run build.dev
# prod build
npm run build.prod
# prod build with AoT compilation
npm run build.prod.exp

# dev build of multiple applications (by default the value of --app is "app")
npm start -- --app baz
npm start -- --app foo
npm start -- --app bar

# use docker to create production ready container
bash ./scripts/create-docker-image.sh
```

_Does not rely on any global dependencies._
