import cidSprite from "../assets/characters/cid.png";
import AuronSrite from "../assets/characters/auron.png";
import MoogleSrptite from "../assets/characters/moogle.png";
import CloudSprite from "../assets/characters/cloud.png";
import squallSprite from "../assets/characters/squall.png";
import vincentSripte from "../assets/characters/vincent.png";
import useCreatePokemon from "../hooks/useCreatePokemon";
import pokemons from "../data/pokemonData";
import tifaSprite from "../assets/characters/tifa.png";
import aerithSrite from "../assets/characters/aerith.png";
import WarriorSprite from "../assets/characters/warrior.png";
import thiefSprite from "../assets/characters/thief.png";
import chocoboSrpite from "../assets/characters/chocobo.png";

const { createPokemon } = useCreatePokemon();

const pokemonList = [
  createPokemon(pokemons.Yojimbo, 5),
  createPokemon(pokemons.Shiva, 5),
  createPokemon(pokemons.Garuda, 5),
  createPokemon(pokemons.Titan, 5),
  createPokemon(pokemons.Moomba, 5),
  createPokemon(pokemons.Valefor, 5),
  createPokemon(pokemons.Phoenix, 5),
  createPokemon(pokemons.Cerberus, 5),
  createPokemon(pokemons.Carbuncle, 5),
  createPokemon(pokemons.Behemoth, 5),
];

export const Cid = {
  character: "Cid",
  tileX: 7,
  tileY: 7,
  ovmap: "cidlab",
  sprite: cidSprite,
  direction: 0,
  walks: false,
  messages: ["Hi!", "I'm Cid"],
};
export const Cloud = {
  character: "Cloud",
  tileX: 12,
  tileY: 6,
  ovmap: "cidlab",
  sprite: CloudSprite,
  direction: 0,
  walks: true,
};
export const Auron = {
  character: "Auron",
  tileX: 11,
  tileY: 72,
  ovmap: "overworldmap1",
  sprite: AuronSrite,
  direction: 0,
  messages: ["Hi!", "I'm Auron", "Go get a Pokemon!"],
};
export const Auron2 = {
  character: "Auron2",
  tileX: 11,
  tileY: 31,
  ovmap: "overworldmap1",
  sprite: AuronSrite,
  direction: 0,
  messages: ["Hi!", "I'm Auron", "Here is a Pokeball!", "Pokeball Added"],
  items: true,
};

export const Vincent = {
  character: "Vincent",
  tileX: 15,
  tileY: 63,
  ovmap: "overworldmap1",
  sprite: vincentSripte,
  direction: 1,
  messages: ["Hi!", "I'm Vincent"],
  trainer: true,
  event: "trainer1",
  team: [pokemonList[0], pokemonList[3], pokemonList[7]],
  range: 5,
  battleMessages: ["Battling Vicent"],
  walkingMessages: ["Hey You", "Lets Batttle!"],
};
export const Squall = {
  character: "Squall",
  tileX: 20,
  tileY: 24,
  ovmap: "overworldmap1",
  sprite: squallSprite,
  direction: 0,
  messages: ["Hi!", "I'm Squall"],
  trainer: true,
  event: "trainer2",
  team: [pokemonList[4], pokemonList[8], pokemonList[9]],
  range: 5,
  battleMessages: ["Battling Squall"],
  walkingMessages: ["Hey You", "Lets Batttle!"],
};

export const Moogle1 = {
  character: "Moogle",
  tileX: 6,
  tileY: 7,
  ovmap: "cidlab",
  sprite: MoogleSrptite,
  direction: 0,
  messages: ["Hi!", "I'm Moogle"],
};
export const Tifa = {
  character: "Tifa",
  tileX: 15,
  tileY: 45,
  ovmap: "overworldmap1",
  sprite: tifaSprite,
  direction: 0,
  messages: ["Hi!", "I'm Tifa"],
  trainer: true,
  event: "trainer4",
  team: [pokemonList[2], pokemonList[6]],
  range: 5,
  battleMessages: ["Battling Tifa"],
  walkingMessages: ["Hey You", "Lets Batttle!"],
};

export const Aerith = {
  character: "Aerith",
  tileX: 16,
  tileY: 39,
  ovmap: "overworldmap1",
  sprite: aerithSrite,
  direction: 2,
  messages: ["Hi!", "I'm Aerith"],
  trainer: true,
  event: "trainer3",
  team: [pokemonList[5], pokemonList[1]],
  range: 5,
  battleMessages: ["Battling Aerith"],
  walkingMessages: ["Hey You", "Lets Batttle!"],
};
export const Thief1 = {
  character: "Thief1",
  tileX: 10,
  tileY: 90,
  ovmap: "overworldmap1",
  sprite: thiefSprite,
  direction: 0,
  messages: ["Hi!", "I'm a Thief"],
};
export const Warrior1 = {
  character: "Warrior1",
  tileX: 20,
  tileY: 80,
  ovmap: "overworldmap1",
  sprite: WarriorSprite,
  direction: 0,
  messages: ["Hi!", "I'm a Warrior"],
};
export const Chocobo1 = {
  character: "Chocobo1",
  tileX: 20,
  tileY: 80,
  ovmap: "overworldmap1",
  sprite: chocoboSrpite,
  direction: 0,
  messages: ["Kweh"],
};
export const Chocobo2 = {
  character: "Chocobo2",
  tileX: 22,
  tileY: 89,
  ovmap: "overworldmap1",
  sprite: chocoboSrpite,
  direction: 1,
  messages: ["Kweh"],
};
export const Chocobo3 = {
  character: "Chocobo3",
  tileX: 18,
  tileY: 86,
  ovmap: "overworldmap1",
  sprite: chocoboSrpite,
  direction: 1,
  messages: ["Kweh"],
};
