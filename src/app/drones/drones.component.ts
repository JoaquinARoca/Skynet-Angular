import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DronesService, Drone } from '../services/drones.services';

@Component({
  selector: 'app-drones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './drones.component.html',
  styleUrls: ['./drones.component.css']
})
export class DronesComponent implements OnInit {
  drones: Drone[] = [];
  droneForm!: FormGroup;
  editing: boolean = false;
  currentDroneId: string = '';

  constructor(private dronesService: DronesService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadDrones();
    this.initForm();
  }

  // Cargar la lista de drones del backend
  loadDrones(): void {
    this.dronesService.getAll().subscribe({
      next: (data) => { this.drones = data; },
      error: (err) => { console.error('Error al obtener drones', err); }
    });
  }

  // Inicializa el formulario de creación/edición
  initForm(): void {
    this.droneForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      model: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      images: [''], // Se espera una cadena separada por comas, que luego se convertirá en array
      type: ['venta', Validators.required],
      condition: ['nuevo', Validators.required],
      location: ['', Validators.required],
      contact: ['', Validators.required],
      category: ['', Validators.required],
      sellerId: ['', Validators.required]
    });
  }

  // Envía el formulario: crea o actualiza un dron
  onSubmit(): void {
    if (this.droneForm.invalid) {
      this.droneForm.markAllAsTouched();
      return;
    }
    // Convierte la cadena de imágenes en un array
    const formValue = { ...this.droneForm.value };
    if (formValue.images && typeof formValue.images === 'string') {
      formValue.images = formValue.images.split(',').map((img: string) => img.trim());
    }
    
    if (this.editing) {
      // Actualiza el dron
      this.dronesService.update(this.currentDroneId, formValue).subscribe({
        next: (updatedDrone) => {
          alert('Dron actualizado exitosamente.');
          this.loadDrones();
          this.resetForm();
        },
        error: (err) => {
          console.error('Error al actualizar el dron', err);
          alert(err.error?.message || 'Error al actualizar el dron.');
        }
      });
    } else {
      // Crea un nuevo dron
      this.dronesService.create(formValue).subscribe({
        next: (newDrone) => {
          alert('Dron creado exitosamente.');
          this.loadDrones();
          this.resetForm();
        },
        error: (err) => {
          console.error('Error al crear el dron', err);
          alert(err.error?.message || 'Error al crear el dron.');
        }
      });
    }
  }

  // Rellena el formulario con los datos del dron a editar
  onEdit(drone: Drone): void {
    this.editing = true;
    this.currentDroneId = drone._id || '';
    this.droneForm.patchValue({
      id: drone.id,
      name: drone.name,
      model: drone.model,
      price: drone.price,
      description: drone.description,
      images: drone.images ? drone.images.join(', ') : '',
      type: drone.type,
      condition: drone.condition,
      location: drone.location,
      contact: drone.contact,
      category: drone.category,
      sellerId: drone.sellerId
    });
  }

  // Elimina un dron
  onDelete(drone: Drone): void {
    if (confirm('¿Estás seguro de eliminar este dron?')) {
      this.dronesService.delete(drone._id || '').subscribe({
        next: () => {
          alert('Dron eliminado exitosamente.');
          this.loadDrones();
        },
        error: (err) => {
          console.error('Error al eliminar el dron', err);
          alert(err.error?.message || 'Error al eliminar el dron.');
        }
      });
    }
  }

  // Reinicia el formulario y desactiva el modo edición
  resetForm(): void {
    this.editing = false;
    this.currentDroneId = '';
    this.droneForm.reset({
      id: '',
      name: '',
      model: '',
      price: 0,
      description: '',
      images: '',
      type: 'venta',
      condition: 'nuevo',
      location: '',
      contact: '',
      category: '',
      sellerId: ''
    });
  }
}
