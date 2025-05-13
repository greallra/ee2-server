import events from "./events.json" assert { type: "json" };
import { addDays, addWeeks, getDay, getYear } from "date-fns";
import { isInDublin } from "./utils/index.js";
import { esAddEvent } from "./fbqueries/index.js";
import { FIREBASE_DB } from "./firebaseconfig.js";

let countries = [];
for (let x in events.countries) {
  countries.push(events.countries[x]);
}
let evts = [];
for (let x in events.events) {
  evts.push(events.events[x]);
}
let eventsAll = evts[1];

const eventsDublin = eventsAll.filter((event) =>
  isInDublin(event.geometry.coordinates[1], event.geometry.coordinates[0])
);

function getNextFriday() {
  let day = new Date();
  while (getDay(day) !== 5) {
    day = addDays(day, 1);
  }

  return new Date(day).toDateString();
}
function populateAppEvents(event) {
  const nextFriday = getNextFriday();

  const arrayOfFridays = [];
  let aFriday = nextFriday;
  while (getYear(aFriday) == 2025) {
    arrayOfFridays.push({
      id: Math.floor(Math.random() * 10000) + 1,
      eventId: event.id,
      type: "run",
      title: "Title",
      timestamp: new Date(aFriday),
      participants: [1, 2, 3],
    });
    aFriday = addWeeks(aFriday, 1);
  }
  return arrayOfFridays;
}
let appEvents = [];
for (let index = 0; index < eventsDublin.length; index++) {
  const runEvent = eventsDublin[index];
  const appEvent = populateAppEvents(runEvent);
  appEvents.push(appEvent);
}

// createEvents();
// createAppEvents();

export { countries, eventsAll, eventsDublin };

function createEvents() {
  let proms = [];
  for (let i = 0; i < eventsDublin.length; i++) {
    const event = eventsDublin[i];
    proms.push(
      esAddEvent(FIREBASE_DB, event.id.toString(), "eventsDublin", event)
    );
  }
  try {
    console.log("proms", proms.length);
    Promise.all(proms);
  } catch (error) {
    console.log("error", error);
  }
}

function createAppEvents() {
  let proms = [];

  for (let index = 0; index < appEvents.length; index++) {
    const innerArray = appEvents[index];
    for (let index2 = 0; index2 < innerArray.length; index2++) {
      const appEvent = innerArray[index2];

      proms.push(
        esAddEvent(FIREBASE_DB, appEvent.id.toString(), "appEvents", appEvent)
      );
    }
  }
  try {
    console.log("proms", proms.length);
    Promise.all(proms);
  } catch (error) {
    console.log("error", error);
  }
}
