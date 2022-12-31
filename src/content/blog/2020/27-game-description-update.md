---
id: 27
title: "Game Description Update"
tags:
- Code
createdAt: Thu Aug 06 2020 03:00:00 GMT+0300 (Eastern European Summer Time)
---

Today I also updated games' descriptions.

When I made Calculator's description, I needed to add a link to the Google Play app.

With the current setup the descriptions for all games are in a Vuex store. The description is simply a string, so I can't add links. I also wanted to divide the description into two: a description for the web version and a description for the full app version. Again, it's just a string, so I can't add headers.

To me the obvious solution was markdown, so that's what I did. I downloaded markdown-it, a parser that can parse a string to HTML and added the links and headers in markdown. Honestly it looks kinda ugly as it's still a string with no syntax highlighting and there can't be any indentation on the left, or otherwise it breaks:

```ts
// Randomizer's new description
...
      mainDescription:
        `In Randomizer you can randomize various different things.
Simply choose what to randomize (open the menu by clicking the button in the top-left corner
and press the button located at the bottom to randomize.

### Things to Randomize
#### Number Range
Get a random number from 0 to 10 (with default settings).
You can move the slider below the randomizer button to change the range of numbers to randomize,
for example 0 to 100 or 0 to 255.  

#### Heads or Tails
Throw a coin to get either heads or tails. This could be useful if you have to decide between two things.
For example, should I eat pizza or lasagna? Heads or tails?

#### Roll Dice
Get a random number (shown on the dice) between 1 and 6. This could be useful, for example,
if you want to play board games but don't have a dice with you.`,
...
```

I would prefer to have separate markdown files and to somehow get that as a string to the parser, but I couldn't find anything like that and it would complicate things.

Anyway, I updated all of the descriptions to make them nicer and cleaner and added headers to some of them and I'll keep doing small things like this and cleaning up code.