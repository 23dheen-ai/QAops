import {type Locator,type Page, expect} from '@playwright/test';
let message1 : string = "hello";
let age1 : number = 20;
console.log(age1)
let isActive : boolean = false;

let numberArray : number[] = [1,2,3,4,5];

let data : any = "this could be anything";
data = 42;
//to write function
function add(a:number,b:number) :number{
return a+b;
}
add(5,10);

let user : {name:string, age:number} = {name:"Dheena",age :25}

//for class declaration
class CartPage
{
    page : Page
    cartProducts : Locator
    productsText : Locator
    cart : Locator
    orders : Locator
    checkout : Locator
constructor(page:any)
{
    this.page = page;
    this.cartProducts = page.locator("div li").first();
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator("text=Checkout");

}

}

