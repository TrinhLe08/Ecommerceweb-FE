import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const AtomTest = atom({
  key: "AtomTest",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
