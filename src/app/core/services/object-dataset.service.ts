import { Injectable } from '@angular/core';
import { DataSetObject } from '../models/data-set-object';
import { WekaClassifierService } from './weka-classifier.service';

@Injectable({
  providedIn: 'root'
})
export class ObjectDatasetService {
  listDataSetObject: Array<DataSetObject> = [];
  nameLocalStorage: string = 'dataset'

  constructor(private wekaClassifierService: WekaClassifierService) { }

  clearLocalStorage(){
    localStorage.removeItem(this.nameLocalStorage)
  }

  saveDataset(dataset: DataSetObject) {
    let arrayEmpyt = Array<DataSetObject>();
    let arrayDataset = (localStorage.getItem(this.nameLocalStorage) || arrayEmpyt) as DataSetObject[];

    if (typeof arrayDataset === 'string') {
      arrayDataset = JSON.parse(arrayDataset);
    }

    dataset = this.processData(dataset);
    arrayDataset.push(dataset);
    //Guardamos el array en el localStorage.
    localStorage.setItem(this.nameLocalStorage, JSON.stringify(arrayDataset));
  }

  processData(dataset: DataSetObject): DataSetObject{
    if(!!dataset.play)return dataset;
    const list: any = [dataset.outlook, dataset.temperature, dataset.humidity, dataset.windy];
    const result = this.wekaClassifierService.classify(list);
    dataset.play = result > 0? 'no': 'yes';
    return dataset;
  }

  deleteDataset(element: any) {
    let arrayEmpyt = Array<DataSetObject>();
    let arrayDataset = (localStorage.getItem(this.nameLocalStorage) || arrayEmpyt) as DataSetObject[];

    if (typeof arrayDataset === 'string') {
      arrayDataset = JSON.parse(arrayDataset);
    }

    //Buscamos el objeto a eliminar en el array del localStorage.
    arrayDataset = arrayDataset.filter(item => item.id !== element.id);
    /* for (var i = 0; i < arrayDataset.length; i++) {
      if (arrayDataset[i].id === element.id) {
        arrayDataset.splice(i, 1);
      }
    }*/

    //Guardamos el array actualizado del objeto en el localStorage.
    localStorage.setItem(this.nameLocalStorage, JSON.stringify(arrayDataset));
  }

  listDataset() {
    let arrayEmpyt = Array<DataSetObject>();
    let arrayDataset = (localStorage.getItem(this.nameLocalStorage) || arrayEmpyt);

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
