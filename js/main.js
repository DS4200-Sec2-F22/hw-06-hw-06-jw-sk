
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
  d3.csv("iris_bar.csv").then((data) => {

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
    .attr("class", "bar")
    .on("mouseenter", bar_hover_over)
    .on("mousemove", bar_move)
    .on("mouseleave", bar_hover_out);

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
  d3.csv("iris.csv").then((data) => {

    // find max values 
    const MAX_X = d3.max(data, (d) => { return parseInt(d.Petal_Length); });
    const MAX_Y = d3.max(data, (d) => { return parseInt(d.Sepal_Length); });
    
    // define scale functions that maps our data values to pixel values (range) 
    const X_SCALE = d3.scaleLinear() 
    .domain([0, 10]) 
    .range([0, VIS_WIDTH]);

    const Y_SCALE = d3.scaleLinear() 
    .domain([0, 10]) 
    .range([VIS_HEIGHT,0]); 

    // use the X_SCALE and Y_SCALE to plot the points 
    SCATTER_FRAME.selectAll("dot")  
    .data(data)
    .enter()       
    .append("circle")  
    .attr("cx", (d) => { return (X_SCALE(d.Petal_Length) + MARGINS.left); })
    .attr("cy", (d) => { return (Y_SCALE(d.Sepal_Length) + MARGINS.top); })
    .attr("xchord", (d) => { return d.Petal_Length; })
    .attr("ychord", (d) => { return d.Sepal_Length; })
    .attr("r", 10)
    .attr("class", "point");

    // adding X axis to the visualization 
    SCATTER_FRAME.append("g") 
    .attr("transform", "translate(" + MARGINS.left + 
      "," + (VIS_HEIGHT + MARGINS.top) + ")") 
    .call(d3.axisBottom(X_SCALE).ticks(11)) 
    .attr("font-size", '20px'); 

    // adding Y axis to the visualization 
    SCATTER_FRAME.append("g") 
    .attr("transform", "translate(" + MARGINS.left + 
      "," + (MARGINS.top) + ")") 
    .call(d3.axisLeft(Y_SCALE).ticks(11)) 
    .attr("font-size", '20px'); 

    function hover_over(event, d) {

    }

    function hover_out(event, d) {

    }

    // adding event listeners for all functionality 
    SCATTER_FRAME.selectAll(".point")
    .on("mouseover", hover_over)
    .on("mouseleave", hover_out)

  });

};

function build_scatter_plot_2() {
  // reading in data 
  d3.csv("iris.csv").then((data) => {

    // find max values 
    const MAX_X = d3.max(data, (d) => { return parseInt(d.Petal_Width); });
    const MAX_Y = d3.max(data, (d) => { return parseInt(d.Sepal_Width); });
    
    // define scale functions that maps our data values to pixel values (range) 
    const X_SCALE = d3.scaleLinear() 
    .domain([0, 10]) 
    .range([0, VIS_WIDTH]);

    const Y_SCALE = d3.scaleLinear() 
    .domain([0, 10]) 
    .range([VIS_HEIGHT,0]); 

    // use the X_SCALE and Y_SCALE to plot the points 
    SCATTER_FRAME.selectAll("dot")  
    .data(data)
    .enter()       
    .append("circle")  
    .attr("cx", (d) => { return (X_SCALE(d.Petal_Width) + MARGINS.left); })
    .attr("cy", (d) => { return (Y_SCALE(d.Sepal_Width) + MARGINS.top); })
    .attr("xchord", (d) => { return d.Petal_Width; })
    .attr("ychord", (d) => { return d.Sepal_Width; })
    .attr("r", 10)
    .attr("class", "point");

    // adding X axis to the visualization 
    SCATTER_FRAME.append("g") 
    .attr("transform", "translate(" + MARGINS.left + 
      "," + (VIS_HEIGHT + MARGINS.top) + ")") 
    .call(d3.axisBottom(X_SCALE).ticks(11)) 
    .attr("font-size", '20px'); 

    // adding Y axis to the visualization 
    SCATTER_FRAME.append("g") 
    .attr("transform", "translate(" + MARGINS.left + 
      "," + (MARGINS.top) + ")") 
    .call(d3.axisLeft(Y_SCALE).ticks(11)) 
    .attr("font-size", '20px'); 

    function hover_over(event, d) {

    }

    function hover_out(event, d) {

    }

    // adding event listeners for all functionality 
    SCATTER_FRAME.selectAll(".point")
    .on("mouseover", hover_over)
    .on("mouseleave", hover_out)

  });

};


build_bar_plot();
build_scatter_plot_1();
build_scatter_plot_2();






