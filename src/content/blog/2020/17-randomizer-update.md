---
id: 17
title: "Randomizer update"
createdAt: Fri May 01 2020 03:00:00 GMT+0300 (Eastern European Summer Time)
---

I have now made a fairly large update to randomizer.

## The code side

I didn't add any new things to randomize yet (although I'm planning to do so). Instead, I rewrote the entire code to better utilize the capabilities of Vue.js.

Originally Randomizer was made before I switched to Vue.js and the code was quite messy. I didn't have the patience to switch the games properly, so I just put the logic in `mounted()`, the styles into `<style></style>`, all of the HTML to `<template></template>` and forgot about it.  

Now I rewrote it all and it's a lot cleaner and easier to expand. I split the code into components the Vue way, which allowed me to easily style and add logic to each part of the application in a clean, concise way. Each "thing to randomize" like the dice throw has it's own component and in the parent component named RandomizerContent.vue I can just easily switch the current visible component.

Below is a code chunk to illustrate this better (and I want to see how well code blocks and syntax highlighting work). I can just change the name of a variable to change the content displayed. Another nice thing about Vue.js is the `<keep-alive>`` component, which saves the data of each component inside it.

```vue
<template>
  <div class="randomize-content">
    <keep-alive>
      <NumberRange v-if="whatToRandomize === 'Number range'"></NumberRange>
      <HeadsOrTails v-if="whatToRandomize === 'Heads or tails'"></HeadsOrTails>
      <ThrowDice v-if="whatToRandomize === 'Throw dice'"></ThrowDice>
    </keep-alive>
  </div>
</template>
```

## The visual side

I also changed the gradient to an animating gradient that gradually changes colors and it looks incredible in my opinion. I also changed the icons of the top buttons to Google's material icons instead of images, because they're a lot cleaner and easier to change in my opinion. I also remade all of the buttons visually and changed the number range settings from a slider to just two input fields, one for changing the minimum value and one for the maximum value. Earlier you couldn't even adjust the minimum value.

I also completely remade the menu for changing what to randomize and now it's a lot better and works well on mobile devices. Below is a screenshot of the new menu.

![](/img/screenshots/screenshots\screenshot_of_new_randomizer_what_to_randomize_menu.png)

Overall I made improvements to the responsiveness and to the look and feel of Randomizer.

You can play Randomizer [here](/randomizer)

[![](/img/randomizer_thumbnail.c9be7bb0.jpg)](/randomizer)