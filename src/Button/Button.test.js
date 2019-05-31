import React from 'react';
import Button from './Button';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

test('Button with success and loading status', () => {
  const checkbox = shallow(<Button loading>Button</Button>);

  expect(checkbox.text()).toEqual('Button');
});
