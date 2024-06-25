const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

svg.selectAll("circle")
    .data(data.filter(d => d.Stock === "Apple"))
  .enter().append("circle")
    .attr("cx", d => x(d.Date))
    .attr("cy", d => y(d.Price))
    .attr("r", 5)
    .on("mouseover", function(event, d) {
        tooltip.transition()
            .duration(200)
            .style("opacity", .9);
        tooltip.html(`Date: ${d.Date}<br>Price: ${d.Price}`)
            .style("left", (event.pageX + 5) + "px")
            .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
    });

// Dropdown for stock selection
const stockNames = [...new Set(data.map(d => d.Stock))];
const dropdown = d3.select("body").append("select")
    .on("change", function() {
        const selectedStock = this.value;
        updateChart(selectedStock);
    });

dropdown.selectAll("option")
    .data(stockNames)
  .enter().append("option")
    .text(d => d);

function updateChart(stock) {
    const filteredData = data.filter(d => d.Stock === stock);

    // Update scales and axes
    x.domain(d3.extent(filteredData, d => d.Date));
    y.domain([0, d3.max(filteredData, d => d.Price)]);
    svg.select("g.x.axis").call(d3.axisBottom(x));
    svg.select("g.y.axis").call(d3.axisLeft(y));

    // Update line
    svg.select("path")
        .datum(filteredData)
        .attr("d", line);

    // Update circles
    const circles = svg.selectAll("circle")
        .data(filteredData);

    circles.enter().append("circle")
        .attr("r", 5)
      .merge(circles)
        .attr("cx", d => x(d.Date))
        .attr("cy", d => y(d.Price));

    circles.exit().remove();
}
