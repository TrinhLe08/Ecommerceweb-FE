import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const AtomProductListContext = atom({
  key: "AtomProductListContext",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
