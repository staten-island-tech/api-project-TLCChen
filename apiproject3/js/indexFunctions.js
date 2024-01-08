let data3 = "";
let data4 = "";
let evolution = [];
async function dogs(URL) {
  const response = await fetch(URL);
  console.log(response);
  // 200-299
  if (response.status != 200) {
    throw new Error(response.statusText);
  }
  // take response from serve and convert it to JSON
  const data = await response.json();
  console.log(data);
  console.log(data.chain.species.name);
  evolution.push(data.chain.species.url);
  // try/catch allows the function to skip over errors caused by pokemon that do not have more than one evolutions
  try {
    console.log(data.chain.evolves_to[0].species.name);
    evolution.push(data.chain.evolves_to[0].species.url);
  } catch {}
  try {
    console.log(data.chain.evolves_to[0].evolves_to[0].species.name);
    evolution.push(data.chain.evolves_to[0].evolves_to[0].species.url);
  } catch {}
  console.log(evolution);
  // console.log("pig")

  // console.log(data.sprites)
  // document.querySelector(".box").insertAdjacentHTML(
  //   "beforeend",
  //   `<div class="item">
  //   <img class = "img" src=${data.sprites.default} alt="This is ${data.name}">
  //   </div>
  //   `);
}

async function getDogs(URL) {
  const response = await fetch(URL);
  console.log(response);
  // 200-299
  if (response.status != 200) {
    throw new Error(response.statusText);
  }
  // take response from serve and convert it to JSON
  data3 = await response.json();
  console.log(data3);
}

// async function getDogs2(URL){
//   const response = await fetch(URL);
//   console.log(response);
//   // 200-299
//   if (response.status != 200) {
//     throw new Error(response.statusText);
//   }
//   // take response from serve and convert it to JSON
//   data4 = await response.json();
//   console.log(data4);
// }

//   async function getDogs3(URL){
//     await getDogs2(URL)
//     const response = (data4.varieties[0].pokemon.url)
//     const data4 = await response.json();
//     document.querySelector(".box5").insertAdjacentHTML(
//       "beforeend",
//       `<div class="item2">
//           <h2 class = "text">${data4.name}</h2>
//           <img class = "img2" src=${data4.sprites.front_default} alt="This is ${
//         data4.name
//       }">
//       </div>
//       `
//     );
//   }

export { dogs };
export { getDogs };
export { data3 };
export { evolution };
export { data4 };
