let card_pics = ['./pics/m1.jpg', './pics/m2.jpg', './pics/m3.jpg', './pics/m4.jpg', './pics/m5.jpg', './pics/m6.jpg']
let index = 0;

// instantiate all components
window.mdc.autoInit();
// create a reference to it
const tabbar = document.querySelector('.mdc-tab-bar').MDCTabBar;

const hideScreens = () => {
  $(".content").hide();
}

$(".mdc-tab").on("click", function() {
  hideScreens();
  var target = $(this).attr("id");
  $(target).show();
});

// call a method
// snackbar.open();

var url = "https://api.nasa.gov/insight_weather/?feedtype=json&ver=1.0&api_key=1LuGzfFVR9LTX4tEIJTUf5flVkStXjBMA5pa5oIO";
$.get(url,
  data => {
    data.sol_keys.forEach(sol => createCard(sol, data[sol]));
    // $.each(data, function(i, v) {
      // console.log(v);
    //
    // }); // end of the callback function and parameter list for $.each
  }); //  end of the callback function and parameter list for $.get


  // Create Cards
  const createCard = (sol, sol_obj) => {
    $('.mdc-layout-grid__inner').append("<div class=\"mdc-layout-grid__cell--span-3\">" +
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

  // createCard();
  // createCard();
  // createCard();
  // createCard();
  // createCard();
  // createCard();
  // createCard();
  // createCard();
