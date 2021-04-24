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

// var data2020 = [];
// var data2019 = [];

function shalesh(year){
d3.json("http://127.0.0.1:5000//api/v1.0/happiness").then(function(happiness_data){  

var data = (happiness_data.filter(x => x.year == year).map(x => {
      return [x.country, x.happiness_score]
  }))

  // var data2019 = (happiness_data.filter(x => x.year == 2019).map(x => {
  //     return [x.country, x.happiness_score]
  // }))

console.log(data)

var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(d => d[0]))
  // .domain(data1.map(function(d) { return d.group; }))
  .padding(0.2);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))


// Add Y axis
var y = d3.scaleLinear()
  // .domain([0, 10])
  .domain([0, d3.max(data, d => d[1])])
  .range([ height, 0]);
svg.append("g")
  .attr("class", "myYaxis")
  .call(d3.axisLeft(y));

// A function that create / update the plot for a given variable:
function update(data) {
console.log(typeof(data[0]))
  var u = svg.selectAll("rect")
    .data(data)

  u
    .enter()
    .append("rect")
    .merge(u)
    .transition()
    .duration(1000)
      .attr("x", function(d) { return x(d[0]); })
      .attr("y", function(d) { return y(d[1]); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d[1]); })
      .attr("fill", "#69b3a2")
}

var button = d3.select("#click-me");
var inputField = d3.select("#input-field");
function(handleClick) {				
     console.log("A button was clicked");
     console.log(d3.event.target);	}	
button.on("click", handleClick);
//below is the event on click
// button.on("click", function() {
//      d3.select(".giphy-me").text("<img src ='https://gph.to/2Krfn0w' alt='giphy'<"); });
inputField.on("change", function()  {
      var year = d3.event.target.value;
      console.log(newText);
});
// Initialize the plot with the first dataset
update(data)
})
}
shalesh(2020)



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
  // chartGroup.selectAll(".bar")
  // .data(data2020)
  // .enter()
  // .append("rect")
  // .attr("class", "bar")
  // .attr("x", d => xBandScale(d[0]))
  // .attr("y", d => yLinearScale(d[1]))
  // .attr("width", xBandScale.bandwidth())
  // .attr("height", d => chartHeight - yLinearScale(d[1]));

  // X axis
// var x = d3.scaleBand()
//   .range([ 0, width ])
//   .domain(data2020.map(function(d) { return d.country; }))
//   .padding(0.2);
// svg.append("g")
//   .attr("transform", "translate(0," + height + ")")
//   .call(d3.axisBottom(x))
// var xBandScale = d3.scaleBand()
// .domain(data2020.map(d => d[0]))
// .range([0, chartWidth])
// .padding(0.1);
// // console.log(xBandScale)
// // Add Y axis
// // var y = d3.scaleLinear()
// //   .domain([0, 20])
// //   .range([ height, 0]);
// // svg.append("g")
// //   .attr("class", "myYaxis")
// //   .call(d3.axisLeft(y));
// var yLinearScale = d3.scaleLinear()
// .domain([0, d3.max(data2020, d => d[1])])
// .range([chartHeight, 0]);
// // console.log(yLinearScale)

// var bottomAxis = d3.axisBottom(xBandScale);
// var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

// chartGroup.append("g")
// .call(leftAxis);

// chartGroup.append("g")
// .attr("transform", `translate(0, ${chartHeight})`)
// .call(bottomAxis);

// Create one SVG rectangle per piece of tvData
// Use the linear and band scales to position each rectangle within the chart
// chartGroup.selectAll(".bar")
// .data(data2020)
// .enter()
// .append("rect")
// .attr("class", "bar")
// .attr("x", d => xBandScale(d[0]))
// .attr("y", d => yLinearScale(d[1]))
// .attr("width", xBandScale.bandwidth())
// .attr("height", d => chartHeight - yLinearScale(d[1]));

// }).catch(function(error) {
// console.log(error);
// });