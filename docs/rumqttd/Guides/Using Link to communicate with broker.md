---
title: Using Link to communicate with Broker
---

Link, specifically `LocalLink` can be used to perform publish and subscribe actions.
To get `LinkTx` ( used for sending MQTT packets like publish / subscribe to router ) and `LinkRx` ( used for receiving `Notifications` from router ) `link("__")` method can be used:

````rust
let (mut link_tx, mut link_rx) = broker.link("link_name")?;
````

Then, `link_tx` can be used to send packets:

````rust
link_tx.subscribe("topic_name")?;
link_tx.publish("topic_name", "payload")?;
// try_xx acts like try_send in channels, it won't block / wait
// until there is space for sending this events to router
// If there is no space, it will return an error.
// ```
// link_tx.try_subscribe("topic_name")?;
// link_tx.try_publish("topic_name", "payload")?;
// ```

// if you are using it in async fn, you can also use send()
// for sending raw packets ( you might never need to use it! )
// e.g.
// ```
// use rumqttd::protocol::{Packet, Unsubscribe};
//
// let unsub_packet = Unsubscribe {
//   pkid: 0, 
//   filters: vec!["topic".into()],
// }; 
// // ^ this is just example, plz fill with appropriate values!
// 
// let data = Packet::Unsubscribe(unsub_packet, None);
// link_tx.send(data).await?;
// ```
````

On other hand, `link_rx` is used for receiving the [`Notification`](https://docs.rs/rumqttd/latest/rumqttd/enum.Notification.html) from router:

````rust
let notification = link_rx.recv()?;
// you can also specify Instance as deadline using recv_deadline(_)
// ```
// let duration = Duration::from_secs(5);
// let deadline = Instant::now().checked_add(duration).unwrap();
// let notification = link_rx.recv_deadline(deadline).unwrap();
// ```
````

 > 
 > NOTE: You can think of link as creating local client! 

Simple example of using link to subscribe for all messages ( i.e. `#` ) and receiving notifications:

````rust
use rumqttd::{Broker, Config, Notification};

use std::thread;

fn main() {
    let builder = tracing_subscriber::fmt()
        .pretty()
        .with_line_number(false)
        .with_file(false)
        .with_thread_ids(false)
        .with_thread_names(false);

    builder
        .try_init()
        .expect("initialized subscriber succesfully");

    let config = config::Config::builder()
        .add_source(config::File::with_name("rumqttd.toml"))
        .build()
        .unwrap();

    let config: Config = config.try_deserialize().unwrap();

    let mut broker = Broker::new(config);
    let (mut link_tx, mut link_rx) = broker.link("singlenode").unwrap();
    thread::spawn(move || {
        broker.start().unwrap();
    });

    link_tx.subscribe("#").unwrap();

    let mut count = 0;
    loop {
        let notification = match link_rx.recv().unwrap() {
            Some(v) => v,
            None => continue,
        };

        match notification {
            Notification::Forward(forward) => {
                count += 1;
                println!(
                    "Topic = {:?}, Count = {}, Payload = {} bytes",
                    forward.publish.topic,
                    count,
                    forward.publish.payload.len()
                );
            }
            v => {
                println!("{v:?}");
            }
        }
    }
}
````
