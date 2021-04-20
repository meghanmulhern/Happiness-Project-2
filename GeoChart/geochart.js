google.charts.load('current', {
    'packages':['geochart'],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    'mapsApiKey': 'API KEY HERE'
  });
  google.charts.setOnLoadCallback(drawRegionsMap);

  function drawRegionsMap() {
    d3.json("http://127.0.0.1:5000//api/v1.0/happiness").then(function(happiness_data){
      var happy_year = happiness_data.filter(x => x.year == 2020).map(x => {
        return [x.country, x.happiness_score]
      })
      happy_year.unshift(["country", "happiness_score"])
      var data = google.visualization.arrayToDataTable(happy_year)
      var options = {};
      var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
      chart.draw(data, options)
    })
}
