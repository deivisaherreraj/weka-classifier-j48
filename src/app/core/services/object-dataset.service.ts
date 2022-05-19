import { Injectable } from '@angular/core';
import { DataSetObject } from '../models/data-set-object';

@Injectable({
  providedIn: 'root'
})
export class ObjectDatasetService {
  listDataSetObject: Array<DataSetObject> = [];

  constructor() { }

  saveDataset(dataset: DataSetObject) {
    let arrayEmpyt = Array<DataSetObject>();
    let arrayDataset = (localStorage.getItem('dataset') || arrayEmpyt) as DataSetObject[];

    if (typeof arrayDataset === 'string') {
      arrayDataset = JSON.parse(arrayDataset);
    }

    //Agregamos el nuevo registra al array.
    arrayDataset.push(dataset);
    //Guardamos el array en el localStorage.
    localStorage.setItem('dataset', JSON.stringify(arrayDataset));
  }

  deleteDataset(element: any) {
    let arrayEmpyt = Array<DataSetObject>();
    let arrayDataset = (localStorage.getItem('dataset') || arrayEmpyt) as DataSetObject[];

    if (typeof arrayDataset === 'string') {
      arrayDataset = JSON.parse(arrayDataset);
    }

    //Buscamos el objeto a eliminar en el array del localStorage.
    for (var i = 0; i < arrayDataset.length; i++) {
      if (arrayDataset[i].id === element.id) {
        arrayDataset.splice(i, 1);
      }
    }

    //Guardamos el array actualizado del objeto en el localStorage.
    localStorage.setItem('dataset', JSON.stringify(arrayDataset));
  }

  listDataset() {
    let arrayEmpyt = Array<DataSetObject>();
    let arrayDataset = (localStorage.getItem('dataset') || arrayEmpyt);

    if (typeof arrayDataset === 'string') {
      arrayDataset = JSON.parse(arrayDataset);
    }

    this.listDataSetObject = arrayDataset as DataSetObject[];
  }

  getNewGuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };
}
