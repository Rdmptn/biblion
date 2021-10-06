# Biblion

Biblion is a web application used for creating and viewing book reviews created with React, using a PostreSQL database and Express server to host persistent user and post data.

## Screenshots

!["All Posts"](https://github.com/Rdmptn/biblion/blob/master/docs/All%20Posts.png?raw=true)  
All Posts

!["Single Post"](https://github.com/Rdmptn/biblion/blob/master/docs/Single%20Post.png?raw=true)   
Single Post

!["Create Post"](https://github.com/Rdmptn/biblion/blob/master/docs/Create%20Post.png?raw=true)   
Create Post

!["Profile"](https://github.com/Rdmptn/biblion/blob/master/docs/Profile.png?raw=true)   
Profile

## Setup

Install dependencies with `npm install` in both the frontend and express-server folders.

Setup a PSQL database named 'biblion' and ensure it's running, then from the express-server folder use `npm run db:reset` to seed the database.

Run the development server and api server using `npm start` from the respective file paths for each.
