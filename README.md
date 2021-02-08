# Elisa PS5 scout
Almost the same as [this](https://github.com/lkallas/ps5-telia-scout) script.

## Setup
This script is looking for Playstation 5 consoles from Elisa's [e-shop](https://www.elisa.ee/seadmed/eraklient/konsoolid) via their API.

This script is using [Messente's SMS API](https://messente.com/documentation/sms-messaging/api-reference)
for delivering SMS notifications.

To set this script up you need to provide API username and password and an array of phone numbers
you want to send the notification to. Please do so in the [index.js](./index.js) file header.

It's up to you how you deploy this script.

I for example set it up as a cronjob in my [Zone](https://www.zone.ee/) virtual server.

## Does this sh*t actually work?
It works on my machine!

**Feel free to use and modify this script in any way as you wish.**

That said, I can't be hold responsible for your sadness, happiness or whatnot this script may or may not cause to you.
