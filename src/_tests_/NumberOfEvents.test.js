import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> Component', () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });

    test('events component is generated', () => {
        expect(NumberOfEventsWrapper.find('.events')).toHaveLength(1);
    });

    test('input of requested amount of events is generated', () => {
        expect(NumberOfEventsWrapper.find('.eventsNumberInput')).toHaveLength(1);
    });

    test('render number input correctly to state', () => {
        const numberQuery = NumberOfEventsWrapper.state('query');
        expect(NumberOfEventsWrapper.find('.eventsNumberInput').prop('value')).toBe(numberQuery)
    });

    test('default number of events per page is 32', () => {
        expect(NumberOfEventsWrapper.state('query')).toBe(32);
    });

    // test('change state when number changes', () => {
    //     const eventObject = { target: { value: 30 }};
    //     NumberOfEventsWrapper.find('.eventsNumberInput').simulate('change', eventObject);
    //     expect(NumberOfEventsWrapper.state('query')).toBe(30);
    // })
});

