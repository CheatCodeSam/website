---
id: 15
title: "Update to the News Post Writing System"
createdAt: Sun Apr 12 2020 03:00:00 GMT+0300 (Eastern European Summer Time)
---

So this week I remade the system for writing news posts. With the old system that I had created, I had to write HTML-code into the news post. For example, if I wanted to make some text **bold**, I had to add <b>**insert some text here**</b> tags around the text. This got increasingly more annoying when I added more complex things like images, lists or tables.

## The new system

Instead of my old system that I had made, I decided to use an open source rich renderless text editor that integrates well with Vue.js. That text editor is called [tiptap](https://tiptap.scrumpy.io/).

tiptap was quite easy to set up and is easily extendable and styleable. I copied a bunch of code from [tiptap's GitHub repository](https://github.com/scrumpy/tiptap) and edited it to my needs. I originally actually added the system to a notetaking app project that I started working on a month ago (it's not even close to finished) and it seemed to work really well with a little work, so I decided to add it to Gamitopia as well. I might talk about the notetaking app at some point if I actually end up finishing it, but for now I'll stick to talking about the news post system.

With the new system I can make text **bold**, _italic_, strikethrough, underline, add code blocks, links, images, tables, lists and more by just pressing a button or using a keyboard shortcut, like Ctrl+b for bold or Ctrl+i for italics. It also supports markdown, so I can add headers by typing # symbols followed by a space and much more.

This new system is way more convenient than the old one and it also supports mobile way better, because adding <> symbols is annoying and inconvenient on mobile and now I can just press one button.

I also did some other changes and fixes. I added a custom scrollbar (which may not work on older browsers), fixed some styling errors regarding news posts, added different symbols for nested lists, added confirmation prompts if you're trying to go to a different page or refresh when editing or creating a news post and more.

---

## A note on the corona situation

I have been at home doing school work and you'd think that I would have more time for coding and hobbies. For me it's the opposite. We've had more school work than we normally do, maybe because the teachers might think we have too much free time currently. Anyway, I haven't been able to do much stuff for Gamitopia in a few weeks. Last week I finished most school stuff so I have had some free time this weekend and made this system. I will continue to improve it and will also do updates to games and stuff when I can, so stay tuned. In the meanwhile, please stay home as much as possible stay healthy for your, mine and our well-being. Try to also find the positives in this situation and use your free time to learn new skills or improve your lifestyle. This could be a good time to learn coding or anything else.