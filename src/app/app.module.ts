import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgChartsModule} from 'ng2-charts';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {UsersComponent} from './pages/users/users.component';
import {UserComponent} from './pages/user/user.component';
import {TransactionsComponent} from './pages/transactions/transactions.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MapComponent} from './components/map/map.component';
import {TableComponent} from './components/table/table.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from "@angular/material/sort";
import {MatTabsModule} from "@angular/material/tabs";
import { TableTransactionsComponent } from './components/table-transactions/table-transactions.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserComponent,
    TransactionsComponent,
    NotFoundComponent,
    MapComponent,
    TableComponent,
    TableTransactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressBarModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
