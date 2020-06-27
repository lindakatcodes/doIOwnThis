# Do I Own This? 

A personal inventory site for your nail polish! Easily view your collection from anywhere!

I built this site both for my future self (because I always forget which ones I already own when I'm at the store), and to practice learning Vue! As a bonus, I also dabbled with learning Firebase, specifically using their authentication, firestore database, and storage. 

You can view the site live here: https://doiownthis.netlify.app/

![Gif of site functionality](https://i.imgur.com/yBpRXDK.gif "Do I Own This in action")

If you notice anything strange or have any comments on things you'd like to see, please feel free to create an issue!

## Future Plans

Ultimately, I'd like to open this up so it can be used for any type of item collections - clothes, shoes, mechanical keyboard sets, etc. So that will be done at some point! 

Would also like to modify the way items are added, so you can do batch adds of similar items. Still have some kinks to work out with that.

## Developer Commands

Since this is a Vue project set up through the CLI, there's some commands already set up in the package.json file. The breakdown of those commands is listed below. 

To use the Firebase components, you'll need to setup a .env file, that will have your own Firebase provided keys. Each one will need to be prefixed by `VUE_APP` - you'll see the calls & items you'll need in the firebaseConfig file in the root of this project. 

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
