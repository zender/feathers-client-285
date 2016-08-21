import { Routes, RouterModule } from '@angular/router';
import { NoContent } from './no-content';

// AngularClass
import { provideWebpack } from '@angularclass/webpack-toolkit';
import { providePrefetchIdleCallbacks } from '@angularclass/request-idle-callback';
import {MessagesRest} from './message-rest/messages-rest.component';
import {MessagesSocket} from './message-socket/messages-socket.component';


export const ROUTES: Routes = [
  { path: '',      component: MessagesRest },
  { path: 'messages-rest',  component: MessagesRest },
  { path: 'messages-socket',  component: MessagesSocket },

  { path: '**',    component: NoContent },
];

// Async load a component using Webpack's require with es6-promise-loader and webpack `require`
// asyncRoutes is needed for our @angularclass/webpack-toolkit that will allow us to resolve
// the component correctly

const asyncRoutes: AsyncRoutes = {};


// Optimizations for initial loads
// An array of callbacks to be invoked after bootstrap to prefetch async routes
const prefetchRouteCallbacks: Array<IdleCallbacks> = [];


// Es6PromiseLoader and AsyncRoutes interfaces are defined in custom-typings


export const ROUTING_PROVIDERS = [
  provideWebpack(asyncRoutes),
  providePrefetchIdleCallbacks(prefetchRouteCallbacks)
];
