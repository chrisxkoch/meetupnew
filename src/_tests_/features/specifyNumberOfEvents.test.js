import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount, shallow } from 'enzyme';
import { mockData } from '../../mockData/mockData'
import App from '../../App';

import NumberOfEvents from '../../components/NumberOfEvents';

const feature = loadFeature('./src/_tests_/features/specifyNumberOfEvents.feature');


defineFeature(feature, test => {
    test('By default, when user hasn’t specified an amount show the default of 32', ({ given, when, then }) => {
        let AppWrapper;
        given('user hasn’t changed the event amount', () => {

    	});

    	when('the user opens the app', () => {
            AppWrapper = mount(<NumberOfEvents />);
    	});

    	then('the user should see the list of 32 upcoming events', () => {
            expect(AppWrapper.state('query')).toEqual(32);
    	});
    });

    test('User changes the amount of events seen', ({ given, when, then }) => {
        let AppWrapper;
    	given('user opens the app', () => {
            AppWrapper = mount(<App />);
    	});

    	when('user changes the number in the events shown box', () => {
            AppWrapper.find('.eventsNumberInput').simulate("change", { target: { value: 30 }});

    	});

    	then('the user should receive the same number of events specified', () => {
            const EventWrapper = AppWrapper.find(NumberOfEvents)
            expect(EventWrapper.state('query')).toEqual(30);

    	});
    });

});