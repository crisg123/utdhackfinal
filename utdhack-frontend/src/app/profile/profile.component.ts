import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../_services/token-storage.service';
import { UserService} from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  water = '';
  power = '';
  toiletries = '';
  currentUser: any;
  email1: string;
  constructor(private token: TokenStorageService, private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    this.email1 = this.currentUser.email;
    console.log(this.email1);
  }


  onSubmit() {
    if (this.water == 'Yes') {
      console.log(this.email1 + ' on submit');
      this.userService.updateWater(this.email1).subscribe();
    }
    if (this.power == 'Yes') {
      this.userService.updatePower(this.email1).subscribe();
    }
    if (this.toiletries == 'Yes') {
      this.userService.updateToiletries(this.email1).subscribe();
    }

  }

}
