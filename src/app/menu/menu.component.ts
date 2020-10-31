import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

    items: MenuItem[];

    constructor() { }

    ngOnInit(): void {
        this.items = [
            {
                label: 'Account-Owner Home',
                routerLink: ['/home'],
                routerLinkActiveOptions: { exact: true }
            },
            {
                label: 'Owner Actions',
                routerLink: ['/owner/actions'],
                routerLinkActiveOptions: { exact: true }
            },
            {
                label: 'Account Actions',
                routerLink: ['/account/actions'],
                routerLinkActiveOptions: { exact: true }
            }
        ];
    }

}
