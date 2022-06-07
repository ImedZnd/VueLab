import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {UserDataX} from "../table/table.component";
import {TransactionService} from "../../services/transaction.service";
import { ActivatedRoute } from '@angular/router';

export interface TransactionData {
  transactionId: string;
  currency: string;
  amount: string;
  state: string;
  createdDate: string;
  merchantCategory: string;
  merchantCountry: string;
  entryMethod: string;
  userId: string;
  type: string;
  source: string;
  flaged: string;
}

@Component({
  selector: 'app-table-transactions',
  templateUrl: './table-transactions.component.html',
  styleUrls: ['./table-transactions.component.css']
})
export class TableTransactionsComponent implements AfterViewInit {

  dataSource: MatTableDataSource<TransactionData>;
  displayedColumnsX = [
    'currency',
    'amount',
    'state',
    'createdDate',
    'merchantCategory',
    'merchantCountry',
    'entryMethod',
    'type',
    'source',
    'flaged'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator | null;
  @ViewChild(MatSort) sort!: MatSort | null;
  transactionsX: TransactionData[] = []

  id:string= "0";
  constructor(private transactionService:TransactionService,private route: ActivatedRoute) {
    // @ts-ignore
    this.id = this.route.snapshot.paramMap.get('id');
    this.transactionService.getAllTransactionsByUserId(this.id).subscribe(data=>{
      this.transactionsX = data
      this.dataSource = new MatTableDataSource(this.transactionsX)
    })
    this.dataSource = new MatTableDataSource(this.transactionsX)
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  flagTransactionOnClick(id:string){
    this.transactionService.flagTransactionsById(id).subscribe()
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

}
