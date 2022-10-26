
// constants for page set up 
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.left - MARGINS.right;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.top - MARGINS.bottom; 

// ----------SETTING THE FRAME FOR ALL THREE VISUALIZATIONS----------------
const BAR_FRAME = d3.select("#bar-chart")
.append("svg")
.attr("height", FRAME_HEIGHT)
.attr("width", FRAME_WIDTH)
.attr("class", "frame"); 

const SCATTER_FRAME_1 = d3.select("#scatter-plot-1")
.append("svg")
.attr("height", FRAME_HEIGHT)
.attr("width", FRAME_WIDTH)
.attr("class", "frame");

const SCATTER_FRAME_2 = d3.select("#scatter-plot-2")
.append("svg")
.attr("height", FRAME_HEIGHT)
.attr("width", FRAME_WIDTH)
.attr("class", "frame");

//sets preset bar data
const BAR_DATA = [{Species: "setosa", Count:50}, {Species: "virginica", Count:50}, {Species: "versicolor", Count:50}];


// ---------FUNCTION TO BUILD ALL PLOTS-------------
function build_plots() {

  // reading in data 
  d3.csv("data/iris.csv").then((data) => {

    // -----------------BAR PLOT-----------------
    //defines max y for bar plots
    const MAX_Y_BAR = d3.max(BAR_DATA, (d) => { return parseInt(d.Count); });

    // X scale 
    const X_SCALE_BAR = d3.scaleBand() 
    .range([0, VIS_WIDTH])
    .domain(BAR_DATA.map(function(d) {return d.Species; })) 
    .padding(0.2);

    // Y scale 
    const Y_SCALE_BAR = d3.scaleLinear() 
    .domain([0, (MAX_Y_BAR * 1.2)]) 
    .range([VIS_HEIGHT, 0]); 

    // add bars
    const bars = BAR_FRAME.selectAll(".bar")  
    .data(BAR_DATA)
    .enter()       
    .append("rect")  
    .attr("x", (d) => { return (X_SCALE_BAR(d.Species) + MARGINS.left); })
    .attr("y", (d) => { return (MARGINS.top + Y_SCALE_BAR(d.Count)); })
    .attr("width", X_SCALE_BAR.bandwidth())
    .attr("height", (d) => { return VIS_HEIGHT - Y_SCALE_BAR(d.Count); })
    .attr("class", (d) => {return d.Species; });

    // add X axis 
    BAR_FRAME.append("g") 
    .attr("transform", "translate(" + MARGINS.left + 
      "," + (VIS_HEIGHT + MARGINS.top) + ")") 
    .call(d3.axisBottom(X_SCALE_BAR).ticks(7)) 
    .attr("font-size", '20px'); 

    // add Y axis 
    BAR_FRAME.append("g") 
    .attr("transform", "translate(" + MARGINS.left + 
      "," + (MARGINS.top) + ")") 
    .call(d3.axisLeft(Y_SCALE_BAR).ticks(10)) 
    .attr("font-size", '20px');

    //Create title 
    BAR_FRAME.append("text")
    .attr("x", FRAME_WIDTH / 2)
    .attr("y", MARGINS.top)
    .style("text-anchor", "middle")
    .text("Count of Each Species");
    
    // -----------------SCATTER PLOT 1----------------
    // find max values 
    const MAX_X_SCAT_1 = d3.max(data, (d) => { return parseInt(d.Petal_Length); });
    const MAX_Y_SCAT_1 = d3.max(data, (d) => { return parseInt(d.Sepal_Length); });
    
    // define scale functions that maps our data values to pixel values (range) 
    const X_SCALE_SCAT_1 = d3.scaleLinear() 
    .domain([0, MAX_X_SCAT_1*1.2]) 
    .range([0, VIS_WIDTH]);

    const Y_SCALE_SCAT_1 = d3.scaleLinear() 
    .domain([0, MAX_Y_SCAT_1*1.2]) 
    .range([VIS_HEIGHT,0]);

    // use the X_SCALE and Y_SCALE to plot the points 
    const points_1 = SCATTER_FRAME_1.selectAll("dot")  
    .data(data)
    .enter()       
    .append("circle")  
    .attr("cx", (d) => { return (X_SCALE_SCAT_1(d.Petal_Length) + MARGINS.left); })
    .attr("cy", (d) => { return (Y_SCALE_SCAT_1(d.Sepal_Length) + MARGINS.top); })
    .attr("xchord", (d) => { return d.Petal_Length; })
    .attr("ychord", (d) => { return d.Sepal_Length; })
    .attr("r", 5)
    .attr("class", (d) => {return d.Species; });

    // adding X axis to the visualization 
    SCATTER_FRAME_1.append("g") 
    .attr("transform", "translate(" + MARGINS.left + 
      "," + (VIS_HEIGHT + MARGINS.top) + ")") 
    .call(d3.axisBottom(X_SCALE_SCAT_1).ticks(11)) 
    .attr("font-size", '20px'); 

    // adding Y axis to the visualization 
    SCATTER_FRAME_1.append("g") 
    .attr("transform", "translate(" + MARGINS.left + 
      "," + (MARGINS.top) + ")") 
    .call(d3.axisLeft(Y_SCALE_SCAT_1).ticks(11)) 
    .attr("font-size", '20px'); 

    //Create title 
    SCATTER_FRAME_1.append("text")
    .attr("x", FRAME_WIDTH / 2)
    .attr("y", MARGINS.top)
    .style("text-anchor", "middle")
    .text("Scatterplot of Petal Length vs. Sepal Length");

    // -----------------SCATTER PLOT 2----------------

    // find max values 
    const MAX_X_SCAT_2 = d3.max(data, (d) => { return parseInt(d.Petal_Width); });
    const MAX_Y_SCAT_2 = d3.max(data, (d) => { return parseInt(d.Sepal_Width); });
    
    // define scale functions that maps our data values to pixel values (range) 
    const X_SCALE_SCAT_2 = d3.scaleLinear() 
    .domain([0, MAX_X_SCAT_2*1.2]) 
    .range([0, VIS_WIDTH]);

    const Y_SCALE_SCAT_2 = d3.scaleLinear() 
    .domain([0, MAX_Y_SCAT_2*1.2]) 
    .range([VIS_HEIGHT,0]); 

    // use the X_SCALE and Y_SCALE to plot the points 
    let points_2 = SCATTER_FRAME_2.selectAll("dot")  
    .data(data)
    .enter()       
    .append("circle")  
    .attr("cx", (d) => { return (X_SCALE_SCAT_2(d.Petal_Width) + MARGINS.left); })
    .attr("cy", (d) => { return (Y_SCALE_SCAT_2(d.Sepal_Width) + MARGINS.top); })
    .attr("xchord", (d) => { return d.Petal_Width; })
    .attr("ychord", (d) => { return d.Sepal_Width; })
    .attr("r", 5)
    .attr("class", (d) => {return d.Species; });

    // adding X axis to the visualization 
    SCATTER_FRAME_2.append("g") 
    .attr("transform", "translate(" + MARGINS.left + 
      "," + (VIS_HEIGHT + MARGINS.top) + ")") 
    .call(d3.axisBottom(X_SCALE_SCAT_2).ticks(11)) 
    .attr("font-size", '20px'); 

    //Create title 
    SCATTER_FRAME_2.append("text")
    .attr("x", FRAME_WIDTH / 2)
    .attr("y", MARGINS.top)
    .style("text-anchor", "middle")
    .text("Scatterplot of Petal Width vs. Sepal Width");

    // adding Y axis to the visualization 
    SCATTER_FRAME_2.append("g") 
    .attr("transform", "translate(" + MARGINS.left + 
      "," + (MARGINS.top) + ")") 
    .call(d3.axisLeft(Y_SCALE_SCAT_2).ticks(11)) 
    .attr("font-size", '20px');

    // Add the brush feature using the d3.brush function
    const brush = d3.brush()                                   
    .extent( [[MARGINS.left,MARGINS.top], 
               [FRAME_WIDTH,(FRAME_HEIGHT - MARGINS.bottom)]])         // initialise the brush area: start at 0,0 and finishes at width,height
    .on("start brush end", updateChart);                               // calls updateChart function on start brush end 

    SCATTER_FRAME_2.call(brush);

    // initializing 
    let brushedData = [];

    // function to update chart based on given selection 
    function updateChart({selection}) {
      // resetting selection 
      let brushedData = [];

      data.map((d) => {if (isBrushed(selection, (X_SCALE_SCAT_2(d.Petal_Width) + MARGINS.left), (Y_SCALE_SCAT_2(d.Sepal_Width) + MARGINS.top))) {brushedData.push(d); }});
      
      points_2.classed("selected", (d) => { return brushedData.includes(d); });
      points_1.classed("selected", (d) => { return brushedData.includes(d); });
      bars.classed("selected", (d) => { return brushedData.map(d => d.Species).includes(d.Species); });
    };

    function isBrushed(brush_coords, cx, cy) {
      const x0 = brush_coords[0][0];
      const x1 = brush_coords[1][0];
      const y0 = brush_coords[0][1];
      const y1 = brush_coords[1][1];
      return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;    // This return TRUE or FALSE depending on if the points is in the selected area
    };
  });
};

build_plots();






