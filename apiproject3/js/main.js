//pokemon_species shows habitats as well.
// The last pokemon that exists when Home is pressed is added to the pokedex. The home2 button adds the pokemons to the evolutiondex?

//import variables
import { dogs } from "./indexFunctions";
import "../style/style.css";
import { pokemon } from "./myIndex";
import { getDogs } from "./indexFunctions";
import { data3 } from "./indexFunctions";
import { data4 } from "./indexFunctions";
import { evolution } from "./indexFunctions";
import { getDogs2, getDogs3 } from "./indexFunctions";
const URL = `https://pokeapi.co/api/v2/pokemon/?limit=900`;

let list2 = [];
let itemBox = [];
let again = true;
let name2 = "";
let data2 = "";
const limit = 5;
let loses = 0;

// Takes all the pokemon information from the API and returns list of that information

function begin() {
  document.body.insertAdjacentHTML(
    "beforeend",
    `<div class="box3">
      <button class="btn1" id= "play">Game</button>
      <button class="btn1" id = "index">PokeDex</button>
      <img class = "img3" src="pokeball.png" alt="This is a pokeball.">
    </div>
      `
  );
}

function cover() {
  document.body.insertAdjacentHTML(
    "beforeend",
    `<div class="box">
      <button class="btn">Click</button>
      <button class="btn" id="change">Answer</button>
      <input type="text" class="input">
      </div>
      `
  );
}

function choose() {
  document.querySelector("#play").addEventListener("click", function () {
    document.querySelector(".box3").remove();
    cover();
    call();
    check();
    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <div class="box4">
      <button class="btn3">Home</button>
      </div>
      `
    );
    home2();
    again = true;
    loses = 0;
  });
  document.querySelector("#index").addEventListener("click", function () {
    document.querySelector(".box3").remove();
    document.body.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="box4">
      <button class="btn3">Home</button>
      <h1>Pokemon You Have Discovered</h1>
      </div>
      <div class="box2">
      </div>
      `
    );
    pokemon.forEach((call) =>
      indexCard(call.name, call.sprite, call.types, call.link)
    );
    evolutionCard();
    home();
  });
}

function home() {
  try {
    document.querySelector(".btn3").addEventListener("click", function () {
      try {
        document.querySelector(".box5").remove();
      } catch {}
      document.querySelector(".box4").remove();
      try {
        document.querySelector(".box2").remove();
      } catch {}
      begin();
      choose();
    });
  } catch {}
}

function home2() {
  document.querySelector(".btn3").addEventListener("click", function () {
    document.querySelector(".box4").remove();
    document.querySelector(".box").remove();
    begin();
    choose();
  });
}

async function getData(URL) {
  try {
    const response = await fetch(URL);
    console.log(response);
    // 200-299
    if (response.status != 200) {
      throw new Error(response.statusText);
    }
    // take response from serve and convert it to JSON
    const data = await response.json();
    console.log(data);
    const list = data.results.map((take) => take.url);
    console.log(list);
    return list;
  } catch (error) {
    document.querySelector("h1").textContent = error;
    document.querySelector("h1").textContent =
      "Please search for something else.";
  }
}

// Creates list2 from list so that the API does not have to be called each time.
async function getList() {
  const data = await getData(URL);
  data.forEach((push) => list2.push(push));
}

// Used to randomize the pokemon chosen.
// Takes a random number from 0 to the number of pokemons - 1.
// Uses that number as the index for which pokemon is chosen from list2.
// Fetches information for a specific pokemon using the information from the API.
// Returns the name of the pokemon.
async function getData2() {
  // const len = list2.length;
  // const y = Math.floor(Math.random() * len);
  // console.log(y);
  // const num = list2[y - 1];
  // console.log(num);
  const num = list2[716];

  try {
    const response = await fetch(num);
    console.log(response);
    const data = await response.json();
    data2 = data;
    console.log(data2);
    name2 = data.name;
    console.log(data.name);
  } catch (error) {
    document.querySelector("h1").textContent = error;
    document.querySelector("h1").textContent =
      "Please search for something else GetData2.";
  }
}

// Creates a card containing the pokemon.
async function create() {
  await getData2();
  try {
    document.querySelector(".box").insertAdjacentHTML(
      "beforeend",
      `<div class="item">
    <img class = "img" src=${data2.sprites.front_default} alt="This is ${data2.name}">
    </div>
    `
    );
  } catch {}
}

async function createCard(info, list) {
  let cat = [];
  let bob = [];
  info.types.forEach((call) => bob.push(call.type.name));
  console.log(bob[0].toUpperCase());
  for (let i = 0; i <= bob.length - 1; i++) {
    cat.push(bob[i].toUpperCase());
  }
  console.log(cat);
  console.log(bob);
  const names = info.name.toUpperCase();
  const sprites = info.sprites.front_default;
  // if (list.forEach((cards) => cards.name === names)) {
  //   console.log("This is already there");
  // }
  list.push({
    name: names,
    sprite: sprites,
    types: cat,
    link: info.species.url,
  });
  console.log(list);
}

