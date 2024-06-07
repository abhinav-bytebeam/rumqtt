---
title: Configuration
sidebar_position: 3
---

rumqttd can be configured with a configuration `TOML` file, `rumqttd.toml` by default.

It must have `[router]` and a server configuration, others are optional and can be specified as per requirement.

## router configuration

Following fields must be specified in config file under `[router]`:

|Name|Description|Possible values|
|----|-----------|---------------|
|max_connections|Number of connections allowed at once|usize|
|max_outgoing_packet_count|Max number of packets router can send to a subscription at a time|u64|
|max_segment_size|Segments are used to store the published messages. This controls maximum size a segment can have ( in bytes )|usize|
|max_segment_count|Maximum number of segments in memory apart from active ones.|usize|

additionally, this optional field can also be specified:

|Name|Description|Possible values|
|----|-----------|---------------|
|shared_subscriptions_strategy|strategy to be used by shared subscription|"sticky", "roundrobin", "random"|
|initialized_filters|Initialize this filters by creating DataLog for them. Generally, Datalog is created when a subscription is made, without datalog, published message to that filter are dropped.|List of filters to be initialized|
|custom_segment|Configuring some particular filter's segments. Any filters that match to configured filter will have custom segment size|Map for different filters *refer below for more*|

for configuring `custom_segments` per filter, table syntax of `TOML` can be used, i.e. specify values under `[router.custom_segment.'_INSERT_FILTER_HERE_'` .

for example:

````toml
[router]
max_connections = 10010
max_outgoing_packet_count = 200
max_segment_size = 104857600
max_segment_count = 10

# Optional fields
shared_subscriptions_strategy = "random"
initialized_filters = ["create/datalog", "for/+/plz"]

[router.custom_segment.'/office/+/devices/status']
max_segment_size = 102400
max_segment_count = 2
[router.custom_segment.'/home/+/devices/status']
max_segment_size = 51200
max_segment_count = 2
````

## server configuration

Server can either be MQTTv3.11 ( `[v4.x]` ) or MQTTv5 ( `[v5.x]` ). We can spawn multiple servers listening of different ports like `[v4.1]` , `[v4.2]` , `[v5.1]` , etc.

configuration fields:

`[v4.x]`

|Name|Description|Possible value|
|----|-----------|--------------|
|name|Name for the server|string|
|listen|Address of the server which will be used for connection|string|
|next_connection_delay_ms|Delay in millis between two consecutive connections|u64|
|connections|Configuration for connections|(see `[v4.x.connections]`)|
|tls (optional)|TLS certificates to be used|Path to certificates ( see example )|

`[v4.x.connections]`

|Name|Description|Possible Values|
|----|-----------|---------------|
|connection_timeout_ms|Connection timeout in milliseconds|u16|
|max_payload_size|Maximum payload size allowed in MQTT packet|usize|
|max_inflight_count|Maximum unacked packets ( inflight packets ) broker can have at a time|usize|
|dynamic_filter|Dynamically create datalog for filters if it doesn't exists. Otherwise messages publish to that topic are dropped. Datalogs are created when there is a subscription to that filter|bool|
|auth|Authentication data to be used when a client connects|Map of username ( client ids ) and password|

for example: 

````toml
# Configuration of server and connections that it accepts
[v4.1]
name = "v4-1"
listen = "0.0.0.0:1883"
next_connection_delay_ms = 1
    [v4.1.connections]
    connection_timeout_ms = 60000
    max_payload_size = 20480
    max_inflight_count = 100
    dynamic_filters = true
 #   auth = { user1 = "p@ssw0rd", user2 = "password" }
 #      [v4.1.connections.auth]
 #      user1 = "p@ssw0rd"
 #      user2 = "password"

# [v4.2]
# name = "v4-2"
# listen = "0.0.0.0:8883"
# next_connection_delay_ms = 10
#     # tls config for rustls
#     [v4.2.tls]
#     capath = "/etc/tls/ca.cert.pem"
#     certpath = "/etc/tls/server.cert.pem"
#     keypath = "/etc/tls/server.key.pem"
#     # settings for all the connections on this server
#     [v4.2.connections]
#     connection_timeout_ms = 60000
#     throttle_delay_ms = 0
#     max_payload_size = 20480
#     max_inflight_count = 100
#     max_inflight_size = 1024
````

similarly, if we want to configure server with MQTTv5: 

````toml
[v5.1]
name = "v5-1"
listen = "0.0.0.0:1884"
next_connection_delay_ms = 1
    [v5.1.connections]
    connection_timeout_ms = 60000
    max_payload_size = 20480
    max_inflight_count = 100
````

## websockets

Websockets can be configured the same as TCP server like `[ws.x]` . 
By default, websockets will use MQTTv3.11 ( v4 ), we can't change it as of now, but it will soon be configurable. 

````toml
[ws.1]
name = "ws-1"
listen = "0.0.0.0:8083"
next_connection_delay_ms = 1
    [ws.1.connections]
    connection_timeout_ms = 60000
    max_client_id_len = 256
    throttle_delay_ms = 0
    max_payload_size = 20480
    max_inflight_count = 500
    max_inflight_size = 1024

# [ws.2]
# name = "ws-2"
# listen = "0.0.0.0:8081"
# next_connection_delay_ms = 1
#     [ws.2.tls]
#     capath = "/etc/tls/ca.cert.pem"
#     certpath = "/etc/tls/server.cert.pem"
#     keypath = "/etc/tls/server.key.pem"
#     [ws.2.connections]
#     connection_timeout_ms = 60000
#     max_client_id_len = 256
#     throttle_delay_ms = 0
#     max_payload_size = 20480
#     max_inflight_count = 500
#     max_inflight_size = 1024

````

## Configure prometheus

For prometheus, we need to configure address it listens on and the interval ( in seconds ) by which it sends metrics to it. 

````toml
[prometheus]
listen = "127.0.0.1:9042"
interval = 1
````

## Console

Console is used for debugging purposes, we need to specify address on which it listens for requests. see [console](Guides/Logs%20and%20monitoring.md#console) 

````toml
[console]
listen = "0.0.0.0:3030"

````

## Metrics

Control how frequently ( in seconds ) we push alerts / meters . See [Collecting Metrics](Guides/Collecting%20Metrics.md) to know more about these metrics.

````toml
[metrics]
    [metrics.alerts]
    push_interval = 1
    [metrics.meters]
    push_interval = 1
````

## Bridge

configuration for setting up rumqttd in bridge setup.

````toml
[bridge]
name = "bridge-1"
addr = "localhost:1883"
qos = 0
sub_path = "#"
reconnection_delay = 5
ping_delay = 5
timeout_delay = 5
    [bridge.connections]
    connection_timeout_ms = 60000
    max_payload_size = 20480
    max_inflight_count = 500
    dynamic_filters = true
    [bridge.transport.tls]
    ca = "ca.cert.pem"
    client_auth = { certs = "test-1.cert.pem", key = "test-1.key.pem" }
````
