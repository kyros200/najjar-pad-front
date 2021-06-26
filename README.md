# najjar-pad

*Created by Rafael Najjar (@kyros200)*

# [Demo here!](https://pad.najjar.dev/tutorial)

## Changelog

V 2.0 (26/06/2021)
* Now there is Private & ReadOnly Pads!

V 1.1
* QoS changes; Supports Mobile

V 1.0
* Initial Release, with Front and Back projects!

## Context
`najjar-pad` is a personal project that i always wanted to build. I always knew it was not a difficult test but it was challenging enough for me to do all the fullstack project.

The idea was simple: Copy the [dontpad.com](http://dontpad.com/) idea: an online notepad, for public use, where you just put a name for a pad in the URL and that's it, you now can edit that specific pad. **And more**, you can have sub-pads within a pad (Example: *dontpad.com/pad/subpad*), so that you can organize yourself with your pads.


## Instalation
Inside the `front` folder, open a `cmd` and do the following to install and run:
```
npm install
npm start
```

At the `MainPage.js` file, inside `component` file, you need to change the `back-url` const to properly request on your back-end side.

You also need to run `najjar-pad-back` at the same time to do the requests.

## How to use
Check out `pad.najjar.dev/tutorial` !!!


## Future
* Have 3 kinds of Pads
  * **Public**: Normal one, as you can use now.
  * **Read Only**: A Pad that you can only read. To request an edit, you need to put a ***password***
  * **Private**: A Pad that you can only read if you put a ***password***
* Tutorial for najjar-pad and markdown on the site (hardcode /tutorial maybe?)