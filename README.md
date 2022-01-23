# Elundus Core (desktop) 
[![GitHub build](https://img.shields.io/github/workflow/status/SietseT/ElundusCoreApp/CI%20-%20Windows/main?style=flat-square)]()
[![GitHub version](https://img.shields.io/github/v/release/SietseT/ElundusCoreApp?style=flat-square)]()
[![GitHub downloads](https://img.shields.io/github/downloads/SietseT/ElundusCoreApp/total?style=flat-square)]()
[![GitHub issues](https://img.shields.io/github/issues/SietseT/ElundusCoreApp?style=flat-square)]()

Elundus Core is a desktop application you can use to simulate/preview text-to-speech (TTS) voice messages for Twitch. It's a port of the website https://www.elunduscore.com that I've initially created for the same purpose.

<details>
  <summary><b>Screenshot</b></summary>
  <img src="https://i.imgur.com/1EyWnIZ.png">
</details>

**Wondering why I've made the step to change it to a desktop application? Check out the [FAQ](https://github.com/SietseT/ElundusCoreApp#faq).**

---

- [Features](https://github.com/SietseT/ElundusCoreApp#features)
- [Installation](https://github.com/SietseT/ElundusCoreApp#installation)
- [How it works](https://github.com/SietseT/ElundusCoreApp#how-it-works)
- [FAQ](https://github.com/SietseT/ElundusCoreApp#faq)
- [Contributing](https://github.com/SietseT/ElundusCoreApp#contributing)

---

# Features
- Text-to-speech conversion for Amazon Polly voices (same voices are used by StreamElements and StreamLabs)
- Download converted TTS sound (see FAQ)
- No more Recaptcha! 🎉
- Windows and MacOS support
- Auto-updater, so you'll receive the latest features and fixes automatically

---

# Installation
- Go to [releases](https://github.com/SietseT/ElundusCoreApp/releases/latest) and download the setup from the latest release.
  - On Windows, download the `.exe` file.
  - On MacOS, download either the `.zip` or `.dmg` file.
- Run the setup.
  - Windows: if you get a SmartScreen warning, select _More info_ and click _Run anyway_.
  - MacOS: Open the `.dmg` by right-clicking on it and selecting `open`, or try any of the installation methods in this [link](https://www.switchingtomac.com/tutorials/osx/how-to-run-unverified-apps-on-macos/).
- Start Elundus Core using the shortcut created on your desktop or from the start menu.

---

# How it works
The frontend, apart from a few minor tweaks, is exactly the same as the https://www.elunduscore.com website that I've made. But instead of calling an external API, the application comes bundled with it's own API which in turn calls the [Streamlabs](https://streamlabs.com) API to convert the text-to-speech.

---

# FAQ
<details>
  <summary><b>Why did you make an application instead continuing to develop the website?</b></summary>
  <br />

Elundus Core started out as a project for me to test out some donation messages for xQc, using the [StreamElements](https://streamelements.com/) API. Keep this in mind, this is important for later.

I decided make it public and host it as a website, mainly because of the low costs. Back then it was just a static website built with [GatsbyJS](https://www.gatsbyjs.com/), so it didn't cost much for me to host it and it was worth it. I wanted to perfect the website, so I've strived to get a high as possible score in [Google Lighthouse](https://developers.google.com/web/tools/lighthouse/) and made sure to get SEO right, so the website would show up in Google.

After few months of having around 10-15 users a day, the website was featured in a Reddit post. I think it was on [r/LiveStreamFails](https://www.reddit.com/r/LivestreamFails/) or [r/xqcow](https://www.reddit.com/r/xqcow/), but I'm not sure. After that I saw that the amount of visitors was climbing rapidly and with that, the site ranked higher and higher in Google.

Fast-forward to July 17th, 2021. Apparently the website caused so much traffic for StreamElements that they decided to implement security measures. They added a captcha to their API, so it was impossible for the website to convert the TTS messages. I've thought of using a service that solves captchas (paid), but decided it was too expensive. 

I've tinkered around with this for a few days until I stumbled upon the [Streamlabs](https://streamlabs.com) API. It does basically the same, but it couldn't be called directly from a website, there had to be a server inbetween. _For the developers around: they protected the API with CORS._ So I had to host a simple webserver/API that the website could call and everything was fine. Atleast I thought it was.

Apparently the Streamlabs API had a rate limit. Meaning you could only do 20 calls before you'd have to wait to do more calls. That wouldn't work since the website on it's peak had 35-40 TTS submits a minute and would cause an inconsistent user experience.

I've then decided this had to be fixed and created a proxy server system in order to prevent rate-limiting to occur. The website still calls 1 API, but the API then calls one of the proxy servers (and kept track of which one was rate-limited and which wasn't), and the proxy server in turn calls the Streamlabs API to convert the message.

This setup still works to this day, but having to host more and more proxies as the popularity increases is not a working solution for me. I've had the idea for a few months now, but finally made a desktop application for Elundus Core which comes with it's own bundled API which calls Streamlabs, which means I don't have to host an API or proxyservers anymore.
</details>

<details>
  <summary><b>Why is there no phone support?</b></summary>
  <br />
  
There are many phones around with operating systems and different browsers. It's hard to make a working website and continue developing features tested for all devices, that's why I converted the website to a desktop only app. 
</details>

---

# Contributing

  <h3>Cloning and installing dependencies </h3>

<summary><b> Windows</b></summary>

1) You can use [Git](https://git-scm.com/downloads) as the CLI but it is not required

2) Install [NodeJS](https://nodejs.org/)

4) Install electron globally `npm i -g electron`

5) Clone the project `git clone https://github.com/SietseT/ElundusCoreApp.git`

6) Go in the project folder `cd ElundusCoreApp`

7) And finally, install the project dependencies `npm install`

  <summary><b> Mac</b></summary>

1) Use [Homebrew](https://brew.sh/) to install Git `brew install git` 

2) Use Homebrew to install Node `brew install node`

3) Use npm to globally install Electron `npm i -g electron` and Concurrently `npm i -g concurrently`; If necessary, use the `--forced` or `--legacy-peer-deps` flags.

4) Clone the project `git clone https://github.com/SietseT/ElundusCoreApp.git` 

5) Go in the project folder `cd ElundusCoreApp`

6) Install the project dependencies `npm i` 

  <h3>Running and packaging</h3>
  

To run the application with hot-reloading (apart from the NodeJS server), run `npm run dev` in the root of the repository.

To compile the app and make an installer run `npm run electron-pack -mw`. Use flag `-m` to only package mac or `-w` to only package windows. Using the flag `-mw` will package for both the platforms. 

Check the [Electron CLI documentation](https://www.electron.build/cli.html) for information on building for other platforms.

If you made somes changes and want them added in the main project, submit a pull-request and I'll look at it and decide if it will be added.