import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public search=new BehaviorSubject<string>("");

  remove = new Subject();
  add=new Subject(); //component arası haberleşme
  constructor(private http: HttpClient) {}
  getProducts() {
    return this.productList.asObservable(); //Observable bir akış belirtir,dışarıdan subscribe olunabilir,dışarıdan izleniyor.
  }
  //--------üRÜNLERİ SEPETE KAYDEDEN FONSKİYON SETPRODUCT()
  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product); //akışa data eklemek için next()--(resolve dönmüş gibi düşün.)kullanılır
  }
  addtoCart(product: any) {
    console.log(product);
    this.http.post('http://localhost:3000/cart',product).subscribe();

  }
  getCart() {
    return this.http.get('http://localhost:3000/cart').pipe(
      map((res) => {
        const neww = [];
        for (let key in res) {
          if (res.hasOwnProperty(key)) {
            neww.push(res[key]);
          }
        }
        return neww;
      })
    );
  }
  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total; //map ile diziden yeni dizi üretilir
    });

    return grandTotal;
  }
  removeCartItem(product: any) {
    this.http.delete('http://localhost:3000/cart/' + product).subscribe(
      res=>{
        this.remove.next(true);
      }
    );
    // this.cartItemList.map((a: any, index: any) => {
    //   if (product.id == a.id) {
    //     this.cartItemList.splice(index, 1); //1 item silme methodu
    //   } //ürün id'nin cartitemlistte ki id ile uyuşması kontrolü yapılır
    // });
  }

}
