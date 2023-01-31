// jsdom npm package
const axios = require("axios");
const cheerio = require('cheerio');
const fs = require('fs');
const client = require('https');
//https://www.youtube.com/watch?v=9OlLxkaeVvw
let name = prompt("Enter the name: ");
let url = `https://genshin-impact.fandom.com/wiki/${name}`
getCharImage(url);
let infoUrl = `https://api.genshin.dev/characters/${name.replace(" ","-")}`;
getCharInfo(infoUrl)
// const info
// axios.get(url)
//   .then(res =>{
//     const $ = cheerio.load(res.data);
//     $('article > .di-t').each((index,element) =>{
//   	const title = $(element).find(".information > .title > a").text().replace("add","");
//       const rating = $(element).find(".information > .pt8").text();
//       	if(titile.length == 0 && rating.length == 0){
//       		return;
//       	}
//   		console.log(title);
//       	console.log(rating); //rating contain 
//     })
//   }).catch( err => console.log(err));
//getting character image
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
// axios.get(infoUrl)
// Example
/*
const {data} = await axios.get('https://old.reddit.com/r/programming/');
const $ = cheerio.load(data);
const postTitles = [];

$('div > p.title > a').each((_indx,el) =>{
	const postTitle = $(el).text();
	postTitles.push(postTitle);
})
*/