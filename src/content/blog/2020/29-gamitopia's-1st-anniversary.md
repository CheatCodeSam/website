---
id: 29
title: "Gamitopia's 1st Anniversary"
tags:
 - Anniversary
createdAt: Mon Aug 31 2020 03:00:00 GMT+0300 (Eastern European Summer Time)
---

Today, on the 31st of August 2020, is Gamitopia's first anniversary 🎉\
I have a lot to talk about so let's get to it. I'll try to keep this short though and this post is split up into three parts: New things, Year recap and The future.

## New things

I updated lots of stuff and added new and exciting things. I also updated the [README](https://github.com/Jondolf/Gamitopia/blob/master/README.md).

### Vue 3

I really wanted to try out [Vue 3](https://v3.vuejs.org/) (it's in the Release Candidate stage now) so I made a copy of Gamitopia's files, updated dependencies, fixed deprecations and so on. Some dependencies were a bit more difficult, like [vue2-hammer](https://github.com/bsdfzzzy/vue2-hammer), and I couldn't get it to work, so I downloaded the normal Hammerjs and made my own Vue directives. I also updated some components to use the new [Composition API](https://composition-api.vuejs.org/), which I'm quite excited about. Eventually I got seemingly everything working and decided to publish that stuff to Gamitopia as well.

### Target Practise

I also released another game and it's the first game on Gamitopia that has been made with Unity!\
I tried the [vue-unity-webgl](https://github.com/votetake/vue-unity-webgl) plugin but couldn't get it to work with Vue 3. I said: "Fine, I'll do it myself."\
I wrote a composable partially copying the script that came with the WebGL build. Then I made a Vue component for Unity games and it loads games using the composable. The component takes a url to the game's Unity build, which makes adding new games really easy.
As usual, I'll make a separate post about the game later today, but in short Target Practise is a game about shooting moving targets in a 3D space.

[![Target Practise game](https://gamitopia.herokuapp.com/img/target_practise_thumbnail.b27da030.jpg)](https://gamitopia.herokuapp.com/target-practise)

### New homepage

I updated the layout of the homepage as well. Now it has a Welcome section and a more descriptive Newest Game section.

### Improved game thumbnails

I added short descriptions to all games and you can see it by hovering over a game thumbnail. This makes it easier to know what to expect, but it doesn't take any extra space.

### New Gamitopia logos and icons

I remade Gamitopia's logo, added a new wide logo and remade the favicons.

Below is the old Gamitopia logo compared to the new one:

![Old vs new Gamitopia logo](https://gamitopia.herokuapp.com/img/screenshots/old_vs_new_logo.png)

I also made variations of the new logo:

![New Gamitopia logo variations](https://gamitopia.herokuapp.com/img/screenshots/new_logo_variations.png)

The palm without outline is used in the wide logo, which is used in the homepage's Welcome section. The 32x32 and 16x16 icons are favicons and I drew them as pixel art manually, because after resizing the square logo to such a small size, it was really blurry. Instead, I wanted a nice, crisp icon.

### About page redesign

I also redesigned the About page. Now it has subheaders, images and the layout is nicer.

### Unifying and fixing

I made some styles more consistent throughout the website and added headers to each page. I also fixed some bugs and styling errors and cleaned up code.

### The news post problem

Yesterday I finished up some stuff and prepared for the anniversary. Then I noticed a worrying thing: I can't make news posts anymore. The news post writing system uses tiptap as the text editor, and tiptap doesn't support Vue 3 yet. I panicked a bit, as I had to make a post for the anniversary (this post). I quickly made a temporary solution and this post has been made with markdown. I wrote this in markdown, parsed it to HTML with MarkdownIt and published like normal. Currently I can't edit news posts though, as the editing still uses tiptap.

This made me think, that maybe I should just switch to markdown from tiptap. It would be simpler, would work regardless of any versions, easier to store anywhere and can still easily accomplish almost everything that tiptap can. It's also more universal and I could easily switch markdown libraries, as the syntax should stay the same. I might do this pretty soon-ish and maybe I'll finally add tags to news posts at the same time :)

## Year recap

The past year has been crazy for me. I learned so much: Proper JavaScript, TypeScript, SCSS, Vue, making and publishing websites, designing things, some backend stuff like Nest.js, Unity, Blender, Angular, Ionic, clean code and so much more. Before Gamitopia, I had programmed only one tiny game and that was with a lot of help from others. In one year, however, I have made a website that has 6 web games, 1 Android app, a news post admin system with a backend and more. It's ridiculous to me how I did so much in one year with school stuff going on as well.

This leads us to the future.

## The future

Currently I have a lot of school stuff to do, so I might not do Gamitopia related stuff in a while.

Some of my goals for the following year are:

- Update news post system: add tags, add support for news post drafts, potentially change tiptap to markdown
- Maybe get a proper domain for Gamitopia (.com is unfortunately taken, so maybe .dev or .net)
- Maybe get a faster alternative to Heroku
- Make at least 2 or 3 games/apps and at least one of them with Unity
- Update current games
- Improve website layout and design even more
- Clean up code, properly implement the new Composition API
- And more.

Currently I don't quite know that many goals, but I'm sure I'll get ideas as time goes by. The goals listed above are subject to change of course.

Thank you for reading this, and I hope you enjoyed it.

See you later👋