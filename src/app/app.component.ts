import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { HeaderComponent } from '@components/header/header.component';
import { FooterComponent } from '@components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuLateralComponent, HeaderComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'convenios';
}
