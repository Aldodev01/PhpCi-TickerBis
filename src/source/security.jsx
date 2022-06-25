import create from "zustand";
import { devtools, persist } from "zustand/middleware";

let settingOpenConsole = (set) => ({
  openConsole: false,
  toggleConsole: () =>
    set((state) => ({
      openConsole: !state.openConsole,
    })),
});
settingOpenConsole = devtools(settingOpenConsole);

export const useSettings = create(settingOpenConsole);
