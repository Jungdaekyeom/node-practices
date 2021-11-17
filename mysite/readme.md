## mysite powered by node.js(express)

#### 설치패키지

```bash
[mysite] $ npm i express 0
[mysite] $ npm i ejs
[mysite] $ npm i mysql2
[mysite] $ npm i express-session
[mysite] $ npm i sequelize
[mysite] $ npm i dotenv
[mysite] $ npm i multer
[mysite] $ npm i winston
[mysite] $ npm i winston-daily-rotate-file
[mysite] $ npm i moment

[mysite] $ npm -D nodemon
[mysite] $ npm -D mocha
[mysite] $ npm -D chai

```

#### scripts in package.json

```json
  "scripts": {
    "start": "node index.js",
    "debug": "nodemon index.js",
    "test" : "npx mocha"
  }
```

#### project structure
<pre>
/mysite
    |--- index.js
    |--- package.json : 자동세팅됨
    |--- package-lock.json : 자동세팅됨
    |--- [node-modules]
    |--- test
    |--- logging
    |--- [logs]
    |       |--- [error]
    |--- [multer-temporary-store]
    |--- config : 환경변수
    |--- public
    |       |--- assets
    |               |--- [upload-image]
    |               |--- css
    |               |--- images
    |               |--- js
    |--- routes
    |--- controllers
    |       |--- admin
    |--- models : 시퀄라이저에서 모델을 만드는 방법을 따라야 한다.
    |--- views
    |       |--- main
    |       |--- user
    |       |--- board
    |       |--- guestbook
    |       |--- gallery
    |       |--- includes
    |       |--- admin
    |               |--- includes
</pre>