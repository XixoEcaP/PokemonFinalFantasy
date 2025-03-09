import OverworldMap1 from "./OverworldMap1";
import CidLab from "./CidLab"; // Example of another map
import Intro from "./Intro";
import Battle from "./Battle";

const OverworldMaps = {
  overworld1: OverworldMap1, // ✅ Default overworld
  cidlab: CidLab, // ✅ New map (you can add more here)
  intro: Intro,
  battle: Battle,
};

export default OverworldMaps;
