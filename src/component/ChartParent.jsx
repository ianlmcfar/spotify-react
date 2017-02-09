import React, { Component } from 'react';
// import d3 from 'd3';
import * as d3 from "d3";
import mathjs from 'mathjs';

function average(segments){
	var avg_segments = {timbre: [], pitches: [], confidence: 0, loudness_max: 0, section: 0};
	for (var n=0; n < 12; n++){ //loops thrugh timbre vector
		var element1 = 0, confidence = 0, loudness_max = 0, element2 = 0, section=0;
		for (var i=0; i < segments.length; i++){
			element1 += segments[i].timbre[n];
			element2 += segments[i].pitches[n];
			confidence += segments[i].confidence;
			loudness_max += segments[i].loudness_max;
			section += segments[i].section_index;
		}
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
	if (mathjs.dot(a,b)/(mathjs.norm(a)*mathjs.norm(b)) > .7 || (arrObject.pitches.indexOf(1) === arrSeenObject.pitches.indexOf(1) && arrObject.pitches.indexOf(1) !== -1)){
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

class ChartParent extends Component {
	constructor(props){
		super(props);
		this.findSegmentPairs = this.findSegmentPairs.bind(this);
	}

	findSegmentPairs() {	
	    var arr = this.props.analysisobject.data.segments,
			sections = this.props.analysisobject.data.sections,
			arrSeen =[],
	        arrReturn = [],
			sectionSegments =[],
			lastIndex = -1,
			index,
			returnArray =[];
		for (var i=0; i < sections.length; i++){
			var sectionSegments = arr.filter(checkBar,sections[i]);
			sectionSegments.forEach((e) => {e.section_index = i; returnArray.push(e);});
		}
		var scale = 1000 / returnArray.length;
		
	    for (var i = 4; i < arr.length-1; i++) {
			var window_average = average(arr.slice(i-2,i+3));
			console.log(arrSeen);
			lastIndex = arrSeen.map(function(obj) {return obj.loudness_max.toFixed(0);}).lastIndexOf(window_average.loudness_max.toFixed(0));
			console.log(lastIndex);
			if (lastIndex != -1 &&
				isPitchSimilar(arrSeen[lastIndex],window_average)
				&& isTimbreSimilar(arrSeen[lastIndex], window_average))
				{
					arrReturn.push({section: arrSeen[lastIndex].section_index % 2 ? 'Red' : 'Black', startindex: scale*lastIndex, outerradius: scale*(i-lastIndex)/2, opacity: (window_average.confidence+arrSeen[lastIndex].confidence)/2, weight:  1, rotation: "-90", startindex: scale*lastIndex});
					}
				arrSeen.push(window_average);
		}

		var svg = d3.select("#chart").append("svg")
			.attr('height',700)
			.attr('width', 1000);
		var group = svg.append('g')
			.attr("width", "1000").attr("height", '500');

		var arc = d3.arc()
		    .innerRadius(function(d) {return d.outerradius-d.weight})
		    .outerRadius(function(d) {return d.outerradius})
		    .startAngle(0) //radians
		    .endAngle(Math.PI)


			group.selectAll('path')
		    .data(arrReturn)
		    .enter()
		    .append("path")
			.attr("d", arc)
		    .attr("fill", function(d){return d.section})
			.attr('opacity',function(d){return d.opacity;})

			.attr("transform", function(d) { return "translate("+String(d.startindex+d.outerradius)+",500) rotate("+d.rotation+")"})
			.attr("class", "arc");
	}
	componentDidMount(){
		this.findSegmentPairs();
	}
	render(){
		return(
			<div id='chart'></div>
		)
	}
}
export default ChartParent;
