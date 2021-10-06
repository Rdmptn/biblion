# Biblion

Biblion is a web application used for creating and viewing book reviews created with React, using a PostreSQL database and Express server to host persistent user and post data.  
Biblion also makes use of the public google books API to grab book covers and page counts when a new post is made for a book not already stored in the database.

## Screenshots

!["All Posts"](https://github.com/Rdmptn/biblion/blob/master/docs/All%20Posts.png?raw=true)  
This page displays all posts on the website, sorted by recency. The search results page and posts by genre pages also look very similar.

!["Single Post"](https://github.com/Rdmptn/biblion/blob/master/docs/Single%20Post.png?raw=true)   
This page displays a larger version of a single post, including more interactive features such as adding a like or leaving a comment.

!["Create Post"](https://github.com/Rdmptn/biblion/blob/master/docs/Create%20Post.png?raw=true)   
The form for creating a new post.

!["Profile"](https://github.com/Rdmptn/biblion/blob/master/docs/Profile.png?raw=true)   
The profile page showing user stats as well as a badge selector, where badges act as user profile images.

## Setup

Install dependencies with `npm install` in both the frontend and express-server folders.

Setup a PSQL database named 'biblion' and ensure it's running, then from the express-server folder use `npm run db:reset` to seed the database.

Run the development server and api server using `npm start` from the respective file paths for each.
