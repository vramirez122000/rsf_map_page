import React, {Component} from 'react';
import './Menu.css';


export class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeScenario: this.props.initialValue,
        }
    }

    componentDidMount() {
        if(this.props.onInit) {
            this.props.onInit(this.state.activeCity)
        }
    }

    handleChange = (e) => {
        this.setState({
            activeCity: 'philadelphia',
        });

    };

    render() {
        return (
        <div>
            <div id='menu_container'>           
               <div id='city_title'>Philadelphia</div>
               <div id="subtitle">Projections for a Two-Rate Tax System</div>
            <div class="dropdown">
                <button class="dropbtn">Select City</button>
                <div class = "dropdown-content">
                    <a>Baltimore (Coming Soon)</a>
                    <a>Frederick (Coming Soon)</a>
                    <a>Philadelphia</a>
                    <a>Seattle (Coming Soon)</a>
                    
                </div>
            </div>
      
            </div>
        </div>
        );
    }
}