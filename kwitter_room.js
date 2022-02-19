    // Your web app's Firebase configuration
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

user_name = localStorage.getItem("user_name")
document.getElementById("user_name").innerHTML = "Welcome " + user_name+"!";

function addRoom(){
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({purpose: "Creating a Room"});

  localStorage.setItem("room_name", room_name);

  window.location = "kwitter_page.html";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
      console.log("Room Names - " + Room_names);
      row = "<div class='room_name' id = " + Room_names + " onclick = 'redirectToRoom(this.id)'>#" + Room_names + "</div><hr>";
      document.getElementById("output").innerHTML += row;
      //End code
      });});}
getData();

function redirectToRoom(name){
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}

function logout(){
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}