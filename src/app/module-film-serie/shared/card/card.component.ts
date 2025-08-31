import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../models/card.model';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
    standalone: true,
    imports: [RouterLink, NgIf]
})
export class CardComponent implements OnInit {
  @Input() dataCard!: Card;
  
  card!: Card;

  ngOnInit(): void {
    this.card = this.dataCard;
  }
}
