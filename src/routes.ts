import { lazy } from "solid-js";
import type { RouteDefinition } from "solid-app-router";

import Input from "./pages/input";
import Wheel from "./pages/wheel";

export const routes: RouteDefinition[] = [
  {
    path: "/",
    component: Input,
  },
  {
    path: "/wheel",
    component: Wheel,
  },
];
