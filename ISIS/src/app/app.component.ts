import { Component } from '@angular/core';
import { RestserviceService } from './restservice.service';
import { World, Product } from './world';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  title = 'Monopoly Capitalist';
  image = 'icones/';
  world: World = new World();
  server: string;
  qtmulti= "x1";
  money: any;
  score:any;

  constructor(private service: RestserviceService)
  {
    this.server = service.getServer();
    service.getWorld().then( world => {
      this.world = world;
    });
  }

  ngOnInit() { 
    this.money=this.world.money;
    this.score=this.world.score;
  }

  onProductionDone(product : Product) {
    this.world.money += product.revenu * product.quantite;
    this.world.score+= product.revenu * product.quantite;
  }

  onBuyDone(n : number) {
    this.world.money -= n;
    this.world.score -= n;
  }

  /* defineNext(){
    switch (this.qtmulti){
      case "x1": { 
        this.qtmulti = "x10";
        break; 
     }
     case "x10": { 
      this.qtmulti = "x100";
      break;
     }
    case "x100": { 
        this.qtmulti = "xMax";
        break; 
      }
    case "xMax": { 
        this.qtmulti = "x1";
        break; 
      }
    }
  } */
}
