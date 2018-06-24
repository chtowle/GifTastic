$(document).ready(function () {
    // load the arrary with some cities
    let cities = ["London", "San Francisco", "San Diego"]
    // enter api key 
    let giphyApiKey = "api_key=" + "Cfr5S4u6v2caXyLC4CeF8pn4n6kbGJSk"
    let queryURL = ""
    let cityImage = ""

    // render the buttons
    function renderButtons() {
        //empty the container
        $('#buttons').empty()
        // for each button set attributes
        cities.forEach(function (city) {
            let a = $("<button>")
            a.addClass("city-btn")
            a.attr("cityName", city)
            a.text(city)
            $("#buttons").append(a)
            //  console.log(a)
        })
    }
    //listener for mouse click on button
    $("#add-city").on("click", function (event) {
        event.preventDefault()
        // set cityEntry to new city
        let cityEntry = $('#city-input').val()
        console.log(cityEntry)

        //ensure the city is not already used or empty
        if ((cities.includes(cityEntry)) || (cityEntry === "")) return;

        //adds the new city to the end f the array
        cities.push(cityEntry)
        //draw new button array
        renderButtons()
    })
    // display the gif list of ten
    function displaygif() {
        $("#images").empty()
        let cityBtn = $(this).attr("cityName")

        //set queryUrl to the gif web link
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cityBtn + "&" + giphyApiKey + "&limit=10"
        console.log(queryURL)
        //ajax allow for loading data from a server data into page without have to refresh 
        //the page
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {
                //loop through the 10 gifs adding attribute for each
                for (let i = 0; i < response.data.length; i++) {
                    //load both the animated and still gif
                    queryURLStill = response.data[i].images.fixed_height_still.url
                    queryURLAnimate = response.data[i].images.fixed_height.url
                    // set gifImage to the image container
                    let gifImage = $("<img>")
                    //set rating of the gif from response object
                    let rating = $("<p>").text("Rating: " + response.data[i].rating)
                    //set the src attribute the the still gif
                    gifImage.attr("src", queryURLStill)
                    //store both the still and animated gif in the attribute
                    //this avoids scope problems if using variable
                    gifImage.attr("urlDataAnimate", queryURLAnimate)
                    gifImage.attr("urlDataStill", queryURLStill)
                    //set the still attribute to yes 
                    gifImage.attr("still", "yes")
                    gifImage.addClass("startImage")
                    //add ratings and gif to object list
                    $("#images").prepend(rating)
                    $("#images").prepend(gifImage)
                }
                // console.log(response.data)
                // console.log(queryURL[0].data.url)
            })
    }
    // changes gif from animate to still and 
    // still to animate
    function startview() {
        // set attribute data to variables
        let as = $(this).attr("still")
        let an = $(this).attr("urlDataAnimate")
        let sn = $(this).attr("urlDataStill")

        console.log(as)
        console.log(an)
        console.log(sn)
        // if still change gif to animate and update state variable
        if (as == "yes") {
            $(this).attr("src", an)
            $(this).attr("still", "no")
        // if animated change gif to still and update state variable
        } else {
            $(this).attr("src", sn)
            $(this).attr("still", "yes")
        }
    }
    //render buttons
    renderButtons()
    //listener for city button click-- displayfig
    $(document).on("click", ".city-btn", displaygif)
    //listener for gif image click-- startview
    $(document).on("click", ".startImage", startview)
})