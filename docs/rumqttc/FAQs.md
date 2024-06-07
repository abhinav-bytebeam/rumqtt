---
title: FAQs
sidebar_position: 3
---

# Frequently Asked Questions

### Connecting to a broker using raw IP doesn't work

You cannot create a TLS connection to a bare IP address with a self-signed
certificate. This is a [limitation of rustls](https://github.com/ctz/rustls/issues/184).
One workaround, which only works on certain systems, is to add an
entry to wherever your DNS resolver looks (e.g. `/etc/hosts`) for the bare IP
address and use that name in your code.

### Client isn't sending packets

To make any progress, i.e. to send or receive packets, eventloop must be polled!
Calling `client.subscribe(..)` just creates a `Request` and sends it to eventloop. Once we call `eventloop.poll(..)` ( or `iter()` / `next()` in sync client ), the `Request` is processed and the actual packet is sent.
Make sure eventloop is being polled, refer to [examples](Examples.md) to know more.

### Program is stuck forever on publish / subscribe

Client sends requests to eventloop and when polled, eventloop processes those requests. To send the requests, channels are used, which can be bounded ( max capacity is provided while creating client ):
e.g.

````rust
// here 10 is max capacity of channel!
let (client, mut eventloop) = AsyncClient::new(mqttoptions, 10);
````

If you don't poll the eventloop, this requests won't be consumed, thus it will end up in deadlock:

````rust
// capacity of channel between client & eventloop is 10
let (client, mut eventloop) = AsyncClient::new(mqttoptions, 10);

// we published 10 messages
for i in 1..=10 {
	client
		.publish("hello/world", QoS::ExactlyOnce, false, vec![1; i])
		.await?;

	time::sleep(Duration::from_secs(1)).await;
}

// here we try to send subscription request but we can't
// as the channel is full due to previous messages and 
// we are waiting for eventloop to be polled so there will be free space
client
    .subscribe("hello/world", QoS::AtMostOnce)
    .await?;
        
loop {
	// we never reach here cuz we are waiting above!
	// thus causing deadlock.
    let event = eventloop.poll().await;
    //
}
````

to avoid such situations, you can either have separate task to keep polling eventloop ( or send requests in separate task as shown in [examples](Examples.md) ). Otherwise, methods like `try_publish(..)` / `try_subscribe(..)` can be used to try sending requests without waiting.
