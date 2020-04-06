import React, {Component} from 'react';
import './Legend.css';

export class Legend extends Component {

    render() {
        return (
    <div>
                <div>
            <img src = "data/cptr_logo.png" class = "logo" ></img>
        </div>
                
        <div id='legend2'>
            <div>
            <h4>Change in <br></br>
            Median Tax Bill</h4>
            </div>
            
            <div id = 'color_grad' class = 'legend_col' >
            </div>
            
            <div class = 'legend_col'>
                    
                    <div class = 'row'><p>+100 %</p></div>
            
            
                    <div class = 'row'><p>+50 %</p></div>
            
                    <div class = 'row'><p>+30 %</p></div>

                    <div class = 'row'><p>+10 %</p></div>
                    <div class = 'row'><p>+5 %</p></div>
                
                    <div class = 'row'><p>0 %</p></div>
                    <div class = 'row'><p>-5 %</p></div>
                    <div class = 'row'><p>-10 %</p></div>
                    <div class = 'row'><p>-30 %</p></div>

                    <div class = 'row'><p>-50 %</p></div>


                    <div class = 'row'><p>-100 %</p></div>
           </div>
        
          <div id = 'parcel_title'>
            <h4>Parcel Types</h4>
            </div>
            <div id = 'parcel_legend'> 
                <div class='row'>
                <span id='residential_dot'></span>
                <p>Residential</p>
                    </div>
                <div class='row'>    
                <span id='commercial_dot'></span>
                <p>Commercial</p>
                    </div>
                <div class='row'>
                <span id='industrial_dot'></span>
                <p>'Industrial'</p>
                    </div>
                <div class='row'>
                <span id='vacant_dot'></span>
                <p>Vacant Land</p>
                    </div>
                <div class='row'>
                <span id='exempt_dot'></span>
                <p>Exempt</p>
                    </div>
            
                </div>
            </div>
            
              

    </div>
        );
    }
}



//            <div id='legend' className='map-overlay'>
//                {this.props.colors.map((color, i) => {
//                    const label = this.props.labels[i];
//                    return (
//                        <div key={'legend-item-' + i}>
//                            <span className="legend-key" style={{backgroundColor: color}}/>
//                            <span>{label}</span>
//                        </div>
//                  );
//              })}    