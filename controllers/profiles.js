import { esGetCollection } from "../fbqueries/index.js";

export const getProfiles = async (req, res) => {
  try {
    const { data: profiles } = await esGetCollection("profiles");
    return res.send(profiles);
  } catch (error) {
    console.log("Xx", error);
    return res.send("err!");
  }
  return res.send("nada!");
  //https://dev.to/ibukunfolay/build-a-nodejs-server-using-firebasefirestore-crud-2725
};

export const getSomeProfiles = async (req, res) => {
  try {
    const { data: profiles } = await esGetCollection("profiles");

    if (req.body.participantsIds) {
      const profilesFiltered = profiles.filter((profile) =>
        req.body.participantsIds.includes(profile.id)
      );
      return res.send(profilesFiltered);
    }
    return res.send([]);
  } catch (error) {
    console.log("Xx", error);
    return res.send("err!");
  }
  return res.send("nada!");
  //https://dev.to/ibukunfolay/build-a-nodejs-server-using-firebasefirestore-crud-2725
};
