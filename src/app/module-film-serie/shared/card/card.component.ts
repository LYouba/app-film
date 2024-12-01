import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../models/card.model';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() dataCard!: Card;
  
  card!: Card;

  ngOnInit(): void {
    this.card = this.dataCard;
  }
}
