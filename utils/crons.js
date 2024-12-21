import cron from "node-cron";
import { esGetCollection, esGetDoc } from "../fbqueries/index.js";
import { format, isToday, isTomorrow } from "date-fns";
import { sendNotification } from "./notifications.js";
import { getDistance, isPointWithinRadius } from "geolib";

export function fbTimeObjectToDateObject(fbTimeObject) {
  if (!fbTimeObject) {
    return "N/A";
  }
  if (isNaN(fbTimeObject.seconds) || isNaN(fbTimeObject.nanoseconds)) {
    return "N/A";
  }
  return new Date(
    fbTimeObject.seconds * 1000 + fbTimeObject.nanoseconds / 1000000
  );
}
const every2seconds = "*/2 * * * * *";
const every5seconds = "*/5 * * * * *";
const every30seconds = "*/30 * * * * *";
const every1hour = "0 0 */1 * * *";
const every3hours = "0 0 */3 * * *";
cron.schedule(every3hours, async () => {
  try {
    const { data } = await esGetCollection("exchanges");
    const todaysExchanges = data.filter((ex) => {
      return isToday(fbTimeObjectToDateObject(ex.time));
    });

    todaysExchanges.forEach((ex) => {
      let participantIdsPromises = [];
      let message = `Reminder for your exchange today at ${format(
        fbTimeObjectToDateObject(ex.time),
        "p"
      )} at ${ex.location.description}`;
      ex.participantIds.forEach((p) => {
        const prom = esGetDoc("users", p);

        participantIdsPromises.push(prom);
        Promise.all(participantIdsPromises)
          .then((arrData) => {
            const resolvedSnaps = arrData.map(
              (obj) => obj.docSnap.data().expoPushToken
            );
            console.log("resolvedSnaps", resolvedSnaps);
            sendNotification(resolvedSnaps, message);
            return resolvedSnaps;
          })
          .catch((e) => {
            console.log("e", e);
          });
      });
    });
    // sendNotification([]);
    // console.log("todaysExchanges", todaysExchanges);
  } catch (error) {
    console.log("chron err", error);
  }
});

// TO: everyone
// message: amount of exchange today in your area
cron.schedule(every1hour, async () => {
  try {
    const { data: exchanges } = await esGetCollection("exchanges");
    const { data: users } = await esGetCollection("users");
    const exchangesToday = exchanges.filter((exchange) =>
      isTomorrow(fbTimeObjectToDateObject(exchange.time))
    );
    const allUserTokens = users
      .filter((u) => u.expoPushToken)
      .map((u) => u.expoPushToken);
    sendNotification(
      allUserTokens,
      `There ${exchangesToday.length === 1 ? "is" : "are"} ${
        exchangesToday.length
      } exchanges in your area today`
    );
    // console.log(exchangesToday.length, allUserTokens);
  } catch (error) {
    console.log("chron err", error);
  }
});

function handleIsWithinRadius(exchangeLocation) {
  try {
    const { geometry } = exchangeLocation;
    const exchLat = geometry.location.lat;
    const exchLng = geometry.location.lng;
    return isPointWithinRadius(
      { latitude: exchLat, longitude: exchLng },
      { latitude: userLat, longitude: userLng },
      exchangeRange * 1000
    );
  } catch (error) {
    return error.message;
  }
}
