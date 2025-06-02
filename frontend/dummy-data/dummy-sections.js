// dummy-data/dummy-sections.js

export const DUMMY_SECTIONS = [];

const grade6Names = [
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Pluto",
  "Eris",
  "Haumea",
  "Makemake",
  "Ceres",
  "Titan",
  "Ganymede",
  "Callisto",
  "Io",
  "Europa",
];
const grade5Names = [
  "Quartz",
  "Feldspar",
  "Mica",
  "Calcite",
  "Gypsum",
  "Pyrite",
  "Galena",
  "Sphalerite",
  "Halite",
  "Topaz",
  "Garnet",
  "Amethyst",
  "Opal",
  "Diamond",
  "Ruby",
  "Sapphire",
  "Emerald",
  "Beryl",
  "Zircon",
  "Spinel",
  "Peridot",
  "Turquoise",
  "Jadeite",
  "Obsidian",
];
const grade4Names = [
  "Narra",
  "Molave",
  "Yakal",
  "Apitong",
  "Lauan",
  "Mahogany",
  "Ipil",
  "Dao",
  "Tindalo",
  "Kamagong",
  "Acacia",
  "Mango",
  "Coconut",
  "Banyan",
  "Gmelina",
  "Kawayan",
  "Pine",
  "Bamboo",
  "Dita",
  "Dao",
  "Katmon",
  "Malapaho",
  "Almaciga",
];
const grade3Names = [
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Orange",
  "Purple",
  "Pink",
  "Brown",
  "Black",
  "White",
  "Gray",
  "Cyan",
  "Magenta",
  "Indigo",
  "Violet",
  "Teal",
  "Maroon",
  "Olive",
  "Gold",
  "Silver",
  "Bronze",
];
const grade2Names = [
  "Sampaguita",
  "Gumamela",
  "Bougainvillea",
  "Orchid",
  "Rose",
  "Sunflower",
  "Daisy",
  "Lily",
  "Tulip",
  "Jasmine",
  "Lotus",
  "Carnation",
  "Dahlia",
  "Hibiscus",
  "Anthurium",
  "Gardenia",
  "Frangipani",
  "Waling-Waling",
  "Dendrobium",
];
const grade1Names = [
  "Circle",
  "Square",
  "Triangle",
  "Rectangle",
  "Oval",
  "Star",
  "Heart",
  "Pentagon",
  "Hexagon",
  "Octagon",
  "Diamond",
  "Crescent",
  "Trapezoid",
  "Cylinder",
  "Cone",
  "Sphere",
  "Cube",
  "Pyramid",
  "Prism",
];

const themes = [
  { level: 6, theme: "PLANET", names: grade6Names },
  { level: 5, theme: "MINERAL", names: grade5Names },
  { level: 4, theme: "TREE", names: grade4Names },
  { level: 3, theme: "COLOR", names: grade3Names },
  { level: 2, theme: "FLOWER", names: grade2Names },
  { level: 1, theme: "SHAPE", names: grade1Names },
];

let currentId = 1;
let themeIndex = 0;
let nameIndex = Array(themes.length).fill(0);

while (DUMMY_SECTIONS.length < 100) {
  const currentTheme = themes[themeIndex];
  const name = currentTheme.names[nameIndex[themeIndex]];

  DUMMY_SECTIONS.push({
    id: String(currentId++),
    name: `GRADE ${currentTheme.level} - ${name.toUpperCase()}`,
  });

  nameIndex[themeIndex]++;
  if (nameIndex[themeIndex] >= currentTheme.names.length) {
    nameIndex[themeIndex] = 0;
  }

  themeIndex++;
  if (themeIndex >= themes.length) {
    themeIndex = 0;
  }
}

const randomIndex = Math.floor(Math.random() * DUMMY_SECTIONS.length);
const advisorySection = DUMMY_SECTIONS[randomIndex];

// Removed the lines that changed advisorySection.name
// Now, only the isAdvisory flag is set to true
advisorySection.isAdvisory = true;
