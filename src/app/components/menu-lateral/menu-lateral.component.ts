import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-lateral',
  imports: [RouterLink,CommonModule],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css'
})
export class MenuLateralComponent {
  // selectedMenuIndex: number = -1;
  // selectMenu(index: number) {
  //   this.selectedMenuIndex = index;
  // }
}
