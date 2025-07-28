import { Component, OnInit } from '@angular/core';
import { KullaniciService, Kullanici } from '../../services/kullanici.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  modalVisible = false;
  isEditMode = false;
  showPassword = false;
  showDeleteModal = false;
  selectedDeleteIndex: number | null = null;
  currentPage = 1;
  itemsPerPage = 5;
  errorMessage = '';

  users: {
    id: number;
    kullaniciAdi: string;
    sifre: string;
    rol: string;
  }[] = [];

  selectedUser = {
    id: '',
    kullaniciAdi: '',
    rol: '',
    sifre: '',
  };

  oldId: string | null = null; // Düzenleme öncesi eski ID'yi tutar
  constructor(private kullaniciService: KullaniciService) {}

  ngOnInit() {
    this.getKullanicilar();
  }

  getKullanicilar() {
    this.kullaniciService.getKullanicilar().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('API hatası:', err);
      },
    });
  }

  // private saveToLocalStorage() {
  //   localStorage.setItem('users', JSON.stringify(this.users));
  // }

  // En küçük boş ID'yi bul (1'den başlayarak)
  private findNextAvailableId(): string {
    const ids = this.users.map((u) => +u.id).sort((a, b) => a - b);
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

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  openModal(user?: any) {
    this.errorMessage = '';

    if (user) {
      this.isEditMode = true;
      this.selectedUser = { ...user };
      this.oldId = user.id; // eski ID'yi sakla
    } else {
      this.isEditMode = false;
      this.oldId = null;

      this.selectedUser = {
        id: this.findNextAvailableId(),
        kullaniciAdi: '',
        rol: 'Kullanıcı',
        sifre: '',
      };
    }
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
    this.errorMessage = '';
  }

  saveChanges() {
    this.errorMessage = '';

    const kullanici: Kullanici = {
      id: Number(this.selectedUser.id),
      kullaniciAdi: this.selectedUser.kullaniciAdi,
      rol: this.selectedUser.rol,
      sifre: this.selectedUser.sifre,
    };

    if (this.isEditMode) {
      this.kullaniciService.updateKullanici(kullanici.id, kullanici).subscribe({
        next: () => {
          this.getKullanicilar();
          this.closeModal();
        },
        error: (err) => {
          this.errorMessage = 'Güncelleme başarısız.';
        },
      });
    } else {
      this.kullaniciService.createKullanici(kullanici).subscribe({
        next: () => {
          this.getKullanicilar();
          this.closeModal();
        },
        error: (err) => {
          this.errorMessage = 'Ekleme başarısız.';
        },
      });
    }
  }

  get totalPages(): number {
    return Math.ceil(this.users.length / this.itemsPerPage);
  }

  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.users.slice(start, start + this.itemsPerPage);
  }

  get startItemIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endItemIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.users.length);
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

  openDeleteModal(index: number) {
    this.selectedDeleteIndex = index;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedDeleteIndex = null;
  }

  confirmDelete() {
    if (this.selectedDeleteIndex !== null) {
      const id = Number(this.paginatedUsers[this.selectedDeleteIndex].id);
      this.kullaniciService.deleteKullanici(id).subscribe({
        next: () => {
          this.getKullanicilar();
          this.closeDeleteModal();
        },
        error: (err) => {
          console.error('Silme hatası:', err);
        },
      });
    }
  }
}
