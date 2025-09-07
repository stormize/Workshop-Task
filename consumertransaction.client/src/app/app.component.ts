import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConsumerServiceService } from '../services/Consumer/consumer-service.service';
import { GetAllConsumersDto } from "../Models/Get-All-Consumers.Dto";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { GetConsumerWithTransactionsDto } from '../Models/Get-Consumer-With-Transactions.Dto';
import { AddConsumerDto } from '../Models/Add-Consumer.Dto';
import { AddTransactionDto } from '../Models/add-Transaction.Dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  consumers: GetAllConsumersDto[] = [];
  selectedConsumer: GetConsumerWithTransactionsDto | null = null;

  constructor(private _consumerServiceService: ConsumerServiceService, private modalService: NgbModal) {


  }

  ngOnInit() {
    this._consumerServiceService.GeAllConsumers().subscribe(x => this.consumers = x);
  }

  open(content: any, selectedConsumer: GetAllConsumersDto | null = null) {
    if(selectedConsumer != null){
     this._consumerServiceService.GetConsumerWithTransactions(selectedConsumer?.id).subscribe((x:GetConsumerWithTransactionsDto) => {
       this.selectedConsumer = x;
      },e=>alert(e.error));
    }
    this.modalService.open(content);
  }

  onSubmitCreateConsumer(form: NgForm) {
    if (form.valid) {
      let newConsumer:AddConsumerDto = {
          fullName : form.value.fullName,
          email : form.value.email
      }
      this._consumerServiceService.AddConsumer(newConsumer).subscribe((x:GetAllConsumersDto) => {
        this.consumers.push(x);
        form.resetForm();
      },e=>alert(e.error));
    }
  }

  onSubmitAddTransaction(form: NgForm) {
    if (form.valid) {
      let newTransaction:AddTransactionDto = {
          consumerId : this.selectedConsumer?.id,
          amount :  form.value.amount
      }
      this._consumerServiceService.AddConsumerTransaction(newTransaction).subscribe((x:GetAllConsumersDto) => {
        this.consumers.push(x);
        form.resetForm();

      },e=>alert(e.error));
    }
  }
}
