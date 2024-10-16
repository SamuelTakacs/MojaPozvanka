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


document.getElementById('rsvp-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form submission from refreshing the page

    // Get form data
    const names = [];
    const meals = [];

    // Debugging step: Check if dynamic elements are being selected properly
    console.log(document.querySelectorAll('.name').length, 'name fields found');
    console.log(document.querySelectorAll('.meal').length, 'meal fields found');

    // Collect all names and meals
    document.querySelectorAll('.name').forEach(function(input) {
        names.push(input.value);
    });

    document.querySelectorAll('.meal').forEach(function(select) {
        meals.push(select.value);
    });

    // Debugging step: Log the collected names and meals
    console.log('Names:', names);
    console.log('Meals:', meals);

    // Prepare concatenated strings
    const namesString = names.join(', ');
    const mealsString = meals.join(', ');

    // Debugging step: Check the concatenated strings
    console.log('Names String:', namesString);
    console.log('Meals String:', mealsString);

    // Define the data to be sent
    const data = {
        service_id: 'service_8mkhomj',
        template_id: 'template_le6cimw',
        user_id: '_dtFlnqczx-gN6g8l',  // This is your API key/public key from EmailJS
        template_params: {
            'names': namesString,
            'meals': mealsString
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