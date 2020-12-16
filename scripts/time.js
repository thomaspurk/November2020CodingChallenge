// IANA Time Zones https://www.iana.org/time-zones
// https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
window.clocks = [
  // "America/New_York",
  "Europe/London"
  // "Europe/Moscow",
  // "Pacific/Tahiti",
  // "Pacific/Fiji",
  // "America/Phoenix"
];

let displayTime = function (args) {
  // Get the existing Document Object Model (DOM) element to add clocks to.
  // Clear the DOM element
  // Get the current Date and Time
  let divTime = document.getElementById("time");
  divTime.innerHTML = "";
  let curTime = new Date(Date.now());

  // Loop each clock Time Zone and create the DOM elements that make up the clock
  for (let i = 0; i < window.clocks.length; i++) {
    // Convert curren time based o the IANA Time Zone Code
    let thisTime = "No IANA Time Zone Code";
    try {
      thisTime = curTime.toLocaleString("en-US", {
        timeZone: window.clocks[i]
      });
    } catch (e) {
      thisTime = e.message;
    }
    let divClock = document.createElement("div");
    let spanZone = document.createElement("span");
    let spanDate = document.createElement("span");
    let spanDigits = document.createElement("span");

    // Control styles with a styles by class names
    divClock.classList.add("clock");
    spanDigits.classList.add("digits");

    // Set the content
    spanZone.innerHTML = window.clocks[i];
    spanDigits.innerHTML = thisTime.split(",")[1];
    spanDate.innerHTML = thisTime.split(",")[0];

    // Append the new DOM elements to the HTML page
    divClock.append(...[spanZone, spanDate, spanDigits]);
    divTime.appendChild(divClock);
  }

  // Use the page rendering refresh event to
  // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
  window.requestAnimationFrame(displayTime);
};

window.requestAnimationFrame(displayTime);
