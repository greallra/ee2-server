import { sendNotification } from "../utils/notifications.js";
import { esGetCollection } from "../fbqueries/index.js";

export const getUserStats = async (req, res) => {
  try {
    const userId = req.query.id;
    let x = [];
    let attendedCount = 0;
    let missedCount = 0;

    const { data: exchanges } = await esGetCollection("exchanges");
    exchanges.forEach((ex) => {
      const items = ex.attendance?.filter((item) => item.id === userId);
      if (items && items.length > 0) {
        items.forEach((o) => {
          x.push(o);
          o.attended ? attendedCount++ : missedCount++;
        });
      }
    });
    let reliabilityPercentage = Math.round((attendedCount / x.length) * 100);
    return res.send({
      exchangesAttended: x.length,
      attendedCount,
      missedCount,
      reliabilityPercentage,
    });
  } catch (error) {
    console.log("Xx", error);
    return res.send("err!");
  }
  return res.send("nada!");
  //https://dev.to/ibukunfolay/build-a-nodejs-server-using-firebasefirestore-crud-2725
};
