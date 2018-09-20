import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { World, Pallier, Product } from './world';

@Injectable({
  providedIn: 'root'
})
export class RestserviceService
{

  server = "http://localhost:8081/";
  user = "";

  constructor(private http: Http) { }

  private handleError(error: any): Promise<any>
  {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getWorld(): Promise<World> {
    return this.http.get(this.server + "adventureisis/generic/world").toPromise().then(response =>response.json()).catch(this.handleError);
  };

  getServer(): string{
    return this.server;
  }
}
