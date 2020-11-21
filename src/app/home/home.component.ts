import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

    public homeText: string;
    public dateValue: Date;

    public ownerForm: FormGroup;

    constructor(private auth: AuthService) { }

    ngOnInit(): void {
        this.homeText = 'WELCOME TO ACCOUNT-OWNER APPLICATION';

        this.ownerForm = new FormGroup({
            numberInput: new FormControl(null)
        });

        this.auth.authenticate();
    }

    public createOwner(formValue): void {
        debugger;
        console.log(formValue.numberInput);
    }
}
