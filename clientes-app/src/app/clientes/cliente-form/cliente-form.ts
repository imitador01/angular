import { Component, inject, input, output, linkedSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-cliente-form',
  imports: [FormsModule],
  templateUrl: './cliente-form.html',
  styleUrl: './cliente-form.css'
})
export class ClienteForm {

  readonly cliente = input.required<Cliente>();
  readonly onSave = output<Cliente>();

  protected activeModal = inject(NgbActiveModal);

  // Copia editable, resincronizada cuando cliente() cambia.
  protected readonly form = linkedSignal(() => ({ ...this.cliente() }));

  protected cancel(): void {
    this.activeModal.dismiss();
  }

  protected saveCliente(): void {
    this.onSave.emit(this.form());
    this.activeModal.close(this.form());
  }
}
