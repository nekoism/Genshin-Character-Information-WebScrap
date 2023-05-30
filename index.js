// jsdom npm package
const axios = require("axios");
const cheerio = require('cheerio');
const fs = require('fs');
const client = require('https');

let name = prompt("Enter the name: "); //gets the character name
let url = `https://genshin-impact.fandom.com/wiki/${name}`
getCharImage(url);
let infoUrl = `https://api.genshin.dev/characters/${name.replace(" ","-")}`;
getCharInfo(infoUrl)

//functino which gets the character image 
function getCharImage(url){
  axios.get(url)
	.then(res => {
		const $ = cheerio.load(res.data);
		$("#mw-content-text > div.mw-parser-output > aside > div > div.wds-tab__content.wds-is-current > figure > a > img").each((index,element) =>{
			const img = $(element).attr("src");
			console.log(`${name} image = ${img}`)
		})
  }).catch( err => console.log("Character Not Found"));

}

// function which gets the character infromation
function getCharInfo(infoUrl){
  axios.get(infoUrl)
    .then(res => {
      let name = res.data.name;
      let vision = res.data.vision;
      let weapon = res.data.weapon;
      let description = res.data.description;
      let rarity = res.data.rarity;
      console.log(`Name: ${name} \n Vision: ${vision} \n Weapon Type: ${weapon} \n Character description: ${description}`)
    }).catch(err => console.log("Character Not Found"));
}
