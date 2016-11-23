import { Routes } from '@angular/router';

import { HomeRoutes } from './home/index';
import { PlaylistRoutes } from './playlist/index'

export const routes: Routes = [
  ...HomeRoutes,
  ...PlaylistRoutes
];
