---
id: 32
title: "News Post System Updates and More"
tags:
 - Feature
createdAt: Sat Sep 26 2020 03:00:00 GMT+0300 (Eastern European Summer Time)
---

Today I updated the news post system yet again. I improved the news post Markdown editor, improved code syntax highlighting, added support for adding safe HTML to news posts and more.

Read along for more detail.

## Improved Markdown editor

I made the news post Markdown editor show the editor on the left and a preview on the right. Earlier I had to press a button to toggle between editor and preview.

It's nicer in many other ways too. The Markdown has syntax highlighting now and it looks better. Every time I type something, it highlights everything. I had a problem where the cursor/caret would always go to the start of the text, because the highlight modified the DOM. I did a hacky solution: I put a perfectly lined up `<textarea>` on top and only highlighted the code block below. It's not ideal, but it works.

The editor is still slightly unfinished, but it's already quite nice. Below is a screenshot of the editor, as you can't actually see it normally:

![New Markdown editor](/img/screenshots/new_markdown_editor.jpg)

## Light code

When the light theme is on, code blocks have a light theme.
I have two highlight.js CSS stylesheets. The other is for the light theme and the other for the dark theme. I disable/enable one of the stylesheets to change the code coloring.

## Safe HTML in Markdown

I can now use almost any HTML in these news posts. I can put things like `<span>Some text</span>` in the Markdown and it's rendered in the news post as HTML.
The cool thing is that I can now add color to text, change fonts and more. I also added the [Merriweather font](https://fonts.google.com/specimen/Merriweather).

Having HTML as is would be a security risk. If someone managed to get access to this editor, they could add `<script>` tags and run any JavaScript code. You could also probably add onclick-attributes everywhere to run potentially bad code.
I fixed this problem by using [sanitize-html](https://www.npmjs.com/package/sanitize-html). It allows me to whitelist tags and attributes while stripping out everything else. I can now choose what tags, attributes and styles I allow. I also sanitize the news posts in the backend, so you shouldn't be able to get anything "bad" through in any way.

Below are a few examples of using HTML in the Markdown (also, *tables!*).

| **HTML**                                                                                              |                                                                                        **Rendered** |
| ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------: |
| `<span style="color: rgb(255, 255, 0)">Yellow text</span>`                                            |                                            <span style="color: rgb(255, 255, 0)">Yellow text</span> |
| `<span style="background-color: rgb(255, 255, 0); color: rgb(0, 0, 0)">Yellow background text</span>` | <span style="background-color: rgb(255, 255, 0); color: rgb(0, 0, 0)">Yellow background text</span> |
| `<span style="font-family: 'Merriweather'">Serif text</span>`                                         |                                         <span style="font-family: 'Merriweather'">Serif text</span> |

---

I also improved some stylings. I found some pretty messy code, so I'll probably clean that up at some point as well.

I also kind of want to learn React and potentially React Native. At some point, I could make another Android app, this time with React Native. It'd be cool to be able to properly use Vue, Angular and React. I won't be making the app anytime soon though, because I have quite a lot of school stuff and exams to do, and making apps takes a lot of time.