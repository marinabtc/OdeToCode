# OdeToCode

## General Description

This is the first group project of the Trilogy Skills Bootcamp in Front-End Web Development.

We were tasked with building a web application from scratch, for which we need to rely on both technical and soft skills:

- We had to come up with and execute a design of our own making.
- We had to integrate data received from server-side API requests.
- We had to make use of many of the resources learned in the last couple of weeks: HTML, CSS, Bootstrap, JavaScript, jQuery and Ajax.
- We had to work collaboratively, relying on Agile development methodologies.

## What is OdeToCode?

An homage to poetry and technology, OdeToCode allows a user to find poems based on their preferred authors, poem title or even lines from a specific poem. Should the user wish to be surprised, there is also the option to fetch a random poem.

## PoetryDB API

To achieve the goals above, we made use of the [PoetryDB](https://poetrydb.org/index.html) API.

Via this API we where able to use the following routes to obtain the information our web application currently displays.

- Display 1 poem by an author specified by the user
  - https://poetrydb.org/author,random/author;1`;
- Display 1 poem by a title specified by the user
  - https://poetrydb.org/title,random/title;1`;
- Display 1 poem by words/lines specified by the user
  - https://poetrydb.org/lines,random/lines;1`;
- ???
  - https://poetrydb.org/author,title,poemcount/author;title;1`;
- ???
  - https://poetrydb.org/author,lines,poemcount/author;lines;1`;
- ???
  - https://poetrydb.org/title,lines,poemcount/title;lines;1`;
- Fetch a completely random poem
  - https://poetrydb.org/random`;

By using the advance search bar, the user can enter the poetry parameters of their choosing and get a poem in return.

## Our MVP

We decided to took an incremental approach to our project:

- We first agreed on what we would like to work on, and discussed APIs we were interested in experimenting with.
- We then created a wireframe of what our plan would look like visually.
- We then came up with user cases that would fit our wireframe.
- We split our tasks into areas of concern, and these were placed in a GitHub Kanban Project Board.
- We decided to take a few rounds practicing the Git flow of creating branches locally, pushing them up to GitHub, opening pull requests and merging.
- We also took some time tinkering with the APIs of our choice, to ensure they were fit for purpose and would allow us to achieve our goals.

As for our MVP it can be illustrated by our initial wireframe:

![wireframe.jpg](/wireframe.jpg)

The main goal was to have 2 requests from the API displaying on the main page:

- A user based poem search
- A random poem

## Further Functionality

We feel like we achieved most of what we set out to do in our MVP.

As for further plans, we would eventually like to integrate a second API - [Pixabay](https://pixabay.com/api/docs/) - so that images relating to the author, poem, or the theme of poetry are displayed behind the main poem card.

## Contributors

- [Dev-Shai](https://github.com/Dev-Shai)
- [marinaongithub](https://github.com/marinaongithub)
- [SucaadGetHub](https://github.com/SucaadGetHub)
- [vcdsc](https://github.com/vcdsc)

## GitHub Pages

Deployed version of this project can be seen [here]().

## License

Please refer to the LICENSE in the repo.
