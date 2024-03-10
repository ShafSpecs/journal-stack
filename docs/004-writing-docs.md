# Write some content ✍️

Each theme has unique perks and features available within the docs system, this could include unique frontmatter fields, custom components, etc. In this doc, we would be exploring the ones available for Remix PWA theme and how to start writing your own docs.

## Doc Types

Firstly, all docs live within the `posts` folder. This folder contains all docs for your site across all versions.

The `posts` folder contains a special, compulsory file: `versions.json`. This file contains all the versions available for your docs (even if it's just one). An example of this file is shown below:

```json
[
  {
    "version": "2.0.0",
    "tag": "main"
  },
  {
    "version": "2.1.0",
    "tag": "dev"
  },
  {
    "version": "1.0.0",
    "tag": "1.0.0"
  }
]
```

Basically an array of objects, each object contains two fields:

- `version`: The version of the docs
- `tag`: The tag of the docs. This is used to determine the route of the docs. For example, if the tag is `main`, the docs would be available at `docs/main`. If the tag is `1.0.0`, the docs would be available at `docs/1.0.0`. This is useful for versioning your docs. Actually, this is the only compulsory field, I have no idea why I added the `version` field and why it's still there 😅.

## Versioning

Being able to manage your docs versions is a very important feature of any documentation system. Journal Stack makes this easy by allowing you to create new versions of your docs with ease.

For each version tag defined in `versions.json`, a folder is created within the `posts` folder with the name of the version. This folder contains all the docs for that version. For example, if you have a version with tag: `1.0.0` defined in `versions.json`, a folder named `1.0.0` would be created within the `posts` folder. This folder would contain all the docs for that version.

That's how it works! Basically, no magic involved (...maybe a little 🧙‍♂️)!

## Writing Docs

Now unto the sweet part! Writing docs! 🥳

We have some mini ground rules to cover here, don't worry, there are just two.

### Index Files

These are special files, for example, if you navigate to <https://remix.run/docs/en/main>, you would notice no post is highlighted in the sidebar and also, there is no special "slug" assigned to this page. It is the landing page of this version of the docs. This is what we call an index file in Journal Stack.

They aren't a must, but if you want them you can do so by creating a file named `_index.mdx` within the root of your version folder. This file would be used as the index file for that version.
Don't worry if it isn't available, the docs would automatically take care of redirecting you to the first post available in that version.

> [!IMPORTANT]  
> This is where we come to the first and a half ground rule: All your posts must be in `mdx` format. **Zero Exceptions**. Except the next rule, of course.

### Creating Sections

Sections are a way to group your docs into categories. For example, if you are building a caching library for Remix, sections could include a "Getting Started" section, a "API Reference" section, and more. Sections are created by creating a folder within the root of your version folder. This folder would be used as the section folder for that version.

> [!NOTE]  
> What you name them isn't important!

So how do we order them and give them names like "Getting Started", etc.? Well, we use what I call: **Section Frontmatter**. This is a special `index.md` files that contain just frontmatter about that section. An example is shown below:

```yml
---
title: Getting Started
order: 1
---
```

There are only two fields available for section frontmatter:

- `title`: The title of the section. This is where you specify the name of the section.
- `order`: The order of the section. This is used to order the sections in the sidebar. The lower the number, the higher the section would be in the sidebar. So, 1 would be higher than 2, 2 would be higher than 3, and so on.

In case you are getting confused, our `posts` file tree resembles the following:

```plaintext
posts
├── versions.json       # This is the versions file
├── 1.0.0
│   ├── _index.mdx      # Optional. This is the index file for this version
│   ├── getting-started # This is a section folder
│   │   └── index.md    # This is the section frontmatter file defining the title and position of this section
│   └── api-reference   # This is another section folder
│       └── index.md    # This is the section frontmatter file defining the title and position of this section
└── 2.0.0               # This is another version folder. Same rules apply here
    ├── _index.mdx
    ├── getting-started
    │   └── index.md
    └── api-reference
        └── index.md
```

### Writing Docs, for real this time

Now that we have covered the basics, let's get to the real deal: writing docs!

Writing docs is as simple as creating a file within a section folder. That's it! The file name would be used as the slug for that post. For example, if you create a file named `installation.mdx` within the `getting-started` section folder in the `main` version folder, the slug for that post would be `/docs/main/installation`.

#### Frontmatter

Let's dive into the frontmatter available for posts:

> [!NOTE]
> These also apply to the special `_index.mdx` file too!

- `title`: The title of the post. This is used to display the title of the post in the sidebar.
- `alternateTitle` (optional): This is a shorter version of the title. It is used to display the title of the post in the sidebar and footer, if it is available. If it isn't available, the `title` field would be used instead.
- `order` (optional): The order of the post. This is used to order the posts and arrange them
one after the other. If it isn't available, the posts would be ordered alphabetically.

> [!CAUTION]
> You can decide to use `order` for some posts and not for others. However, if you decide to use `order` for some posts, you must use it for all posts within that section. If you don't, the posts without `order` would be placed at the bottom of the section.

- `description` (optional): The description of the post.
- `toc` (optional): This is a boolean value that determines whether a table of contents should be generated for this post. If it isn't available, a table of contents would be generated for the post.
- `hidden` (optional): This is a boolean value that determines whether the post should be hidden from the sidebar. **Make sure to set to `true` within the `_index.mdx` file!**

#### Remix PWA Compoents

The Remix PWA ships with quite a lot of plugins and components that you can use to enhance your docs.

Checkout out: <https://journal-stack.fly.dev/docs/main/examples>

## Syncing your docs

To sync your docs, push to the `main` branch (can be customised from within the actions). That's it! Github actions would take care of the rest. No need to re-deploy.
