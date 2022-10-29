---
id: 25
title: "New Features and Fixes"
createdAt: Mon Aug 03 2020 03:00:00 GMT+0300 (Eastern European Summer Time)
---

Yesterday and today I implemented a few small new features, made some small fixes and improved mobile support.

## Features

### Filtering

First off, I added a searchbar, which you can see at the top of the [News page](/news). You can type in the name of a news post to find it easily. When/if I add tags to news posts, I'll probably make it possible to search by tag as well.  
I also added better filtering by year. Now they're automatically generated checkboxes, which allows for more options.

### Fullscreen support for all games

This is quite self-explanatory. All games now support fullscreen properly. This was made quite easy to implement with the GameContainer component that handles fullscreen toggling (read previous post).

### News post backup

This is not something that users will see, but I also added a button for getting the news posts as JSON so that I can copy it locally. This acts as a backup in case something goes wrong with the database and data is lost.

## Fixes

### Nicer game boxes

The game thumbnails on Home page and Games page now scale better. On small screens they seemed very small, so I made them bigger. I also made the newest game section of the home page nicer sized.

### Fixes in games' styles

Some games were kind of broken on certain screens or white text was displayed on a white background, so I fixed that stuff as well.