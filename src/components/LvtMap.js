import React, {Component} from 'react';
import {Map as ReactMapboxGL,} from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl'
import './LvtMap.css';
import {Legend} from "./Legend";
import {Slider} from "./Slider";

const ReactMap = ReactMapboxGL({
    accessToken: process.env.REACT_APP_MAPBOX_API_KEY
});

const legendLabels = ["+ 100%",
                    "+ 40%",
                    "+ 20%",
                    "+ 10%",
                    "+ 5%",
                    "+ 2.5%",
                    "0",
                    "(-) 2.5%",
                    "(-) 5%",
                    "(-) 10%",
                    "(-) 20%",
                    "(-) 40%",
                    "(-) 100%"
                    ];



const legendColors = ['#993404',
                    '#d95f0e',
                    '#fe9929',
                    '#fec44f',
                    '#fee391', 
                    '#ffffd4',
                    '#fff',
                    '#edf8fb', 
                    '#bfd3e6',
                    '#9ebcda',
                    '#8c96c6',
                    '#8856a7',
                    '#810f7c'
                    ];

// Used choropleth layer creation
const layerNames = [
    "0%_lt_rev",
    "10%_lt_rev",
    "20%_lt_rev",
    "30%_lt_rev",
    "40%_lt_rev",
    "50%_lt_rev",
    "60%_lt_rev",
    "70%_lt_rev",
    "80%_lt_rev",
    "90%_lt_rev",
    "100%_lt_rev"
];

const split_rate = {
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "id": "mv_phl_split_rate.fid-1935fa43_170e44cfc3e_-239f",
        "geometry": null,
        "properties": {
            "city_name": "philadelphia",
            "tax_year": "2020",
            "actual_tax_rate": 0.013998,
            "lt_100": 0.05369,
            "lt_90": 0.048321,
            "lt_80": 0.042952,
            "lt_70": 0.037583,
            "lt_60": 0.032214,
            "lt_50": 0.026845,
            "lt_40": 0.021476,
            "lt_30": 0.016107,
            "lt_20": 0.010738,
            "lt_10": 0.005369,
            "lt_0": 0,
            "bt_100": 0.018934,
            "bt_90": 0.017041,
            "bt_80": 0.015147,
            "bt_70": 0.013254,
            "bt_60": 0.01136,
            "bt_50": 0.009467,
            "bt_40": 0.007573,
            "bt_30": 0.00568,
            "bt_20": 0.003786,
            "bt_10": 0.001893,
            "bt_0": 0
        }
    }],
    "totalFeatures": 1,
    "numberMatched": 1,
    "numberReturned": 1,
    "timeStamp": "2020-03-16T21:00:37.864Z",
    "crs": null
};


// For slider function
const increments = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

// used in choropleth layer creation
const dataFields = ["lt_0_100_perc",
                    "lt_10_90_perc",
                    "lt_20_80_perc",
                    "lt_30_70_perc",
                    "lt_40_60_perc",
                    "lt_50_50_perc",
                    "lt_60_40_perc",
                    "lt_70_30_perc",
                    "lt_80_20_perc",
                    "lt_90_10_perc",
                    "lt_100_0_perc"
];


const INITIAL_SLIDER_POSITION_INDEX=2;

export class LvtMap extends Component {

    constructor(props) {
        super(props);
        this.mapContainerHeight = this.props.height || window.innerHeight;
        this.map = null;
    }

    render() {

        return (
            <ReactMap
                style={"mapbox://styles/robertschalkenbachfoundation/ck75k9l750c7q1ik9sov5llby"}
                center={[-75.160332, 39.967914]}
                zoom={[10]}
                containerStyle={{
                    width: '100%',
                    height: this.mapContainerHeight,
                }}
                onStyleLoad={this.initMap}
            >
                <Legend colors={legendColors} labels={legendLabels}/>
                <Slider initialValue={increments[INITIAL_SLIDER_POSITION_INDEX]} onSliderChange={this.handleSliderChange}/>
                
                
            </ReactMap>

        );
    }

