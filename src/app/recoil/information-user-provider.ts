import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const AtomReturnInformationWhenLogin = atom({
  key: "AtomReturnInformationWhenLogin",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const AtomInformationUser = atom({
  key: "AtomInformationUser",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
