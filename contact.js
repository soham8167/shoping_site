
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
  import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
  
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAGQvYzl5f6dSZ0izcMN19wpAqoEfh-DRY",
    authDomain: "contactform-4ad19.firebaseapp.com",
    databaseURL: "https://contactform-4ad19-default-rtdb.firebaseio.com",
    projectId: "contactform-4ad19",
    storageBucket: "contactform-4ad19.appspot.com",
    messagingSenderId: "214100277179",
    appId: "1:214100277179:web:d579e4f63a45f75d76769e"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  //get ref to database services
  const db=getDatabase(app);
  document.getElementById("submit").addEventListener("click", function(e){
    set(ref(db,'user/' + document.getElementById("full_name").value),
    
    {
      full_name:document.getElementById("full_name").value,
      full_email:document.getElementById("full_email").value,
      full_message:document.getElementById("full_message").value

    });
    alert("Message sent !");
  })