import { sendNotification } from "../utils/notifications.js";
import { esGetCollection } from "../fbqueries/index.js";

export const getUsers = async (req, res) => {
  try {
    const { data: users } = await esGetCollection("users");
    console.log("users", users);
    return res.send(users);
  } catch (error) {
    console.log("Xx", error);
    return res.send("err!");
  }
  return res.send("nada!");
  //https://dev.to/ibukunfolay/build-a-nodejs-server-using-firebasefirestore-crud-2725
};

export const postNotication = async (req, res) => {
  try {
    const data = await req.body;
    console.log("data", data);

    await sendNotification(data, data.body);
    return res.send(data);
  } catch (error) {
    console.log("Xx", error);
    return res.send(error);
  }
  return res.send("nada!");
  //https://dev.to/ibukunfolay/build-a-nodejs-server-using-firebasefirestore-crud-2725
};
