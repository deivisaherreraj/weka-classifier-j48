import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    'clima',
    'nivel',
    'llovera',
    'actions'
  ];

  constructor(
    private formBuilder: FormBuilder,
    public datasetService: ObjectDatasetService
  ) {
    this.formDataset = this.formBuilder.group({
      clima: ['', [Validators.required]],
      nivel: ['', [Validators.required]],
      llovera: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.datasetService.listDataset();
  }

  addObjectDataset() {
    const data: DataSetObject = {
      id: this.datasetService.getNewGuid(),
      clima: this.formDataset.get('clima')?.value,
      nivel: this.formDataset.get('nivel')?.value,
      llovera: this.formDataset.get('llovera')?.value
    }

    this.datasetService.saveDataset(data);
    this.datasetService.listDataset();
    this.formDataset.reset();
  }

  deleteElement(element: any) {
    if (confirm("¿Esta seguro de eliminar el registro?")) {
      this.datasetService.deleteDataset(element);
      this.datasetService.listDataset();
    }
  }

  generarAlgoritmo() {

  }
}
