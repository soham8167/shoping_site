function save()
{
    const fname = document.getElementById("full_name").value;
    const email = document.getElementById("full_email").value;
  var message =document.getElementById("full_message").value;
   var contact_form= document.getElementById("contact_form");
  
 
 localStorage.setItem("contact" + email, JSON.stringify({
    name: fname,
    email: email,
    message: message
  }));
  contact_form.innerHTML="<h1 style='color:black'>Your message sent successfully</h1>";
  //check
  function hideElement() {
    var elements = document.getElementsByClassName("contactForm")[0];
    elements.style.display = "none";
    } 
    setInterval(hideElement, 1000);
  return  false;
  }
