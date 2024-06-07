---
title: Rumqttc Internals
---

Lets dive into internals of rumqttc and understand how it works.

In rumqttc, every activity is represented by `Event`.  An event can be `Event::Incoming` or `Event::Outgoing` , indicating incoming and outgoing packets, respectively.

 > 
 > It is the same `Event` which is returned when we poll eventloop.

Eventloop performs multiple tasks. When we poll it, it tries to either read packets from the network or process the `Request`s ( more on it later ), along with that, it periodically generates pings to keep the session alive.

 > 
 > That is why "You must poll the eventloop to make progress"!

Eventloop is the core of the client, like the heart of rumqttc. We will further discuss handling incoming and outgoing packets.

First, we'll explore how incoming packets are processed. When eventloop receives some packets from network ( broker ), it initially handles them according to MQTT standards, such as dispatching acknowledgement for publish packets, and then an `Event::Incoming(Packet)` is added to the eventloop's state for each packet.

Since packets are read in bulk, if we get multiple packets, an event for each packet is added. When polled, eventloop first check for the pending events which already exist in state and return them right away before trying to read new packets from the network.

When it comes to sending packets to broker, `Request`  comes into picture.

If we want to send a packet to the network, we have to *request* eventloop to do so, and that request is represented by `Request`.
`Request` can be any type of packet which a client can send to a broker as per MQTT standards, such as publish, puback, subscribe, ping, disconnect etc.

To create and send requests to eventloop, `Client` is used! 
Constructing a client in rumqttc is done like:

````rust

let (client, eventloop) = AsyncClient::new(..);

````

Here, the `new(..)` method returns a tuple with `(AsyncClient, Eventloop)`. We've already discussed `Eventloop` , and `AsyncClient` is nothing but a medium to send `Request` to eventloop. For example, when you call `client.publish(..)`  it creates `Request::Publish(..)` internally and forwards it to eventloop, same with any other method on client like `.subscribe(..)`, `.ack(..)`, `.disconnect(..)` etc.

 > 
 > Wait, unlike the `AsyncClient`, `Client::new(..)` returns `Connection` instead of `Eventloop`, is the synchronous client something different?

No, not really! `Connection` simply encapsulates `Eventloop` , allowing it to be used in synchronous context. Rather than using `.poll()`, you can make progress with `connection.recv()` or `connection.iter()` .

And that's basically the gist of it! 

To summarise :

 > 
 > Eventloop tries to read packets from the network, transmit pings,  or process requests of sending packets created by the client. Throughout these processes, it emits Events to let us know about the specific activities taking place.

Refer to other examples and feel free to dive into source code available on [GitHub](https://github.com/bytebeamio/rumqtt/tree/main/rumqttc) to learn more.
