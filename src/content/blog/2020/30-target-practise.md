---
id: 30
title: "Target Practise"
tags:
 - GameRelease
createdAt: Mon Aug 31 2020 03:00:00 GMT+0300 (Eastern European Summer Time)
---

Gamitopia's first 3D Unity game, [Target Practise](https://gamitopia.herokuapp.com/target-practise) has now been released.

## Description

In Target Practise you shoot at targets to gain points.

The targets, however, are moving at different speeds and positions.

If you hit the red-and-white targets, you will get points, but hitting the black targets will reduce your points.

Try to get as many points as you can.

[You can try out Target Practise here, but it may not work well on mobile devices and old devices.](https://gamitopia.herokuapp.com/target-practise)

[![Target Practise game thumbnail](https://gamitopia.herokuapp.com/img/target_practise_thumbnail.b27da030.jpg)](https://gamitopia.herokuapp.com/target-practise)

## Game development

I actually made this game in spring for a school project. We had to make a video about something technology related e.g. a gaming video or a video showing what's inside a phone or a computer. I decided to go overkill and make a timelapse of me making a game. The video is about 20 minutes long and the footage is sped up to around 15x, and of course I cut out some really boring clips. I didn't release it until now because of a bunch of problems, but now they're fixed.

So I made the game in Unity and the Targets were made in Blender. This is my first time making a semi-actual game in Unity so I of course learned a lot.

I don't have much to say about the actual development: I created a basic environment, added a first person camera C# script, implemented very basic shooting, made target models, added materials to the environment, added a C# script for making the targets spawn at semi-random locations and move at semi-random speeds, made hitting targets increase/decrease the score, added particle effects and experimented with lighting and added post processing effects.

Porting it to the web caused problems.

## Adding it to Gamitopia

I don't remember the details about the problems, so I'll instead talk about the solutions.

Originally I tried to load the game with [vue-unity-webgl](https://github.com/votetake/vue-unity-webgl) but it didn't seem to work with the newest Unity version. Unity gives you an example script that you can use to run the game, so I made my own version of that with the Composition API. It was a bit difficult to make, but it makes it ridiculously easy to add new games. With the script that Unity gave you can load the specific game, but with my version it can easily load any Unity game. Here's the script:

```ts
// ...composables/games/useUnityLoader.ts

import { ref } from 'vue';

export default function useUnityLoader() {
  const container = ref<HTMLDivElement>(null!);
  const canvas = ref<HTMLElement>(null!);
  const loadingBar = ref<HTMLElement>(null!);
  const progressBarFull = ref<HTMLElement>(null!);
  const fullscreenButton = ref<HTMLElement>(null!);
// Loads the game
  function loadGame(buildUrl: string, projectName: string, gameName: string, gameVersion: string, isGzipped: boolean) {
    const loaderUrl = `${buildUrl}/${projectName}.asm.loader.js`;
    const config = {
      dataUrl: `${buildUrl}/${projectName}.data${isGzipped ? '.gz' : ''}`,
      frameworkUrl: `${buildUrl}/${projectName}.asm.framework.js${isGzipped ? '.gz' : ''}`,
      codeUrl: `${buildUrl}/${projectName}.asm.js${isGzipped ? '.gz' : ''}`,
      memoryUrl: `${buildUrl}/${projectName}.asm.mem${isGzipped ? '.gz' : ''}`,
      streamingAssetsUrl: 'StreamingAssets',
      companyName: 'Gamitopia',
      productName: gameName,
      productVersion: gameVersion,
    };

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      container.value.className = 'unity-game unity-mobile';
    }
    loadingBar.value.style.display = 'block';

	  // Create script element
    const script = document.createElement('script');

    // Add the source of the Unity loader script
    script.src = loaderUrl;

    // On script load, create the Unity instance
    script.onload = () => {
      // @ts-ignore
      createUnityInstance(canvas.value, config, (progress: number) => {
        progressBarFull.value.style.width = 100 * progress + '%';
      }).then((unityInstance: any) => {
        loadingBar.value.style.display = 'none';
        fullscreenButton.value.onclick = () => {
          unityInstance.SetFullscreen(1);
        };
      }).catch((message: string) => {
        alert(message);
      });
    };
    document.body.appendChild(script);
  }

  return {
    container,
    canvas,
    loadingBar,
    progressBarFull,
    fullscreenButton,
    loadGame
  }
}
```

It's not that clean, but it works really well. To change the game to load, just change the `buildUrl` and the `projectName`.

Then I added a UnityGame component and it handles everything related to the Unity game: has the canvas and other required HTML elements, some styling and calls the `useUnityLoader` script. Now I can add the UnityGame component to any Unity game and pass in the `buildUrl`, `projectName`, `gameName`, `gameVersion` and `isGzipped` as props. Everything else is handled automatically.

So in short, all I have to do to add a new Unity game is:

```vue
<template>
  <div class="target-practise-game">
    <UnityGame
      buildUrl="/unity-games/target-practise/Build"
      projectName="targetPractiseBuild"
      gameName="Target Practise"
      gameVersion="1.0"
      :isGzipped="false"
    />
  </div>
</template>

<script lang="ts">/* Imports and component registration */</script>
````

That's it!

Another problem I had was with the graphics. I spent ages trying to figure out why the web version's lighting looked horrible. Eventually I realized that the build graphics settings were set to fast by default (really frustrating) sol I just changed it to good or fancy or something.