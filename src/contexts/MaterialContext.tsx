import React, { createContext, useContext, useMemo, useState } from "react";
import { Materials, mergeMaterials } from "../components/MaterialList";
import useMinMax from "../hooks/useMinMax";
import { MaterialInfo } from "../pages/[name]";

interface MaterialContextType {
  // levels
  levelKeys: string[];
  levelMin: number;
  setLevelMin: React.Dispatch<React.SetStateAction<number>>;
  levelMax: number;
  setLevelMax: React.Dispatch<React.SetStateAction<number>>;
  characterMaterials: Materials;

  // talents
  talentKeys: string[];
  attackMin: number;
  setAttackMin: React.Dispatch<React.SetStateAction<number>>;
  attackMax: number;
  setAttackMax: React.Dispatch<React.SetStateAction<number>>;
  skillMin: number;
  setSkillMin: React.Dispatch<React.SetStateAction<number>>;
  skillMax: number;
  setSkillMax: React.Dispatch<React.SetStateAction<number>>;
  burstMin: number;
  setBurstMin: React.Dispatch<React.SetStateAction<number>>;
  burstMax: number;
  setBurstMax: React.Dispatch<React.SetStateAction<number>>;
  talentMaterials: Materials;
}

// NOTE: can still cause an error if context is used outside of provider
export const MaterialContext = createContext<MaterialContextType>(
  {} as MaterialContextType
);

const MaterialProvider: React.FC<{
  levelCosts: MaterialInfo["characterCosts"];
  talentCosts: MaterialInfo["talentCosts"];
  children: React.ReactNode;
}> = ({ levelCosts, talentCosts, children }) => {
  // levels
  const [levelKeys, levelMats] = useMemo(() => {
    const levelKeys = Object.keys(levelCosts).sort();
    const levelMats = levelKeys.map((key) => levelCosts[key]);
    return [levelKeys, levelMats];
  }, [levelCosts]);

  const [levelMin, setLevelMin, levelMax, setLevelMax, characterMaterials] =
    useMinMax(0, levelKeys.length - 1, levelMats);

  // talents
  const [talentKeys, talentMats] = useMemo(() => {
    const talentKeys = Object.keys(talentCosts).sort(
      (a, b) => parseInt(a) - parseInt(b)
    );
    const talentMats = talentKeys.map((key) => talentCosts[key]);
    return [talentKeys, talentMats];
  }, [talentCosts]);

  const [attackMin, setAttackMin, attackMax, setAttackMax, attackMaterials] =
    useMinMax(0, talentKeys.length - 1, talentMats);
  const [skillMin, setSkillMin, skillMax, setSkillMax, skillMaterials] =
    useMinMax(0, talentKeys.length - 1, talentMats);
  const [burstMin, setBurstMin, burstMax, setBurstMax, burstMaterials] =
    useMinMax(0, talentKeys.length - 1, talentMats);

  const talentMaterials = useMemo(
    () => mergeMaterials(attackMaterials, skillMaterials, burstMaterials),
    [attackMaterials, burstMaterials, skillMaterials]
  );

  return (
    <MaterialContext.Provider
      value={{
        levelKeys,
        levelMin,
        setLevelMin,
        levelMax,
        setLevelMax,
        characterMaterials,

        talentKeys,
        attackMin,
        setAttackMin,
        attackMax,
        setAttackMax,
        skillMin,
        setSkillMin,
        skillMax,
        setSkillMax,
        burstMin,
        setBurstMin,
        burstMax,
        setBurstMax,
        talentMaterials,
      }}
    >
      {children}
    </MaterialContext.Provider>
  );
};

export const useMaterialContext = () => useContext(MaterialContext);

export default MaterialProvider;
