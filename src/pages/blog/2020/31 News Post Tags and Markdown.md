---
id: 31
title: "News Post Tags and Markdown"
tags:
 - UI
 - Feature
 - Backend
createdAt: Sat Sep 05 2020 03:00:00 GMT+0300 (Eastern European Summer Time)
---

I finally added tags to news posts and also updated the news post text editor.

## Tags

So the tags basically tell what "categories" each post belongs to. For example, this news post has the tags _UI_,  _Feature_ and _Backend_. The previous post about Target Practise has the tag _GameRelease_.

It was pretty easy to implement. I updated the backend a bit by adding `tags` to the `News` entity and updated some frontend interfaces and components to use tags.

For getting the correct color for each tag, I wrote a composable:

```ts
export function useNewsPostTags() {
  // The colors for each tag
  const tags = {
    anniversary: { backgroundColor: 'rgb(225, 0, 175)', textColor: 'white' },
    gamerelease: { backgroundColor: 'rgb(75, 150, 255)', textColor: 'white' },
    gameupdate: { backgroundColor: 'rgb(75, 200, 100)', textColor: 'white' },
    ui: { backgroundColor: 'rgb(60, 225, 100)', textColor: 'white' },
    feature: { backgroundColor: 'rgb(200, 0, 200)', textColor: 'white' },
    fix: { backgroundColor: 'rgb(175, 175, 0)', textColor: 'white' },
    backend: { backgroundColor: 'rgb(200, 50, 50)', textColor: 'white' },
    code: { backgroundColor: 'rgb(125, 125, 150)', textColor: 'white' }
  }

  // This is used for getting the colors for each tag
  function getTagByName(tagName: string): Tag {
    // Find the correct tag from tags and if it's not found, use default values
    const tag: Tag = tags[tagName.toLowerCase()] ?? { backgroundColor: 'rgb(175, 175, 175)', textColor: 'white' };
    return tag;
  }

  return { getTagByName }
}
```

To get the color of each tag, just call `getTagByName` with the tag's name. Case doesn't matter because it transforms everything to lower case, so you can use gamerelease, GAMERELEASE, GameRelease or GaMeReLeAsE.

To add tags to a news post, I can write a comma separated list: UI, Feature, Backend. It will transform that string to an array: ['UI', 'Feature', 'Backend'] and send it to the database.

At some point I'll make it possible to search by tag, kinda like hashtags. You would write #TagName in the searchbar and the posts with that tag would show up.

## Markdown

As I mentioned in the anniversary post, [tiptap](https://tiptap.dev/) doesn't seem to support Vue 3 yet. I also had some line break problems with tiptap. I decided to replace tiptap with markdown.

There's multiple benefits: markdown can be written almost anywhere, it won't have compatibility issues and it will probably never go away. Currently I'm writing this in [StackEdit](https://stackedit.io/), a markdown editor. It's really convenient and I can sync it with Google Drive, so I have an automatic backup. Then I can paste the markdown into the news post editor and publish the post. When I have more time, I'll make a proper built-in markdown editor on Gamitopia as well, as currently it's just a textarea.

In terms of features, markdown has almost everything that tiptap has (I think). Now I can also add alt descriptions to images and manually specify the syntax highlighting language for code blocks. That wasn't possible in tiptap, unless you manually make a plugin for it. I believe that [MarkdownIt](https://github.com/markdown-it/markdown-it), the markdown parser that I'm using, also supports custom rules and extensions.