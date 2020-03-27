import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from '../components/CitySearch';

describe('<CitySearch /> Component', () => {
    let CitySearchWrapper;
    beforeAll(() => {
        CitySearchWrapper = shallow(<CitySearch updateEvents={() => {}}/>);
    });

    test('render text input', () => {
        expect(CitySearchWrapper.find('.city')).toHaveLength(1);
    });

    test('render list of suggestions', () => {
        expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);        
    });

    test('render text input correctly', () => {
        const query = CitySearchWrapper.state('query');
        expect(CitySearchWrapper.find('.city').prop('value')).toBe(query);
    });

    test('change state when text input changes', () => {
        const eventObject = { target: {value: 'Berlin' }};
        CitySearchWrapper.find('.city').simulate('change', eventObject);
        expect(CitySearchWrapper.state('query')).toBe('Berlin');
    });

    test('render list of suggestions correctly', () => {
        const suggestions = CitySearchWrapper.state('suggestions');
        expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(suggestions.length);
        for (let i=0; i < suggestions.length; i += 1) {
            expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(suggestions[i].name_string);
        }
    })

    test('click on suggestion would change query state', () => {
        CitySearchWrapper.setState({
            suggestions: [
                {
                  city: 'Munich',
                  country: 'de',
                  localized_country_name: 'Germany',
                  name_string: 'Munich, Germany',
                  zip: 'meetup3',
                  lat: 48.14,
                  lon: 11.58
                },
                {
                  city: 'Munich',
                  country: 'us',
                  localized_country_name: 'USA',
                  state: 'ND',
                  name_string: 'Munich, North Dakota, USA',
                  zip: '58352',
                  lat: 48.66,
                  lon: -98.85
                }
              ]
        });
        expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(2);
        CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
        expect(CitySearchWrapper.state('query')).toBe('Munich, Germany');
        expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(0)
    })
});

//seperating integraton testing
describe('<CitySearch /> integration', () => {

    test('get a list of cities when user searches for Munich', async () => {
        const CitySearchWrapper = shallow(<CitySearch />);
        CitySearchWrapper.find('.city').simulate('change', { target: { value: 'Munich' }});
        await CitySearchWrapper.update();
        expect(CitySearchWrapper.state('suggestions')).toEqual([
                {
                  city: 'Denver',
                  country: 'us',
                  localized_country_name: 'USA',
                  state: 'CO',
                  name_string: 'Denver, Colorado, USA',
                  zip: '80201',
                  lat: 39.7,
                  lon: -105.08
                },
                {
                  city: 'Denver',
                  country: 'us',
                  localized_country_name: 'USA',
                  state: 'NC',
                  name_string: 'Denver, North Carolina, USA',
                  zip: '28037',
                  lat: 35.51,
                  lon: -81.02
                },
                {
                  city: 'Denver',
                  country: 'us',
                  localized_country_name: 'USA',
                  state: 'PA',
                  name_string: 'Denver, Pennsylvania, USA',
                  zip: '17517',
                  lat: 40.24,
                  lon: -76.14
                }
        ])
    })
});