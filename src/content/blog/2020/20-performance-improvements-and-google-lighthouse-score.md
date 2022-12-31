---
id: 20
title: "Performance Improvements and Google Lighthouse Score"
createdAt: Fri May 22 2020 03:00:00 GMT+0300 (Eastern European Summer Time)
---

For the past week I've been trying my best to improve my Lighthouse rating. For those of you that don't know what Lightouse is, it is a test made by Google that gives you a rating from 0 to 100 about different aspects of your website, such as performance, accessibility and SEO (Search Engine Optimization). Then it gives you tips on how to improve those scores. Adding PWA support (read previous post) was a part of improving the score and involved adding service workers and such.

My old score kinda sucked. The performance was really bad and the page didn't even have `<meta>` tags to improve SEO. `<ul>` elements had **entire components** inside of them, requests weren't compressed, images were way too big and the connection wasn't always HTTPS.

Below is a screenshot of the old really bad score taken on the games page. The score will vary depending on the page. I believe this screenshot was taken before adding PWA support.

![](/img/screenshots/gamitopia_games_page_old_lighthouse.jpg)

As you can see, it's really bad, especially in terms of performance. Then I started making lots of improvements.

As I said in the previous post, I did all the PWA stuff. Then I made the game thumbnails as small as I can without losing quality in .jpg format. I also added a [prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin) with the jsdom renderer, as puppeteer didn't seem to work. I deleted some useless code and plugins and compressed requests (in gzip) using [Express's compression middleware package](https://docs.nestjs.com/techniques/compression) in Nest.js. Then I finally redirected from HTTP to HTTPS with the [express-sslify](https://www.npmjs.com/package/express-sslify) module. I also did some other improvements such as adding meta descriptions and keywords but I don't remember all of the changes.

Below is the much better score.

![](/img/screenshots/gamitopia_games_page_new_lighthouse.jpg)

The performance isn't perfect yet, but it's definitely a lot better. I fixed all the easy yet important things, which shows in the accessibility and best practises. The best practises score isn't 100 because it "**Does not use HTTP/2 for all of its resources**" but there unfortunately currently is nothing I can do as Heroku doesn't seem to support HTTP/2.

Also, I ran into a problem that still isn't quite fixed, therefore the PWA score isn't perfect. All pages except the home page don't work in offline. Initially I noticed that upon refresh a forward slash was added to the route like /games/ instead of /games. I thought that the service workers are not recognizing both routes and not serving the application (Google Lighthouse said something like that). I tried to fix it by trying to remove the slash, which I didn't manage to do so instead I _added_ a slash to all routes, which should stop the reroute. This solution isn't optimal so I'll try to fix it properly eventually. This however still didn't fix the problem and all pages still didn't work offline. I found that by default the service workers (if I understood correctly) only served the root file, the home page. I haven't fixed this yet as it isn't critical but I'll try to fix it soon.

Anyway, improving the score was definitely worth it and I'll keep on improving it when I feel like it. My summer vacation starts after next week (hooray!) so I will have even more time to code.