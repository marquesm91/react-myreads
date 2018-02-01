# MyReads Project

MyReads Project is the first challenge project of Udacity Nanodegree React Program.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent guide version of creating projects with `create-react-app` [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Test yourself

Follow these steps

* `git clone https://github.com/marquesm91/react-myreads`
* `npm install` or `yarn`
* `npm run start` or `yarn start`

The application will open your default browser on https://localhost:3000/

## About the application

After the default installation with `create-react-app`, three 3rd party library was added:

* `react-router-dom` found [here](https://github.com/ReactTraining/react-router) and used for better experience with browser url navigation and keep react application sync'd.
* `escape-string-regexp` found [here](https://github.com/sindresorhus/escape-string-regexp) and used for format RegExp.
* `sort-by` found [here](https://github.com/kvnneff/sort-by) and used for sort array based on an key object.
* `throttle-debounce` found [here](https://github.com/niksy/throttle-debounce) and used for debounce search bar.

The application consumes **BooksAPI** provided earlier from the starter kit Github [repo](https://github.com/udacity/reactnd-project-myreads-starter).

## What you can do

* You can add/remove/change books selecting the desired shelf between *Currently Reading*, *Want to Read*, *Read* or *None*.
* You can search for books based on a list found in `src/SearchTerms.js`. You could also search for initials, book names but be aware that not every book will be found. More info on the starter kit Github [repo](https://github.com/udacity/reactnd-project-myreads-starter).

## Features

* You can filter your search to fetch only new books and exclude books you already had in some shelf.
* Every interaction with BooksAPI the user has a feedback box to aware what is happening.
* On first load shelves a spinner will be display to aware user that your books will be there as soon as possible.
* Suggestions will display below search bar when start typing to help user what to search.
* When hit enter or click in any suggestion when fetching for books a feedback bar will be boucing below search bar to aware user that the application is still doing something with your query.
