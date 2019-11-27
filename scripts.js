let card_pics = ['./pics/m1.jpg', './pics/m2.jpg', './pics/m3.jpg', './pics/m4.jpg', './pics/m5.jpg', './pics/m6.jpg']
let index = 0;

// instantiate all components
window.mdc.autoInit();
// create a reference to it
const tabbar = document.querySelector('.mdc-tab-bar').MDCTabBar;
const sol_text_field = document.querySelector('.mdc-text-field').MDCTextField;
const rover_select_field =  document.querySelector('.mdc-select').MDCSelect;
const noPhotos_snackbar = document.querySelector('.mdc-snackbar').MDCSnackbar;

const hideScreens = () => {
  $(".content").hide();
}

$(".mdc-tab").on("click", function() {
  hideScreens();
  var target = $(this).attr("id");
  if(target == "#weather") {
    getWeather();
  }
  $(target).show();
});


$("#img_search_button").on("click", function(){
  let sol = sol_text_field.value;
  let rover = rover_select_field.value;
  if(sol.length == 0 || rover.length == 0)
  {
    // alert("Please select a sol and rover.");
    noPhotos(sol, rover, 1);
    noPhotos_snackbar.open();
  }
  else {
    // console.log("sol: " + sol);
    // console.log("rover: " + rover);
    getMRP(sol, rover);
  }
});

const getWeather = () => {
  var url = "https://api.nasa.gov/insight_weather/?feedtype=json&ver=1.0&api_key=1LuGzfFVR9LTX4tEIJTUf5flVkStXjBMA5pa5oIO";
  $('#weather_cards').html("");
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


  const getMRP = (sol, rover) => {
    let url = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + rover + "/photos?sol=" + sol + "&page=1&api_key=1LuGzfFVR9LTX4tEIJTUf5flVkStXjBMA5pa5oIO";
    $('#rover_img_cards').html("");
    $(".mdc-snackbar__label").html("");
    $.get(url,
      function(data) {
        $.each(data, function(i, v) {
          if(v.length == 0) {
            noPhotos(sol, rover, 2);
            noPhotos_snackbar.open();
          }
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

  const noPhotos = (sol, rover, msg) => {
    if(msg == 1) {
      $(".mdc-snackbar__label").append("Please select a sol and rover.");
    }
    else {
      $(".mdc-snackbar__label").append("No pictures taken by " + rover + " on Sol " + sol);
    }
  }

  // getMRP();
  // getWeather();
