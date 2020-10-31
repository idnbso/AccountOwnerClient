import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  public homeText: string;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.homeText = 'WELCOME TO ACCOUNT-OWNER APPLICATION';

    this.auth.authenticate();
  }

}
