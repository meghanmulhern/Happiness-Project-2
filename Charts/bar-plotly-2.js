d3.json("http://127.0.0.1:5000//api/v1.0/happiness").then((happiness_data) => {
  function filterYearData(country) {
    return country.year === 2020;
  }
  // Use filter() to pass the function as its argument
  var filteredScores = happiness_data.filter(filterYearData);
  //  Check to make sure your are filtering your movies.
  console.log(filteredScores);
  // Use the map method with the arrow function to return all the filtered movie titles. for us this is country
  var country = filteredScores.map(country =>  country.country);
  // Use the map method with the arrow function to return all the filtered movie metascores. for us this is happines score
  var happiness_score = filteredScores.map(happiness_score => happiness_score.happiness_score);
  // Check your filtered metascores.
  console.log(country);
  // Create your trace.
  var trace = {
    x: country,
    y: happiness_score,
    type: "bar"
  };
  // Create the data array for our plot
  var data = [trace];
  // Define the plot layout
  var layout = {
    title: "Happiness Scores by Country",
    xaxis: { title: "Country"},
    yaxis: { title: "Happiness Score"}
  };
  // Plot the chart to a div tag with id "bar-plot"
  Plotly.newPlot("bar-plot", data, layout);
});
