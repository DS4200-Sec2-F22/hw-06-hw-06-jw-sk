
// constants for page set up 
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.left - MARGINS.right;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.top - MARGINS.bottom; 

// setting the frame for the bar chart
const BAR_FRAME = d3.select("#bar-chart")
.append("svg")
.attr("height", FRAME_HEIGHT)
.attr("width", FRAME_WIDTH)
.attr("class", "frame"); 

const SCATTER_FRAME_1 = d3.select("#scatter-plot-1")
.append("svg")
.attr("height", FRAME_HEIGHT)
.attr("width", FRAME_WIDTH)
.attr("class", "frame")

const SCATTER_FRAME_2 = d3.select("#scatter-plot-2")
.append("svg")
.attr("height", FRAME_HEIGHT)
.attr("width", FRAME_WIDTH)
.attr("class", "frame")


// function to build bar plot 
function build_bar_plot() {
  // reading in data 
  d3.csv("data/iris_bar.csv").then((data) => {

    const MAX_Y = d3.max(data, (d) => { return parseInt(d.Count); });

    // X scale 
    const X_SCALE = d3.scaleBand() 
    .range([0, VIS_WIDTH])
    .domain(data.map(function(d) {return d.Species; })) 
    .padding(0.2);

    // Y scale 
    const Y_SCALE = d3.scaleLinear() 
    .domain([0, (MAX_Y * 1.2)]) 
    .range([VIS_HEIGHT, 0]); 

    // add bars
    BAR_FRAME.selectAll(".bar")  
    .data(data)
    .enter()       
    .append("rect")  
    .attr("x", (d) => { return (X_SCALE(d.Species) + MARGINS.left); })
    .attr("y", (d) => { return (MARGINS.top + Y_SCALE(d.Count)); })
    .attr("width", X_SCALE.bandwidth())
    .attr("height", (d) => { return VIS_HEIGHT - Y_SCALE(d.Count); })
    .attr("class", (d) => {return d.Species})

    // add X axis 
    BAR_FRAME.append("g") 
    .attr("transform", "translate(" + MARGINS.left + 
      "," + (VIS_HEIGHT + MARGINS.top) + ")") 
    .call(d3.axisBottom(X_SCALE).ticks(7)) 
    .attr("font-size", '20px'); 

    // add Y axis 
    BAR_FRAME.append("g") 
    .attr("transform", "translate(" + MARGINS.left + 
      "," + (MARGINS.top) + ")") 
    .call(d3.axisLeft(Y_SCALE).ticks(10)) 
    .attr("font-size", '20px');

    // create a tooltip
    let tooltip = d3.select("#bar-chart")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("width", "100px")
    .style("height", "75px")
    .style("text-align", "center");
  });
}

function build_scatter_plot_1() {
  // reading in data 
  d3.csv("data/iris.csv").then((data) => {

    // find max values 
    const MAX_X = d3.max(data, (d) => { return parseInt(d.Petal_Length); });
    const MAX_Y = d3.max(data, (d) => { return parseInt(d.Sepal_Length); });
    
    // define scale functions that maps our data values to pixel values (range) 
    const X_SCALE = d3.scaleLinear() 
    .domain([0, MAX_X*1.2]) 
    .range([0, VIS_WIDTH]);

    const Y_SCALE = d3.scaleLinear() 
    .domain([0, MAX_Y*1.2]) 
    .range([VIS_HEIGHT,0]); 

    // use the X_SCALE and Y_SCALE to plot the points 
    const points_1 = SCATTER_FRAME_1.selectAll("dot")  
    .data(data)
    .enter()       
    .append("circle")  
    .attr("cx", (d) => { return (X_SCALE(d.Petal_Length) + MARGINS.left); })
    .attr("cy", (d) => { return (Y_SCALE(d.Sepal_Length) + MARGINS.top); })
    .attr("xchord", (d) => { return d.Petal_Length; })
    .attr("ychord", (d) => { return d.Sepal_Length; })
    .attr("r", 5)
    .attr("class", (d) => {return d.Species});

    // adding X axis to the visualization 
    SCATTER_FRAME_1.append("g") 
    .attr("transform", "translate(" + MARGINS.left + 
      "," + (VIS_HEIGHT + MARGINS.top) + ")") 
    .call(d3.axisBottom(X_SCALE).ticks(11)) 
    .attr("font-size", '20px'); 

    // adding Y axis to the visualization 
    SCATTER_FRAME_1.append("g") 
    .attr("transform", "translate(" + MARGINS.left + 
      "," + (MARGINS.top) + ")") 
    .call(d3.axisLeft(Y_SCALE).ticks(11)) 
    .attr("font-size", '20px'); 

  });

};

function build_scatter_plot_2() {
  // reading in data 
  d3.csv("data/iris.csv").then((data) => {

    // find max values 
    const MAX_X = d3.max(data, (d) => { return parseInt(d.Petal_Width); });
    const MAX_Y = d3.max(data, (d) => { return parseInt(d.Sepal_Width); });
    
    // define scale functions that maps our data values to pixel values (range) 
    const X_SCALE = d3.scaleLinear() 
    .domain([0, MAX_X*1.2]) 
    .range([0, VIS_WIDTH]);

    const Y_SCALE = d3.scaleLinear() 
    .domain([0, MAX_Y*1.2]) 
    .range([VIS_HEIGHT,0]); 

    // use the X_SCALE and Y_SCALE to plot the points 
    let points_2 = SCATTER_FRAME_2.selectAll("dot")  
    .data(data)
    .enter()       
    .append("circle")  
    .attr("cx", (d) => { return (X_SCALE(d.Petal_Width) + MARGINS.left); })
    .attr("cy", (d) => { return (Y_SCALE(d.Sepal_Width) + MARGINS.top); })
    .attr("xchord", (d) => { return d.Petal_Width; })
    .attr("ychord", (d) => { return d.Sepal_Width; })
    .attr("r", 5)
    .attr("class", (d) => {return d.Species});

    // adding X axis to the visualization 
    SCATTER_FRAME_2.append("g") 
    .attr("transform", "translate(" + MARGINS.left + 
      "," + (VIS_HEIGHT + MARGINS.top) + ")") 
    .call(d3.axisBottom(X_SCALE).ticks(11)) 
    .attr("font-size", '20px'); 

    // adding Y axis to the visualization 
    SCATTER_FRAME_2.append("g") 
    .attr("transform", "translate(" + MARGINS.left + 
      "," + (MARGINS.top) + ")") 
    .call(d3.axisLeft(Y_SCALE).ticks(11)) 
    .attr("font-size", '20px'); 

    const brush = d3.brush()                                   // Add the brush feature using the d3.brush function
    .extent( [[MARGINS.left,MARGINS.top], 
               [FRAME_WIDTH,(FRAME_HEIGHT - MARGINS.bottom)]])         // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
    .on("start brush end", updateChart);

    SCATTER_FRAME_2.call(brush);

    function updateChart({selection}) {
      points_2.classed("selected", (d) => { return isBrushed(selection, (X_SCALE(d.Petal_Width) + MARGINS.left), (Y_SCALE(d.Sepal_Width) + MARGINS.top)); })
    }

    function isBrushed(brush_coords, cx, cy) {
      const x0 = brush_coords[0][0];
      const x1 = brush_coords[1][0];
      const y0 = brush_coords[0][1];
      const y1 = brush_coords[1][1];
      return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;    // This return TRUE or FALSE depending on if the points is in the selected area
    };
  });
}




build_bar_plot();
build_scatter_plot_1();
build_scatter_plot_2();






