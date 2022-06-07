import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

export interface UserDataX {
  seqUser: string;
  countryCode: string;
  termsVersion: string;
  kyc: string;
  numberOfFlags: string;
  fraudster: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements AfterViewInit {
  dataSource: MatTableDataSource<UserDataX>;
  displayedColumnsX = ['seqUser', 'countryCode', 'termsVersion', 'kyc', 'numberOfFlags', 'fraudster', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator | null;
  @ViewChild(MatSort) sort!: MatSort | null;
  usersX: UserDataX[] = []

  constructor(private userService: UserService, private router: Router) {
    this.userService.getAllPerson().subscribe(data => {
        this.usersX = data;
        this.dataSource = new MatTableDataSource(this.usersX)
        console.log(data)
      }
    )
    this.dataSource = new MatTableDataSource(this.usersX);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  checkOneUser(id: number) {
    this.router.navigate(['/user', id]);
  }
}
