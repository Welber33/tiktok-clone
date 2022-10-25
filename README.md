<h1 align="center">TikTok Clone</h1>
<p align="center">
  <img height="100" width="350" src="https://user-images.githubusercontent.com/44277956/197769897-ada6e040-43b1-4c9e-8b58-51f1bae76ac4.png"/> 
</p>
<h4 align="center"> Project Developed using Next.js + TailwindCSS</h4>
<p align="center">
  <img src="https://img.shields.io/badge/ReactJs-18.2.0-61DAFB?style=for-the-badge&logo=React" />
  <img src="https://img.shields.io/badge/NextJs-latest-000000?style=for-the-badge&logo=Next.js" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.1.2-06B6D4?style=for-the-badge&logo=Tailwind CSS" />
</p>

  <p align="center">
    <img src="https://user-images.githubusercontent.com/44277956/197770806-4fc3f9c8-8798-4cb8-916a-1ede3d380b13.png" />
  </p>
  
  
TikTok Clone project is a social media based in exhibition of videos where people can see, like and comment each videos of each users' account. This is also a web project but built with the concepts of mobile first. It also uses the most variety of front-end technologies based on ReactJs library.

## Features
- [x] Home Page with all content.
- [x] Search by user name or video caption.
- [x] Log In using google account.
- [x] Upload videos once logged in.
- [x] Click on topics to search by each category.
- [x] Like and comment videos of different users once logged in.
- [x] Individual user profile showing videos uploaded and likes given to each different videos      

## Requisites

Before getting started with this project, you must have installed in your machine the following developer build tools:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) version *16.15.1* and [Yarn](https://yarnpkg.com/) version *1.22.19* or latest. It's possible to install the developer build tools above using the following package managers [Chocolatey](https://chocolatey.org/) for windows machines and [Homebrew](https://brew.sh/index_pt-br) for MacOS machines.
It's highly recommended to download [VSCode](https://code.visualstudio.com/) to work on, as it has the most variety of extensions possible and particular advantages to code javascript applications and it's totally free. It's necessary to install Sanity to run the project data backend. Visit **[Sanity installing guide](https://www.sanity.io/docs/getting-started-with-sanity-cli)** for more information.

### 🎲 Running the project locally

```bash
# Clone the repository
$ git clone https://github.com/Welber33/tiktok-clone.git

# Go to the folder where is the cloned project
$ cd folder_with_the_cloned_project

# Open the project on vscode via terminal/cmd
$ code .

# Install the dependencies
$ npm install

# Execute the application in Dev Mode
$ npm run dev

# Execute the sanity command to start locally sanity studio and access the datas
$ sanity start
```
Note: Use [NPM](https://www.npmjs.com/) to run this project.

### Understanding Sanity Use Case Architecture 

<p align="center">
 <img  width="800" src="https://user-images.githubusercontent.com/44277956/191076558-bbf6d609-f43f-4b05-ad89-c5e51aebb59a.jpg"/>
</p>

### Sanity Studio with project data

<p align="center">
  <img src="https://user-images.githubusercontent.com/44277956/197778796-a0e8ab77-a165-4841-aaa5-aa164ebeefd1.png"/>
</p>

## Sanity Data Info
### Schemas

- Post
- User

#### Post

- caption
- userId
- postedBy
- likes
- comments
- topic

#### User
- name
- profile image

## Typescript Project Typings

- <h3>Video</h3>
- <h3>IUser</h3>

#### Video

 - caption
 - video -> assets: id, url
 - id
 - postedBy: id, username, image
 - likes[] -> postedBy: id, username, image
 - comments[]: comment, key -> postedBy: ref
 - userId

#### IUser

- id
- type
- username
- image

## Application Demo Video

  https://user-images.githubusercontent.com/44277956/197792865-4676b66d-28fa-44e3-901d-396de327995d.mov 

## Techs 

This project made use of the following technologies and developer tools: 

- [NodeJS](https://nodejs.org/en/)
- [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [ReactJS](https://reactjs.org/)
- [NextJS](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Google Authentication Provider](https://www.npmjs.com/package/@react-oauth/google)
- [TypeScript](https://www.typescriptlang.org/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [SanityCMS](https://www.sanity.io/)

## :memo: License

This project is under the MIT license. See the [LICENSE](LICENSE) for details.