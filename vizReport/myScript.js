// The svg
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");
console.log(svg)

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
            .style("stroke", "gray")
        d3.select(this)
            .transition()
            .duration(200)
            .style("stroke", "black")
    }

    let mouseLeave = function (d) {
        d3.selectAll(".Country")
            .transition()
            .duration(1000)
            .style("stroke", "gray")
        d3.select(this)
            .transition()
            .duration(1000)
            .style("stroke", "gray")
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
        .style("stroke", "gray")
        .attr("class", function (d) { return "Country" })
        .style("opacity", .8)
        .on("mouseover", mouseOver)
        .on("mouseleave", mouseLeave)
        .on("click", pop)
}

//Pictures of our facts
var factUSA = "https://cdn.glitch.com/14594709-a203-4635-bc07-c097e94092aa%2FStory%201.png?v=1583232432230";
var factAustralia = "https://cdn.glitch.com/14594709-a203-4635-bc07-c097e94092aa%2Faustralia.png?v=1583225183463";
var factSweden = "https://cdn.glitch.com/14594709-a203-4635-bc07-c097e94092aa%2Fsweden.png?v=1583225177988";
var factCanada = "https://cdn.glitch.com/14594709-a203-4635-bc07-c097e94092aa%2Fcanada.png?v=1583225188296";


let pop = function (d) {
    var popup = document.getElementById('myPopup');
    console.log(popup);
    console.log(this);
    var countryColor = this.getAttribute("fill");
    var test1 = d3.select(myPopup);
    console.log(test1);

    var currentCountry = Object.values(this)[0].properties.name;

    var currentFire = Object.values(this)[0].properties.fireSize;

    document.getElementById("myPopup").innerHTML = "<h1>" + currentCountry + "</h1><img id=\"countryFact\" src=\"https://cdn.glitch.com/14594709-a203-4635-bc07-c097e94092aa%2Fbiltema.jpg?v=1582879163760\" />"; //ändra till någon default

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


}

//Pictures of our stories
var storyOne = "https://cdn.glitch.com/14594709-a203-4635-bc07-c097e94092aa%2Fstory1.png?v=1583172665647";
var storyTwo = "https://cdn.glitch.com/14594709-a203-4635-bc07-c097e94092aa%2Fstory2.png?v=1583172693109";
var storyThree = "https://cdn.glitch.com/14594709-a203-4635-bc07-c097e94092aa%2Fstory3.png?v=1583172700330";
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

// Scale #html_text from size specified for 1000 viewport width to current width
function resizeHTMLText() {
    var w = d3.select("#sketch1").node().clientWidth;
    d3.selectAll(".html_overlay").style("transform", "scale(" + (w / 1000) + ")");
}

resizeHTMLText();
window.addEventListener("resize", resizeHTMLText);

function hide(toHide) {
    var x = document.getElementById(toHide);

    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}