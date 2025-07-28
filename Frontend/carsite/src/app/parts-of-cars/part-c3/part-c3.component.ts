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
  selector: 'app-part-c3',
  templateUrl: './part-c3.component.html',
  styleUrls: ['./part-c3.component.css'],
})
export class PartC3Component {
  searchQuery = '';

  products: Product[] = [
    {
      id: 41,
      name: 'Sbarut - Cam Açma Düğmesi',
      description:
        'Citroen C3 modelleri için üretilmiş, kaliteli ve dayanıklı cam açma düğmesi. Kolay montaj imkanı sunar.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c3/cam-acma-dugmesi-sbarut-310002.png',
      price: 100,
    },
    {
      id: 42,
      name: 'CDF - Supap Lastiği',
      description:
        'Yüksek sıcaklığa dayanıklı malzemeden üretilmiş CDF marka supap lastiği, motorun verimli çalışmasını destekler.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c3/supap-lastigi-cdf-116v.png',
      price: 80,
    },
    {
      id: 43,
      name: 'Corteco - Supap Lastiği',
      description:
        'Corteco kalitesiyle üretilen bu supap lastiği, motorun yağ kaçaklarını önlemeye yardımcı olur ve uzun ömürlüdür.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c3/supap-lastigi-corteco-49472012.png',
      price: 90,
    },
    {
      id: 44,
      name: 'ELRING - Supap Lastiği',
      description:
        'ELRING markasına ait bu supap lastiği, motor performansını artırmak ve sızdırmazlığı sağlamak için geliştirilmiştir.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c3/supap-lastigi-elring-403730.png',
      price: 95,
    },
    {
      id: 45,
      name: 'ELWIS Royal - Supap Lastiği',
      description:
        'Üst segment ELWIS Royal supap lastiği, motor içi sızdırmazlık sağlarken yüksek ısıya karşı direnç gösterir.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c3/supap-lastigi-elwis-royal-1642657.png',
      price: 110,
    },
    {
      id: 46,
      name: 'GLYCO - Supap Lastiği',
      description:
        'GLYCO kalitesiyle üretilmiş bu supap lastiği, yağ kontrolünü optimize ederek motor ömrünü uzatır.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c3/supap-lastigi-glyco-r5030676750.png',
      price: 85,
    },
    {
      id: 47,
      name: 'PAYEN - Supap Lastiği',
      description:
        'PAYEN marka supap lastiği, motor içerisindeki yağ geçişlerini kontrol altında tutarak sızdırmazlık sağlar.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c3/supap-lastigi-payen-r5030676750.png',
      price: 88,
    },
    {
      id: 48,
      name: 'REINZ - Supap Lastiği',
      description:
        'REINZ tarafından geliştirilen supap lastiği, motor parçalarıyla uyumlu çalışarak maksimum performans sağlar.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c3/supap-lastigi-reinz-703351200.png',
      price: 92,
    },
    {
      id: 49,
      name: 'TOPRAN - Supap Lastiği',
      description:
        'TOPRAN marka bu lastik, motor verimliliğini artıran sızdırmaz yapısıyla öne çıkar.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c3/supap-lastigi-topran-100-254.png',
      price: 87,
    },
    {
      id: 50,
      name: 'TOPRAN - Supap Lastiği',
      description:
        'Yüksek sıcaklık dayanımı ve uzun kullanım ömrü sunan TOPRAN supap lastiği, motor sağlığını destekler.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c3/supap-lastigi-topran-107-502.png',
      price: 89,
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
