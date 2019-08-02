var topics = ["pizza", "sushi", "hamburgers", "burritos", "chicken"];

var foodInput;

var input;

console.log(topics);

function ButtonMaker() {
    for (var i = 0; i < topics.length; i++) {
        input = $("<button type='button'>" + topics[i] + "</button>").addClass("btn btn-info food").attr("data-food", topics[i]);
        $("#foodButtons").append(input);
    }
}

ButtonMaker();

$(".submit").on("click", function() {

    console.log(topics)
    // the bug probably occurs when I freaking add the new food to the array D:
    var foodInput = $(".foodInfo").val(); 
    console.log(foodInput);
    topics.push(foodInput);
    console.log(topics);

    $("#foodButtons").empty();

    ButtonMaker();
})

$(".food").on("click", function() {
    var food = $(this).attr("data-food");

    console.log(food);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    food + "&api_key=eCnsUyHLioegaIW47Ko9VFWRXPQyNUmy&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
            var results = response.data;

            for(var i = 0; i < results.length; i++) {

                if (results[i].rating !== "r" && results [i].rating !== "pg-13") {
                    var gifDiv = $("<div>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating:" + rating);
                    var foodImage = $("<img>");
                    foodImage.attr({"src" : results[i].images.fixed_height_still.url, "data-still" : results[i].images.fixed_height_still.url, "data-animate" : results[i].images.fixed_height.url, "data-state" : 'still'});
                    gifDiv.append(p);
                    gifDiv.append(foodImage);

                    $("#foodGIF").prepend(gifDiv);
                }
            }
        
            $("img").on("click", function () {
                var state = $(this).attr("data-state");
                console.log(state);
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                }
                else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                };
            });

        });

    });