# Would You Rather Project

This is my finished code for the second project for Udacity's React nanodegree program.

Users participate by asking and answering questions that have exactly two mutally exclusive answers.
They can also like and comment on questions.

There is no proper authentication, anyone can log in as anyone, or create a new account.

**Note:** Because the original API was not designed for new user accounts, the app will crash if you
attempt to ask or answer a question with a new profile.  There are several way I could fix this, but doing right 
would require me to directly modify the data.js file.  I want to avoid that before the project has been evaluated.

## TL;DR

To run this yourself:

* clone the project to your local machine with `git clone https://github.com/Brodt7258/WouldYouRather.git`
* install all project dependencies with `npm install`
* start the development server with `npm start`

## Data

At this time, the app does not use a real database.  Changes will not persist between sessions.

### Possible Improvements

* update API in data.js to work with new users
* or... add a real database
* refactor styles from current in-line ~~setup~~ mess
* tweak color and size of icons
* allow users to upload new profile images
* refactor QuestionDetails. It's gotten a bit large and should really be split up