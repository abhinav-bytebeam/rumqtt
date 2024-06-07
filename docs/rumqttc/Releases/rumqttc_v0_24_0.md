---
title: rumqttc v0.24.0
---

rumqttc v0.24.0 comes with a lot of bug fixes and improvements with respect to usability.

Here are the glimpses of it:

---

### Empty client IDs

Rumqttc would panic if an empty client id was specified. But as per MQTT standards:

 > 
 > A Server MAY allow a Client to supply a ClientId that has a length of zero bytes

Therefore, `MqttOptions::new` now accepts empty client id both in v4 and v5!

Note that in MQTTv3.1.1 :

 > 
 > If the Client supplies a zero-byte ClientId, the Client MUST also set CleanSession to 1 \[MQTT-3.1.3-7\]

Thus `v4::MqttOptions::set_clean_session` now panics if client ID is empty and `clean_session` flag is set to false.

 > 
 > **NOTE**: We don't generate random client id in rumqttc if empty client id was provided, as it isn't required as per standards. But if you think this might be good to have, please feel free to open PR!

---

### Improved TLS support

#### Accepts all TLS Key formats

We now support all variants of TLS key formats currently supported by Rustls: PKCS#1, PKCS#8, RFC5915. In practice we should now support all RSA keys and ECC keys in DER and SEC1 encoding.
Previously only PKCS#1 (RSA) and PKCS#8 were supported.

#### Inferred key format

Users do not need to specify the TLS key variant in the TlsConfiguration anymore, this is inferred automatically.
To update your code simply remove Key::ECC() or Key::RSA() from the initialization.

````rust
// previously
let client_key = Key::RSA(key);
// now :)
let client_key = key;
````

#### Optional authentication with native-tls

Certificate for client authentication is optional when using rustls but it was required when using native-tls. This is now fixed!

Client authentication certificate is now optional while using native-tls. Note that der & password fields are replaced by client_auth.

````rust
// previously
SimpleNative {
    ca,
    // pkcs12 binary der
    der,
    // password for use with der
    password,
}

// now:
// specify `client_auth: None` if it's not required :)
SimpleNative {
    ca,
    client_auth: Some((der, password)),
}
````

There are new TLS Error variants to indicate what went wrong: `NoValidClientCertInChain`, `NoValidKeyInChain`.

---

### EventLoop fixes

#### websocket request modifier function is Send and Sync

If the `websocket` feature was enabled, we could not pass `EventLoop` to tokio tasks due to the request modifier wasn't Send & Sync.

More info can be found in this [issue](https://github.com/bytebeamio/rumqtt/issues/769). This is now resolved!

Now `EventLoop` implements Send and Sync so it can easily be passed to tasks even when using the `websocket` feature.

#### Prevent data loss

While doing cleanup, the Requests which weren't received by eventloop i.e. still in channel, are now drained and put in pending.

Also we now use VecDeque instead of IntoIter to fix unintentional drop of pending requests. See [PR](https://github.com/bytebeamio/rumqtt/pull/780)

#### Shutdown EventLoop

`EventLoop::clean()` is now public, users can use it to trigger *shutdown* and subsequent storage of pending requests.

Calling `clean` will drop the network and put the pending / inflight messages in `eventloop.pending`.

---

### Other Changes

* from_sender method for `Client`
* Synchronous client methods take &self instead of &mut self
* StateError::IncommingPacketTooLarge is now StateError::IncomingPacketTooLarge.
* Make v5 RetainForwardRule public, in order to allow setting it when constructing Filter values.
* websocket request modifier for v4 client
* Lowered the MSRV to 1.64.0
* Update rustls and other related dependencies.

This wouldn't have been possible without the support we are getting from the community! Thanks to all the contributors!

---

### Peek into the Future

Getting pkids from `publish` / `subscribe` is something that's requested a lot, but that won't be case in near future as there has been some [promising work](https://github.com/bytebeamio/rumqtt/pull/806) to tackle this.

There is [RFC](https://github.com/bytebeamio/rumqtt/issues/774) to improve the API and refactor [MqttOptions](https://github.com/bytebeamio/rumqtt/pull/789) as well.

Please feel free to comment on them and share your thoughts. Feedback is much appreciated!

Expect to see some amazing improvements in performance, API and stability of rumqttc in near future, make sure to give it a star on [GitHub](https://github.com/bytebeamio/rumqtt).

Thank you for your support.
