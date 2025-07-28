import { Component } from '@angular/core';
import { BasketService, Product as BasketProduct } from '../../basket.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  quantity?: number; // ➕ Yeni alan: adet sayısı
}

@Component({
  selector: 'app-part-guilia',
  templateUrl: './part-guilia.component.html',
  styleUrls: ['./part-guilia.component.css'],
})
export class PartGuiliaComponent {
  searchQuery = '';

  products: Product[] = [
    {
      id: 101,
      name: 'EMA - Cam Su Motoru',
      description:
        'EMA marka bu cam su motoru, ön cam temizleme sisteminizin düzgün çalışmasını sağlar. Uzun ömürlü yapısı sayesinde güvenilir performans sunar.',
      imageUrl:
        'assets/parcalar/urun_resimleri_alfa-romeo-guilia/cam-su-motoru-ema-mfk-wp2008.png',
      price: 100,
    },
    {
      id: 102,
      name: 'Rockswell - Cam Su Motoru',
      description:
        'Rockswell cam su motoru, cam temizleme sıvısını etkin bir şekilde püskürtür. Yüksek kaliteli malzemeden üretilmiştir.',
      imageUrl:
        'assets/parcalar/urun_resimleri_alfa-romeo-guilia/cam-su-motoru-rockswell-0240184.png',
      price: 110,
    },
    {
      id: 103,
      name: 'Herth Buss - Hararet Müşürü',
      description:
        'Motor sıcaklığını hassas şekilde ölçerek aracın hararet durumunu ECU’ya bildirir. Herth Buss kalitesiyle üretilmiştir.',
      imageUrl:
        'assets/parcalar/urun_resimleri_alfa-romeo-guilia/hararet-musuru-herth-buss-70511517.png',
      price: 120,
    },
    {
      id: 104,
      name: 'Triton - Hararet Müşürü',
      description:
        'Triton marka bu hararet müşürü, motor sıcaklık değerlerini doğru algılayarak aracın ısıl kontrolünü sağlar.',
      imageUrl:
        'assets/parcalar/urun_resimleri_alfa-romeo-guilia/hararet-musuru-triton-tmp0275t.png',
      price: 130,
    },
    {
      id: 105,
      name: 'Payen - Krank Keçesi Ön',
      description:
        'Yağ sızıntısını önlemek için krank milinin ön kısmına takılır. Payen markasıyla uzun süreli sızdırmazlık sağlar.',
      imageUrl:
        'assets/parcalar/urun_resimleri_alfa-romeo-guilia/krank-kecesi-on-payen-rna5070.png',
      price: 140,
    },
    {
      id: 106,
      name: 'SKT - Krank Keçesi Ön',
      description:
        'SKT üretimi bu keçeyle motorunuzun ön kısmındaki yağ sızıntılarını minimuma indirerek temiz bir çalışma elde edersiniz.',
      imageUrl:
        'assets/parcalar/urun_resimleri_alfa-romeo-guilia/krank-kecesi-on-skt-040944v.png',
      price: 150,
    },
    {
      id: 107,
      name: 'OEK - Map Sensörü',
      description:
        'OEK marka bu MAP sensörü, motorun hava basıncını doğru ölçerek yakıt-hava karışımını optimize eder.',
      imageUrl:
        'assets/parcalar/urun_resimleri_alfa-romeo-guilia/map-sensoru-oek-223650002r.png',
      price: 160,
    },
    {
      id: 108,
      name: 'Sardes - Polen Filtresi',
      description:
        'Sardes polen filtresi, aracın iç kabinine giren havayı toz, polen ve partiküllerden arındırır. Temiz hava konforu sunar.',
      imageUrl:
        'assets/parcalar/urun_resimleri_alfa-romeo-guilia/polen-filtresi-sardes-sc3182.png',
      price: 170,
    },
    {
      id: 109,
      name: 'Zenon - Sis Farı Ön Sağ veya Sol',
      description:
        'Sisli ve görüşü zor hava koşullarında yola daha iyi odaklanmanızı sağlayan, Zenon marka ön sis farı.',
      imageUrl:
        'assets/parcalar/urun_resimleri_alfa-romeo-guilia/sis-fari-on-sag-veya-sol-zenon-fi9516.png',
      price: 180,
    },
    {
      id: 110,
      name: 'Voller - Yağ Filtresi',
      description:
        'Voller yağ filtresi, motor yağındaki kir ve tortuları süzerek motorun ömrünü uzatır ve performansını korur.',
      imageUrl:
        'assets/parcalar/urun_resimleri_alfa-romeo-guilia/yag-filtresi-voller-800.png',
      price: 190,
    },
  ];

  filteredProducts: Product[] = [...this.products];

  onSearch() {
    const q = this.searchQuery.toLowerCase().trim();
    this.filteredProducts = this.products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  constructor(
    private snackBar: MatSnackBar,
    private basketService: BasketService,
    private router: Router
  ) {}

  addToCart(product: Product) {
    const quantity = product['quantity'] || 1;
    this.basketService.addToCart({ ...product, quantity });
    this.snackBar.open(
      `${quantity} adet "${product.name}" sepete eklendi.`,
      'Kapat',
      {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      }
    );
    product.quantity = 1;
  }

  goToBasket() {
    this.router.navigate(['/basket']);
  }
  selectedProduct: Product | null = null;

  showProductDetails(product: Product) {
    this.selectedProduct = product;
  }

  closeProductDetails() {
    this.selectedProduct = null;
  }
}
