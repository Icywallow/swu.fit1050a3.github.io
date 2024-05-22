let items = []

// On website load
document.addEventListener('DOMContentLoaded', () => {

    // Get elements of the html doc
    const searchInput = document.getElementById('search-input');
    const dropdown = document.getElementById('dropdown');
    const searchButton = document.getElementById('search-button')

    // From items.json file extract information
    fetch('items.json')
        // Return a promise to javascript object
        .then(response => response.json())
        // Assign the data to a variable called 'items'
        .then(data => {
            items = data;
        })
        // Error handling
        .catch(error => console.error('Something went wrong while fetching: ', error))

    // Search bar logic
    searchInput.addEventListener('input', () => {

        // Assign user's input to query
        const query = searchInput.value.toLowerCase();

        // Dropdown menu, initially empty
        dropdown.innerHTML = '';
        
        // If user input
        if (query) {
            
            // Filter the items, that includes the user query, 
            const filteredItems = items.filter(item => item.name.toLowerCase().includes(query));

            // Set the length of the dropdown to the length of the filtered items, or none if there is no input
            dropdown.style.display = filteredItems.length ? 'block' : 'none';
            
            // Display the elements by iterating through filtered items
            filteredItems.forEach(item => {

                // Create element in dropdown
                const li = document.createElement('li');
                li.innerHTML = `${item.name} <span class="price">${item.price}</span>`;
                
                // Fill in search bar if user clicks the item
                li.addEventListener('click', () => {
                    searchInput.value = item.name;
                    dropdown.style.display = 'none';
                });

                // Append to dropdown
                dropdown.appendChild(li);
            });
            // If user does not input, don't display anything
        } else {
            dropdown.style.display = 'none';
        }
    });

    const redirectToSearch = () => {
        // Remove trailing and end whitespace
        const query = searchInput.value.trim();

        if (query) {
            // Redirect to official Jays Models website page with the query as a URL parameter
            window.location.href = `https://jaysmodels.com.au/?s=${(query)}`;
        }
    };

    // Add the function to the search button
    searchButton.addEventListener('click', redirectToSearch)

    // If user clicks aside the dropdown, close the dropdown
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.search-container')) {
            dropdown.style.display = 'none';
        }
    });
});