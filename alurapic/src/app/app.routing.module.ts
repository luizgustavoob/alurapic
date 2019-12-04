import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';
import { AuthGuard } from './core/auth/auth.guard';
import { PhotoDetailComponent } from './photos/photo-detail/photo-detail.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    { 
        path: 'home', 
        loadChildren: './home/home.module#HomeModule'
    },    
    { 
        path: 'user/:userName', 
        component: PhotoListComponent, 
        resolve: {
            photos: PhotoListResolver
        },
        data: {
            title: 'Timeline'
        }
    },
    { 
        path: 'p/add', 
        component: PhotoFormComponent,
        canActivate: [ AuthGuard ],
        data: {
            title: 'Photo upload'
        }
    }, 
    { 
        path: 'p/:id', 
        component: PhotoDetailComponent,
        data: {
            title: 'Photo detail'
        }
    },
    { 
        path: 'not-found', 
        component: NotFoundComponent,
        data: {
            title: 'Not found'
        }
    },
    { 
        path: '**', 
        redirectTo: 'not-found'
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }