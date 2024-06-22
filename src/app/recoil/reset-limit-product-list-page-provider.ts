import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const AtomResetLimitProductListPage = atom({
  key: "AtomResetLimitProductListPage",
  default: 1,
  effects_UNSTABLE: [persistAtom],
});
