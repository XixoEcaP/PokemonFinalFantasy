import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function useNPCManager(characters) {
  const [npcList, setNpcList] = useState(characters);
  const { ovmap } = useSelector((state) => state.game.ovmap);

  useEffect(() => {
    setNpcList((prevNpcs) =>
      prevNpcs.map((npc) => {
        return npc; // Keep the NPC in place
      })
    );
  }, [ovmap]);

  return npcList.filter((npc) => !npc.remove);
}
