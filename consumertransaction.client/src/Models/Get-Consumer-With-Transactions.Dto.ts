import { GetAllConsumersDto } from "./Get-All-Consumers.Dto";
import { GetAllTransactionsDto } from "./Get-All-Transactions.Dto";

export interface GetConsumerWithTransactionsDto extends GetAllConsumersDto {
  transactions: GetAllTransactionsDto[];
}