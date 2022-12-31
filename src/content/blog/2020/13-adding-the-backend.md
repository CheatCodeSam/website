---
id: 13
title: "Adding the Backend"
createdAt: Sun Feb 23 2020 02:00:00 GMT+0200 (Eastern European Standard Time)
---

In this month I have been diving deep into the world of backend. I've been learning Nest.js, which is a framework for creating Node.js server side applications. I set up a Postgres database, which also involved using TypeORM (ORM = Object-relational mapping). I also had to learn how to use async/await syntax and how HTTP requests work (roughly). I used a JavaScript library named Axios for making requests to the server. I'm still very new to backend stuff and have to constantly look at the documentations, but now I have atleast a shallow understanding of how things work under the hood.

## So why do I need all of this backend stuff?

I finally started working on an admin system for this website. This system makes it possible for me to create, edit and delete news posts. To make it work properly and securely, I had to make a login and authentication system, a database to store all of the news posts in and a UI for everything (that only I, the admin has access to). Being able to write these news posts from the website itself is much nicer in comparison to writing the text directly into the HTML file. This also made me want to improve the news post system overall. Now I can also add code snippets with syntax highlighting enabled. I used a library called Highlight.js for the syntax higlighting. Check it out!

```ts
// This is a totally useless script that adds 1 to num until num is 10!

let num = 0;

function add() {
  num++;
}

// Test
for(let i = 0; i < 10; i++) {
  add();
}
```

This makes it possible for me to show some of my code, which could be useful in some cases (plus it looks nice). This admin system is still kind of "bare-bones" but I will keep adding features, cleaning some code a bit more, adding better backend error handling and validation.