import { HttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required],
    });
  }
  login() {
    this.http.get<any>('http://localhost:3000/signupUsers').subscribe((res) => {
      const user = res.find((a: any) => {
        return (
          a.email === this.loginForm.value.email &&
          a.password === this.loginForm.value.password
        );
      });
      if (user) {
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user));
        this.auth.user.next(true);
        alert('Giriş Başarılı');
        this.loginForm.reset();
        this.router.navigate(['/shop']);
      } else {
        alert('Kullanıcı Bulunamadı!');
      }
    });
  }
}
