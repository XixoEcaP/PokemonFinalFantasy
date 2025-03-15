import React from "react";
import { useSelector } from "react-redux";
import OverworldMaps from "./OverworldMaps"; // ✅ Import map selection

function OverworldMap() {
  const { ovmap } = useSelector((state) => state.game.ovmap);

  // ✅ Pick the correct map component, defaulting to OverworldMap1
  const MapComponent = OverworldMaps[ovmap] || OverworldMaps["overworld1map1"];

  return <MapComponent />;
}

export default OverworldMap;