function indexCard(name, sprite, types, link) {
  document.querySelector(".box2").insertAdjacentHTML(
    "beforeend",
    `<div class="item2" id = "${link}">
        <h2 class = "text">${name}</h2>
        <img class = "img2" src=${sprite} alt="This is ${name}">
        <p class = "text2">Type: ${types.join(" | ")}</p>
        <p class ="description">This is ${name}</p>
        <button class="btn4">Evolution</button>
      </div>
      `
  );
}

async function speciesCard(selected) {
  document.querySelector(".box2").remove();
  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div class="box5">
    </div>
    `
  );
  await getDogs(selected);
  // adds to list called evolution
  await dogs(data3.evolution_chain.url);
  evolution.forEach((call) => getDogs3(call));
  console.log(evolution);
  let i = 0;
  const evolen = evolution.length;
  while (i <= evolen) {
    evolution.pop();
    i++;
  }
}

async function evolutionCard() {
  document.querySelectorAll(".btn4").forEach((call) =>
    call.addEventListener("click", async function () {
      const cardId = this.parentElement.id;
      console.log("this is", cardId);
      await speciesCard(cardId);
    })
  );
}

// Push all the existing cards into a list, itemBox.
// Deletes all the cards in itemBox.
function deleted() {
  document.querySelectorAll(".item").forEach((item) => itemBox.push(item));
  // console.log(itemBox);
  itemBox.forEach((item) => item.remove());
  itemBox = [];
}

// Gets all the pokemons and puts them in list2.
// When the button with class btn is clicked, style changes and
// checks if again is true.
// If it is delete all cards and create card
// again becomes false
async function call() {
  await getList();
  // console.log(list2);

  document.querySelector(".btn").addEventListener("click", async function () {
    if (document.querySelector(".btn").innerHTML === "Click") {
      document.querySelector(".btn").innerHTML = "Next";
    }

    if (again) {
      try {
        document.querySelector(".input").value = "";
      } catch {}
      deleted();
      await create();

      console.log(document.querySelector(".input").value);
      again = false;
      console.log(again);
    }
  });
}

// Why does the getData2 function not work here? It works when called above.
// Get list of pokemons
// get specific pokemon different from the first one(actually based on calling functions, this is the first one)
// if button with id change is clicked,
// check if again is false
// if it is add 1 to tries
// delete all text for tries left
// create text for tries left
async function check() {
  let tries = 0;
  // These two causes problems
  // await getList();
  // await getData2();
  document.querySelector("#change").addEventListener("click", function () {
    if (again != true) {
      tries++;
      document
        .querySelectorAll(".batmen")
        .forEach((item) => itemBox.push(item));
      // console.log(itemBox);
      itemBox.forEach((item) => item.remove());
      document.querySelectorAll(".robin").forEach((item) => itemBox.push(item));
      // console.log(itemBox);
      itemBox.forEach((item) => item.remove());
      console.log(tries);
      if (
        document.querySelector(".input").value.toLowerCase() === name2 ||
        document.querySelector(".input").value.toLowerCase() === "pickachu"
      ) {
        again = true;
        const class1 = document.querySelector(".img");
        class1.classList.remove("img");
        class1.classList.add("imgsee");
        tries = 0;
        // create function where if same pokemon is discovered, do not add pokemon.
        createCard(data2, pokemon);
      } else if (tries >= 5 && again != true) {
        tries = 0;
        loses++;
        // why is this here??
        again = true;
        deleted();
        create();

        console.log(document.querySelector(".input").value);
        again = false;
        console.log(again);
        console.log("YOU FAILED");
        if (loses >= limit) {
          document.querySelector(".box").remove();
          begin();
          choose();
          document.querySelector(".btn3").remove();
          home();
          // while (true) {
          //   popup();
          // }
        }
      }
      let dog = "";
      if (loses < 4) {
        dog = "lives";
      } else {
        dog = "life";
      }
      let pig = "";
      if (tries < 4) {
        pig = "tries";
      } else {
        pig = "try";
      }
      try {
        document.querySelector(".input").value = "";
      } catch {}
      try {
        document.querySelector(".box").insertAdjacentHTML(
          "afterbegin",
          `
        <div class = "robin">
        <h2>You have ${5 - loses} ${dog} left.</h2>
        </div>
        <div class = "batmen">
        <h2>You have ${5 - tries} ${pig} left.</h2>
        </div>
        `
        );
      } catch {}
      console.log(again);
      console.log("YOU Have", loses);
      // if (loses >= 5) {
      //   gaming = false;
      //   loses = 0
      // }
    }
  });
}

//crashes the website
function popup() {
  window.open("open.html", "opening", "popup");
}

begin();
choose();

// dogs("https://pokeapi.co/api/v2/evolution-chain/80/")
// // dogs("https://pokeapi.co/api/v2/pokemon-species/2/")
// getDogs("https://pokeapi.co/api/v2/pokemon-species/63/")
// // dogs("https://pokeapi.co/api/v2/pokemon-habitat/")
