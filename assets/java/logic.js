//Giphy API: Musical Edition
// Musical Artists/Groups Array
var topics = [];

// AuthKey Variable
var authKey = "&api_key=hFytTfUDJIvPPcB1J1S3TfBxPqVDcJhr&limit=10";

//==========================================================================

  // Funtion to re-render HTML to display the Gifs
  function displayGifs() {

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
        var topicDiv = $("<div class='topic'>");

        // Creating an paragraph tag with the gif rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var topicImage = $("<img>");

        // Setting the src attribute of the image to a property pulled off the result item
        topicImage.attr("src", results[i].images.fixed_height.url);

        // Append image and rating to topic Div
        topicDiv.append(topicImage);
        topicDiv.append(p);

        // Prependng the topicDiv to the HTML page in the "#gifs-appear-here" div
        $("#gif-well").prepend(topicDiv);
      }
    });
  }

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

  // This function handles events where a topic button is clicked
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
