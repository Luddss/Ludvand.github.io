// The svg
var svg = d3.select("svg"),
    width = +svg.attr("width") * 2,
    height = +svg.attr("height") * 2;

// Map and projection
var path = d3.geoPath();
var projection = d3.geoMercator()
    .scale(60)
    .center([250, -50]);

// Data and color scale
var data = d3.map();
var colorScale = d3.scaleThreshold()
    .domain([1000, 10000, 20000, 30000, 40000, 50000])//Värdenas motsvarande färg
    .range(d3.schemeOranges[5]);//hur många olika värden

// Load external data and boot
d3.queue()
    .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
    .defer(d3.csv, "fire.csv", function (d) { data.set(d.code, +d.fireSize); })//CHANGE TO OUR DATA
    .await(ready);



function ready(error, topo) {


    let mouseOver = function (d) {
        d3.selectAll(".Country")
            .transition()
            .duration(200)
            .style("stroke", "grey")
        d3.select(this)
            .transition()
            .duration(200)
            .style("stroke", "#160602")
            .style("cursor", "pointer")
    }

    let mouseLeave = function (d) {
        d3.selectAll(".Country")
            .transition()
            .duration(500)
            .style("stroke", "#160602")
        d3.select(this)
            .transition()
            .duration(500)
            .style("stroke", "#160602")
    }

    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(topo.features)
        .enter()
        .append("path")
        // draw each country
        .attr("d", d3.geoPath()
            .projection(projection)
        )
        // set the color of each country
        .attr("fill", function (d) {
            d.total = data.get(d.id) || 0;
            return colorScale(d.total);
        })
        .style("stroke", "black")
        .attr("class", function (d) { return "Country" })
        .style("opacity", .7)
        .on("mouseover", mouseOver)
        .on("mouseleave", mouseLeave)
        .on("click", pop)
}

//Pictures of our facts
var factUSA = "Usa.png";
var factAustralia = "Australia.png";
var factSweden = "Sweden.png";
var factCanada = "Canada.png";
var factRussia = "Russia.png";

let pop = function (d) {
    var popup = document.getElementById('myPopup');
    console.log(popup);
    console.log(this);
    var countryColor = this.getAttribute("fill");
    var test1 = d3.select(myPopup);
    console.log(test1);

    var currentCountry = Object.values(this)[0].properties.name;

    var currentFire = Object.values(this)[0].properties.fireSize;

    document.getElementById("myPopup").innerHTML = "<h1>" + currentCountry + "</h1><img id=\"countryFact\" src=\"noInfo.png\" />"; //ändra till någon default

    if (currentCountry == "USA") {
        document.getElementById("myPopup").innerHTML = `
    <h1>`+ currentCountry + `</h1>
    <img id=\"countryFact\" src=`+ factUSA + ` />
    `;


    }

    if (currentCountry == "Australia") {
        document.getElementById("myPopup").innerHTML = `
    <h1>`+ currentCountry + `</h1>
    <img id=\"countryFact\" src=`+ factAustralia + ` />
    `;


    }

    if (currentCountry == "Sweden") {
        document.getElementById("myPopup").innerHTML = `
    <h1>`+ currentCountry + `</h1>
    <img id=\"countryFact\" src=`+ factSweden + ` />
    `;


    }

    if (currentCountry == "Canada") {
        document.getElementById("myPopup").innerHTML = `
    <h1>`+ currentCountry + `</h1>
    <img id=\"countryFact\" src=`+ factCanada + ` />
    `;


    }

    if (currentCountry == "Russia") {
        document.getElementById("myPopup").innerHTML = `
    <h1>`+ currentCountry + `</h1>
    <img id=\"countryFact\" src=`+ factRussia + ` />
    `;


    }


}

//Pictures of our stories
var storyOne = "Story 1.png";
var storyTwo = "Story 2.png";
var storyThree = "Story 3.png";
var stories = [storyOne, storyTwo, storyThree];

var dots = ["dot1", "dot2", "dot3"]

var currentIndex = 0;

function changeStoryForward() {

    if (currentIndex == stories.length - 1) {
        currentIndex = 0;
    } else {
        currentIndex = currentIndex + 1;
    }

    document.getElementById('story').src = stories[currentIndex];
    colorDots(currentIndex);


}

function changeStoryBack() {

    if (currentIndex == 0) {
        currentIndex = stories.length - 1;
    } else {
        currentIndex = currentIndex - 1;
    }

    document.getElementById('story').src = stories[currentIndex];
    colorDots(currentIndex);

}

function colorDots(index) {

    var i;
    for (i = 0; i < dots.length; i++) {
        if (i == index) {
            document.getElementById(dots[i]).style.backgroundColor = "#DA4E12";
        } else {
            document.getElementById(dots[i]).style.backgroundColor = "#bbb";
        }

    }
}