---
title: FAQs
sidebar_position: 4
---

# Frequently Asked Questions

### How to use with TLS

To connect an MQTT client to rumqttd over TLS, create relevant certificates for the broker and client using [provision](https://github.com/bytebeamio/provision) as follows:

````bash
provision ca // generates ca.cert.pem and ca.key.pem
provision server --ca ca.cert.pem --cakey ca.key.pem --domain localhost // generates localhost.cert.pem and localhost.key.pem
provision client --ca ca.cert.pem --cakey ca.key.pem --device 1 --tenant a // generates 1.cert.pem and 1.key.pem
````

Update config files for rumqttd and rumqttc with the generated certificates:

````toml
[v4.2.tls]
    certpath = "path/to/localhost.cert.pem"
    keypath = "path/to/localhost.key.pem"
    capath = "path/to/ca.cert.pem"
````

You may also use [certgen](https://github.com/minio/certgen), [tls-gen](https://github.com/rabbitmq/tls-gen) or [openssl](https://www.baeldung.com/openssl-self-signed-cert) to generate self-signed certificates, though we recommend using provision.

**NOTE:** Mount the folders containing the generated tls certificates and the proper config file(with absolute paths to the certificate) to enable tls connections with rumqttd running inside docker.

### How to fix "Payload size has been exceeded by x bytes" error?

This means client sent a packet which exceeds  maximum payload size accepted by broker. You can either send smaller packet from client or increase the maximum payload size, which is configured by `max_payload_size` option `rumqttd.toml`, see [here](Configuration.md#server-configuration) .

### How to fix "Remote link error error=Network(Protocol(BoundaryCrossed(x)))"

This can occur if you don't configure TLS server certs in rumqttd but still try to connect with tls. To fix it, we must specify tls config in `rumqttd.toml` . e.g. [here](Configuration.md#server-configuration)

It's caused when packet length in header is greater than actual length of packet. For eg. You specified length of the packet to be 10 bytes, but in reality the packet is only 5 bytes, so if we try to read 10 bytes, it's crossing the boundary. This exists to prevent attacks with wrong remaining length.

### Connection refused when connecting with TLS

* Check if you have configured TLS. see [FAQs](FAQs.md#how-to-use-with-tls)
* Check if you are connecting over correct port and with right protocol as per config
* Check if certificates are valid

### Connection refused when connecting over Websockets

* Check if rumqttd is configured for websockets. e.g. [here](Configuration.md#websockets)
* If you are building from source, make sure to enable `websocket` feature. e.g. `cargo build --release --features websocket` 
* Check if you connecting with MQTTv3.11, currently you can't use MQTTv5 over websockets
