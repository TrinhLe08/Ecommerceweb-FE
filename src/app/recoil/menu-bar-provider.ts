import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const AtomMenuBar = atom({
  key: "AtomMenuBar",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
