import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const AtomAllUser = atom({
  key: "AtomAllUser",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
