// Set the date we're counting down to
var countDownDate = new Date("Nov 23, 2024 12:30:00").getTime();

// Update the countdown every 1 second
var countdownFunction = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="countdown-timer"
  document.getElementById("countdown-timer").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the countdown is finished, display some text
  if (distance < 0) {
    clearInterval(countdownFunction);
    document.getElementById("countdown-timer").innerHTML = "EXPIRED";
  }
}, 1000);

// Typing effect function
function typeMessage(element, text, speed) {
  let i = 0;
  function typeWriter() {
      if (i < text.length) {
          element.innerHTML += text.charAt(i);
          i++;
          setTimeout(typeWriter, speed);
      }
  }
  typeWriter();
}

// Wait for the DOM to load before running the typing effect
document.addEventListener("DOMContentLoaded", function() {
  const messageElement = document.querySelector('.message');
  const messageText = "Najväčším darom pre mňa bude váš čas a prítomnosť. Ďalšie dary nie sú potrebné – váš čas je to najcennejšie, čo mi môžete venovať.";
  const typingSpeed = 50; // Adjust typing speed (milliseconds per character)

  typeMessage(messageElement, messageText, typingSpeed);
});