---
title: Installation
sidebar_position: 2
---

# Installation

## Run using docker

rumqttd can be used with docker by pulling the image from docker hub as follows:

````bash
docker pull bytebeamio/rumqttd
````

To use the rumqttd docker image with the included `rumqttd.toml` while exposing the necessary ports for clients to interact with the broker, use the following command:

````bash
docker run -p 1883:1883 -p 1884:1884 -it bytebeamio/rumqttd -c rumqttd.toml
````

One can also mount the local directory containing configs as a volume and use the appropriate config file as follows:

````bash
docker run -v /path/to/configs:/configs -p 1883:1883 -it bytebeamio/rumqttd -c /configs/config.toml
````

## Prebuilt binaries

For prebuilt binaries checkout our [releases](https://github.com/bytebeamio/rumqtt/releases), download suitable binary for your system and move it to any directory in your [PATH](https://en.wikipedia.org/wiki/PATH_(variable)).

## Install using cargo

````
cargo install --git https://github.com/bytebeamio/rumqtt rumqttd
````

download the demo config file

````
curl --proto '=https' --tlsv1.2 -sSf https://raw.githubusercontent.com/bytebeamio/rumqtt/main/rumqttd/rumqttd.toml > rumqttd.toml
````

and run the broker using

````
rumqttd --config rumqttd.toml
````

 > 
 > Note: Make sure to you correct rumqttd.toml file for a specific version of rumqttd

## Compile from source

Clone the repo using git clone.

````
git clone --depth=1 https://github.com/bytebeamio/rumqtt/
````

Change directory to that folder and run

````
cd rumqtt
cargo run --release --bin rumqttd -- -c rumqttd/rumqttd.toml -vvv
````

for more information look at rumqttd's [README](https://github.com/bytebeamio/rumqtt/blob/main/rumqttd/README.md)
