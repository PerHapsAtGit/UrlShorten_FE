import React from 'react';
import { App } from './App';

const defaultProps = {
  serviceInUse: false,
  actions: {
    shortenUrl: () => {},
  },
};

describe('<App />', () => {
  it('should render properly', () => {
    const wrapper = mount(
      <App {...defaultProps} />
    );
    expect(wrapper).to.have.length(1);
  });

  it('should handle button click', () => {
    const wrapper = shallow(
      <App {...defaultProps} />
    );

    wrapper.instance().inputRef = {
      current: {
        value: null,
      },
    };

    const spy = sinon.spy(wrapper.instance().props.actions, 'shortenUrl');
    wrapper.find('button.main-app__button').at(0).simulate('click');
    expect(spy.calledOnce).to.be.true;
  });

  it('should render service rensponse info', () => {
    const wrapper = shallow(
      <App 
        {...defaultProps}
        hash="abc"
      />
    );

    const infoDiv = wrapper.find('.main-app__service-response');
    expect(infoDiv.length).to.equal(1);
  });
});
