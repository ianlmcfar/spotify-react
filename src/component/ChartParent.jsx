import React, { Component } from 'react';
import * as d3 from "d3";
import mathjs from 'mathjs';
import {observer, inject} from 'mobx-react';
import Loading from './Loading'
import {SearchRequest, GeoRequest, AlbumRequest, AlbumTrackRequest, AnalysisRequest} from '../other/Requests';


function drawChart(dat1, datFull, width){
	function zoom() {
		svg.attr("transform", "translate(" + d3.event.transform.x+","+ d3.event.transform.y+ ")scale(" + d3.event.transform.k + ")");
	}

	var zoomCall = d3.zoom().scaleExtent([1, 8]).on("zoom", zoom)
	
	let svg = d3.select("svg")
	var height = 700, scale = width/datFull.length

	svg.remove()
	svg = d3.select("#chart").append("svg")
		.attr('height',height)
		.attr('width', width)
		.append('g')
		.call(zoomCall).append("g") 
	
	const arc = d3.arc()
	    .innerRadius(function(d) {return scale*(d.outerradius-d.weight)})
	    .outerRadius(function(d) {return scale*d.outerradius})
	    .startAngle(0) //radians
	    .endAngle(Math.PI)
	
	svg.append("rect")
	    .attr("width", width)
	    .attr("height", height)
		.style('fill','none')
		.style('pointer-events','all')
	
	svg.selectAll('path')
	    .data(dat1)
	    .enter()
	    .append("path")
		.attr("d", arc)
	    .attr("fill", function(d){return d.section})
		.attr('opacity',function(d){return d.opacity;})

		.attr("transform", function(d) { return "translate("+String((d.startindex+d.outerradius)*scale)+",400) rotate(-90)"})
		.attr("class", "arc");
	
	svg.selectAll("rect")
	    .data(datFull)
	    .enter()
	    .append("rect")
		.attr("transform", function(d, i) {return "translate("+String(scale*i)+",405) rotate(0)"})

	        // .attr("x", function(d) {return d.outerradius-d.weight})
	        // .attr("y", 0)
	        .attr("width", 1)
	     	.attr("height", function(d) {return d.loudness_max*-1})
		.attr("fill", function(d){return d.section_index % 2 ? 'Red' : 'Black'});
	}

 function average(index, segments){
	var avg_segments = {start: segments[0].start, duration: '', timbre: [], pitches: [], confidence: 0, loudness_max: 0, section: 0};
	for (var n=0; n < 12; n++){ //loops thrugh timbre vector
		var element1 = 0, confidence = 0, loudness_max = 0, element2 = 0, section=0, duration=0;
		for (var i=0; i < segments.length; i++){
			element1 += segments[i].timbre[n];
			element2 += segments[i].pitches[n];
			confidence += segments[i].confidence;
			loudness_max += segments[i].loudness_max;
			section += segments[i].section_index;
			duration += segments[i].duration
		}
		avg_segments.duration = duration;
		avg_segments.timbre.push(element1/segments.length);
		avg_segments.pitches.push(element2/segments.length);
		avg_segments.confidence = confidence/(segments.length);
		avg_segments.loudness_max = loudness_max/(segments.length);
		avg_segments.section_index = Math.ceil(section/(segments.length));
	}	
	return avg_segments;
}


function isPitchSimilar(arrSeenObject, arrObject){
	var boolArray = [],
	a = arrSeenObject.pitches,
	b = arrObject.pitches,
	hasOne = false;
	// console.log((arrObject.pitches.indexOf(1) === arrSeenObject.pitches.indexOf(1) && arrObject.pitches.indexOf(1) !== -1))
	if (mathjs.dot(a,b)/(mathjs.norm(a)*mathjs.norm(b)) > .9){
		return true;
	}
}


function isTimbreSimilar(arrSeenObject, arrObject){
	var boolArray = [],
	a = arrSeenObject.timbre.slice(0,6),
	b = arrObject.timbre.slice(0,6);
	if (mathjs.dot(a,b)/(mathjs.norm(a)*mathjs.norm(b)) > .8){
		return true;
	}
}

function checkBar(segment){
	return segment.start >= this.start && segment.start + segment.duration < this.start + this.duration;
}

@inject('dataStore', 'routingStore') @observer class ChartParent extends Component {
	constructor(props){
		super(props);
		this.state = {
			loading: false,
			updateChart: false,
			windowWidth: window.innerWidth
		}
		this.findSegmentPairs = this.findSegmentPairs.bind(this);
	}
	componentDidMount(){
		window.addEventListener("resize", ()=>{this.setState({windowWidth: window.innerWidth}, ()=>{console.log(window.innerWidth);	drawChart(this.props.dataStore.segmentPairs, this.props.dataStore.segmentsFull, window.innerWidth)})});
		if (this.props.type2 === 'analysis'){
			this.setState({loading: true}, ()=>{
				AnalysisRequest(this.props.id, response => {this.props.dataStore.analysisObject = response; console.log(response); this.setState({loading: false}); this.findSegmentPairs() })
			})
		}

	}
    componentWillUnmount() {
        window.removeEventListener("resize", this.setState({windowWidth: window.innerWidth}));
    }
	componentWillReceiveProps(nextProps){
		if (this.props.type2 === 'analysis' && nextProps.type2 == 'analysis'){
			this.setState({loading: true}, ()=>{
				AnalysisRequest(this.props.id, response => {this.props.dataStore.analysisObject = response; console.log(response); this.setState({loading: false}); this.findSegmentPairs() })
			})
		}
	}
	findSegmentPairs() {
	    let arr = this.props.dataStore.analysisObject.data.segments,
			sections = this.props.dataStore.analysisObject.data.sections,
			// hashTable = {},
			arrSeen = [],
	        arrReturn = [],
			sectionSegments =[],
			lastIndex = -1,
			index,
			segmementPairsArray =[],
			segmentsFull = [];
		for (let i=0; i < sections.length; i++){
			sectionSegments = arr.filter(checkBar,sections[i]);
			sectionSegments.forEach((e) => {e.section_index = i; segmementPairsArray.push(e);});
		}
		for (let i = 4; i < arr.length-1; i++){
			const window_average = average(i, arr.slice(i-2,i+3));
			lastIndex = arrSeen.map((obj)=>{return obj.loudness_max.toFixed(0);}).lastIndexOf(window_average.loudness_max.toFixed(0));
			segmentsFull.push(window_average)
				
			if (lastIndex != -1
				&&isPitchSimilar(arrSeen[lastIndex],window_average)
				&& isTimbreSimilar(arrSeen[lastIndex], window_average))
				{
					arrReturn.push({height: -1*arrSeen[lastIndex].loudness_max, 
									section: arrSeen[lastIndex].section_index % 2 ? 'Red' : 'Black',
									startindex: lastIndex,
									outerradius: (i-lastIndex)/2,
									opacity: (window_average.confidence+arrSeen[lastIndex].confidence)/2,
									weight:  .3,
									rotation: "-90",
									startindex: lastIndex});
				}
				arrSeen.push(window_average);
		}
		this.props.dataStore.segmentPairs = arrReturn;
		this.props.dataStore.segmentsFull = segmentsFull;
		drawChart(arrReturn, segmentsFull, this.state.windowWidth)
		
	}
	render(){
		// console.log(this.state.windowWidth)
		return(
			<div>
				{this.state.loading ? <Loading/> : <div id='chart'></div>}
			</div>
		)
	}
}
export default ChartParent;
