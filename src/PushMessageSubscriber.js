import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Message, Button, Icon } from "semantic-ui-react";
import gql from "graphql-tag";

const SUBSCRIBE = gql`
  mutation($endpoint: String!, $p256dh: String!, $auth: String!) {
    subscribe(endpoint: $endpoint, p256dh: $p256dh, auth: $auth)
  }
`;

async function subscribe() {
  try {
    const permission = await Notification.requestPermission();
    let sw = await navigator.serviceWorker.ready;

    const subscription = await sw.pushManager.getSubscription();

    if (permission === "granted" && subscription != null) return false;

    var options = {
      userVisibleOnly: true,
      applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC_KEY,
    };

    let push = await sw.pushManager.subscribe(options);
    return push;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function subscribed(setSubStatus) {
  const sw = await navigator.serviceWorker.ready;
  const subscription = await sw.pushManager.getSubscription();

  setSubStatus(
    Notification.permission === "granted" && subscription !== null
      ? true
      : false
  );
}

const PushMessageSubscriber = () => {
  const [subStatus, setSubStatus] = useState(true);
  const [addSubscription] = useMutation(SUBSCRIBE);

  subscribed(setSubStatus);

  return subStatus ? (
    <div></div>
  ) : (
    <Message info icon>
      <Icon name="inbox" />
      <Message.Content>
        <Message.Header>Notifications</Message.Header>
        Subscribe and provide permission for push notifications
        <Button
          floated="right"
          icon
          primary
          labelPosition="left"
          onClick={() => {
            subscribe()
              .then((subscription) => {
                if (subscription) {
                  const sub = JSON.parse(JSON.stringify(subscription));

                  addSubscription({
                    variables: {
                      endpoint: sub.endpoint,
                      p256dh: sub.keys.p256dh,
                      auth: sub.keys.auth,
                    },
                  });
                }
              })
              .catch((e) => console.log(e));
          }}
        >
          <Icon name="mail outline" />
          Subscribe
        </Button>
      </Message.Content>
    </Message>
  );
};

export default PushMessageSubscriber;
