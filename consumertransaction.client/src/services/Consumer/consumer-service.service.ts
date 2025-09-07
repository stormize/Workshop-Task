import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllConsumersDto } from '../../Models/Get-All-Consumers.Dto';
import { GetConsumerWithTransactionsDto } from '../../Models/Get-Consumer-With-Transactions.Dto';
import { GetAllTransactionsDto } from '../../Models/Get-All-Transactions.Dto';
import { AddConsumerDto } from '../../Models/Add-Consumer.Dto';
import { AddTransactionDto } from '../../Models/add-Transaction.Dto';

@Injectable({
  providedIn: 'root'
})
export class ConsumerServiceService {
 baseurl = 'https://localhost:7001';
  constructor(private _httpClient : HttpClient ) { }

  GeAllConsumers():Observable<GetAllConsumersDto[]>
  {
    return this._httpClient.get<GetAllConsumersDto[]>(`${this.baseurl}/consumers`);
  }
    AddConsumer(consumer:AddConsumerDto):Observable<GetAllConsumersDto>
  {
    return this._httpClient.post<GetAllConsumersDto>(`${this.baseurl}/consumers`,consumer);
  }
   GetConsumerWithTransactions(id:number):Observable<GetConsumerWithTransactionsDto>
  {
    return this._httpClient.get<GetConsumerWithTransactionsDto>(`${this.baseurl}/consumers/${id}`);
  }
  AddConsumerTransaction(transaction:AddTransactionDto):Observable<GetAllConsumersDto>
  {
    return this._httpClient.post<GetAllConsumersDto>(`${this.baseurl}/transactions`,transaction);
  }
}
