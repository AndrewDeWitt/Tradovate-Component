## How to Gulp Build and Review
 - npm install
 - gulp
 - cd prod-build
 - node server.bundle.js
 - http://localhost:3080/

## Development 
 - npm start

## Notes
- Had some concerns around locked columns. Currently if a user locks columns then drags another column above a locked column it will push down one of the previous locked columns. The instructions seemed to imply that the count of locked columns was more important than the actual columns themselves. 

- Used Create React App to speed up development and added gulp later on to bundle into a production build

- Important NPM package used: https://github.com/atlassian/react-beautiful-dnd

- Not sure what was meant by "save button should raise an event". I assumed just add a click event and console log the required information. Was not sure if a custom event was wanted.

- Did not use react bootstrap instead just stuck with plain css