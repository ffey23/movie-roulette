This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Movie Roulette App

## Runing The App

1. Clone repository
2. Install **Node.js** if you don't have it already
3. Navigate to the root project folder and run **npm i** and wait for installation process to finish
4. Create an account on https://www.themoviedb.org
5. Create API key for https://www.themoviedb.org by following [these instuctions](https://developers.themoviedb.org/3/getting-started/introduction)
6. In the root project folder create **.env.local** file and provide it with the next content:
``` 
    REACT_APP_API_KEY=YOUR_V3_API_KEY
    REACT_APP_ACCESS_TOKEN=YOUR_V4_API_READ_ACCESS_TOKEN
    REACT_APP_HOMEPAGE=http://localhost:3000/
```
7. run **npm start** and the app will automatically open in Chrome after compilation


## Features

1. Random movies suggestion - most popular
2. Suggest most popular movies based on chosen genre
3. Checks movie details

## User Journey

1.  Click on the login button in the header
2.  After being redirected to themoviedb.org: approve request token there
3.  Click on the load button at the bottom of the screen
4.  Click on the roll button, choose some genre and click ok
5.  Click the load button
6.  Click on the roll button, choose "All genres" and click roll
7.  Click the load button
8.  Click on some movie on the list and scroll up-down
9.  Go back to see if you have the same movie list and are at the same scroll position as before you went to the movie-details page
10. Click on some movie again
11. Rate movie
12. Go back and click again on the same movie to see if rating was saved
13. Click on the logout button in the header
