# najjar-pad

*Created by Rafael Najjar (@kyros200)*

## Changelog

V 1.0
* Initial Release, with Front and Back projects!

## Context
`najjar-pad` is a personal project that i always wanted to build. I always knew it was not a difficult test but it was challenging enough for me to do all the fullstack project.

The idea was simple: Copy the [dontpad.com](http://dontpad.com/) idea: an online notepad, for public use, where you just put a name for a pad in the URL and that's it, you now can edit that specific pad. **And more**, you can have sub-pads within a pad (Example: *dontpad.com/pad/subpad*), so that you can organize yourself with your pads.


## Instalation
In total there has 2 differents projects within this repository. One for Front-end and the other for Back-end. You need to install and run both of them separately on your machine. You will also need to have a MySQL database running in your machine.

The Front-end project was developed in React.JS and the Back-end in Node.js using mainly Express.js.

### Data Base
Just run the `najjarPadSetup.sql` in the root folder or just copy and run the following SQL:
```
create database najjarPad;

CREATE TABLE pad (
    id_pad int primary key auto_increment,
    name varchar(255),
    markdown varchar(255),
    id_pad_father int
);

alter table pad
add foreign key (id_pad_father) references pad(id_pad);
```


### Front
Inside the `front` folder, open a `cmd` and do the following to install and run:
```
npm install
npm start
```


### Back
Inside the `back` folder, open a `cmd` and do the following to install and run:
```
npm install
npm start
```
**Another thing you will need to do is** to create the `.env` file and fill the information about your MySQL info. The file should be like this:
```
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASS=root
MYSQL_SCHEMA=najjarpad
MYSQL_BASE=najjarpad
MYSQL_PORT=3306
NODE_ENV=production
```

## How to use
It's super easy! Just put in the URL `/<name of Pad>`, ***without spaces***, and edit your pad!

![change pad gif](https://i.gyazo.com/75edc53b436ad289084dc2fb8d0f7915.gif)

Don't forget that (for now) all ***information is public***!!! Everyone can access all pads!

You can create n numbers of pads within a pad (let's call it a subPad). Every subPad can have n numbers of subPads. For example: `/<name of pad>/<name of subPad>/<name of subpad>`

![subPad gif](https://i.gyazo.com/76755626f3747cd4f6ff083549c7fe09.gif)

If a pad (or subPad) have subPads, it will show in the site!

![clickingChild gif](https://i.gyazo.com/e03a1640abc47cfb6bb906a5578dbbe5.gif)

Finally, if you create a Pad but the father don't have any text, it will give a message for you to create the father first.

![error gif](https://i.gyazo.com/8dcc667e2cfd93d72c026e5e3836f0e4.gif)

And that's it! Have fun!


## Future
* Have 3 kinds of Pads
  * **Public**: Normal one, as you can use now.
  * **Read Only**: A Pad that you can only read. To request an edit, you need to put a ***password***
  * **Private**: A Pad that you can only read if you put a ***password***
* Tutorial for najjar-pad and markdown on the site
* Optimize the HTTP requests (only saving when i see changes in the markdown)