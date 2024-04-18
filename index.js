const COHORT = "2109-CPU-RM-WEB-PT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/artists`;

const state = {
  artists: [],
};

const artistList = document.querySelector("#artists");

const addArtistForm = document.querySelector("#addArtist");
addArtistForm.addEventListener("submit", addArtist);

/**
 * Sync state with the API and rerender
 */
async function render() {
  await getArtists();
  renderArtists();
}
render();

/**
 * Update state with artists from API
 */
async function getArtists() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    state.artists = data.data;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Render artists from state
 */
function renderArtists() {
  for (let i = 0; i < state.artists.length; i++) {
    const currentArtist = state.artists[i];
    const myDiv = document.createElement("div");
    myDiv.innerHTML = `
        <img src=${currentArtist.imageUrl}/>
        <p>${currentArtist.name}</p>
        <p>${currentArtist.description}</p>
        `;
    artistList.appendChild(myDiv);
  }
}

/**
 * Ask the API to create a new artist based on form data
 * @param {Event} event
 */
async function addArtist(event) {
  event.preventDefault();

  const nameInput = document.querySelector('input[name="name"]')
  const descriptionInput = document.querySelector('input[name="description"]')
  const imageUrlInput = document.querySelector('input[name="imageUrl"]')
  
  const name = nameInput.value
  const description = descriptionInput.value;
  const imageUrl = imageUrlInput.value

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        imageUrl,
        description
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create artist");
    }

    render();
  } catch (error) {
    console.error(error);
  }
}