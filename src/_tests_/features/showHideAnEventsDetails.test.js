import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';
import App from '../../App';

import Event from '../../components/Event';

const feature = loadFeature('./src/_tests_/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    test('By default, events are collapsed', ({ given, when, then }) => {
		let AppWrapper;
    	given('user opens the app', () => {
    	});
    	when('the user hasn\'t clicked on anything', () => {
			AppWrapper = mount(<App />);
    	});

    	then('the user should see the list of collapsed events', () => {
			expect(AppWrapper.find('.eventDetails')).toHaveLength(0)
    	});
    });

    test('User should be able to click an event button to see details', ({ given, when, then }) => {
		let AppWrapper;

    	given('user opens the app', () => {
			AppWrapper = mount(<App />);
		});
		
    	when('the user clicks on an event details button', () => {
			AppWrapper.update()
			AppWrapper.find('.eventButton').at(0).simulate('click');
    	});

    	then('the user should see more information on that event', () => {
			expect(AppWrapper.find('.eventDetails')).toHaveLength(1)
    	});
    });


    test('User should be able to click an event button to see minimize details', ({ given, and, when, then }) => {
		let AppWrapper;
    	given('user opens the app', () => {
			AppWrapper = mount(<App />);
    	});

    	and('the event details are already showing', () => {
			AppWrapper.update()
			AppWrapper.find('.eventButton').at(0).simulate('click');
			expect(AppWrapper.find('.eventDetails')).toHaveLength(1)
    	});

    	when('the user clicks on an event details button again', () => {
			AppWrapper.find('.eventButton').at(0).simulate('click');
    	});

    	then('the event detail should collapse', () => {
			expect(AppWrapper.find('.eventDetails')).toHaveLength(0)
    	});
    });

});