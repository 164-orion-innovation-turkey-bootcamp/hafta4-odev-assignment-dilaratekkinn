import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './service/cart.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'commerce';
  totalItem: number = 0;
  user;
  constructor(
    private router: Router,
    private cartService: CartService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.auth.user.subscribe((res) => {
      if (res) {
        this.user = localStorage.getItem('user');
      } else {
        this.user = null;
      }
    });
    this.getLentgh();
    this.cartService.remove.subscribe((res) => {
      this.getLentgh();
    });
    this.cartService.add.subscribe(res=>{
      this.getLentgh();
    })
  }
  getLentgh() {
    this.cartService.getCart().subscribe((res) => {
      this.totalItem = res.length;
    });
  }
  onlogOut() {
    this.auth.user.next(null);
    this.router.navigate(['/login']);
  }
}
