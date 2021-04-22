
// var margin = {top: 30, right: 30, bottom: 70, left: 60},
//     width = 460 - margin.left - margin.right,
//     height = 400 - margin.top - margin.bottom;

// // append the svg object to the body of the page
// var svg = d3.select("#my_dataviz")
//   .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform",
//           "translate(" + margin.left + "," + margin.top + ")");
// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

d3.json("http://127.0.0.1:5000//api/v1.0/happiness").then(function(happiness_data){
var data2020 = happiness_data.filter(x => x.year == 2020).map(x => {
    return [x.country, x.happiness_score,x.year]
})
var data2019 = happiness_data.filter(x => x.year == 2019).map(x => {
    return [x.country, x.happiness_score]
})
console.log(data2020)

// X axis
// var x = d3.scaleBand()
//   .range([ 0, width ])
//   .domain(data2020.map(function(d) { return d.country; }))
//   .padding(0.2);
// svg.append("g")
//   .attr("transform", "translate(0," + height + ")")
//   .call(d3.axisBottom(x))
var xBandScale = d3.scaleBand()
.domain(data2020.map(d => d[0]))
.range([0, chartWidth])
.padding(0.1);
// console.log(xBandScale)
// Add Y axis
// var y = d3.scaleLinear()
//   .domain([0, 20])
//   .range([ height, 0]);
// svg.append("g")
//   .attr("class", "myYaxis")
//   .call(d3.axisLeft(y));
var yLinearScale = d3.scaleLinear()
.domain([0, d3.max(data2020, d => d[1])])
.range([chartHeight, 0]);
// console.log(yLinearScale)

var bottomAxis = d3.axisBottom(xBandScale);
var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

chartGroup.append("g")
.call(leftAxis);

chartGroup.append("g")
.attr("transform", `translate(0, ${chartHeight})`)
.call(bottomAxis);

// Create one SVG rectangle per piece of tvData
// Use the linear and band scales to position each rectangle within the chart
// chartGroup.selectAll(".bar")
// .data(data2020)
// .enter()
// .append("rect")
// .attr("class", "bar")
// .attr("x", d => xBandScale(d.name))
// .attr("y", d => yLinearScale(d.hours))
// .attr("width", xBandScale.bandwidth())
// .attr("height", d => chartHeight - yLinearScale(d.hours));

// }).catch(function(error) {
// console.log(error);
// });

// A function that create / update the plot for a given variable:
// function update(data2020) {
    chartGroup.selectAll(".bar")
        
//   var u = svg.selectAll("rect")
        .data(data2020)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xBandScale(d[0]))
        .attr("y", d => yLinearScale(d[1]))
        .attr("width", xBandScale.bandwidth())
        .attr("height", d => chartHeight - yLinearScale(d[1]));
//   u
    // .enter()
    // .append("rect")
    // .merge(u)
    // .transition()
    // .duration(1000)
    //   .attr("x", function(d) { return x(d.country); })
    //   .attr("y", function(d) { return y(d.happiness_score); })
    //   .attr("width", x.bandwidth())
    //   .attr("height", function(d) { return height - y(d.happiness_score); })
    //   .attr("fill", "#69b3a2")
// }


// Initialize the plot with the first dataset
// update(data2020)
}).catch(function(error) {
    console.log(error);
  });
  