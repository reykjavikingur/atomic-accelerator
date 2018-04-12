# atomic-accelerator

Atomic design system prototype accelerator

The purpose of this application is to serve as an accelerated starter kit to create prototypes of atomic design systems.

You begin with a simple web site, add your own SASS and Handlebars code in place while running Browser-Sync
to customize an implementation of an atomic design system.

It automatically generates searchable documentation.

## Step 1: Clone

Either clone the repository directly from Github,
or if you want to be really cool, use `gnat`:

* `npm install -g gnat`
* `gnat clone reykjavikingur/atomic-accelerator YOUR-CUSTOM-DIRECTORY`

## Step 2: Install

* `cd YOUR-CUSTOM-DIRECTORY`
* `npm install`

## Step 3: Run

`npm start`

This will start a server with Browser-Sync on your localhost and automatically open the "trace" page,
the starting point of the automatically generated documentation.

## Step 4: Code

Add and edit files and see changes live-reload.

## Create a component

Create an "hbs" file under `views`.

## Create a page

Create a "js" file under `views` with the same base name as an "hbs" file.

## Create a stylesheet

Create an "scss" file under `src/styles` that begins with "_" and import it in `src/styles/main.scss`.

## TODO

* handle errors in views/*.js appropriately
* handle errors in views/*.hbs appropriately
* fix issue where views build is slower each time during watch
* add seeded pseudo-random data functions
* create more pages
* add more components
