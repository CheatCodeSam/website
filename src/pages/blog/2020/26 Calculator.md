---
id: 26
title: "Calculator"
createdAt: Wed Aug 05 2020 03:00:00 GMT+0300 (Eastern European Summer Time)
---

Here it finally is. The project that I have been working on for about **three** months.

# Description

Calculator is a free android app made with Ionic Angular. I released it to Google Play today and you can check out the app at [https://play.google.com/store/apps/details?id=com.gamitopia.calculator](https://play.google.com/store/apps/details?id=com.gamitopia.calculator)  
It is a highly customizable calculator which also has many unit converters (including a currency converter), a tool for creating beautiful charts and a graphing calculator. The app has many light and dark color themes and everything is free and addless.

I also made a GitHub repository for the project and you can find it at [https://github.com/Jondolf/Calculator](https://github.com/Jondolf/Calculator)

I also made a small version of it here on Gamitopia and it only has the base calculator. If you don't have an Android device, then you can still try out that version.

You can find it [here](/calculator/)

[![](/img/calculator_thumbnail.dd6bb420.jpg)](/calculator/)

## List of features (in initial release)

-   A calculator with customizable buttons and layout
-   Many unit converters, including a currency converter
-   A simple tool for creating simple line, bar, or radar charts
-   A graphing calculator for drawing graphs using equations
-   Many light and dark color themes that affect the entire application's color scheme
-   Customizability
-   And more coming in the future.

If you want to know about the learning and development process and want to know why this project took so long, read on.

# The learning and development process

## What is there to learn?

As you can probably guess from:

> Calculator is a free **android** **app** made with **Ionic** **Angular**

There was a lot to learn. I had never made an Android app, had only heard of Ionic and had little experience with Angular. I had however tried Angular before and knew the very basics, although some things are still a bit uncertain to me.

## Beginning with Angular

So, I started making the app with just Angular, to gain a better understanding of how it worked. I managed to make a pretty bare version of the standard calculator and got it working. I learned by building the application, checked out the docs when I wanted to know how to do something, and fixed some of my previous mistakes. Pretty soon after I had the base calculator made, I moved onto Ionic to start going mobile.

## Adding Ionic

At the start things were kind of rough as I had to create a new Ionic project and move the Angular files into the project and setup things, which caused lots of bugs and many debugging hours. Eventually I got it working. I replaced some of my own components and code with Ionic's own components, added lazy loaded routes which helped with performance and learned a lot more about Ionic through forums and the docs.

## Adding features and calculators

### Settings and menus

I added the settings menu, theme selection and the calculator menu where you can select various different calculators.  
  
Then I started making other types of calculators and mathematical tools.

### Converters

First off, I added converters, like a length converter and a mass converter. I also added a currency converter that gets the current exchange rates from the European Central Bank through the Foreign Exchange Rates API. I added multiple converters and I'll add more in the future.

### Charts

Then I thought, _I need at least one more calculator/mathematical tool to be able to publish this_. I thought of charts, so I made charts.

You can create line, bar and radar charts and give them comma seperated lists of values that act as points in the chart. I used chart.js to make it.

### The graphing calculator of doom

Then I thought of something. Wouldn't it be cool to have a tool for creating graphs with a given equation, like y=x? I already made a math expression parser, so I could just loop through x-coordinates to calculate the value of y! So I decided to start making one more calculator, the graphing calculator.  

I made it with HTML canvas, which I haven't used besides drawing squares for Snake. So, I started by drawing a grid. I managed to do a 10x10 grid. Hurray! Then I made the coordinate system, which was just two thicker lines going through the middle of the canvas, which was pretty easy. Then I finally started doing the line drawing for x-coordinates according to the given equation. It wasn't working, since the canvas of course uses different units than the coordinate system. Eventually, after various different bugs I managed to make a coordinate converter that takes in a coordinate system coordinate, and turns it into canvas coordinates. I got things working eventually (which is a long time) and the lines were drawn according to a given equation, even sin(x).  
  
I knew I was missing at least two crucial features: zooming and panning. My initial thought was: get a library for zooming and panning a canvas! After trying many different libraries, I realized that they just won't work properly. I can't pan or zoom infinitely, since the library was simply moving the canvas, and not the content inside it. I would have to draw a huge canvas, but even then it won't be infinite and the performance cost was huge, especially for drawing lines from an equation as they would count a huge amount of x-coordinates. I realized that I had to implement panning and zooming myself.  

I implemented panning by saving an offset variable and used the offset in the coord converters and line drawing functions. This way I moved the lines and everything was panning, but it took me ages to make it work. Lines were moving at different speeds than others, moving in different directions than others and things were breaking all the time. I handled pan detection with Hammer.js.

Then, zooming. This was even worse than panning in my opinion. Originally I added a scale variable, which told how many squares should be displayed on the x-axis. I simply made it larger or smaller when zooming. This, however, added many calculations as I had to take both the offset and the scale into account and code became more complex. After hours upon hours, both zooming and panning worked.  

I found many bugs and with things like y=sqrt(x+1), there were sometimes NaN values, so for the first time ever, I had to use binary search to find the closest number to NaN. With more complex calculations that are not just straight lines, I also had to check the x value more often to reduce spiky lines. I'm only mentioning the biggest bugs and problems.  
  
Then I also added numbers along the axes and things looked quite good. I knew there was still one crucial thing to add to the graphing calculator: infinite zooming where the step between the numbers would decrese/increase, as currently if you zoomed out far enough, the squares were pretty much infinitely small. This was yet another thing that I got stuck on for ages and became a bit exhausted of the project. Now I had to add another variable, step, and make it smaller or larger depending on the scale. I wanted the step to always have the number 1, 2 or 5 so that the numbers would go like: 1, 2, 3... or 2, 4, 6... or 5, 10, 15... and they could of course have multipliers of 10 like 100, 200, 300... or 0.2, 0.4, 0.6 and so on.

Making it automatically generate the step infinitely was a challenge, especially with floating point problems in JS. Another problem was that I had to somehow scale the grid and the graph lines differently; if the step was 2, then the grid size would be two times larger, but the graph lines should stay the same. I tried to make separate variables and functions for the withStep versions, but this lead to incredibly large code duplication and unclean code. It didn't even work. Eventually though, after changing some names of the variables, making code more logical and fixing bugs, I got it working.  

I skipped many problems and bugs here, but even then yu can probably tell it took me oquite a while to finish the graphing calculator. When I was really bored on working on it, I worked on other features and fixes or just played games. Finishing the graphing calculator took me so long that I read Clean Code before finishing it, and it definitely helped. I made my functions smaller, made classes, avoided tight coupling and more. Even though it took me so long, I'm definitely happy that I made it as I learned a lot, like HTML canvas, binary search, writing cleaner code and more.  
  
Now it's time for the finishing.

## Adding the Google Play Console

I don't remember when exactly I did this, but anyway I made a Google Play developer account (and a Google account for Gamitopia, more on that soon), made a new app, added the icons and screenshots, added a description and more. This way I had most of the stuff set up before adding the app bundle.

## Finishing up and making the Android build

The rest was finishing up, improving the UI and performance, fixing bugs, adding small features etc. This was actually quite fun as I saw it all come together.  
  
I actually had already made a few apks in Android Studio (first time using it) so that I can install and test it on my phone. I also had added a splashsceen and the icons, and customized the statusbar and the header bar. Now I just had to make a signed app bundle and add it to the Google Play Console. I had already made a keystore already, so I just signed the bundle and put it there.

## Releasing the app

Then I just set up the rest, answered questionnaires and more. I decided to first publish it to alpha, so that I can test it myself and send the link to some family members. Then began the wait.

Google Play has to review the app first and in my case it took 5-6 days (partially because of Covid-19). It was really annoying, but eventually it was ready. Then I released it to production which took about an hour more of waiting, and here we finally are. Calculator is published. You can find it at [https://play.google.com/store/apps/details?id=com.gamitopia.calculator](https://play.google.com/store/apps/details?id=com.gamitopia.calculator) or just go to Google Play and search Gamitopia.  
  
This was my biggest project yet but in my opinion it was worth it. I learned a huge amount: Angular, Ionic, Capacitor, Android Studio and Android app development, cleaner code.

Angular was nice, but I'm honestly super happy to be back with Vue, and I'm looking forward to Vue 3. I've been cleaning up a bunch of Gamitopia's code and will continue to do so, and will also add new features and eventually another new game. My school starts next week again, so that might affect my productivity, but we will see when the time comes.  
  
As I said before, I skipped a bunch of things to avoid this post being ridiculously long. Please give the app a try if you have an Android device, and if not, try the non-feature-rich version here on Gamitopia.  
  
See you later 👋