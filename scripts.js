let card_pics = ['./pics/m1.jpg', './pics/m2.jpg', './pics/m3.jpg', './pics/m4.jpg', './pics/m5.jpg', './pics/m6.jpg']
let index = 0;

// instantiate all components
window.mdc.autoInit();
// create a reference to it
const tabbar = document.querySelector('.mdc-tab-bar').MDCTabBar;
const sol_text_field = document.querySelector('.mdc-text-field').MDCTextField;
const rover_select_field =  document.querySelector('.mdc-select').MDCSelect;

const hideScreens = () => {
  $(".content").hide();
}

$(".mdc-tab").on("click", function() {
  hideScreens();
  var target = $(this).attr("id");
  $(target).show();
});


$("#img_search_button").on("click", function(){


  console.log(rover_select_field.value);


});

const getWeather = () => {
  var url = "https://api.nasa.gov/insight_weather/?feedtype=json&ver=1.0&api_key=1LuGzfFVR9LTX4tEIJTUf5flVkStXjBMA5pa5oIO";
  $.get(url,
    data => {
      data.sol_keys.forEach(sol => createWeatherCard(sol, data[sol]));
    });
}

  // Create Weather Cards
  const createWeatherCard = (sol, sol_obj) => {
    $('#weather_cards').append("<div class=\"mdc-layout-grid__cell--span-3\">" +
      "<div class=\"mdc-card\">" +
        "<div class=\"mdc-card__primary-action\">" +
          "<div class=\"mdc-card__media mdc-card__media--16-9\" style=\"background-image: url(&quot;" + card_pics[index] + "&quot;);\">" +
          "</div>" +
          // ... additional primary action content ...
          "<div class=\"demo-card__primary\">" +
            "<h1 class=\"demo-card__title mdc-typography mdc-typography--headline6\">Sol " + sol + "</h1>" +
            "<h2 class=\"demo-card__subtitle mdc-typography mdc-typography--subtitle2\">Season: " + sol_obj.Season + "</h2>" +
            "<h2 class=\"demo-card__subtitle mdc-typography mdc-typography--subtitle2\">High: " + Math.round(sol_obj.AT.mx) + "&deg;C | Low: " + Math.round(sol_obj.AT.mn) + "&deg;C</h2>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</div>");

    if(index == 5){
      index = 0;
    }
    else {
      index++;
    }
  }

  const getMRP = () => {
    let url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=430&page=1&api_key=1LuGzfFVR9LTX4tEIJTUf5flVkStXjBMA5pa5oIO";
    $.get(url,
      function(data) {
        $.each(data, function(i, v) {
          $.each(v, function(j, k) {
            createImageCard(k);
          });
        });
      });
  }

  const createImageCard = (img) => {
    $('#rover_img_cards').append("<div class=\"mdc-layout-grid__cell--span-3\">" +
      "<div class=\"mdc-card\">" +
        "<div class=\"mdc-card__primary-action\">" +
          "<div class=\"mdc-card__media mdc-card__media--square\" style=\"background-image: url(&quot;" + img.img_src + "&quot;);\">" +
          "</div>" +
          // ... additional primary action content ...
        "</div>" +
      "</div>" +
    "</div>");


  }
  getMRP();
  // getWeather();
