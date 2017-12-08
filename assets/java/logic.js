//Giphy API: Musical Edition
// Musical Artists/Groups Array
var topics = ["The Gorillaz", "Snoop Dogg", "Lady Gaga", "Rob Zombie"];

// AuthKey Variable
var authKey = "&api_key=hFytTfUDJIvPPcB1J1S3TfBxPqVDcJhr&limit=10";

//========================================================================================

  // Funtion to re-render HTML to display the Gifs
  function displayGifs() {
    $("#gif-well").empty();

    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + authKey;

    // AJAX call for specific movie button being clicked
    $.ajax ({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      var results = response.data;

      for (var i = 0; i < results.length; i++) {

        // Creating a div to hold the topic
        var topicDiv = $("<div class='topic-gif'>");

        // Creating an paragraph tag with the gif rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var topicImage = $("<img>");

        // Setting the src attribute of the image to a property pulled off the result item
        topicImage.attr("src", results[i].images.fixed_height_still.url);
        topicImage.attr("data-still", results[i].images.fixed_height_still.url);
        topicImage.attr("data-animate", results[i].images.fixed_height.url);
        topicImage.attr("data-state", "still");
        topicImage.addClass("gif");

        // Append image and rating to topic Div
        topicDiv.append(topicImage);
        topicDiv.append(p);

        // Prependng the topicDiv to the HTML page in the "#gifs-appear-here" div
        $("#gif-well").prepend(topicDiv);
      }
    });
  }

//========================================================================================

  // Funtion for displaying topic data
  function renderButtons() {

    //Deleting the movies prior to adding new movies
    $("#btn-well").empty();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {

      // Dynamically generate buttons for each topic in the array
      var a = $("<button>");
      // Adding a class of topic to our button
      a.addClass("topic");
      // Adding a data-attribute
      a.attr("data-name", topics[i]);
      // Providing the initial button text
      a.text(topics[i]);
      // Adding the button to the btn-well div
      $("#btn-well").append(a);
    }
  }

//========================================================================================

  // This function will push new topics entered by user into the topic array
  $("#add-button").on("click", function(event){
    event.preventDefault();

    //This line will grab topic input from textbox
    var topic = $("#topic-input").val().trim();

    // Adding topic to array of topics
    topics.push(topic);

    //Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  $(document).on("click", ".topic", displayGifs);

//========================================================================================

  //Gif animation on click functions
  function animate() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  };

  $(document).on("click", ".gif", animate);

//========================================================================================

  //Clear Gif function
  function clearGif(){
    $("#gif-well").empty();
  }

  $(document).on("click", "#clear-button", clearGif);


renderButtons();
