import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  dateDiff(date: Date) {
    let fecha = new Date();
    let fecha2 = new Date(date);
    let diff = fecha2.getTime() - fecha.getTime();
    let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    if (diffDays < 0) {
      return "hace " + Math.abs(diffDays) + " días";
    } else if (diffDays == 0) {
      return "hoy";
    } else if (diffDays == 1) {
      return "mañana";
    } else if (diffDays > 1) {
      return "en " + diffDays + " días";
    } else {
      return diffDays;
    }
  }
}
