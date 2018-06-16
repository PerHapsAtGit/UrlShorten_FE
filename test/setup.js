import { expect, assert } from 'chai';
import sinon from 'sinon';
import { mount, render, shallow } from 'enzyme';
var fetchMock = require('fetch-mock');

global.expect = expect;
global.assert = assert;
global.sinon = sinon;
global.fetchMock = fetchMock;

global.mount = mount;
global.render = render;
global.shallow = shallow;

// Configure enzyme
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

// Polyfill window dom
require('@babel/register')();
import jsdom from 'jsdom';
const { JSDOM } = jsdom;
global.window = (new JSDOM('')).window;
global.document = global.window.document;
global.navigator = {
  userAgent: 'node.js'
};

// Prevent mocha from interpreting CSS @import files
function noop() {
  return null;
}
require.extensions['.css'] = noop;
require.extensions['.scss'] = noop;

require('@babel/polyfill');