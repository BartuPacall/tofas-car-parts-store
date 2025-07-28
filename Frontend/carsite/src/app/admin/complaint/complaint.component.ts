import { Component, Input, OnInit } from '@angular/core';
import {
  IletisimService,
  IletisimModel,
} from '../../services/iletisim.service';

interface Message {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css'],
})
export class ComplaintComponent implements OnInit {
  @Input() section: string = '';
  showModal: boolean = false;
  selectedMessage: string = '';

  showDeleteModal: boolean = false;
  messageToDeleteIndex: number | null = null;

  currentPage: number = 1;
  itemsPerPage: number = 6;

  allMessages: Message[] = [];

  constructor(private iletisimService: IletisimService) {}

  ngOnInit() {
    this.loadFromBackend();
  }
  loadFromBackend() {
    this.iletisimService.getMessages().subscribe({
      next: (data) => {
        // Backend'den gelen data'yı allMessages formatına çevirelim
        this.allMessages = data.map((item: IletisimModel) => ({
          name: item.adSoyad,
          email: item.email,
          message: item.mesaj,
        }));
      },
      error: (err) => {
        console.error('Backendden mesajlar alınamadı:', err);
      },
    });
  }
  loadMessages() {
    const storedMessages = localStorage.getItem('complaintMessages');
    if (storedMessages) {
      this.allMessages = JSON.parse(storedMessages);
    } else {
      this.allMessages = [];
    }
  }

  saveMessages() {
    localStorage.setItem('complaintMessages', JSON.stringify(this.allMessages));
  }

  get pagedMessages() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.allMessages.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.allMessages.length / this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  prevPage() {
    this.goToPage(this.currentPage - 1);
  }

  openMessage(message: string): void {
    this.selectedMessage = message;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  openDeleteModal(index: number): void {
    this.messageToDeleteIndex =
      index + (this.currentPage - 1) * this.itemsPerPage;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.messageToDeleteIndex = null;
  }

  confirmDelete(): void {
    if (this.messageToDeleteIndex !== null) {
      const messageToDelete = this.allMessages[this.messageToDeleteIndex];

      this.iletisimService
        .deleteMessage({
          adSoyad: messageToDelete.name,
          email: messageToDelete.email,
          mesaj: messageToDelete.message,
        })
        .subscribe({
          next: (res) => {
            // Backend başarılı silme cevabı döndü
            this.allMessages.splice(this.messageToDeleteIndex!, 1);
            this.saveMessages();

            if (this.pagedMessages.length === 0 && this.currentPage > 1) {
              this.currentPage--;
            }

            this.closeDeleteModal();
          },
          error: (err) => {
            console.error('Mesaj silinirken hata oluştu:', err);
            alert('Mesaj silinemedi. Lütfen tekrar deneyiniz.');
          },
        });
    }
  }

  addMessage(newMessage: Message): void {
    this.allMessages.unshift(newMessage); // en başa ekle
    this.saveMessages();
    this.currentPage = 1; // Yeni mesajı hemen göstermek için sayfayı 1 yap
  }

  mathMin(a: number, b: number): number {
    return Math.min(a, b);
  }
}
