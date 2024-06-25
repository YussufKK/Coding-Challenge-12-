d3.csv("mock_stock_data.csv").then(data => {
    data.forEach(d => {
        d.Date = new Date(d.Date);
        d.Price = +d.Price;
    });

    // Function to filter 
    function filterByStock(stockName) {
        return data.filter(d => d.Stock === stockName);
    }

    // Function to filter data by date range
    function filterByDateRange(startDate, endDate) {
        return data.filter(d => d.Date >= startDate && d.Date <= endDate);
    }

    // Example 
    const appleData = filterByStock("Apple");
    const googleData = filterByStock("Google");
    const dateRangeData = filterByDateRange(new Date("2023-01-02"), new Date("2023-01-04"));
});
