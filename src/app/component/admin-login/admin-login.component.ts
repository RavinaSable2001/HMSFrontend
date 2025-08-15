import { Component } from '@angular/core';
import { RadioControlValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: false,
  templateUrl: './admin-login.component.html',
styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  username:string='';
  password:string='';

  constructor(private route:Router){}

checkLogin(): void {
  console.log("Username:", this.username);
  console.log("Password:", this.password);

  if (this.username === 'admin' && this.password === 'admin123') {
    console.log("Login successful");
    this.route.navigate(['/admin/dashboard']);
  } else {
    alert('Invalid credentials');
  }
}


}
