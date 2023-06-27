---
id: 2
title: "Bevy XPBD: A physics engine for the Bevy game engine"
description: "Bevy XPBD 0.1.0 has finally been released on crates.io!"
createdAt: 2023-06-27
tags:
  - "Physics"
  - "Simulation"
  - "Rust"
  - "Bevy"
thumbnail: "@assets/bevy_xpbd_newtons_cradle.webp"
thumbnailAlt: "Newton's cradle in Bevy XPBD"
links:
  -
    url: "https://github.com/Jondolf/bevy_xpbd"
    text: "GitHub"
    img: "@assets/github-mark-white.png"
    imgAlt: "GitHub logo"
  -
    url: "https://crates.io/crates/bevy_xpbd_3d"
    text: "crates.io"
    img: "@assets/crates_io_logo.png"
    imgAlt: "crates.io logo"
---

I've been working on a Rust-based physics engine for about a year now, and a week ago I finally released it. Here is [Bevy XPBD](https://github.com/Jondolf/bevy_xpbd) 0.1.0!

## What is Bevy XPBD?

Bevy XPBD is a 2D and 3D physics engine for [Bevy](https://bevyengine.org), a refreshingly simple data-driven game engine built in Rust.

It uses a newer physics simulation method called *Extended Position Based Dynamics*, which provides unconditionally stable, time step independent, and physically accurate simulations. Unlike other physics engines in the Bevy ecosystem, Bevy XPBD is made specifically *for* Bevy *with* Bevy, and it uses the *Entity Component System* (ECS) for both the public API and the internals.

Bevy XPBD 0.1 already has tons of features, including these:

- Dynamic, kinematic and static rigid bodies
- Collision detection and collision response
- Collision events
- Access to colliding entities
- Sensor colliders
- Collision layers
- Restitution and friction
- Gravity, external forces and torque
- Joints
- Built-in XPBD constraints and support for custom constraints
- Modular plugin architecture, allowing you to swap existing functionality with custom implementations
- Configurable timestep and subtepping

## Getting started

If you are new to Rust or Bevy, you should go through Bevy's [Getting started guide](https://bevyengine.org/learn/book/getting-started/).

Once you are ready, you need to add Bevy XPBD to your `Cargo.toml`. You should use `bevy_xpbd_2d` for 2D projects and `bevy_xpbd_3d` for 3D projects.

```toml
[dependencies]
bevy_xpbd_3d = "0.1.0"
```

By default, Bevy XPBD uses `f32` numbers. If you encounter instability or use a large number of substeps, you might want to use `f64` instead. You can disable the default features and manually specify the feature flags you want:

```toml
[dependencies]
# Add 3D Bevy XPBD with double-precision floating point numbers
bevy_xpbd_3d = { version = "0.1", default-features = false, features = ["3d", "f64"] }
```

Next, add the `PhysicsPlugins` plugin group. Bevy XPBD is highly modular, and this plugin group adds all of the default physics plugins to your application.

```rust
use bevy::prelude::*;
use bevy_xpbd_3d::prelude::*;

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_plugins(PhysicsPlugins)
        // ...your other plugins, systems and resources
        .run();
}
```

Now you can use all of Bevy XPBD's components and resources to build whatever you want! For example, adding a rigid body with a collider is as simple as spawning an entity with the `RigidBody` and `Collider` components:

```rust
fn setup(mut commands: Commands) {
    commands.spawn((RigidBody::Dynamic, Collider::ball(0.5)));
}
```

To learn more, refer to the [official documentation](https://docs.rs/bevy_xpbd_3d/0.1.0/bevy_xpbd_3d/) and check out the [GitHub repository](https://github.com/Jondolf/bevy_xpbd) and the [2D](https://github.com/Jondolf/bevy_xpbd/tree/main/crates/bevy_xpbd_2d/examples) and [3D](https://github.com/Jondolf/bevy_xpbd/tree/main/crates/bevy_xpbd_3d/examples) examples.

## Why make a physics engine for Bevy?

I started development purely out of interest. I had been playing around with Bevy for a little while when I saw a [tutorial series by Johan Helsing](https://johanhelsing.studio/posts/bevy-xpbd) where he created a simple XPBD physics engine for Bevy from scratch. I had seen a [Two Minute Papers video](https://www.youtube.com/watch?v=F0QwAhUnpr4) on the topic earlier, so I decided to follow the tutorial and build along.

The tutorial series wasn't/isn't finished yet, so I quickly reached the end. I had 2D objects colliding realistically with each other, but lots of features were missing: friction, 3D support, joints, and a lot of other common physics engine capabilities. I decided to continue developing the engine, reading academic papers on XPBD and taking inspiration from existing physics engines like [Rapier](https://rapier.rs/).

As I continued adding features and improving the API, I realized that I was actually starting to have a decently functional physics engine. I started seeing some interest in my engine on the [Bevy Discord server](https://discord.gg/bevy), and I realized that this was truly a lacking area in the ecosystem. Bevy doesn't have an official physics engine yet, and `bevy_rapier` is essentially the only good option, but it's just a wrapper over Rapier and doesn't use Bevy's ECS for any of its internals. People would prefer a more native solution that is made specifically for Bevy and uses the ECS directly instead of relying on a separate physics world and synchronizing a monolithic data structure with the Bevy world.

This is what I am trying to accomplish with Bevy XPBD. As far as I know, it is the only pure Bevy ECS physics engine that is currently maintained, and I hope to continue on this road to help improve the state of physics in the Bevy ecosystem.

## What's next?

Bevy XPBD is already quite usable in many cases, but it is missing several important features, and there are some stability and performance issues. Keep in mind that the engine is very young and physics engines can be quite massive, so it can take a while to reach a production ready state.

0.2 will be released in a couple of weeks, right after the release of Bevy 0.11. Here are some of the features and improvements that I have in mind:

- Update to Bevy 0.11
- Spatial queries
	- Ray casting
	- Shape casting
	- Point projection
- Filters for collisions and spatial queries (exclude entities etc.)
- Multiple colliders per body
- Collider offset and scale
- Bug fixes and documentation improvements

Further into the future, I am planning on implementing some of these features:

- Physics scale (e.g. pixels per meter)
- Joint motors
- Soft bodies and cloth simulation
- Locking translational and rotational axes
- Parallel solver to improve performance
- Full cross-platform determinism
- A website for WASM demos

Note that after 0.2, development might be a lot more inconsistent for a while because of my studies, as I will be graduating from high school next year, and I will have my matriculation exams in September and March. However, I will try to keep up with Bevy releases and respond to issues and questions, and I hope to work on the engine more actively once I am done with my exams.

## Acknowledgments

Huge thanks to everyone on the [Bevy Discord server](https://discord.gg/bevy) who has been interested in the project and helped me get this far, and especially to [Johan Helsing](https://johanhelsing.studio/) who inspired me to originally begin development and later helped me with the project. Without your help I would have probably stopped development and abandoned the project, and I am very glad I didn't.

It's crazy to me how we have reached over 120 stars on GitHub just a week after release, and I think it just shows how much the community wants a native physics engine that is made specifically for Bevy in an ergonomic ECS-based way.

I hope to continue working on Bevy XPBD as much as I can, and to continue being a part of the amazing community. Stay tuned for the next update in a couple of weeks when 0.2 is released!
