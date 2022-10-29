---
id: 18
title: "Update to Vue CLI 4.3.1, PWA and More"
createdAt: Sat May 16 2020 03:00:00 GMT+0300 (Eastern European Summer Time)
---

For the past couple of days (mainly today though) I have been working on migrating from and old version of Vue CLI (CLI = Command Line Interface) to the newest one. I did this to keep up to date and also because I wanted to add some things to Gamitopia that the old project didn't have when I first created it. I added support for using Vuex if I need it (for state management) and support for PWA, aka. Progressive Web Application (which I'l talk about soon).

## The updating process

Remaking the structure of Gamitopia wasn't quite as hard as I had initially thought. I uninstalled the old Vue CLI, installed the new one, created a new Vue project using the `vue create (project name comes here)` command with manually selected features and deleted extra files. This gave me a clean starting point and the things that I didn't previously have, like Vuex, service workers and PWA support. Then I copied the backend, the components and the assets from the old Gamitopia folder. This was fairly easy, but I got a bunch of problems and errors. I had to reinstall all the plugins and libraries like tiptap and highlight.js, make copy individual lines of code to make connecting to Heroku work (and find which lines to copy and where), reconfig some settings and much more. I also noticed that the ESLint settings were a lot tighter, which I guess was good because it made me fix a lot of bad code and I even rewrote a bit of Snake game's logic and now it's cleaner and uses classes properly.

After I got this stuff working, I started setting up PWA.

## PWA

Gamitopia is now a PWA, aka. Progressive Web Application. This basically makes it possible to "download" a website from the web to enable extra features and nativeness (is that a word?). It's not supported by all browsers and the supported features can vary, but most modern browsers should support it to at least some extent. You can find out how to install a PWA (on Chrome at least) [here](https://medium.com/progressivewebapps/how-to-install-a-pwa-to-your-device-68a8d37fadc1).

Even if you don't install the PWA, you **should be able to use Gamitopia offline now!** If I understood correctly, it saves the website into your browsers cache and most things like games should work normally. News posts won't work as it has to get them from the database and if I make online features in the future, those won't work either. Now you can play Snake or Tic-Tac-Toe on your laptop when your in a forest in the middle of nowhere!

PWA support also makes mobile splashscreens possible (a "loading screen" when you go to the app), but it didn't work properly yet. I'll fix it when I have time.

I also changed the favicons a bit and added larger ones.

## Small text editor update

I also made a small addition to the news post text editor. I added support for customizing text color and text highlights, but it's a bit wonky for the time being and doesn't work properly. This will make it easy for me to add font family customization.

## News post links

You can now search for a specific news post by using the address bar! You put in the url of the news page and then the _id_ of the news post. The id is the id of the news post found from the database, so there might be "missing" posts in between posts if I have deleted a post, but I made a "news post not found" component for that. For example the route for this post is: [https://gamitopia.herokuapp.com/news/29](https://gamitopia.herokuapp.com/news/29). This could be very useful, if you want to share a post with someone. You can just give the link to that specific post. At some point I'll probably make a button for copying the link easily.