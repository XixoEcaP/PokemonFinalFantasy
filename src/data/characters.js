import cidSprite from "../assets/characters/cid.png";
import AuronSrite from "../assets/characters/auron.png";
import MoogleSrptite from "../assets/characters/moogle.png";
import CloudSprite from "../assets/characters/cloud.png";
import squallSprite from "../assets/characters/squall.png";
import vincentSripte from "../assets/characters/vincent.png";

export const Cid = {
  character: "Cid",
  tileX: 7,
  tileY: 7,
  ovmap: "cidlab",
  sprite: cidSprite,
  direction: 0,
  walks: false,
  messages: ["hi", "im Cid"],
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
};
export const Auron2 = {
  character: "Auron2",
  tileX: 15,
  tileY: 63,
  ovmap: "overworldmap1",
  sprite: vincentSripte,
  direction: 1,
  messages: ["hi", "im Vincent"],
};
export const Auron3 = {
  character: "Auron3",
  tileX: 15,
  tileY: 45,
  ovmap: "overworldmap1",
  sprite: squallSprite,
  direction: 0,
  messages: ["hi", "im Squall"],
};

export const Moogle1 = {
  character: "Moogle",
  tileX: 6,
  tileY: 7,
  ovmap: "cidlab",
  sprite: MoogleSrptite,
  direction: 0,
};
