---
id: 21
title: "Update to Game Descriptions"
createdAt: Tue May 26 2020 03:00:00 GMT+0300 (Eastern European Summer Time)
---

Today I updated the game description system to simplify, unify and remove code. I will also quickly address some potential updates to game descriptions at the end of this post.

## The code part

So earlier on I had the game descriptions' code in each of the game pages. The same HTML and CSS, about 100 lines of code, was in each game (although the amount of lines depends on the length of the description). This is about 500 lines of code spread across different files. Because it was all over the files and changes were a bit difficult to keep track of, some descriptions had different stylings than others. This made things inconsistent.

I decided to fix it by simply making a Vue component for game descriptions. This put the HTML and styling in one file, instead of having to copy and paste it everywhere, thus reducing code a lot.

This was great, but how do I get the actual content of the description to the component? Well, this could be quite easily done by simply assigning multiple props to the component:

```vue-html
<GameDescription
  :name="'Cookie Clicker'"
  :mainDescription="`Click the cookie to bake cookies. Use your baked cookies to buy upgrades. Upgrades help you bake more cookies faster.
  Try to bake as many cookies as you can!`"
  :imgSrc="require('@/assets/images/game-thumbnails/cookie_clicker_thumbnail.jpg')"
  :imgAlt="'Cookie Clicker game'"
  :releaseDate="'31.8.2019'"
  :madeWith="['Vue', 'HTML', 'SCSS', 'TypeScript']"
  :support="['Fullscreen support: yes', 'Dark mode support: yes']"
/>
```

Hooray. It works (with the actual components code obviously). But I still wanted a more convenient solution, as I still would have to jump across files to change descriptions. I want to have all of this game related info in one place: a Vuex store.

So that's what I did. I already had a store for the game thumbnails, so I decided to just modify it a bit by adding a description object for each game. Now I can also use the same name and release date etc. for both the thumbnails and the descriptions, instead of having them in two places.

Below is some example code:

```ts
// ...
randomizer: {
  name: 'Randomizer',
  route: '/randomizer/',
  thumbnailImgSrc: require('@/assets/images/game-thumbnails/randomizer_thumbnail.jpg'),
  thumbnailImgAlt: 'Randomizer game',
  releaseDate: '30.9.2019',
  description: {
    mainDescription: `Press the button located at the bottom to randomize. Click the menu button to open a small list of things to randomize. Click on a list item and press the randomizer button to randomize.
    
    Number Range: Get a random number from 0 to 10 (with default settings). You can move the slider below the randomizer button to change the range of numbers to randomize, for example 0 to 100 or 0 to 255.  
    Heads or Tails: Get either heads or tails. This could be useful if you have to decide between two things. For example, should I eat pizza or lasagna? Heads or tails?
    Roll Dice: Get a random number (shown on the dice) between 1 and 6. This could be useful, for example, if you want to play board games but don't have a dice with you.`,
    madeWith: ['Vue', 'HTML', 'SCSS', 'TypeScript'],
    support: ['Fullscreen support: yes', 'Dark mode support: no']
  }
},
cookieClicker: {
  name: 'Cookie Clicker',
  route: '/cookie-clicker/',
  thumbnailImgSrc: require('@/assets/images/game-thumbnails/cookie_clicker_thumbnail.jpg'),
  thumbnailImgAlt: 'Cookie Clicker game',
  releaseDate: '31.8.2019',
  description: {
    mainDescription: `Click the cookie to bake cookies. Use your baked cookies to buy upgrades. Upgrades help you bake more cookies faster.
    Try to bake as many cookies as you can!`,
    madeWith: ['Vue', 'HTML', 'SCSS', 'TypeScript'],
    support: ['Fullscreen support: yes', 'Dark mode support: yes']
  }
}
// ...
```

So now I have all of the information about each game in one file making changing the info easy. As I said, I also now don't have to have seperate names, routes, image sources etc. because I can use the same one for both thumbnails and descriptions. There's still one problem though: How do I get the data from the store to the `<GameDescription />` component?  
Just like before, we can use props, but now we can give just one: the game to get the data from.

```vue-html
<GameDescription :game="$store.state.games.allGames.cookieClicker" /> <!-- Here we get the game from the store and assign a game prop to the component -->
```

That gives the game's description all of the required data for that game. Then we can take the specific pieces of data like the name from that game prop:

```ts
props: {
  game: Object as () => GameInfo // This prop has all of the basic information about the game
},
data() {
  return {
    // Get properties from to the props, assign them to data properties
    name: this.game.name,
    mainDescription: this.game.description.mainDescription,
    imgSrc: this.game.thumbnailImgSrc,
    imgAlt: this.game.thumbnailImgAlt,
    releaseDate: this.game.releaseDate,
    madeWith: this.game.description.madeWith,
    support: this.game.description.support
  };
}
```

This may look like a bunch of boilerplate code but once it's written, I won't have to touch it again or copy and paste it everywhere. All of the games' information is now neatly in one file and it's easy to add new games. Cool!

## The actual part

So now I'll show the actual changes to the website.

As I said, stylings and things were inconsistent because I had made some fixes to some descriptions' stylings, but forgotten to do it to others. Now that the styling is in one place, all descriptions have the exact same styles which makes everything perfectly consistent.

I also improved the descriptions a bit. I added the game's name, the release date and an image. These all were in the thumbnails already, so it was easy to put it there as well.

Below is a screenshot of the old description of Adventura. This was one of the descriptions that had styling issues with responsiveness, because I had forgotten to fix the styling everywhere.

![](/img/screenshots/old_game_description.jpg)

And here is the new description with the image and release date.

![](/img/screenshots/new_game_description.jpg)

Better, isn't it?

## Potential future updates to game descriptions

So I might add game update histories to game descriptions if I don't get too lazy. This would information about what I have updated and when. It would be really useful but I would have to go through all of my git commits to find that stuff. I also would have to decide what to mention in the updates. If I fix one small typo, should I mention it? Also dates would be a bit confusing. If I finish a feature on the 28.5 but release it on the 30.5, which date will I put? Anyway, if I implement this I would make it collapsible like these news posts because there might be a lot of updates. Speaking of collapsing, it's a really useful feature for really long posts like this one. Now I can talk about things slightly more in depth without worrying too much about length. I'll still try to keep these fairly dense though.

I also thought that popover descriptions might be handy. Basically, when you hover over a game on the games page, a brief description of the game will pop up near your mouse. This could also be quite easy to implement with a library.

One thing I thought about is tags. That way I could seperate games on the "genre", like Puzzle, Combat, Online etc. This would also make filtering and searching for games easier. Tags really aren't necessary yet though, as there aren't that many games yet. When I have 10 or more, I might take it into consideration. For news posts, I might add tags earlier.