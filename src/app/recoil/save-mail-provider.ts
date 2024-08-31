import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const AtomSaveMail = atom({
  key: "AtomSaveMail",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