    initMap = (map) => {
        this.map = map;

        this.map.addSource('mv_philadelphia_zcta_percentage', {
            'type': 'geojson',
            'data': 'https://rsf20200405.s3.us-east-2.amazonaws.com/mv_philadelphia_zcta_percentage.geojson'
            //'data/mv_philadelphia_zcta_percentage.geojson'
        });

        for (let i = 0; i < dataFields.length; i++) {
            this.addData(layerNames[i], "mv_philadelphia_zcta_percentage", dataFields[i]);
            this.addAnalysisZonePopup(layerNames[i], dataFields[i]);
            if(i === INITIAL_SLIDER_POSITION_INDEX) {
                this.map.setLayoutProperty(layerNames[i], 'visibility', 'visible');
            }
        }

        this.map.addSource('mv_philadelphia_parcel',{
            "type": "geojson",
            "data": 'https://rsf20200405.s3.us-east-2.amazonaws.com/mv_philadelphia_parcel.geojson'
        });

        this.map.addLayer({
            'id': "parcel",
            'type': "circle",
            'source':'mv_philadelphia_parcel',
            'paint':{
                'circle-radius':["step", ["zoom"], 0, 15, 5],
                'circle-color':['match',
                    ['get', 'building_category'],
                    '1', '#fc8d62', //residential
                    '2', '#fc8d62', //apartments and hotels            
                    '3', '#8da0cb', //commercial w/ dwelling         
                    '4', '#8da0cb', //commercial                   
                    '5', '#66c2a5', //industrial
                    '6', '#d4b78a', //vacant land           
                    '#000'         //other
                ]
            }
        });
        
        
        this.map.addLayer({
            'id': "exempt",
            'type': "circle",
            'source':'mv_philadelphia_parcel',
            'filter':[
                "all",
                ["==", ["get","taxable_building"||"taxable_land"] , 0]
                ],
            'paint':{
                'circle-radius':["step", ["zoom"], 0, 15, 2],
                'circle-color': '#000'
/*                ['match', ['get', 'taxable_building'],
                    0, '#000',
                    'rgba(255, 255, 255, 0)']*/
            }
        });

        this.map.on('click', 'parcel', (e) => {

            const coordinates = e.features[0].geometry.coordinates.slice();
            console.log(coordinates);
            const taxable_land = e.features[0].properties.taxable_land;
            const taxable_building = e.features[0].properties.taxable_building;
            const address = e.features[0].properties.street_address;

            const actual_tax_rate = split_rate.features[0].properties.actual_tax_rate;
            const lt_100 = split_rate.features[0].properties.lt_100;
            const lt_90 = split_rate.features[0].properties.lt_90;
            const lt_80 = split_rate.features[0].properties.lt_80;
            const lt_70 = split_rate.features[0].properties.lt_70;
            const lt_60 = split_rate.features[0].properties.lt_60;
            const lt_50 = split_rate.features[0].properties.lt_50;
            const lt_40 = split_rate.features[0].properties.lt_40;
            const lt_30 = split_rate.features[0].properties.lt_30;
            const lt_20 = split_rate.features[0].properties.lt_20;
            const lt_10 = split_rate.features[0].properties.lt_10;

            const bt_100 = split_rate.features[0].properties.bt_100;
            const bt_90 = split_rate.features[0].properties.bt_90;
            const bt_80 = split_rate.features[0].properties.bt_80;
            const bt_70 = split_rate.features[0].properties.bt_70;
            const bt_60 = split_rate.features[0].properties.bt_60;
            const bt_50 = split_rate.features[0].properties.bt_50;
            const bt_40 = split_rate.features[0].properties.bt_40;
            const bt_30 = split_rate.features[0].properties.bt_30;
            const bt_20 = split_rate.features[0].properties.bt_20;
            const bt_10 = split_rate.features[0].properties.bt_10;

            const actual_tax_bill = Math.round((taxable_land * actual_tax_rate) + (taxable_building * actual_tax_rate));

            const lt_100_tax_bill = Math.round(taxable_land * lt_100);
            const lt_90_tax_bill = Math.round((taxable_land * lt_90) + (taxable_building * bt_10));
            const lt_80_tax_bill = Math.round((taxable_land * lt_80) + (taxable_building * bt_20));
            const lt_70_tax_bill = Math.round((taxable_land * lt_70) + (taxable_building * bt_30));
            const lt_60_tax_bill = Math.round((taxable_land * lt_60) + (taxable_building * bt_40));
            const lt_50_tax_bill = Math.round((taxable_land * lt_50) + (taxable_building * bt_50));
            const lt_40_tax_bill = Math.round((taxable_land * lt_40) + (taxable_building * bt_60));
            const lt_30_tax_bill = Math.round((taxable_land * lt_30) + (taxable_building * bt_70));
            const lt_20_tax_bill = Math.round((taxable_land * lt_20) + (taxable_building * bt_80));
            const lt_10_tax_bill = Math.round((taxable_land * lt_10) + (taxable_building * bt_90));
            const lt_0_tax_bill = Math.round(taxable_building * bt_100);

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            /* while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
             coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
             }*/

            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML("<div><b>Address:</b><br>"+address +
                     "<br> <b>Taxable Land:</b> <br> $"+ taxable_land +
                     "<br> <b>Taxable Improvements:</b> <br> $" + taxable_building +
                     "<br> <b>Actual Tax Bill:</b> <br>$" + actual_tax_bill + "</div>" +
                     "<div><table style='width:100%'><tr><th>% Revenue from Land</th> <th>Tax Bill</th></tr>"+
                     "<tr> <td> 100%</td> <td>$ " + lt_100_tax_bill + "</td> </tr>" +
                     "<tr> <td> 90%</td> <td>$ " + lt_90_tax_bill + "</td> </tr>" +
                     "<tr> <td> 80%</td> <td>$ " + lt_80_tax_bill + "</td> </tr>" +
                     "<tr> <td> 70%</td> <td>$ " + lt_70_tax_bill + "</td> </tr>" +
                     "<tr> <td> 60%</td> <td>$ " + lt_60_tax_bill + "</td> </tr>" +
                     "<tr> <td> 50%</td> <td>$ " + lt_50_tax_bill + "</td> </tr>" +
                     "<tr> <td> 40%</td> <td>$ " + lt_40_tax_bill + "</td> </tr>" +
                     "<tr> <td> 30%</td> <td>$ " + lt_30_tax_bill + "</td> </tr>" +
                     "<tr> <td> 20%</td> <td>$ " + lt_20_tax_bill + "</td> </tr>" +
                     "<tr> <td> 10%</td> <td>$ " + lt_10_tax_bill + "</td> </tr>" +
                     "<tr> <td> 0%</td> <td>$ " + lt_0_tax_bill + "</td> </tr>" +
                     "</table></div>")
                .addTo(this.map);
        });

        // Change the cursor to a pointer when the mouse is over the places layer.
        this.map.on('mouseenter', 'parcel', () => {
            this.map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        this.map.on('mouseleave', 'parcel', () => {
            this.map.getCanvas().style.cursor = '';
        });

    };

    addData(layerName, source, dataField) {
        this.map.addLayer({
            "id": layerName,
            "type": "fill",
            "source": source,
            "layout": {"visibility": "none"},
            "paint": {
                "fill-color":
                    ['interpolate', ['linear'], ['get', dataField],
                        -100, '#810f7c',
                        -75, '#8856a7',
                        -50, '#8c96c6',
                        -25, '#9ebcda',
                        -10, '#bfd3e6',
                        -5, '#edf8fb',
                        0, '#fff',
                        5, '#ffffd4',
                        10, '#fee391',
                        25, '#fec44f',
                        50, '#fe9929',
                        75, '#d95f0e',
                        100, '#993404'
                    ],
                'fill-opacity': ["step", ["zoom"], 0.8, 15, 0],
                'fill-outline-color': '#000'
            }
        });
    };

    handleSliderChange = (sliderValue) => {
        for (let i = 0; i < layerNames.length; i++) {
            if (sliderValue === increments[i]) {
                this.map.setLayoutProperty(layerNames[i], 'visibility', 'visible');
            } else if (sliderValue !== increments[i]) {
                this.map.setLayoutProperty(layerNames[i], 'visibility', 'none');
            }
        }
    };

    addAnalysisZonePopup = (layerName, dataField) => {
        const field = "e.features[0].properties."+ dataField;


        this.map.on('click', layerName, (e) => {

            if (this.map.getZoom() < 15){
                const median_actual = e.features[0].properties.lt_bt_actual ;
                const scenario_tax_bill = Math.round(((eval(field)/100)*median_actual)+median_actual);

                new mapboxgl.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML(
                        "<b>Zipcode:</b><br> " + e.features[0].properties.zone_name + "<br>"+
                        "<b>Actual Median Tax Bill:</b><br> $" +e.features[0].properties.lt_bt_actual+ "<br>"+
                        "<b>Median Tax Bill in Selected Scenario:</b> <br>$" + scenario_tax_bill+ "<br>"+
                        "<b>Change from Current Scenario:</b><br> "+ eval(field) +"%")
                    .addTo(this.map);
            };
            //change color of selected zone on click- NOT WORKING YET
            //map.setPaintProperty(e, 'fill-outline-color', '#ff0000');


            // Change the cursor to a pointer when the mouse is over the states layer.
            this.map.on('mouseenter', layerName, () => {
                this.map.getCanvas().style.cursor = 'pointer';
            });

            // Change it back to a pointer when it leaves.
            this.map.on('mouseleave', layerName, () => {
                this.map.getCanvas().style.cursor = '';
            });
        });
    };
}