import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/world';
import { RestserviceService } from '../restservice.service';

declare var require;
const ProgressBar = require("progressbar.js");

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  serverImage="http://localhost:8081/icones/";
  product: Product;
  lastupdate: any;
  progressbar: any;
  _qtmulti: any;
  _qtmultip: any;
  _money: number;

  @ViewChild('bar') progressBarItem;

  @Input()
  set prod(value: Product) {
    this.product = value;
    if (this.product && this.product.timeleft > 0) {
      this.lastupdate = Date.now();
      let progress = (this.product.vitesse - this.product.timeleft) / this.product.vitesse;
      this.progressbar.set(progress);
      this.progressbar.animate(1, {
        duration: this.product.timeleft });
      }
    }

  @Input() set qtmulti(value: string) {
  this._qtmultip = value;
  this._qtmulti = value;
  if (this._qtmulti=="xMax" && this.product) this.calcMaxCanBuy();
  }

  @Input() set money(value: any) {
    this._money = value;
  }

  @Input()
  set worldMoney(value: number)
  {
    this.worldMoney = value;
    this.calcMaxCanBuy();
  }

  @Output() notifyProduction: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() notifyMoney: EventEmitter<Product> = new EventEmitter<Product>();

  constructor() {}

  ngOnInit() {
    this.progressbar = new ProgressBar.Line(this.progressBarItem.nativeElement, { strokeWidth: 50, color:'black' });
    setInterval(() => { this.calcScore(); }, 100);
  }

  startFabrication(){
    if(this.product.timeleft==0){
      this.progressbar.animate(1, { duration: this.product.vitesse });
      this.product.timeleft=this.product.vitesse;
      this.lastupdate = Date.now();
    }
  }

  onBuy(){
    let sum;
    //calcul suites geometriques
    sum = this.product.cout*((1-Math.pow(this.product.croissance,this._qtmultip))/(1-this.product.croissance));
    this.product.quantite+=1;
    if(this._money>=sum){
      this.product.cout=this.product.cout*Math.pow(this.product.croissance,this._qtmultip);
      this.notifyMoney.emit(sum);
    };
  }

  calcScore() {
    if(this.product.timeleft>0){
      let tempsEcoule = Date.now()-this.lastupdate;
      this.product.timeleft=(this.product.vitesse)-tempsEcoule;
      if(this.product.timeleft<=0){
        this.product.timeleft=0;
        this.progressbar.set(0);
        // on prévient le composant parent que ce produit a généré son revenu.
        this.notifyProduction.emit(this.product);
      }
    }
  }

  calcMaxCanBuy() {
    this._qtmultip=Math.floor(Math.log(1 - (this._money / this.product.cout) * (1 - this.product.croissance)) / Math.log(this.product.croissance));
  }

}
