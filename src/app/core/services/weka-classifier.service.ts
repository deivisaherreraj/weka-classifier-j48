import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WekaClassifierService {

  constructor() { }

  public static classify(i: Object[]): number {
    let p: number = NaN;
    p = this.N7c3ff84719(i);
    return p;
  }

  static N7c3ff84719(i: Object[]): number {
    let p: number = NaN;
    if ((i[0] == null)) {
      p = 1;
    } else if (i[0] === "sunny") {
      p = this.N412cf37220(i);
    } else if (i[0] === "overcast") {
      p = 0;
    } else if (i[0] === "rainy") {
      p = this.N4231fac21(i);
    }
    return p;
  }

  static N412cf37220(i: Object[]): number {
    let p: number = NaN;
    if ((i[2] == null)) {
      p = 1;
    } else if (i[2] === "high") {
      p = 1;
    } else if (i[2] === "normal") {
      p = 0;
    }
    return p;
  }

  static N4231fac21(i: Object[]): number {
    let p: number = NaN;    
    if ((i[3] == null)) {
      p = 1;
    } else if (i[3] === "TRUE") {
      p = 1;
    } else if (i[3] === "FALSE") {
      p = 0;
    }
    return p;
  }
}
