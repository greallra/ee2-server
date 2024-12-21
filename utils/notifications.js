import { Expo } from "expo-server-sdk";
import axios from "axios";
import { json } from "express";

export const sendNotification = async (tokens = [], body) => {
  const somePushTokens = ["ExponentPushToken[8u3rhMFCo8fEvmBmszx3jc]"];

  // Create a new Expo SDK client
  // optionally providing an access token if you have enabled push security
  let expo = new Expo({
    accessToken: process.env.EXPO_ACCESS_TOKEN,
    /*
     * @deprecated
     * The optional useFcmV1 parameter defaults to true, as FCMv1 is now the default for the Expo push service.
     *
     * If using FCMv1, the useFcmV1 parameter may be omitted.
     * Set this to false to have Expo send to the legacy endpoint.
     *
     * See https://firebase.google.com/support/faq#deprecated-api-shutdown
     * for important information on the legacy endpoint shutdown.
     *
     * Once the legacy service is fully shut down, the parameter will be removed in a future PR.
     */
    useFcmV1: true,
  });

  // Create the messages that you want to send to clients
  let messages = [];

  for (let pushToken of tokens) {
    // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      throw `Push token ${pushToken} is not a valid Expo push token`;
    }

    // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
    messages.push({
      to: pushToken,
      sound: "default",
      body: body,
      data: { withSome: "data" },
    });
  }
  console.log("posting push tokens: ", messages);
  const url = "https://exp.host/--/api/v2/push/send";
  axios.post(url, messages);
};
