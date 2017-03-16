// JAVASCRIPT CODE GOES HERE
 var graphingFxn = function(){
 	trace6 = {
		  x: [-3], 
		  y: [-7], 
		  hoverinfo: 'text', 
		  marker: {
		    color: 'rgb(180,42,107)', 
		    line: {
		      color: '#FFFFFF', 
		      width: 0.5
		    }, 
		    size: 20, 
		    symbol: 'dot'
		  }, 
		  mode: 'markers', 
		  name: 'Economy', 
		  opacity: 0.75, 
		  text: 'Elinor Ostrom<br>2009', 
		  type: 'scatter'
		};
		data = [trace6];
		layout = {
		  annotations: [
		    {
		      x: 0, 
		      y: -0.14, 
		      font: {size: 0}, 
		      showarrow: false, 
		      //stext: 'Data source: <a href='http://www.nobelprize.org/nobel_prizes/lists/women.html'>[1]</a>', 
		      xanchor: 'left', 
		      xref: 'paper', 
		      yanchor: 'bottom', 
		      yref: 'paper'
		    }
		  ], 
		  height: 525, 
		  hovermode: 'closest', 
		  margin: {
		    r: 200,
		    t: 100, 
		    b: 80, 
		    l: 80
		  }, 
		  plot_bgcolor: 'rgb(50,50,50)', 
		  title: 'Nobel Prize Awarded Women', 
		  width: 650, 
		  xaxis: {
		    mirror: true, 
		    showgrid: false, 
		    showline: true, 
		    showticklabels: false, 
		    ticks: '', 
		    zeroline: false
		  }, 
		  yaxis: {
		    mirror: true, 
		    showgrid: false, 
		    showline: true, 
		    showticklabels: false, 
		    ticks: '', 
		    zeroline: false
		  }
		};
		Plotly.plot('plotly-div', {
		  data: data,
		  layout: layout
		});
 };
      