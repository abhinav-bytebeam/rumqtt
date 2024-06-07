---
title: Collecting Metrics
---

Rumqttd provides metrics and diagnostics data about the broker through special links. Let's look at two such links - `AlertsLink` or `MetersLink`. When using rumqttd as a library, the user can configure these links to receive different type of metrics data. 

AlertsLink provide data about events and alerts raised in rumqttd. MetersLink provide quantitative metering data like MQTT client's data consumption, total publishes in rumqttd, etc. 

## `AlertsLink`

AlertsLink provides alerts data of two types: Events and Errors. User may choose to subscribe to any one of them or both. To receive alerts of any kind the user has to subscribe to an alerts filter. An alerts filter is of type `/alerts/<alert_type>/<alert_sub_type>/<connection_id>`. This filter works just like an MQTT filter.

Following sub-alert-types exist withing the two alert types:

* Events:
  * connect
  * disconnect
  * subscribe
  * unsubscribe
* Alerts:
  * Ø

### Examples

#### Topics

* `/alerts/event/+/client_id_1`            (all alert types for client client_id_1)
* `/alerts/event/connect/client_id_1`      (alert type connect for client client_id_1)
* `/alerts/error/#`                          (alert type error)
* `/alerts/#`                              (all alerts)
* `/alerts/event/#`                        (alert type event)

#### Code

````rust
let broker = Broker::new(config);

// create an alert link by registering to alert filters
let mut alerts = broker
    .alerts(vec![
        "/alerts/error/+".to_string(),
        "/alerts/event/connect/+".to_string(),
        "/alerts/event/subscribe/+".to_string(),
    ])
    .unwrap();

// receive alerts from broker
let handle = thread::spawn(move || loop {
    let alert = alerts.poll();
    println!("Alert: {:?}", alert);
    thread::sleep(Duration::from_secs(1));
});
````

## `MetersLink`

MetersLink provides meter data about router, connection, or a subscription topic. User can obtain data for them by creating a `GetMeter` request and passing it to the MetersLink.

Meter request can be of the following types:

* Router
* Connection
  * All connections
  * One connection
* Subscription
  * All subscriptions
  * One subscription

### Example

````rust
let broker = Broker::new(config);

// create a meters link
let meters = broker.meters().unwrap();

let handle = thread::spawn(move || loop {        
    // create meter requests
    let requests = vec![
        GetMeter::Router,   
        // meter request for 'client-id' client
        GetMeter::Connection(Some("client-id".to_owned())),
        // meter request for all clients
        GetMeter::Connection(None),
        // meter request for 'hello/+/world' subscriptions
        GetMeter::Subscription(Some("hello/+/world".to_owned())),
        // meter request for all subscriptions
        GetMeter::Subscription(None),
    ];

    // receive meters data from broker
    for r in requests {
        let v = meters.get(r).unwrap();
        println!("{:#?}", v);
    }
    
    thread::sleep(Duration::from_secs(5));
}
````
