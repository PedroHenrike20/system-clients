import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ClientDTO } from '../../models/client.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss'],
})
export class ModalDialogComponent implements OnInit, OnChanges {
  @Input() client: ClientDTO | null = null;
  @Input() visible: boolean = false;
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() confirmText: string = '';
  @Input() actionType!: 'delete' | 'edit' | 'create';

  @Output() onConfirm = new EventEmitter<Partial<ClientDTO> | null>();
  @Output() onClose = new EventEmitter<boolean>();

  clientDTO: Partial<ClientDTO> = {};
  form!: FormGroup;
  isEditing: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      salary: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*.?[0-9]+$')],
      ],
      companyValuation: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*.?[0-9]+$')],
      ],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['client'] && changes['client'].currentValue) {
      this.isEditing = true;
      this.clientDTO = { ...changes['client'].currentValue };
      console.log(this.clientDTO);
      this.form.patchValue(this.clientDTO);
    } else {
      this.isEditing = false;
      this.resetForm();
    }
  }

  confirmAction() {
    if (this.actionType === 'delete') {
      this.onConfirm.emit(null);
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.clientDTO = { ...this.form.value, id: this.clientDTO.id };
    console.log(this.clientDTO);
    this.onConfirm.emit(this.clientDTO);
  }

  closeDialog() {
    this.onClose.emit(false);
  }

  resetForm() {
    this.clientDTO = {};
    this.form.reset();
  }
}
