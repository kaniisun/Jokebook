// get random joke from a category
async function fetchRandomJoke() {
    try {
      const response = await fetch('/jokebook/joke/funnyJoke?limit=1');
      const jokes = await response.json();
      if (jokes.length > 0) {
        document.getElementById('random-joke').innerText = `${jokes[0].setup} - ${jokes[0].delivery}`;
      } else {
        document.getElementById('random-joke').innerText = "No jokes found in this category.";
      }
    } catch (error) {
      console.error("Error fetching random joke:", error);
    }
  }
  
  // display joke categories
async function fetchCategories() {
    try {
      const response = await fetch('/jokebook/categories');
      const categories = await response.json();
      const categoriesList = document.getElementById('categories-list');
      categoriesList.innerHTML = '';
      categories.forEach(category => {
        const listItem = document.createElement('li');
        listItem.innerText = category;
        listItem.onclick = () => fetchJokesByCategory(category);
        categoriesList.appendChild(listItem);
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }
  
  // get jokes by category
  async function fetchJokesByCategory(category) {
    try {
      const response = await fetch(`/jokebook/joke/${category}`);
      const jokes = await response.json();
      let jokesList = jokes.map(joke => `<li>${joke.setup} - ${joke.delivery}</li>`).join('');
      if (!jokesList) jokesList = `<li>No jokes found in this category.</li>`;
      document.getElementById('categories-list').innerHTML = `<h3>Jokes in ${category}:</h3><ul>${jokesList}</ul>`;
    } catch (error) {
      console.error("Error fetching jokes by category:", error);
    }
  }
  
  // add new joke
  async function submitNewJoke(event) {
    event.preventDefault();
    
    const category = document.getElementById('category').value;
    const setup = document.getElementById('setup').value;
    const delivery = document.getElementById('delivery').value;
  
    try {
      const response = await fetch('/jokebook/joke/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, setup, delivery })
      });
      const updatedJokes = await response.json();
      alert("Joke added successfully!");
      fetchJokesByCategory(category); 
    } catch (error) {
      console.error("Error adding new joke:", error);
    }
  }