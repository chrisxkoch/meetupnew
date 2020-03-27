import React, { Component } from 'react';

import {PieChart, Pie, Cell, ResponsiveContainer, Legend, Line, Tooltip } from 'recharts';

class Event extends Component {
  state = {
    showDetails: false,
    events: [],
  }

  
  handleChange = () => {
    this.setState({ showDetails: !this.state.showDetails })
  }
  
  //Pie Chart information.
  getData = () => {
    const taken = this.props.event.yes_rsvp_count;
    const limit = this.props.event.rsvp_limit;
    const remaining = limit - this.props.event.yes_rsvp_count

    return (
      [
      {"name": "Spots Taken", "value": taken},
      {"name": "Spots Remaining", "value": remaining}
      ]
    )
  }

  render() {
    const { event } = this.props;
    if (!event) {
      return <div>Loading....</div>
    }

    let colors = ['#8884d8', '#82ca9d']


    return (
        <div className='event' >
            <div className='eventName'>{event.name}</div>
              <span className='eventDate'>Date: {event.local_date}</span>
              <div className='eventLocationCity'>City: {event.venue && event.venue.city}</div>  
              <div className='eventLocationCity'>State: {event.venue && event.venue.state}</div>  

              <button className='eventButton' onClick={this.handleChange}>More Info</button>

              {this.state.showDetails && (
                <div className='eventDetails'>
                  {event.yes_rsvp_count && event.rsvp_limit ?
                  
                    <ResponsiveContainer height={200}>

                        <PieChart width={200} height={200}>
                          <Pie data={this.getData()} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} label>
                            {
                              this.getData().map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={colors[index]}/>
                              ))
                            }
                          </Pie>
                          
                          <Tooltip />

                          <Legend verticalAlign="top" height={36}>
                          <Line name="Attending" type="monotone" dataKey="taken" stroke="#8884d8" />
                          <Line name="Spots Open" type="monotone" dataKey="remaining" stroke="#82ca9d" />
                          </Legend>

                        </PieChart>

                      </ResponsiveContainer>
                  : null}

                <div className='eventVenue'>Venue: {event.venue && event.venue.address_1}</div> 
                <div className='eventStatus'>Status: {event.status}</div>  
                <div className='eventDescription' dangerouslySetInnerHTML={{ __html: event.description }}></div>
                <button className='lessInfo' onClick={this.handleChange}>See Less</button>

                </div>            
              )}

        </div>
    );
  }
}

export default Event;