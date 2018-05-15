
# Using React Components

Steps to the react component within your React project

### Add openmrs-contrib-reactcomponents as a dependency

npm install openmrs-contrib-reactcomponents

### Add babel-polyfill as a dependency and import it

Saga requires that babel-polyfill be installed and configured for your project:

npm install babel-polyfill

Then make you you import 'babel-polyfill' in your entry file (ie index.js)

### Add react-redux, redux-saga and redux-form as dependencies

npm install react-redux
npm install redux-saga
npm install redux-form

Also recommended, redux-logger:

npm install redux-logger

### Create or update a redux-store that injects the reducers and sagas provided by openmrs-contrib-reactcomponents

They should be injected under the "openmrs" namespace.

See example store at samples/redux-store.js

For an example of how to inject a Redux store, see samples/App.jsx
