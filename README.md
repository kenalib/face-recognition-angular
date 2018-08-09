# Face Recognition Demo (frontend)


* Live demo https://faceapp.tk/

This is frontend. The backend is here -> https://github.com/kenalib/face-recognition-spring


## Development server

```bash
npm start
open http://localhost:4200/
```

## Tests and Build

```bash
npm lint
npm test
npm e2e
npm build-prod
```

## Deploy

```bash
docker-machine scp -r dist/face-recognition-ui/ face-server:/usr/share/nginx/html/
```

* sample command using docker-machine (TODO: use Travis CI)

## Nginx Server Setup for Angular

Nginx setup to avoid reload 404 error.

* Spring Boot server running at http://127.0.0.1:8080
* https server setup using Let's Encrypts

```bash
# /etc/nginx/conf.d/default.conf
server {
    server_name  faceapp.tk www.faceapp.tk;

    location / {
        root   /usr/share/nginx/html/face-recognition-ui;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
    location /face-recognition {
        proxy_pass http://127.0.0.1:8080;
    }
}
```

## Misc note

* to fix `error TS2304: Cannot find name 'Buffer'.`

```
npm i -g typescript@next
npm i --save-dev @types/node
# and add "types" : ["node"] in tsconfig.app.json
# and restart dev server
```

* see https://stackoverflow.com/questions/51256473/angular-cannot-find-name-buffer

## Reference

* https://stackoverflow.com/questions/35284988/angular-2-404-error-occur-when-i-refresh-through-the-browser
