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

1. Install NodeJS with NPM. https://nodejs.org/en/download/
2. Download this code (at least `index.js` & `package.json`).
3. Set up your Messente account and get your API credentials. You should get 1€ free credit as well. https://dashboard.messente.com/register
4. Update credentials and SMS recipients in the code.
5. To install script dependencies run `npm install`.
6. To start this script run `npm start`.
7. Repeat step 6. You can schedule a repeating task in Windows task scheduler, set up a cronjob, modify this script to run in a loop. You pick what suits best for your needs or technical skills.

## Does this sh*t actually work?
It works on my machine!

**Feel free to use and modify this script in any way as you wish.**

That said, I can't be hold responsible for your sadness, happiness or whatnot this script may or may not cause to you.
