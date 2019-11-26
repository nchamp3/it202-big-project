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
  function(data) {
    $.each(data, function(i, v) {
      console.log(v);

    }); // end of the callback function and parameter list for $.each
  }); //  end of the callback function and parameter list for $.get


  // Create Cards
  const createCard = () => {
    $('.mdc-layout-grid__inner').append("<div class=\"mdc-layout-grid__cell--span-3\">" +
      "<div class=\"mdc-card\">" +
        "<div class=\"mdc-card__primary-action\">" +
          "<div class=\"mdc-card__media mdc-card__media--square\">" +
            "<div class=\"mdc-card__media-content\">Title</div>" +
          "</div>" +
          // ... additional primary action content ...
        "</div>" +
        "<div class=\"mdc-card__actions\">" +
          "<div class=\"mdc-card__action-buttons\">" +
            "<button class=\"mdc-button mdc-card__action mdc-card__action--button\">" +
              "<span class=\"mdc-button__label\">Action 1</span>" +
            "</button>" +
            "<button class=\"mdc-button mdc-card__action mdc-card__action--button\">" +
              "<span class=\"mdc-button__label\">Action 2</span>" +
            "</button>" +
          "</div>" +
          "<div class=\"mdc-card__action-icons\">" +
            "<button class=\"material-icons mdc-icon-button mdc-card__action mdc-card__action--icon\" title=\"Share\">share</button>" +
            "<button class=\"material-icons mdc-icon-button mdc-card__action mdc-card__action--icon\" title=\"More options\">more_vert</button>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</div>");

  }

  createCard();
  createCard();
  createCard();
  createCard();
  createCard();
  createCard();
  createCard();
  createCard();
