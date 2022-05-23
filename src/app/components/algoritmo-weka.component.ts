import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataSetObject } from '../core/models/data-set-object';
import { ObjectDatasetService } from '../core/services/object-dataset.service';

@Component({
  selector: 'app-algoritmo-weka',
  templateUrl: './algoritmo-weka.component.html',
  styleUrls: ['./algoritmo-weka.component.scss']
})
export class AlgoritmoWekaComponent implements OnInit {
  formDataset: FormGroup;
  displayedColumns: string[] = [
    'outlook',
    'temperature',
    'humidity',
    'windy',
    'play',
  ];

  constructor(
    private formBuilder: FormBuilder,
    public datasetService: ObjectDatasetService
  ) {
    this.formDataset = this.formBuilder.group({
      outlook: ['', [Validators.required]],
      temperature: ['', [Validators.required]],
      humidity: ['', [Validators.required]],
      windy: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.datasetService.clearLocalStorage();
    this.datasetService.listDataset();
  }

  addObjectDataset() {
    const data: DataSetObject = {
      id: this.datasetService.getNewGuid(),
      outlook: this.formDataset.get('outlook')?.value,
      temperature: this.formDataset.get('temperature')?.value,
      humidity: this.formDataset.get('humidity')?.value,
      windy: this.formDataset.get('windy')?.value
    }

    this.datasetService.saveDataset(data);
    this.datasetService.listDataset();
    this.formDataset.reset();
  }

  deleteElement(element: any) {
    if (confirm("Are you sure you want to delete the record?")) {
      this.datasetService.deleteDataset(element);
      this.datasetService.listDataset();
    }
  }

  generarAlgoritmo() {

  }
}
