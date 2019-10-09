import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  UnauthorizedAccessComponent
} from './unauthorized-access/unauthorized-access.component';
import {
  PageNotFoundComponent
} from './page-not-found/page-not-found.component';
import {
  LoginComponent
} from './login/login.component';
import {
  SignupComponent
} from './signup/signup.component';
import {
  LiveComponent
} from './live/live.component';
import {
  PreviousComponent
} from './previous/previous.component';
import {
  UpcomingComponent
} from './upcoming/upcoming.component';
import {
  DescriptionComponent
} from './description/description.component';
import {
  AllComponent
} from './all/all.component';
import {
  AddComponent
} from './add/add.component';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent
}, {
  path: 'signup',
  component: SignupComponent
}, {
  path: 'add',
  component: AddComponent
}, {
  path: 'all',
  component: AllComponent
}, {
  path: 'live',
  component: LiveComponent
}, {
  path: 'previous',
  component: PreviousComponent
}, {
  path: 'upcoming',
  component: UpcomingComponent
}, {
  path: 'description/:id',
  component: DescriptionComponent
}, {
  path: 'unauthorized-access',
  component: UnauthorizedAccessComponent
}, {
  path: '',
  redirectTo: '/all',
  pathMatch: 'full'
}, {
  path: '**',
  component: PageNotFoundComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
