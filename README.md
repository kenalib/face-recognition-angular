# FaceRecognitionUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Tests and Build

```bash
ng test
ng e2e
ng build --prod
```

## Nginx Server setup

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
