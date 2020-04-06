import React, {Component} from 'react';
import './Slider.css';


export class Slider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeScenario: this.props.initialValue,
        }
    }

    componentDidMount() {
        if(this.props.onInit) {
            this.props.onInit(this.state.activeScenario)
        }
    }

    handleChange = (e) => {
        let sliderValue = parseInt(e.target.value);
        this.setState({
            activeScenario: sliderValue,
        });

        if(this.props.onSliderChange) {
            this.props.onSliderChange(sliderValue);
        }
    };

    render() {
        return (
            <div className='session' id='sliderbar'>
                <h2 id="slider-label">Percent Revenue from Land Tax: {this.state.activeScenario}%</h2>
                <input id='slider' className='slider_row' type='range'
                       min='0' max='100' step='10' value={this.state.activeScenario}
                       onChange={this.handleChange}
                />
            </div>
        );
    }
}