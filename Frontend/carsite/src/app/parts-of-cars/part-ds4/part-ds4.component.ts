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
  selector: 'app-part-ds4',
  templateUrl: './part-ds4.component.html',
  styleUrls: ['./part-ds4.component.css'],
})
export class PartDs4Component {
  searchQuery = '';

  products: Product[] = [
    {
      id: 81,
      name: 'Erastech - Amortisör Tabla Takozu Ön Sağ veya Sol',
      description:
        'Sürüş sırasında darbeleri emer ve süspansiyon sisteminin düzgün çalışmasını sağlar. Sağ ve sol taraf için uygundur.',
      imageUrl:
        'assets/parcalar/DS4_urun_resimleri/amortisor-tabla-takozu-on-sag-sol-erastech-14135.png',
      price: 500,
    },
    {
      id: 82,
      name: 'Ucel - Amortisör Tabla Takozu Ön Sağ veya Sol',
      description:
        'Ön süspansiyon sisteminin titreşimleri azaltmasına yardımcı olur. Dayanıklı ve uzun ömürlüdür.',
      imageUrl:
        'assets/parcalar/DS4_urun_resimleri/amortisor-tabla-takozu-on-sag-veya-sol-ucel-41807.png',
      price: 520,
    },
    {
      id: 83,
      name: 'MGA - Fren Hortumu Arka Sağ',
      description:
        'Arka fren sistemine hidrolik sıvı iletimini sağlar. Güvenli frenleme için esnek ve dayanıklıdır.',
      imageUrl:
        'assets/parcalar/DS4_urun_resimleri/fren-hortumu-arka-sag-mga-51973.png',
      price: 300,
    },
    {
      id: 84,
      name: 'MGA - Fren Hortumu Ön Sağ',
      description:
        'Ön fren sisteminin doğru şekilde çalışmasını sağlayan hidrolik bağlantı hortumudur.',
      imageUrl:
        'assets/parcalar/DS4_urun_resimleri/fren-hortumu-on-sag-mga-51971.png',
      price: 310,
    },
    {
      id: 85,
      name: 'CDF - Supap Lastiği',
      description:
        'Motorun yanma odasına yağ sızmasını önler, motor performansını ve verimliliğini korur.',
      imageUrl: 'assets/parcalar/DS4_urun_resimleri/supap-lastigi-cdf-116v.png',
      price: 50,
    },
    {
      id: 86,
      name: 'Corteco - Supap Lastiği',
      description:
        'Silindir kapağındaki supaplardan yağ kaçışını engeller. Motor ömrünü uzatır.',
      imageUrl:
        'assets/parcalar/DS4_urun_resimleri/supap-lastigi-corteco-49472932.png',
      price: 55,
    },
    {
      id: 87,
      name: 'Reinz - Supap Lastiği',
      description:
        'Motorun sızdırmazlık sisteminde önemli rol oynar. Yakıt tüketimini ve yağ yakımını azaltır.',
      imageUrl:
        'assets/parcalar/DS4_urun_resimleri/supap-lastigi-reinz-70-38539-00.png',
      price: 60,
    },
    {
      id: 88,
      name: 'Reinz - Supap Lastiği',
      description:
        'Motor içerisindeki supapların düzgün çalışmasını destekleyen sızdırmazlık elemanıdır.',
      imageUrl:
        'assets/parcalar/DS4_urun_resimleri/supap-lastigi-reinz-703554800.png',
      price: 62,
    },
    {
      id: 89,
      name: 'SKT - Supap Lastiği',
      description:
        'Silindir kapağındaki supapların etrafını sızdırmaz hale getirerek yağ tüketimini düşürür.',
      imageUrl:
        'assets/parcalar/DS4_urun_resimleri/supap-lastigi-skt-4s048v.png',
      price: 58,
    },
    {
      id: 90,
      name: 'Fase - Yağ Filtresi',
      description:
        'Motordaki yağı süzerek yabancı maddeleri ve tortuları temizler, motorun ömrünü uzatır.',
      imageUrl:
        'assets/parcalar/DS4_urun_resimleri/yag-filtresi-fase-11-232-001.png',
      price: 120,
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
