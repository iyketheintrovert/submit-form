// Validate Form
const validateForm = () => {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let phoneNumber = document.getElementById("phoneNumber").value;
    let gender = document.getElementById("gender").value;
    var errorMessages = "";
    
    if (!firstName || !lastName) {
      errorMessages += "First Name and Last Name are required.";
    }
    if (firstName.length < 1 || lastName.length < 1) {
      errorMessages += "Name cannot be less than 1 character.";
    }
    if (!/^[a-zA-Z]+$/.test(firstName) || !/^[a-zA-Z]+$/.test(lastName)) {
      errorMessages += "Name cannot contain numbers.";
    }
    if (!email.includes("@") || !email.includes(".")) {
      errorMessages += "Email address must be valid.";
    }
    if (phoneNumber.length !== 11) {
      errorMessages += "Phone number must be 11 digits.";
    }
    if (!gender) {
      errorMessages += "Gender is required.";
    }
    
    if (errorMessages) {
      document.getElementById("errorMessages").innerHTML = "<div class='error'>" + errorMessages + "</div>";
      return false;
    } else {
      document.getElementById("errorMessages").innerHTML = "";
      return true;
    }
}

// Submit Form
document.getElementById("registrationForm").addEventListener("submit", function(event) {
  event.preventDefault();
  if (validateForm()) {
      const formData = new FormData(this);
      const formObject = {};
      formData.forEach((value, key) => {
          formObject[key] = value;
      });
      const jsonData = JSON.stringify(formObject);
  
    // Send JSON data to server or save it to file
    fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  }
});