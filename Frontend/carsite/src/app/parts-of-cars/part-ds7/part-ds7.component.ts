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
  selector: 'app-part-ds7',
  templateUrl: './part-ds7.component.html',
  styleUrls: ['./part-ds7.component.css'],
})
export class PartDs7Component {
  searchQuery = '';

  products: Product[] = [
    {
      id: 91,
      name: 'Ucel - Amortisör Tabla Takozu Ön Sağ veya Sol',
      description:
        'Ön süspansiyon sisteminin düzgün çalışmasını sağlar. Sağ ve sol tarafla uyumludur. Darbelere karşı dayanıklı, uzun ömürlüdür.',
      imageUrl:
        'assets/parcalar/ds7_urun_resimleri/amortisor-tabla-takozu-on-sag-veya-sol-ucel-41807.png',
      price: 500,
    },
    {
      id: 92,
      name: 'Zegen - Geri Vites Müşürü',
      description:
        'Araç geri vitese alındığında geri vites lambasını aktive eden anahtardır. Yüksek kaliteli plastik ve metal bileşenlerle üretilmiştir.',
      imageUrl:
        'assets/parcalar/ds7_urun_resimleri/geri-vites-musuru-zegen-zms1079.png',
      price: 250,
    },
    {
      id: 93,
      name: 'Corteco - Supap Lastiği',
      description:
        'Motor supaplarında yağ sızıntısını önler. Isıya dayanıklı malzemeden üretilmiş olup uzun süreli performans sunar.',
      imageUrl:
        'assets/parcalar/ds7_urun_resimleri/supap-lastigi-corteco-49472888.png',
      price: 100,
    },
    {
      id: 94,
      name: 'Corteco - Supap Lastiği',
      description:
        'Sızdırmazlık sağlar ve motor performansını korur. Aşınmalara karşı dirençlidir ve yüksek sıcaklıklara dayanır.',
      imageUrl:
        'assets/parcalar/ds7_urun_resimleri/supap-lastigi-corteco-49472932.png',
      price: 100,
    },
    {
      id: 95,
      name: 'Elring - Supap Lastiği',
      description:
        'Motorun valf sisteminde yağ sızdırmazlığını sağlayarak verimliliği artırır. Alman teknolojisiyle üretilmiştir.',
      imageUrl:
        'assets/parcalar/ds7_urun_resimleri/supap-lastigi-elring-582530.png',
      price: 120,
    },
    {
      id: 96,
      name: 'Reinz - Supap Lastiği',
      description:
        'Supap gövdeleri ile supap kılavuzları arasında sızdırmazlık sağlar. Yüksek ısıya dayanıklı yapısıyla uzun ömürlüdür.',
      imageUrl:
        'assets/parcalar/ds7_urun_resimleri/supap-lastigi-reinz-70-38539-00.png',
      price: 110,
    },
    {
      id: 97,
      name: 'SKT - Supap Lastiği',
      description:
        'Motorun daha verimli çalışmasına yardımcı olur. Yüksek kaliteli kauçuk malzeme sayesinde çatlamaya karşı dayanıklıdır.',
      imageUrl:
        'assets/parcalar/ds7_urun_resimleri/supap-lastigi-skt-4s-085-v.png',
      price: 90,
    },
    {
      id: 98,
      name: 'BSG - Yağ Filtresi',
      description:
        'Motor yağındaki yabancı maddeleri süzer. Motorun ömrünü uzatır ve daha temiz bir yağ dolaşımı sağlar.',
      imageUrl:
        'assets/parcalar/ds7_urun_resimleri/yag-filtresi-bsg-bsg70-116-001.png',
      price: 80,
    },
    {
      id: 99,
      name: 'BSG - Yağ Filtresi',
      description:
        'Yüksek filtrasyon kabiliyeti sayesinde motoru zararlı tortulardan korur. Kolay montaj ve uzun servis ömrü sunar.',
      imageUrl:
        'assets/parcalar/ds7_urun_resimleri/yag-filtresi-bsg-bsg70140001.png',
      price: 85,
    },
    {
      id: 100,
      name: 'Fase - Yağ Filtresi',
      description:
        'Yüksek kalite filtre kağıdıyla yağdaki partikülleri etkili şekilde tutar. Motor verimliliğini korur.',
      imageUrl:
        'assets/parcalar/ds7_urun_resimleri/yag-filtresi-fase-11-232-001.png',
      price: 95,
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
