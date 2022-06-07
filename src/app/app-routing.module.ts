import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from "./pages/users/users.component";
import {UserComponent} from "./pages/user/user.component";
import {TransactionsComponent} from "./pages/transactions/transactions.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {TableTransactionsComponent} from "./components/table-transactions/table-transactions.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users',
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'user/:id',
    component: UserComponent,
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
  },
  {
    path: 'table',
    component: TableTransactionsComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
