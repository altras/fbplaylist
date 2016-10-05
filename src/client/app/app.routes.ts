import { Routes } from '@angular/router';

import { AboutRoutes } from './about/index';
import { HomeRoutes } from './home/index';
import { PlaylistPage } from './playlist-page/index'

export const routes: Routes = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...PlaylistPage
];
