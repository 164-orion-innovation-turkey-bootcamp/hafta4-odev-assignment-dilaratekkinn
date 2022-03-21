import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public products: any = [];

  public grandTotal!: number;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.remove.subscribe((res) => {this.getCarts()});
    console.log(this.products);
    this.getCarts();
  }
  getCarts() {
    this.cartService.getCart().subscribe((res) => {
      this.products = [];
      res.forEach((element) => {
        if (element.user == JSON.parse(localStorage.getItem('user')).id) {
          this.products.push(element);
        }
        console.log(element.user);
        console.log(JSON.parse(localStorage.getItem('user')).id);
      });

      // this.products = res;
      // console.log(this.products);
    });
    // this.cartService.getProducts().subscribe((res) => {
    //   this.products = res;
    //   this.grandTotal = this.cartService.getTotalPrice();
    // });
  }
  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }
}
