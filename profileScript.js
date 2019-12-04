var db = new Dexie("profile_database");
db.version(1).stores({
  user: 'fName,lName,profilePic'
});

// db.user.put({
//   fName: "yo",
//   lName: "bruh",
//   profilePic: "./pics/m4.jpg"
// });
//
// db.user.put({
//   fName: "Lm",
//   lName: "oiy",
//   profilePic: "./pics/m1.jpg"
// });


const player = document.getElementById('player');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const captureButton = document.getElementById('capture');
const saveButton = document.getElementById('save');
const editButton = document.getElementById('edit_button');

let imgURL;

player.style.display = "none";
captureButton.style.display = "none";
saveButton.style.display = "none";
canvas.style.display = "none";

$('#capture').html("Take a picture!");

window.mdc.autoInit();
const snackbar = document.querySelector('#sbar').MDCSnackbar;
const fName_text_field = document.querySelector('#first_name_text_field').MDCTextField;
const lName_text_field = document.querySelector('#last_name_text_field').MDCTextField;


const constraints = {
  video: true,
};

const loadUser = () => {
  //   db.user.get(recentUser).then (function (firstFriend) {
  //     alert ("Friend with id 1: " + firstFriend.name);
  // });
  // console.log(db.user.count());
  db.user.toCollection().last(function(u) {
    $("#first_name_text_field").addClass("mdc-text-field--disabled");
    $("#last_name_text_field").addClass("mdc-text-field--disabled");
    $("first_name_text_input").attr("disabled", "");
    $("last_name_text_input").attr("disabled", "");
    
    fName_text_field.value = u.fName;
    lName_text_field.value = u.lName;
    $(".profile-pic").attr("src", u.profilePic);


  });
}

const saveUser = (img) => {
  db.user.put({
    fName: fName_text_field.value,
    lName: lName_text_field.value,
    // profilePic: img
    profilePic: "./pics/m1.jpg"
  });

  // db.user.where({
  //   fName: fName_text_field.value,
  //   lName: lName_text_field.value,
  //   profilePic: img
  // }).first(u => {
  //   recentUser = u.id;
  //   alert(recentUser);
  // }).catch(error => {
  //   console.error(error.stack || error);
  // });
}




// Edit button
editButton.addEventListener('click', () => {

  $(".mdc-snackbar__label").html("");

  if (editButton.innerHTML.includes("Edit")) {

    $('#edit_button').html("<span class=\"mdc-button__ripple\"></span>Done");
    captureButton.style.display = "block";

    $("#first_name_text_field").removeClass("mdc-text-field--disabled");
    $("#last_name_text_field").removeClass("mdc-text-field--disabled");
    $("first_name_text_input").removeAttr("disabled");
    $("last_name_text_input").removeAttr("disabled");

  } else if (editButton.innerHTML.includes("Done")) {

    $('#edit_button').html("<span class=\"mdc-button__ripple\"></span>Edit");
    captureButton.style.display = "none";

    $("#first_name_text_field").addClass("mdc-text-field--disabled");
    $("#last_name_text_field").addClass("mdc-text-field--disabled");
    $("first_name_text_input").attr("disabled", "");
    $("last_name_text_input").attr("disabled", "");

    saveUser($(".profile-pic").attr("src"));

    $(".mdc-snackbar__label").append("Saved!");
    snackbar.open();
  }
});

// picture button
captureButton.addEventListener('click', () => {

  if (captureButton.innerHTML.includes("Take a picture!")) {
    attachStream();
    player.style.display = "block";
    canvas.style.display = "none";
    saveButton.style.display = "none";
    $('#capture').html("<span class=\"mdc-button__ripple\"></span>Capture");
  } else if (captureButton.innerHTML.includes("Capture")) {
    // Draw the video frame to the canvas.
    context.drawImage(player, 0, 0, canvas.width, canvas.height);
    canvas.style.display = "block";

    // Stop all video streams.
    player.srcObject.getVideoTracks().forEach(track => track.stop());

    player.style.display = "none";
    $('#capture').html("<span class=\"mdc-button__ripple\"></span>Take a picture!");
    saveButton.style.display = "block";
  }
});

// save picture
saveButton.addEventListener('click', () => {
  getBlob().then(savePic);
  canvas.style.display = "none";
  saveButton.style.display = "none";
});

const getBlob = () => {
  return new Promise((res, rej) => {
    canvas.toBlob(res, 'image/jpeg'); // request a Blob from the canvas
  });
}

const savePic = (blob) => {
  imgURL = URL.createObjectURL(blob);
  $(".profile-pic").attr("src", imgURL);
}

// Attach the video stream to the video element and autoplay.
const attachStream = () => {
  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      player.srcObject = stream;
    });
}
