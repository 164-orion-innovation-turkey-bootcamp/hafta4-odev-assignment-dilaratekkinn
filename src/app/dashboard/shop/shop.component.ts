import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  public productList: any;
  public filterCategory: any;
  searchKey: string = '';
  constructor(private api: ApiService, private cartService: CartService) {}

  ngOnInit(): void {
    this.api.getProduct().subscribe((res) => {
      this.productList = res;
      this.filterCategory = res;

      this.productList.forEach((a: any) => {
        if (a.category === 'kolye') {
          a.category = 'Kolye';
        }
        Object.assign(a, { quantity: 1, total: a.price });
      });
      console.log(this.productList);
    });
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }
  addtocart(item: any) {
    console.log(item);
    const cart = {
      id: item.id,
      title: item.title,
      price: item.price,
      code: item.code,
      Features: item.Features,
      category: item.category,
      image: item.image,
      quantity: item.quantity,
      total: item.total,
      user: JSON.parse(localStorage.getItem('user')).id,
    };
    this.cartService.addtoCart(cart);
    this.cartService.add.next(true);
  }
  filter(category: string) {
    this.filterCategory = this.productList.filter((a: any) => {
      if (a.category == category || category == '') {
        return a;
      }
    });
  }
}
