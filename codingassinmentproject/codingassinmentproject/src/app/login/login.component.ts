import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router) {}
  username = '';
  password = '';
  errormessage = '';

  onSubmit() {
    if (this.username == 'admin' && this.password == 'admin') {
      localStorage.setItem('user', this.username);
      this.router.navigate(['/home']);
    } else {
      this.errormessage = 'login failed';
      this.username = '';
      this.password = '';
    }
  }
}
