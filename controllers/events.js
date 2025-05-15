import { sendNotification } from "../utils/notifications.js";
import { countries, eventsAll, eventsDublin } from "../data.js";
import { isInDublin } from "../utils/index.js";
import { esGetCollection, esGetDoc } from "../fbqueries/index.js";

export const getEventsCountries = async (req, res) => {
  try {
    return res.send(countries);
  } catch (error) {
    console.log("Xx", error);
    return res.send("err!");
  }
  return res.send("nada!");
  //https://dev.to/ibukunfolay/build-a-nodejs-server-using-firebasefirestore-crud-2725
};

export const getEvents = async (req, res) => {
  try {
    if (req.query && req.query.city) {
      let { data: eventsDublin } = await esGetCollection("eventsDublin");
      return res.send(eventsDublin);
    }

    return res.send(eventsAll);
  } catch (error) {
    console.log("Xx", error);
    return res.send("err!");
  }
  return res.send("nada!");
  //https://dev.to/ibukunfolay/build-a-nodejs-server-using-firebasefirestore-crud-2725
};

export const getAppEvents = async (req, res) => {
  try {
    let { data: appEvents } = await esGetCollection("appEvents");
    return res.send(appEvents);
  } catch (error) {
    console.log("Xx", error);
    return res.send("err!");
  }
  return res.send("nada!");
  //https://dev.to/ibukunfolay/build-a-nodejs-server-using-firebasefirestore-crud-2725
};

export const getAppEvent = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.send("err no req.param.id");
    }

    let { docSnap } = await esGetDoc("appEvents", req.params.id);
    const { data: profiles } = await esGetCollection("profiles");
    const data = docSnap.data();
    if (data.participants) {
      const profilesInAppEvent = profiles.filter((profile) => {
        return data.participants.includes(profile.id);
      });
      data.participants = profilesInAppEvent;
    }
    return res.send(data);
  } catch (error) {
    console.log("Xx", error);
    return res.status(400).send(error);
  }
  return res.send("nada!");
  //https://dev.to/ibukunfolay/build-a-nodejs-server-using-firebasefirestore-crud-2725
};

export const getEventAppsEmbedded = async (req, res) => {
  try {
    let { data: appEvents } = await esGetCollection("appEvents");
    const { data: eventsDublin } = await esGetCollection("eventsDublin");

    const eventsEmbedAppEvents = eventsDublin.map((event, index) => {
      let ae = appEvents
        .filter((appEvent) => {
          // console.log(
          //   "appEvent",
          //   appEvent.eventId,
          //   event.id,
          //   appEvent.eventId == event.id
          // );

          return appEvent.eventId == event.id;
        })
        .sort((a, b) => a.timestamp.seconds - b.timestamp.seconds);

      return {
        ...event,
        appEvents: ae ? ae : [],
      };
    });
    return res.send(eventsEmbedAppEvents);
  } catch (error) {
    console.log("Xx", error);
    return res.send("err!");
  }
  return res.send("nada!");
  //https://dev.to/ibukunfolay/build-a-nodejs-server-using-firebasefirestore-crud-2725
};
