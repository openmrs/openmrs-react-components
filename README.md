
# Using React Components

Steps to the react component within your React project

### Add @openmrs/react-components as a dependency
```
npm install @openmrs/react-components
```
### Add babel-polyfill as a dependency and import it

Saga requires that babel-polyfill be installed and configured for your project:
```
npm install babel-polyfill
```
Then make sure, you import 'babel-polyfill' in your entry file (ie: index.js)

### Add react-redux, redux-saga and redux-form as dependencies
```
npm install react-redux
npm install redux-saga
npm install redux-form
```
Also recommended, redux-logger:
```
npm install redux-logger
```
### Create or update a redux-store that injects the reducers and sagas provided by @openmrs/react-components

They should be injected under the "openmrs" namespace.

See example store at `samples/redux-store.js`

For an example of how to inject a Redux store, see `samples/App.jsx`

For a documentation of how to use the components check out the [readme](https://github.com/openmrs/openmrs-react-components/tree/master/src/components) for components

## Bootstrap

UI components within the library generally use Bootstrap styles.  *However* the bootstrap css files are not included
in the released bundle.  Library consumers must provide the Bootstrap styles (or their own alternatives) within there
own app.

For information on including the stylesheet, see:

https://react-bootstrap.github.io/getting-started/introduction

Note that you may also need to include react-bootstrap and react-dom as dependencies in the app that uses react components
(TODO: confirm this?)

If you are using the create-react-app template, you can install and use the Bootstrap CSS by following the steps here:

https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/[README]().md#adding-bootstrap

## Localization

To localization your OWA with the react-intl HOC, wrap a component with the withLocalization HOC

```
import { initializeLocalization, withLocalization } from '@openmrs/react-components';

initializeLocalization()

const LocalizedBreadCrumb = withLocalization(myComponent);
```

To provide additional message codes, pass them in when initializing localization
```
import { initializeLocalization, withLocalization } from '@openmrs/react-components';

// your translation files (JSON object of messages codes-to-translation key-value pairs
import messagesEN from "./translations/en.json";
import messagesFR from "./translations/fr.json";

initializeLocalization({
    en: messagesEN,
    fr: messagesFR,
})

const LocalizedBreadCrumb = withLocalization(myComponent);

```

Note that we only currently support language-based translations, not language and country based translations. For instance we don't support providing custom translations for "en_GB" like en_GB.json.

However, the component can handle parsing locales with a country. Component... ie. if the locale is "en_GB" the en.json translations wil be used, and if the locale is "es_MX" the es.json translations will be used.  See `withLocalization.test.jsx` if you want a greater understanding of the supported use cases. 

# Publishing a new version

Set the version number you want to release in the pom, and then run:
```
npm run pack

npm publish --access public
```

# Other tips

### To get around CORS issues when developing:

https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en
