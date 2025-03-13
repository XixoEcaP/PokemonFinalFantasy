import cidSprite from "../assets/characters/cid.png";
import AuronSrite from "../assets/characters/auron.png";
import MoogleSrptite from "../assets/characters/moogle.png";
import CloudSprite from "../assets/characters/cloud.png";
export const Cid = {
  character: "Cid",
  tileX: 7,
  tileY: 7,
  ovmap: "cidLab",
  sprite: cidSprite,
  direction: 0,
};
export const Cloud = {
  character: "Cloud",
  tileX: 12,
  tileY: 6,
  ovmap: "cidLab",
  sprite: CloudSprite,
  direction: 0,
  walks: true,
};
export const Auron = {
  character: "Auron",
  tileX: 11,
  tileY: 72,
  ovmap: "overworld1",
  sprite: AuronSrite,
  direction: 0,
};

export const Moogle1 = {
  character: "Moogle",
  tileX: 6,
  tileY: 7,
  ovmap: "cidLab",
  sprite: MoogleSrptite,
  direction: 0,
};
