import React, { Component } from 'react';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.color = null;
    }

    getStyle = () => {
        return {
            color: this.color,
            fontSize: this.fontSize,
        }
    }

    render() {
        return (
            <div className='Alert'>
                <p style={this.getStyle()}>{this.props.text}</p>
            </div>
        );
    }
}

class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'blue';
    }
}

class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'red';
        this.fontSize = '32px';
    }
}

class WarningAlert extends Alert {
    constructor(props) {
        super(props)
        this.color = 'yellow';
    }
}

class OfflineAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'red';
        this.fontSize = '12px';
    }
}

export { InfoAlert, ErrorAlert, WarningAlert, OfflineAlert };
