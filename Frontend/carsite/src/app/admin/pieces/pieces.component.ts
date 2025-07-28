import { Component, OnInit } from '@angular/core';
import { ParcaService } from '../../services/parca.service';

@Component({
  selector: 'app-pieces',
  templateUrl: './pieces.component.html',
  styleUrls: ['./pieces.component.css'],
})
export class PiecesComponent implements OnInit {
  modalVisible = false;
  isEditMode = false;
  showDeleteModal = false;
  partIdToDelete: number | null = null;
  currentPage = 1;
  itemsPerPage = 6;
  errorMessage = '';

  parts: {
    id: number;
    ad: string;
    marka: string;
    fiyat: number;
    stokAdedi: number;
  }[] = [];

  selectedPart = {
    id: '',
    ad: '',
    marka: '',
    stokAdedi: '',
    fiyat: '',
  };

  oldId: number | null = null; // Düzenleme öncesi eski ID'yi tutar
  constructor(private parcaService: ParcaService) {}

  ngOnInit() {
    this.getParcalar();
  }

  getParcalar() {
    this.parcaService.getParcalar().subscribe({
      next: (data) => (this.parts = data),
      error: (err) => console.error('API Hatası:', err),
    });
  }

  private saveToLocalStorage() {
    localStorage.setItem('parts', JSON.stringify(this.parts));
  }

  // En küçük boş ID'yi bul (1'den başlayarak)
  private findNextAvailableId(): string {
    const ids = this.parts.map((p) => +p.id).sort((a, b) => a - b);
    let nextId = 1;
    for (const id of ids) {
      if (id === nextId) {
        nextId++;
      } else if (id > nextId) {
        break;
      }
    }
    return nextId.toString();
  }

  get totalPages(): number {
    return Math.ceil(this.parts.length / this.itemsPerPage);
  }

  get paginatedParts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.parts.slice(start, start + this.itemsPerPage);
  }

  get startItemIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endItemIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.parts.length);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  openModal(part?: any) {
    this.errorMessage = '';

    if (part) {
      this.isEditMode = true;
      this.selectedPart = { ...part };
      this.oldId = part.id; // eski ID'yi sakla
    } else {
      this.isEditMode = false;
      this.oldId = null;
      this.selectedPart = {
        id: this.findNextAvailableId(),
        ad: '',
        marka: '',
        stokAdedi: '',
        fiyat: '',
      };
    }
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
    this.errorMessage = '';
  }

  saveChanges() {
    const parca = {
      id: Number(this.selectedPart.id),
      ad: this.selectedPart.ad,
      marka: this.selectedPart.marka,
      fiyat: Number(this.selectedPart.fiyat),
      stokAdedi: Number(this.selectedPart.stokAdedi),
    };

    if (this.isEditMode) {
      this.parcaService.updateParca(parca.id, parca).subscribe({
        next: () => {
          this.getParcalar();
          this.closeModal();
        },
        error: () => (this.errorMessage = 'Güncelleme hatası'),
      });
    } else {
      this.parcaService.createParca(parca).subscribe({
        next: () => {
          this.getParcalar();
          this.closeModal();
        },
        error: () => (this.errorMessage = 'Ekleme hatası'),
      });
    }
  }

  openDeleteModal(id: number) {
    this.partIdToDelete = id;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.partIdToDelete = null;
    this.showDeleteModal = false;
  }

  confirmDelete() {
    this.parcaService.deleteParca(Number(this.partIdToDelete)).subscribe({
      next: () => {
        this.getParcalar();
        this.closeDeleteModal();
      },
      error: (err) => console.error('Silme hatası:', err),
    });
  }
}
