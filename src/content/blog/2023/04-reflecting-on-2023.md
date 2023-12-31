---
id: 4
title: "Reflecting on 2023"
description: "2023 has been a busy year. Let's `Reflect`!"
createdAt: 2023-12-31
---

2023 has been an incredible but very busy year for me. Balancing school, free time, and a rapidly growing programming project has been a challenge that I'm still struggling with, but it has certainly helped me grow as both a developer and a person.

Now, as the year is coming to a close, I thought I'd reflect a bit to see what I've achieved and learned, and what the future holds.

## The `bevy_xpbd` Physics Engine

### Journey to 0.1

On May 29, 2022, I made my first ever commit to my physics engine [`bevy_xpbd`](https://github.com/Jondolf/bevy_xpbd) for the [Bevy game engine](https://bevyengine.org/). I had started the project by coding along [Johan Helsing's tutorial series](https://johanhelsing.studio/posts/bevy-xpbd), but quickly reached the end. Following the XPBD papers and looking at other engines for reference, I kept adding more functionality for a couple of months, but around the start of August… I stopped. For a while.

The next commits are from the end of February 2023. I had finally found some motivation and time to work on the project a bit more, and was attempting to get it to a releasable state by summer. I didn't really have plans for the future yet, but I had seen some increasing interest in an ECS-based physics engine on the Bevy Discord, which showed that my project had some potential.

At the start of March, I got a notification. The [first ever issue](https://github.com/Jondolf/bevy_xpbd/issues/1) on the `bevy_xpbd` repository. It is **by the creator of the `bevy_xpbd` [tutorial series](https://johanhelsing.studio/posts/bevy-xpbd)**, Johan, and it's titled: *Licensing and future of xpbd-based physics in bevy*. Honestly, I was initially terrified seeing this popping out of nowhere, thinking I had done something wrong as a naive teenager, but that fear quickly turned into relief and excitement after seeing what it was actually about. Johan was glad that the tutorial series had inspired a project with a larger scope, and opening the door for future collaboration.

This, along with an increased interest in the project on Discord, made me incredibly motivated. Over the next month, I made *a ton* of improvements and additions. I was also getting some issues and PRs already, and this was my first time doing any open source collaboration.

On the 19th of June, I finally released [bevy_xpbd 0.1](/blog/02/bevy-xpbd-0-1-0). It was met with overwhelming support and excitement that is still a bit hard for me to believe, and I'm forever grateful for it.

### Life after Launch

The launch of 0.1 made me extremely motivated, and within a couple of weeks I had already implemented the main feature for 0.2, [spatial queries](https://docs.rs/bevy_xpbd_3d/0.2.0/bevy_xpbd_3d/plugins/spatial_query/index.html). I was on summer vacation, so I had time to work on the project almost daily.

Perhaps the biggest change compared to pre-0.1 times was that I was now a proper project maintainer that was getting more contributions, bug reports, and questions about the project. This took some getting used to, but I was enjoying it all. It felt very gratifying seeing all of the interest, even if it was a report about a nasty bug that I'd spend the next week tracking down (okay, perhaps *that* isn't as gratifying…)

I managed to [release 0.2](/blog/03/bevy-xpbd-0-2-0) just under a month after 0.1, on the 13th of July. Again, I got a ton of support, and I felt like adding spatial queries was a massive step towards a fully usable engine.

### Struggles with Balance

"Fully usable engine"

![Cubes falling to the ground, drifting and jumping around](/blog-assets/contact_instability.webp)

Yeah, there were still some *serious* collision issues. Collisions were often explosive, bodies were drifting all over the place, dynamic friction broke the laws of physics, colliders couldn't be scaled, child colliders didn't work… it was honestly trash, looking back at it.

Contact stability issues had been haunting me since 0.1 and child colliders were a nightmare to implement in a stable manner, but through sheer determination I managed to *finally* fix all of these issues (mostly). It wasn't just me though, I got a lot of help from others debugging and improving stability. Huge thanks for that!

I managed to release the massive [0.3](https://github.com/Jondolf/bevy_xpbd/releases/tag/v0.3.0) update on the 5th of November. This is a much larger amount of time than the time between 0.1 and 0.2. Several factors were at play here.

1. **I'm a perfectionist.** The goal for 0.3 was to fix contact stability and add child colliders, and I didn't want to settle for just a minor fix. I had to fix *all* known issues that I knew I could reasonably fix.
2. **Scope creep caught me.** I get easily distracted, and when I notice a feature that I *could* implement, I tend to think that I *have to* implement it. I didn't want just a subset of what I had originally planned, and new ideas for additions also kept coming up.
3. **There was more attention.** As the project kept rapidly growing and getting more users, I was getting more and more issues and people asking for help. This is wonderful, but also takes some time and energy.
4. **I had matriculation exams in September.** This took time away from development. and honestly should've taken a lot more; I spent way too much time on development rather than school. Trying to split my attention even though school was more important was tiring.

Overall, the 0.3 release cycle was a struggle for balance. I had tons of things going on at once, and perhaps prioritized the wrong things. In hindsight, the release should've been split in two, and I should've focused more on school.

Still, 0.3 was an amazing release, and I'm proud of what I accomplished. This time, it felt like `bevy_xpbd` had truly become a fully usable physics engine, aside from a few more important missing features.

## Becoming a Bevy Contributor

One of the biggest missing pieces preventing the adoption of an official physics engine for Bevy is that we don't have a [Glam](https://github.com/bitshifter/glam-rs)-based collision detection library.

The only viable collision detection crate in the Rust ecosystem is [Dimforge](https://dimforge.com/)'s [Parry](https://parry.rs/), which uses the [Nalgebra](https://nalgebra.org/) math library. Bevy doesn't want duplicate math dependencies because it's (1) confusing for users to have APIs that use different math types, and (2) just an extra dependency that takes space and increases compile times. In addition, Parry has several weird and longstanding bugs that still haven't been fixed, and the project's activity is quite low.

My long-term goal is to fix this with a custom collision detection library that uses Glam and integrates well into Bevy. Ideally, the colliders could use the same shapes that are used elsewhere in the engine for e.g. primitive meshes.

Well, would you look at that, there was an [RFC](https://github.com/bevyengine/rfcs/blob/main/rfcs/12-primitive-shapes.md) to add geometric primitives to Bevy! It was over a year old, but recently *@NiseVoid* made a [PR](https://github.com/bevyengine/bevy/pull/10466) for an initial implementation.

We've been building on this ever since, and I made my first contributions to Bevy. I've been reviewing PRs, making several issues, and implementing lots of improvements like [`Ray2d` and `Ray3d`](https://github.com/bevyengine/bevy/pull/10856) and [meshing for the primitives](https://github.com/bevyengine/bevy/issues/10569). I plan to use these primitives for an abstraction over `bevy_xpbd`'s `Collider` APIs, and later on use them for the collision detection library I'm working on.

Contributing to a large project like this has been a great experience, and it really feels like I'm making an impact. I don't want to be stuck in my "physics hole" even if that is my main priority, but rather help make the entire Bevy ecosystem better overall through contributions and being an active member in the community. These geometric primitives have been (and still are) a great entrance to contributing to Bevy, and I hope to continue building on them in 2024!

## Lessons Learned

Balancing all of these responsibilities and interests has taught me a lot about myself as a person and software developer. I think it's valuable to do some personal `Reflect`ion.

### Perfectionism

In a sense, I've always been what I call "a selective perfectionist".

If I'm doing boring homework, I don't really care what the end result looks like. No one will ever look at it or care about it, and I'll most likely forget about it anyway.

However, if I'm working on something important or something I care about, I obsess over every detail. If I'm writing an essay, I read it over dozens of times, looking for the tiniest grammatical mistakes or ways to word things better. If I'm giving a presentation, I make sure every slide has a consistent yet aesthetic visual style, checking that everything aligns perfectly and nothing looks out of place. If I'm working on a feature for `bevy_xpbd`, it must be as good as I can make it at that time, however long it takes.

Maintaining a high quality standard (in general) is something I pride myself on, but it can be exhausting and lead to writer's block. If everything must be perfect and complete before shipping, it's likely that it will never be shipped at all. The task at hand seems way too daunting, and you lose motivation.

Finding balance between perfectionism and productivity is something I've been trying to improve at. I find it good to have perfectionistic qualities, as it encourages you to try your best and make high quality work, but it's also important to recognize that, in most cases, mediocrity is enough. Shipping early and building on it later is often better, and this is something I've also learned contributing to Bevy.

That being said…

### Impulsiveness

I'm perfectionistic, but often a bit impulsive. What?

I feel like I'm excited to show off my work *too* early. I won't release it *officially* because of my perfectionism, but I *will* show what I've made. This is generally fine, but it can sometimes give people the wrong idea or make them comment on it before I have anything close to done.

This sometimes also extends to communication. I tend to respond to messages as soon as I've read them, which a lot of people appreciate, but at times, I haven't stopped to think things through properly. Sometimes this can lead to me arguing for e.g. features or changes I'm not sure I even agree with. In these non-trivial cases, I should generally be more patient and consider things more thoroughly before responding.

I'm also easily distracted and quite easy to [nerd snipe](https://xkcd.com/356/). If I see something interesting, I want to work on it immediately, at the expense of what I was just working on. This is still just a hobby for me, so it's not a big deal, but I should aim to prioritize and plan my work better and focus my efforts there instead of arbitrarily bouncing between tasks.

## Goals for 2024

### Bevy and `bevy_xpbd`

I believe 2024 could be a huge year for Bevy. Bevy is finally starting to make ground on scene and UI improvements that will allow us to build an official editor at last.

I also have some pretty lofty goals for `bevy_xpbd`:

- Rework joints
- Add joint motors
- Add Continuous Collision Detection (CCD)
- Ensure proper cross-platform determinism
- Develop a custom Glam-based collision detection library using Bevy's primitive shapes and replace Parry with it in `bevy_xpbd`
- Further improve modularity, support alternative numerical integrators and solvers (e.g. Sequential impulses instead of XPBD)
- Experiment with the idea of a single crate for both 2D and 3D, handling the different dimensions using separate components like `RigidBody2d` and `RigidBody3d` (and lots of traits)
- Experiment more with soft bodies
- Reach performance the same or better as the Rapier physics engine

These are all some very big tasks, but I believe we can reach a lot of them. I'll have more matriculation exams in March, which will make me inactive for a while, but afterwards, I believe I will have over four months where I should be free to develop the engine very actively.

 Once we have Glam-based collision detection, alternative solvers, great performance, and have figured out the best approach for the 2D/3D split, I believe we will be in a great spot for official adoption! Of course, this will require lots of deliberation in the community as well, because `bevy_xpbd` is not the only option we have. Either way, the work done and lessons learned will be highly valuable regardless of the direction we choose.

### Personal Goals

On a more personal note, I will try to work on balance. As I have mentioned in this blog post, I have struggled with maintaining balance between school, software development, and free time, as well as things like perfectionism vs. productivity and impulsiveness vs. careful consideration. Balance is vital to a healthy life and crucial to avoiding burnout.

To do this, I will try my best to:

- **Have a schedule and plan.** I need to have a schedule for when I will focus on school, when I will work on development stuff, and when I will do something completely different. This doesn't need to be anything complicated or strict, but some kind of structure that I try my best to stick to. A schedule would also help reduce distractions and impulsiveness.
- **Accept "good enough".** Sometimes it's better to ship early and improve later rather than obsess over the details and ship late (or never). This doesn't meant that I should accept poor quality or anything, just that I should be more reasonable about goals and to avoid scope creep.
- **Sleep**. My sleep schedule has been horrid for a while now, partially because I might be debugging or conversing with people on Discord at late hours and I often feel like I *have to* respond as soon as possible. I should just have a rule not to respond after e.g. 10 PM, and leave it for the next day. Sleep is crucial for health, and better habits would improve my energy levels and overall well-being, which would also boost productivity.

I'll kick this off by making a schedule tomorrow. We'll see how long I can keep it up :)

## Closing Thoughts

2023 has been one of the best years of my life for several reasons, even if it hasn't been without challenges. This is my final year of high school, and having to leave it all behind after spring is bittersweet. I'll just have to make the most out of the remaining time that I do still have.

After summer, I'll be going to university, which will be another exciting experience that will open up brand new horizons. I have a feeling that the introductory programming courses will be quite a breeze!

This has been a wonderful year for me, and I hope it has been for you too. Thanks for all the support, and may everyone have a wonderful New Year 2024!
