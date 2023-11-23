import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const AtomAllOrder = atom({
  key: "AtomAllOrder",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
