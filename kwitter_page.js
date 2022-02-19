//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyBQlh1ieviFo-8Ni3HUIGyWMBXlDKBfSh4",
      authDomain: "kwitter-d6712.firebaseapp.com",
      databaseURL: "https://kwitter-d6712-default-rtdb.firebaseio.com",
      projectId: "kwitter-d6712",
      storageBucket: "kwitter-d6712.appspot.com",
      messagingSenderId: "525885504530",
      appId: "1:525885504530:web:8c9261d93409523a72accb"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function sendmsg(){
      console.log("hello");
      msg = document.getElementById("msg").value
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0
      });
      document.getElementById("msg").value = " "
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
      console.log(firebase_message_id);
      console.log(message_data);
      name = message_data["name"];
      like = message_data["like"];
      message = message_data["message"];
      name_with_tag = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>"
      message_with_tag = "<h4 class = 'message_h4'>" + message + "</h4>"
      like_button = "<button class = 'btn btn-warning' id = " + firebase_message_id + " value = " + like + " onclick = 'updateLike(this.id)'>"
      span_with_tag = "<span class = 'glyphicon glyphicon-thumbs-up'>Like:" + like + "</span></button>"

      row = name_with_tag + message_with_tag + like_button + span_with_tag
      document.getElementById("output").innerHTML += row;
//End code
      } });  }); }
getData();

function updateLike(message_id){
      console.log("Clicked on the like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value
      updatedLikes = Number(likes) + 1;
      console.log(updatedLikes);

      firebase.database().ref(room_name).child(message_id).update({
            like: updatedLikes
      });
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
    }
