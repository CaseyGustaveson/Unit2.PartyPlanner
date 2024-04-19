const COHORT = "2402-FTB-ET-WEB-PT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
  events: [],
};

const eventList = document.querySelector("#events");

const addEventForm = document.querySelector("#addEvent");
addEventForm.addEventListener("submit", addEvent);

/**
 * Sync state with the API and rerender
 */
async function render() {
  await getArtists();
  renderArtists();
}
render();

/**
 * Update state with events from API
 */
async function getEvents() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    state.events = data.data;
  } catch (error) {
    console.log(error);
  }
}
/**
 * Render artists from state
 */
function renderEvents() {
  for (let i = 0; i < state.events.length; i++) {
    const currentEvents = state.events[i];
    const myDiv = document.createElement("div");
    myDiv.innerHTML = `
        <img src=${currentEvent.name}/>
        <p>${currentEvent.date}</p>
        <p>${currentEvent.time}</p>
        <p>${currentEvent.location}</p>
        <p>${currentEvent.description}</p>
        `;
    eventList.appendChild(myDiv);
  }
}

/**
 * Ask the API to create a new event based on form data
 */
async function addEvent(event) {
  event.preventDefault();

  const nameInput = document.querySelector('input[name="name"]');
  const dateInput = document.querySelector('input[name="date"]');
  const timeInput = document.querySelector('input[name="time"]');
  const locationInput = document.querySelector('input[name="location"]');
  const descriptionInput = document.querySelector('input[name="description"]');

  const name = nameInput.value;
  const date = dateInput.value;
  const time = timeInput.value;
  const location = locationInput.value;
  const description = descriptionInput.value;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        date,
        time,
        location,
        description,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create event");
    }
    render();
  } catch (error) {
    console.error(error);
  }
}
