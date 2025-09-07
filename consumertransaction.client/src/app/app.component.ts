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

open(content: any, selectedConsumer: GetAllConsumersDto | null = null): void {
  if (selectedConsumer) {
    this._consumerServiceService.GetConsumerWithTransactions(selectedConsumer.id).subscribe({
      next: (consumer: GetConsumerWithTransactionsDto) => {
        this.selectedConsumer = consumer;
        this.modalService.open(content); // Open modal after data loads
      },
      error: (error) => {
        alert(error?.error || 'Failed to load consumer details.');
      }
    });
  } else {
    this.modalService.open(content);
  }
}

onSubmitCreateConsumer(form: NgForm): void {
  if (form.valid) {
    const newConsumer: AddConsumerDto = {
      fullName: form.value?.fullName,
      email: form.value?.email
    };

    this._consumerServiceService.AddConsumer(newConsumer).subscribe({
      next: (createdConsumer: GetAllConsumersDto) => {
        this.consumers.push(createdConsumer);
        form.resetForm();
      },
      error: (error) => {
        alert(error?.error || 'Failed to create consumer.');
      }
    });
  }
}

onSubmitAddTransaction(form: NgForm): void {
  if (form.valid && this.selectedConsumer?.id) {
    const newTransaction: AddTransactionDto = {
      consumerId: this.selectedConsumer.id,
      amount: form.value?.amount
    };

    this._consumerServiceService.AddConsumerTransaction(newTransaction).subscribe({
      next: () => {
        form.resetForm();
        // Optionally, refresh consumer or transaction list here
      },
      error: (error) => {
        alert(error?.error || 'Failed to add transaction.');
      }
    });
  }
}

}
