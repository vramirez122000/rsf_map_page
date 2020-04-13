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
            <div class="title_container">
                <h4 class = 'title'>Change in <br></br>
                Median Tax Bill</h4>
                <div>
                    <div class="tooltip"> <img src="data/info-tooltip.png" id="median_tax_tooltip"></img>
                        <span class="tooltiptext">The map at city-level view shows the difference in the
                                                  median household tax bill as a percentage difference 
                                                  from the current scenario.
                                                    <br></br>
                                                    <br></br>
                                                  Use the slider at the bottom of the page to show the projected  difference in median tax bill based on how much of the citys property revenue comes from a tax on land value.
                                                    <br></br>
                                                    <br></br>
                                                  Click on each zipcode area for more information.
                                                    </span>
                    </div>
                 
                </div>
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
        
          <div id = 'parcel_title' class ='title_container'>
            <h4 class='title'>Parcel Types</h4>
                <div>
                    <div class="tooltip"> <img src="data/info-tooltip.png" id="parcel_tooltip"></img>
                        <span class="tooltiptext">Zoom in to street level to see individual parcels.
                                                    <br></br>
                                                    <br></br>
                                                  Click on a parcel to see how each projected tax scenario would affect a propertys 
                                                  tax bill. 
                                                    <br></br>
                                                    <br></br>
                                                  Please be patient while parcel data loads. 
                                                    </span>
                    </div>
                 
                </div>
            </div>
            
            <div id = 'parcel_legend'> 
                <div class='row'>
                    <div id='residential_dot'></div>
                    <p class='parcel_text'>Residential</p>
                </div>
            
                <div class='row'>    
                    <div id='commercial_dot'></div>
                    <p class='parcel_text'>Commercial</p>
                    </div>
            
                <div class='row'>
                    <div id='industrial_dot'></div>
                    <p class = 'parcel_text'>Industrial</p>
                </div>
            
                <div class='row'>
                    <div id='vacant_dot'></div>
                    <p class='parcel_text'>Vacant Land</p>
                    </div>
            
                <div class='row'>
                    <div id='exempt_dot'></div>
                    <p class='parcel_text'>Exempt</p>
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