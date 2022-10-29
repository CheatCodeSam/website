---
id: 24
title: "Code Cleanup"
createdAt: Mon Aug 03 2020 03:00:00 GMT+0300 (Eastern European Summer Time)
---

I've been cleaning up some code for the last few days and I also made some improvements to styling and UI and added some new features.

## Separating the games from the pages

My main goal was to clean up the games' code and to decouple the games themselves from the pages that have them. I wanted the games to be easily portable: they don't care about their surroundings and can live on their own. The pages that have the games shouldn't know pretty much anything about the game, only the fact that it exists.  

The first step was to put the games into their own components. Previously the games' subcomponents and main logic were in the pages' files, like the following.

```vue
<!-- In views/games/TicTacToe.vue -->
<template>
  <div class="tic-tac-toe">
    <GameHeader :game="ticTacToeInfo" />
    <div class="game-container">
      <StartMenu
        v-if="this.startMenuVisibility === true"
        @startMenuBtnClicked="this.toggleStartMenuVisibility"
        @activateThreeByThreeGrid="this.activateThreeByThreeGrid"
        @activateFourByFourGrid="this.activateFourByFourGrid"
        @gridWidthChanged="changeGridWidth"
        @gridHeightChanged="changeGridHeight"
        @rowToWinChanged="changeRowToWin"
      />
      <Grid
        @openStartMenuBtnClicked="this.toggleStartMenuVisibility"
        :threeByThreeGrid="this.threeByThreeGridActive"
        :fourByFourGrid="this.fourByFourGridActive"
        :gridWidth="gridWidth"
        :gridHeight="gridHeight"
        :amountOfSymbolsNeededInARowToWin="amountOfSymbolsNeededInARowToWin"
      />
    </div>
    <GameDescription :game="ticTacToeInfo" />
  </div>
</template>
<!-- ... -->
```

This caused the page to have all the data and methods that the subcomponents needed and the page's own components, data and stylings. So I made components for the games:

```vue
<!-- components/games/tic-tac-toe/TicTacToeGame.vue -->
<template>
  <div class="tic-tac-toe-game">
    <StartMenu
      v-if="this.startMenuVisibility === true"
      @startMenuBtnClicked="this.toggleStartMenuVisibility"
      @activateThreeByThreeGrid="this.activateThreeByThreeGrid"
      @activateFourByFourGrid="this.activateFourByFourGrid"
      @gridWidthChanged="changeGridWidth"
      @gridHeightChanged="changeGridHeight"
      @rowToWinChanged="changeRowToWin"
    />
    <Grid
      @openStartMenuBtnClicked="this.toggleStartMenuVisibility"
      :threeByThreeGrid="this.threeByThreeGridActive"
      :fourByFourGrid="this.fourByFourGridActive"
      :gridWidth="gridWidth"
      :gridHeight="gridHeight"
      :amountOfSymbolsNeededInARowToWin="amountOfSymbolsNeededInARowToWin"
    />
  </div>
</template>
<!-- ... -->
```

And then put that component into the page:

```vue
<template>
  <div class="tic-tac-toe">
    <GameHeader :game="ticTacToeInfo" />
    <div class="game-container">
      <TicTacToeGame />
    </div>
    
    <GameDescription :game="ticTacToeInfo" />
  </div>
</template>
<!-- ... -->
```

Now the page doesn't know anything about the game (except that it exists) and the game could probably be put anywhere. Hurray!

## Reducing boilerplate and improving maintainability

I went even further to reduce boilerplate and to automate things.

The game pages are all very similar in structure, so why not make components that handle that stuff automatically?  

First I made a GameContainer component that acts as a container for the game's component and has the logic for making fullscreen work and the styles that games' containers generally have in common. I added a slot that you put the game's component in. I won't show you the component, but I'll show how to use it:

```vue-html
<!-- GameContainer automatically handles fullscreen changes and styles -->
<GameContainer width="80vw" height="80vh" :isFullscreen="isFullscreen">
  <!-- Listen for toggleFullscreen event if the game has one and give it the current boolean value of isFullscreen if it needs it -->
  <SomeGame
    @toggleFullscreen="isFullscreen = !isFullscreen"
    :isFullscreen="isFullscreen"
  />
</GameContainer>
```

Even if the game doesn't support fullscreen, the code doesn't break as it just listens for a potential toggleFullscreen event.

Then I went even further and made a GamePage component that automatically adds the correct header, game, description and styles that the game's page should have. In the component's slot we put the GameContainer and inside the GameContainer the game, like this:

```vue
<!-- views/games/TicTacToe.vue -->
<template>
  <!-- Give the GamePage the game's data (title, descriptions, release date...) by passing it as a prop from the Vuex store -->
  <GamePage :game="$store.state.games.allGames.ticTacToe" id="ticTacToe">
    <GameContainer width="80vw" height="80vh" :isFullscreen="isFullscreen">
      <TicTacToeGame
        @toggleFullscreen="isFullscreen = !isFullscreen"
        :isFullscreen="isFullscreen"
      />
    </GameContainer>
  </GamePage>
</template>
<!-- ... -->
```

And that's it! The page doesn't require any CSS (unless we want to customize the game's page specifically) as the GamePage handles that automatically and in the script part it only needs the component imports and the isFullscreen variable.

This new system improves maintainability greatly and reduces boilerplate. The games can also technically be put anywhere now, as they are not dependant on the page.

## Cleaning up the games' code

This wasn't the main focus of this quick cleanup, but I also went through all games (except Adventura, I'll get back to that) and cleaned up a lot of basic things. I didn't refactor the code (at least yet) but removed lots of unused code (400 lines from Randomizer!), improved structure and whitespace, made ids classes, made use of SCSS more (nested selectors etc.), renamed files to follow Gamitopia's general naming conventions (PascalCase for component names and JS classes, kebab-case for HTML classes, camelCase for pretty much everything JS related, refs and HTML ids) and more. While doing this, I also spotted a few bugs and styling errors and fixed them.  

And then I got to Adventura. I realized that it's a mess. It's decently organized, BUT it has ridiculous amounts of imports, props, if statements where I check if an item exists in localstorage, methods with the exact same implementation, messy functions, bad formatting and more. It's not DRY (Don't Repeat Yourself) enough. I didn't clean it up yet as it would take ages but I'll do it eventually. Yes, I know LeBlanc's law "Later equals never" but I'll do it later :)  

Recently I read the book Clean Code by Robert Martin (although I didn't understand much about concurrency and also skipped some Java specific things). The book inspired me to do this quick cleanup and I learned a lot from the book. I definitely recommend the book to anyone who aims to be a good programmer.

As a sidenote, I might add some tests with Jest to Gamitopia soon and somewhat try TDD (Test Driven Development). I'll take some tips regarding tests from Clean Code as well.