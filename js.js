
const animalCategories = [
   // Space & Astronomy
  "Sun", "Moon", "Mars", "Jupiter", "Black Hole", 
  "Milky Way", "Astronaut", "Rocket", "Satellite", "Meteor",

  // Earth & Nature
  "Volcano", "Rainbow", "Tornado", "Aurora", "Ocean", 
  "Desert", "Rainforest", "Glacier", "Cave", "Waterfall",

  // Science & Technology
  "Robot", "AI", "Dinosaur", "Fossil", "Electricity", 
  "Magnet", "Laser", "Hologram", "3D Printing", "Nanotechnology",

  // Human Body & Health
  "Brain", "Heart", "DNA", "Vaccine", "Skeleton", 
  "Muscle", "Microscope", "X-ray", "Bacteria", "Virus",

  // History & Culture
  "Pyramid", "Dinosaur", "Knight", "Samurai", "Viking", 
  "Castle", "Treasure", "Mummy", "Pirate", "Time Travel",

  // Fun & Curiosities
  "Unicorn", "Dragon", "Superhero", "Robot", "Time Machine", 
  "Magic", "Treasure", "Ghost", "Alien", "Hologram",

  // Everyday Wonders
  "Chocolate", "Pizza", "Ice Cream", "Bubble Gum", "Fireworks", 
  "Balloon", "Lego", "Video Game", "Animation", "Comic Book",

  // Mythical/Extinct
  "dragon", "unicorn", "dinosaur", "mammoth", "sabertooth" , "animal"
];

// console.log(animalCategories.length); 

let reload = document.getElementById("reload");
reload.addEventListener("click" , newList);
let animalList = document.getElementsByClassName("example-btn");

function newList(){
    for(let i = 0 ; i < animalList.length-1 ; i++){
        let x = Math.floor(Math.random() * animalCategories.length);
        animalList[i].value = animalCategories[x];
        animalList[i].innerText = "👀" + animalCategories[x];
    }
}
let inanimal = document.getElementById("inanimal");
let btnanimal = document.getElementById("btnanimal");

let h2animal = document.getElementById('h2animal');
let imganimal = document.getElementById('imganimal');
let panimal = document.getElementById("panimal");

function chooseAnimal(event){
    inanimal.value = event.value;
}






btnanimal.addEventListener("click", getWIki);


async function getWIki() {
    let word = inanimal.value;
    if (!word) return;

    const baseUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*';
    const props = [
        'extracts',
        'images',
        'pageimages',
        'categories'
    ];

    const url = `${baseUrl}&prop=${props.join('|')}&titles=${encodeURIComponent(word)}&pithumbsize=300&exintro=true`;

    try {
        const data = await fetchAPI(url);


        if (!data?.query?.pages) {
            panimal.innerText = "No information found";
            return;
        }

        const page = Object.values(data.query.pages)[0];

        if (page.pageid < 0 || page.missing || !page.categories) {
            panimal.innerText = "No article found for this topic";
            return;
        }

        h2animal.innerText = page.title;

        if (page.thumbnail) {
            imganimal.src = page.thumbnail.source;
            imganimal.alt = page.title;
            imganimal.style.display = 'block';
        } else {
            imganimal.style.display = 'none';
        }


        panimal.innerHTML = page.extract || 'No extract available';

        h2animal.innerText = page.title;



    } catch (error) {
        console.error("Error fetching data:", error);
        panimal.innerText = "Error loading Wikipedia data";
    }
}

async function fetchAPI(url, options = {}) {
    try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error("API fetch failed:", error);
        return null;
    }
}


window.chooseAnimal = function(element) {
    inanimal.value = element.value;
  };
  
  window.newList = newList;

