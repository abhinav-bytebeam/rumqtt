---
title: Embedding rumqttd in your application
---

`rumqttd` can be embedded into your rust project, i.e. it can be used as a library.
To do so, add `rumqttd` as a dependency in your `Cargo.toml` . 

````sh
$ cargo add rumqttd
````

now we are good to go.

### Setup configuration

The configuration struct is defined in `rumqttd` . We need `Config` for initiating `Broker` . Easiest way, which is also used in `rumqttd/src/main.rs` is to use [`config`](https://crates.io/crates/config)  crate.
`rumqttd` uses `TOML` file for configuration.

 > 
 > `rumqttd::Config` derives `serde::Deserialize` , therefore we can specify config in any file format which can be deserialized using serde.

here is minimal example of using `config` crate to create `Config`:

````rust
use rumqttd::Config;

// see docs of config crate to know more
let config = config::Config::builder()
    .add_source(config::File::with_name("rumqttd.toml"))
    .build()
    .unwrap();

// this is where we deserialize it into Config
let rumqttd_config: Config = config.try_deserialize().unwrap();
````

### Spawning Broker

Once we have the config, we can pass it to `rumqttd::Broker` . To start the broker and servers as per specified in config, we use the `start()` method:

````rust
use rumqttd::Broker;
// ..
let mut broker = Broker::new(rumqttd_config);
// you can use better error handling instead on unwrap(). :)
broker.start().unwrap();
// broker.start() is a blocking method, therefore
// we don't get here untill every server spawned as per config crashes.
// If you want to do more things while broker is running, you should
// call start() in separate thread. e.g.
// ```
// thread::spawn(move || {
//   broker.start().unwrap();
// });
// ```
````

### Collect logs

`rumqttd` uses [tracing](https://crates.io/crates/tracing) for collecting event-based diagnostic information, to get those logs, you would need to use a collector implementation compatible with tracing, such as [tracing-subscriber](https://crates.io/crates/tracing-subscriber) :

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

    // ....
    let mut broker = Broker::new(config);
    // ....
}
````

see other guides like [Using Link to communicate with broker](Using%20Link%20to%20communicate%20with%20broker.md) and [Collecting Metrics](Collecting%20Metrics.md) to know what you can do with `Broker`.
