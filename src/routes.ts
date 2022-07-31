import { lazy } from 'solid-js';
import type { RouteDefinition } from 'solid-app-router';

import Input from './pages/input';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: Input,
  },
  {
    path: '/wheel',
    component: lazy(() => import('./pages/wheel')),
  },
  {
    path: '**',
    component: lazy(() => import('./errors/404')),
  },
];
