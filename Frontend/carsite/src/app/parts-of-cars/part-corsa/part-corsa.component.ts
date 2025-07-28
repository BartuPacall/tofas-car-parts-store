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
  selector: 'app-part-corsa',
  templateUrl: './part-corsa.component.html',
  styleUrls: ['./part-corsa.component.css'],
})
export class PartCorsaComponent {
  searchQuery = '';

  products: Product[] = [
    {
      id: 61,
      name: 'AVORTEX - Supap Lastiği',
      description:
        'AVORTEX markasının kaliteli supap lastiği, motorun sızdırmazlık performansını artırır ve uzun ömürlü kullanım sağlar.',
      imageUrl:
        '/assets/parcalar/Opel_Corsa_urun_resimleri/supap-lastigi-avortex-296.png',
      price: 100,
    },
    {
      id: 62,
      name: 'ELRING - Supap Lastiği',
      description:
        'ELRING supap lastiği, yüksek sıcaklıklara dayanıklı yapısıyla motorunuzun verimli çalışmasına yardımcı olur.',
      imageUrl:
        '/assets/parcalar/Opel_Corsa_urun_resimleri/supap-lastigi-elring-403730.png',
      price: 110,
    },
    {
      id: 63,
      name: 'ELWIS - Royal Supap Lastiği',
      description:
        'ELWIS Royal supap lastiği, motor contalarında uzmanlaşmış bir markanın ürünüdür. Uzun süreli sızdırmazlık sağlar.',
      imageUrl:
        '/assets/parcalar/Opel_Corsa_urun_resimleri/supap-lastigi-elwis-royal-1642629.png',
      price: 120,
    },
    {
      id: 64,
      name: 'GLASER - Supap Lastiği',
      description:
        'GLASER supap lastiği, motorunuzda minimum yağ tüketimi ve maksimum performans için üretilmiştir.',
      imageUrl:
        '/assets/parcalar/Opel_Corsa_urun_resimleri/supap-lastigi-glaser-p76662-00.png',
      price: 130,
    },
    {
      id: 65,
      name: 'GLYCO - Supap Lastiği',
      description:
        'GLYCO’nun bu supap lastiği, motor parçalarının aşınmasını azaltır ve sızdırmazlığı üst seviyede tutar.',
      imageUrl:
        '/assets/parcalar/Opel_Corsa_urun_resimleri/supap-lastigi-glyco-rpa5041.png',
      price: 140,
    },
    {
      id: 66,
      name: 'KRAFTVOLL - Supap Lastiği',
      description:
        'KRAFTVOLL supap lastiği, yüksek kalite kauçuk malzemeden üretilmiştir, yüksek sıcaklık ve basınca dayanıklıdır.',
      imageUrl:
        '/assets/parcalar/Opel_Corsa_urun_resimleri/supap-lastigi-kraftvoll-12010337.png',
      price: 150,
    },
    {
      id: 67,
      name: 'PAYEN - Supap Lastiği',
      description:
        'PAYEN supap lastiği, motor yağının yanma odasına geçmesini engelleyerek çevreci bir çözüm sunar.',
      imageUrl:
        '/assets/parcalar/Opel_Corsa_urun_resimleri/supap-lastigi-payen-pa5041.png',
      price: 160,
    },
    {
      id: 68,
      name: 'REINZ - Supap Lastiği',
      description:
        'REINZ kalitesiyle üretilmiş bu supap lastiği, sızdırmazlık konusunda üstün performans gösterir.',
      imageUrl:
        '/assets/parcalar/Opel_Corsa_urun_resimleri/supap-lastigi-reinz-703130600.png',
      price: 170,
    },
    {
      id: 69,
      name: 'SKT - Supap Lastiği',
      description:
        'SKT’nin bu supap lastiği, ekonomik fiyatıyla yüksek performansı bir araya getirerek motor verimliliğini artırır.',
      imageUrl:
        '/assets/parcalar/Opel_Corsa_urun_resimleri/supap-lastigi-skt-4s025v.png',
      price: 180,
    },
    {
      id: 70,
      name: 'TOPRAN - Supap Lastiği',
      description:
        'TOPRAN supap lastiği, uzun ömürlü yapısı ve dayanıklılığıyla motorunuz için ideal bir yedek parçadır.',
      imageUrl:
        '/assets/parcalar/Opel_Corsa_urun_resimleri/supap-lastigi-topran-107-502.png',
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
