
d3.json("http://127.0.0.1:5000//api/v1.0/happiness").then((happiness_data) => {
  function filterYearData(country) {
    return country.year === 2020;
  }
  // Use filter() to pass the function as its argument
  var filteredScores2020 = happiness_data.filter(filterYearData);
  //  Check to make sure your are filtering your movies.
  console.log(filteredScores2020);
  // Use the map method with the arrow function to return all the filtered movie titles. for us this is country
  var country2020 = filteredScores2020.map(country =>  country.country);
  // Use the map method with the arrow function to return all the filtered movie metascores. for us this is happines score
  var happiness_score2020 = filteredScores2020.map(happiness_score => happiness_score.happiness_score);
  // Check your filtered metascores.
  var gdp2020 = filteredScores2020.map(gdp => gdp.gdp);
  var trust2020 = filteredScores2020.map(trust_score => trust_score.trust_score);

  console.log(country2020);
  console.log(gdp2020);
  console.log(trust2020);

  // Create your trace.
  var tracehappy = {
    x: country2020,
    y: happiness_score2020,
    type: "bar"
  };

  var tracegdp = {
    x: country2020,
    y: gdp2020,
    type: "bar"
  }; 

  var tracetrust = {
    x: country2020,
    y: trust2020,
    type: "bar"
  }; 
  // Create the data array for our plot
  var happy = [tracehappy];
  var gdp = [tracegdp];
  var trust = [tracetrust];

  function init() {
    happy;
    var layout = {
      title: "Happiness Scores by Country",
      xaxis: { title: "Country"},
      yaxis: { title: "Happiness Score"}
    };
    Plotly.newPlot("bar-plot", happy, layout);
  }
d3.selectAll("#selDataset").on("change", updatePlotly);
// This function is called when a dropdown menu item is selected
function updatePlotly() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.node().value;

 var data = []
 

  if (dataset === 'Happiness Score') {
      data = happy;
      var layout = {
        title: "Happiness Scores by Country",
        xaxis: { title: "Country"},
        yaxis: { title: "Happiness Score"}
      };
  };
  if (dataset === 'GDP') {
    data = gdp;
    var layout = {
      title: "GDP by Country",
      xaxis: { title: "Country"},
      yaxis: { title: "GDP"}
    };
  };
  if (dataset === 'Trust Score') {
    data = trust;
    var layout = {
      title: "Trust Score by Country",
      xaxis: { title: "Country"},
      yaxis: { title: "Trust Score"}
    };
  };
  // Define the plot layout

  // Plot the chart to a div tag with id "bar-plot"
  Plotly.newPlot("bar-plot", data, layout);
}
init();
});