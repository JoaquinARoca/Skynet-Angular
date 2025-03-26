import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DronesService, Drone } from '../services/drones.services';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-drones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './drones.component.html',
  styleUrls: ['./drones.component.css']
})
export class DronesComponent implements OnInit {
  drones: Drone[] = [];
  filteredDrones: Drone[] = []; // para mostrar drones según categoría
  droneForm!: FormGroup;
  editing: boolean = false;
  currentDroneId: string = '';
  showForm: boolean = false; // controla mostrar/ocultar formulario
  currentUserId: string | null = null; // para saber quién es el usuario

  constructor(
    private dronesService: DronesService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Obtenemos el userId actual (si está logueado)
    this.currentUserId = this.authService.getUserId();
    this.loadDrones();
    this.initForm();
  }

  // Cargar la lista de drones del backend
  loadDrones(): void {
    this.dronesService.getAll().subscribe({
      next: (data) => {
        this.drones = data;
        // Por defecto, muestra todos los drones disponibles
        this.filteredDrones = data;
      },
      error: (err) => {
        console.error('Error al obtener drones', err);
      }
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
      images: [''],
      type: ['venta', Validators.required],
      condition: ['nuevo', Validators.required],
      location: ['', Validators.required],
      contact: ['', Validators.required],
      category: ['', Validators.required],
      // sellerId se establece en el backend según el token
      // pero si tu backend requiere un valor en el body, déjalo (aunque se sobrescriba)
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
        next: () => {
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
        next: () => {
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
    this.showForm = true; // muestra el formulario al editar
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
    if (!this.authService.isLoggedIn()) {
      alert('Debes iniciar sesión para eliminar un dron.');
      return;
    }
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
    this.showForm = false; // oculta el formulario tras guardar o cancelar
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

  // Muestra u oculta el formulario de creación
  toggleForm(): void {
    // Si no está logueado, no puede crear
    if (!this.authService.isLoggedIn()) {
      alert('Debes iniciar sesión para crear un dron.');
      return;
    }
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  // Filtra drones por categoría (o tipo, como “venta”, “alquiler”, etc.)
  filterByCategory(cat: string): void {
    // Si prefieres filtrar en el backend, usa getByCategory(cat).
    // Aquí, filtras en memoria:
    this.filteredDrones = this.drones.filter((drone) => {
      return (
        drone.type === cat ||
        drone.category.toLowerCase() === cat.toLowerCase()
      );
    });
  }

  // Compramos el dron si no es del usuario actual
  onBuy(drone: Drone): void {
    if (!this.authService.isLoggedIn()) {
      alert('Debes iniciar sesión para comprar un dron.');
      return;
    }
    this.dronesService.purchase(drone._id!).subscribe({
      next: (res) => {
        alert(res.message || 'Compra realizada con éxito.');
        // Tras comprar, se marca como vendido en el backend.
        // Recargamos la lista de drones (el vendido desaparecerá).
        this.loadDrones();
      },
      error: (err) => {
        console.error('Error al comprar el dron', err);
        alert(err.error?.message || 'Error al comprar el dron.');
      }
    });
  }

  // Agregar reseña a un dron
  onAddReview(drone: Drone): void {
    if (!this.authService.isLoggedIn()) {
      alert('Debes iniciar sesión para dejar una reseña.');
      return;
    }
    // Ejemplo: prompt para rating y comentario
    const ratingStr = prompt('Ingresa tu calificación (1 a 5):');
    if (!ratingStr) return;
    const rating = parseInt(ratingStr, 10);
    const comment = prompt('Ingresa tu comentario:') || '';
    if (!comment) return;

    this.dronesService.addReview(drone._id!, rating, comment).subscribe({
      next: (res) => {
        alert(res.message || 'Reseña agregada con éxito.');
        // Podrías recargar el dron o la lista para ver la reseña.
      },
      error: (err) => {
        console.error('Error al agregar reseña', err);
        alert(err.error?.message || 'Error al agregar reseña.');
      }
    });
  }

  // Verificamos si el dron es del usuario actual
  isOwner(drone: Drone): boolean {
    return drone.sellerId === this.currentUserId;
  }
}
