import 'babel-polyfill';
import SagaTester from 'redux-saga-tester';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.SagaTester = SagaTester;
