# Flic Backend

Flic event API for interfacing with some home automation systems

## Overview
* This repository hosts the code for a backend that handles [flic button](https://flic.io/) events.
* The Flic buttons are configured to send POST requests indicating the button id and the type of interaction.
* There is a Firebase Cloud function that listens for these POST requests and records them, along with the timestamp, in a Firebase realtime database.
* Various home automation apps can now easily query the database to respond to Flic button events.
