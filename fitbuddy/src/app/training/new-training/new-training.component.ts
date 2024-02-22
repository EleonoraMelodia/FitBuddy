import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.css'
})
export class NewTrainingComponent {
  @Output() newTrainig = new EventEmitter<void>();

  onStartTraining() {
    this.newTrainig.emit()
  }

}
