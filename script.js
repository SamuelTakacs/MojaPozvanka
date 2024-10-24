document.getElementById('add-member').addEventListener('click', addMemberRow);

// Function to add a new member row
function addMemberRow() {
    const memberRow = document.createElement('div');
    memberRow.classList.add('member-row');

    memberRow.innerHTML = `
        <label for="name">Meno:</label>
        <input type="text" class="name" name="name" required>

        <label for="meal">Strava:</label>
        <select class="meal" name="meal" required>
            <option value="normal">Bez obmedzení</option>
            <option value="bezlepkove">Bezlepkové</option>
            <option value="bezlaktozove">Bezlaktózové</option>
            <option value="vegetarian">Vegetariánske</option>
            <option value="vegan">Vegánske</option>
            <option value="special">Špeciálne</option>
        </select>
        <label for="drink">Pitie:</label>
        <select class="drink" name="drink" required>
            <option value="" disabled selected>Vyber z možností...</option>
            <option value="Vino-biele">Víno biele</option>
            <option value="Vino-cervene">Víno červené</option>
            <option value="ine">Iné</option>
        </select>

        <!-- Hidden input for custom drink -->
        <input type="text" class="custom-drink" name="custom_drink" placeholder="Napíšte iné pitie" style="display:none;">

        <button type="button" class="remove-row">X</button>
    `;

    document.getElementById('family-members').appendChild(memberRow);

    // Display the bin (delete button) only for n+1 rows
    const removeButtons = document.querySelectorAll('.remove-row');
    removeButtons.forEach(function(button) {
        button.style.display = 'block';
    });

    // Add event listener to remove the row
    memberRow.querySelector('.remove-row').addEventListener('click', function() {
        memberRow.remove();
    });
}

// Button to go back to the invite page from the popup
document.getElementById('back-to-invite').addEventListener('click', function() {
    window.location.href = 'index.html';  // Redirect to the invite page
});

// Button inside form to go back to the invite page
document.getElementById('go-back-to-invite').addEventListener('click', function() {
    window.location.href = 'index.html';
});

document.getElementById('decline').addEventListener('click', function() {
    window.location.href = 'decline_form.html';
});

// Handle form submission and show the custom popup with confetti
document.getElementById('rsvp-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent default form submission

    // Simulate form processing (replace with actual form logic)
    setTimeout(function() {
        showSuccessPopup();  // Show popup on successful form submission
        triggerConfetti();   // Trigger confetti effect
    }, 1000);
});

// Function to show success popup and trigger confetti
function showSuccessPopup() {
    // Show the popup
    document.getElementById('popup').classList.remove('hidden');
}

// Function to trigger confetti using Confetti.js
function triggerConfetti() {
    var duration = 5 * 1000;  // 5 seconds
    var end = Date.now() + duration;

    (function frame() {
        // Fire random bursts of confetti
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// Function to handle drink selection and show/hide custom drink input
document.addEventListener('change', function(event) {
    if (event.target.classList.contains('drink')) {
        const customDrinkInput = event.target.closest('.member-row').querySelector('.custom-drink');
        
        // Show the custom drink input if 'Iné' is selected
        if (event.target.value === 'ine') {
            customDrinkInput.style.display = 'inline';  // Show the input
            customDrinkInput.required = true;           // Make it required
        } else {
            customDrinkInput.style.display = 'none';    // Hide the input
            customDrinkInput.required = false;          // Remove required attribute
            customDrinkInput.value = '';                // Clear the input value
        }
    }
});


// Handle form submission
document.getElementById('rsvp-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form submission from refreshing the page

    // Get form data
    const names = [];
    const meals = [];
    const drinks = [];

    // Collect all names and meals
    document.querySelectorAll('.name').forEach(function(input) {
        names.push(input.value);
    });

    document.querySelectorAll('.meal').forEach(function(select) {
        meals.push(select.value);
    });

    document.querySelectorAll('.drink').forEach(function(select) {
        const memberRow = select.closest('.member-row');
        const customDrinkInput = memberRow.querySelector('.custom-drink');
        
        // If 'Iné' is selected, get the custom drink value
        if (select.value === 'ine' && customDrinkInput.value.trim() !== '') {
            drinks.push(customDrinkInput.value.trim());  // Push custom drink
        } else {
            drinks.push(select.value);  // Push selected value
        }
    });

    // Prepare concatenated strings
    const namesString = names.join(', ');
    const mealsString = meals.join(', ');
    const drinksString = drinks.join(', ');

    // Define the data to be sent
    const data = {
        service_id: 'service_8mkhomj',
        template_id: 'template_le6cimw',
        user_id: '_dtFlnqczx-gN6g8l',  // This is your API key/public key from EmailJS
        template_params: {
            'names': namesString,
            'meals': mealsString,
            'drinks': drinksString
        }
    };

    // Send the email using the EmailJS API
    fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(function(response) {
        if (response.ok) {
            alert('Odpoveď úspešne poslaná!');
        } else {
            return response.json().then(function(error) {
                alert('Oops...niekde sa stala chyba, svoju odpoveď pokojne pošli oslávencovi cez SMS.' + JSON.stringify(error));
            });
        }
    })
    .catch(function(error) {
        alert('Oops...niekde sa stala chyba, svoju odpoveď pokojne pošli oslávencovi cez SMS.' + JSON.stringify(error));
    });
});