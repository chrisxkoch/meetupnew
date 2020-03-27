import React, { Component } from 'react';
import moment from 'moment';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { getEvents } from './components/api';
import { WarningAlert, OfflineAlert } from './components/Alert';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';

import './App.css';

class App extends Component {

  state = {
    events: [],
    page: null,
    lat: null,
    lon: null,
    infoText: '',
    offlineText: '',
  }
  
  //loading events based on location, no lat/lon at first load.
    componentDidMount(){
      this.updateEvents();
      this.noEvent();
      window.addEventListener('online', this.offLineAlert());
    }

    offLineAlert = () => {
      if(navigator.onLine === false) {
        this.setState({
          offlineText: 'You appear to be offline, this list is cached. Please connect to the internet for an updated list.'
        });
      } else {
        this.setState({
          offlineText: '',
        });
      }
    }

  //finding the event local_dates coming up plugged into getDate
    countEventsOnADate = (date) => {
      let count = 0;
      for (let i = 0; i < this.state.events.length; i += 1) {
        if (this.state.events[i].local_date === date) {
          count += 1;
        }
      }
      return count;
    }
  

//reformat the date and push into array
    getData = () => {
      const next7Days = [];
      const currentDate = moment();
      for (let i = 0; i < 7; i += 1){
        currentDate.add(1, 'days');
        const dateString = currentDate.format('YYYY-MM-DD');

        const count = this.countEventsOnADate(dateString);
        next7Days.push({ date: dateString, number: count });
      }
      return next7Days;
    }


    updateEvents = (lat, lon, page) => {
      if (lat && lon) {
        getEvents(lat, lon, this.state.page).then(events => 
          this.setState({ events, lat, lon })
          );
      } else if (page) {
        getEvents(this.state.lat, this.state.lon, page).then(events => 
          this.setState({ events, page })
          );
      } else {
        getEvents(this.state.lat, this.state.lon, this.state.page).then(events => 
          this.setState({ events })
        );
      }
    }

//if noEvents are available error will display. Seems to always have events though..
      noEvent = () => {
        if(this.state.events.length === 0) {
          this.setState({
            infoText: 'Man your city isn\'t fun, move somewhere else.'
          });
        } else {
          this.setState({
              infoText: ''
          })
        }
      }


  render () {
    return (
      <div className='App'>
        <h3>Checkout some events for your city!</h3>
        <CitySearch updateEvents={this.updateEvents} />
        <NumberOfEvents updateEvents={this.updateEvents} />
        <ResponsiveContainer height={400}>
            <ScatterChart 
              width={800} 
              height={400} 
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="date" type='category' name="date" />
                <YAxis dataKey="number" type='number' name="Number of Events" />

                <Tooltip cursor={{ strokeDasharray: '3 3' }} />

                <Scatter data={this.getData()} fill="#8884d8" />

            </ScatterChart>
        </ResponsiveContainer>
        {this.state.noEvent && <WarningAlert text={this.state.infoText} /> }
        <OfflineAlert text={this.state.offlineText} />
        <EventList events={this.state.events}/>
      </div>
    )
  }
}

export default App;
