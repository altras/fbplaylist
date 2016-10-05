import { Routes } from '@angular/router';

import { AboutRoutes } from './about/index';
import { HomeRoutes } from './home/index';
import { PlaylistRoutes } from './playlist/index'

export const routes: Routes = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...PlaylistRoutes
];
