---
title: Logs and Monitoring
---

# Console

Console can be used for logs and monitoring the state of broker with HTTP requests. On getting the request, broker prints the information to the terminal.

see [configuration](../Configuration.md#console) for configuration details

Available endpoints in console:

|Request|Endpoint|Description|
|-------|--------|-----------|
|GET|/|Returns configuration of console|
|GET|/config|Print router configuration|
|GET|/router|Print router meter|
|GET|/device/:device_id|Print events and tracker for requested device|
|GET|/subscriptions|Prints all subscription filters and subscribed clients to the filter|
|GET|/subscriptions/:filter|Print subscription meter for a particular filter|
|GET|/waiters/:filter|Print the clients and datarequest present in waiters|
|GET|/readyqueue|Print the readyqueue|
|POST|/logs|To update log levels and tracing filter|

### Dynamically updating log filters

Log levels and filters can by dynamically updated without restarting broker. 

To update the filter, we can send a POST request to `/logs` endpoint, which is exposed by our console, with new filter as plain-text in body.

For example, to get logs of rumqttd ( running locally and expose console at port 3030 , see Configuration for configuring console ) with log level "debug", we can do:

````shell
curl -d "rumqttd=debug" 0.0.0.0:3030/logs
````

The general syntax for filter is:

````
target[span{field=value}]=level
````

So filter for logs of client with id "pub-001" which has occurred any any span will be `[{client_id=pub-001}]`. Know more about it [here](https://docs.rs/tracing-subscriber/latest/tracing_subscriber/struct.EnvFilter.html#directives)
