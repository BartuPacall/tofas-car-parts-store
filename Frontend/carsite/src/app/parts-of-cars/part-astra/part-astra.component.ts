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
  quantity?: number;
}

@Component({
  selector: 'app-part-astra',
  templateUrl: './part-astra.component.html',
  styleUrls: ['./part-astra.component.css'],
})
export class PartAstraComponent {
  searchQuery = '';

  products: Product[] = [
    {
      id: 21,
      name: 'AVORTEX - Supap Lastiği',
      description:
        'AVORTEX supap lastiği, motor supaplarından yağ sızıntısını önleyerek motorun sağlıklı çalışmasını destekler. Yüksek ısıya ve basınca dayanıklıdır.',
      imageUrl:
        '/assets/parcalar/OPEL-Astra_urun_resimleri/supap-lastigi-avortex-296.png',
      price: 100,
    },
    {
      id: 22,
      name: 'ZEGEN - Supap Lastiği',
      description:
        'ZEGEN supap lastiği, motorun supap mekanizmasında oluşabilecek yağ kaçaklarını önler. Dayanıklı yapısıyla uzun ömürlü performans sağlar.',
      imageUrl:
        '/assets/parcalar/OPEL-Astra_urun_resimleri/supap-lastigi-corteco-49472013.png',
      price: 110,
    },
    {
      id: 23,
      name: 'KRAFTVOLL - Supap Lastiği',
      description:
        'KRAFTVOLL supap lastiği, yağın yanma odasına sızmasını engelleyerek motorun daha verimli ve temiz çalışmasına yardımcı olur. Aşınmalara karşı dirençlidir.',
      imageUrl:
        '/assets/parcalar/OPEL-Astra_urun_resimleri/supap-lastigi-elring-403730.png',
      price: 120,
    },
    {
      id: 24,
      name: 'TOPRAN - Supap Lastiği',
      description:
        'TOPRAN supap lastiği, sızdırmazlık performansı yüksek, motor içi yağ yönetimini ideal seviyede tutan kaliteli bir üründür. Isı ve sürtünmeye dayanıklıdır.',
      imageUrl:
        '/assets/parcalar/OPEL-Astra_urun_resimleri/supap-lastigi-elwis-royal-1642657.png',
      price: 130,
    },
    {
      id: 25,
      name: 'KRAFTVOLL - Supap Lastiği',
      description:
        'KRAFTVOLL supap lastiği, motor yağının kontrolünü sağlayarak supap sistemini korur. Sessiz ve verimli motor çalışması sunar.',
      imageUrl:
        '/assets/parcalar/OPEL-Astra_urun_resimleri/supap-lastigi-kraftvoll-12010285.png',
      price: 140,
    },
    {
      id: 26,
      name: 'ELWIS ROYAL - Supap Lastiği',
      description:
        'ELWIS ROYAL supap lastiği, yüksek kalite malzemelerden üretilmiştir. Supap sisteminde sızdırmazlık sağlayarak motoru yağ kaçaklarına karşı korur.',
      imageUrl:
        '/assets/parcalar/OPEL-Astra_urun_resimleri/supap-lastigi-kraftvoll-12010337.png',
      price: 150,
    },
    {
      id: 27,
      name: 'SKT - Supap Lastiği',
      description:
        'SKT supap lastiği, sıcaklık ve basınca karşı üstün dayanıklılık gösterir. Supap milinde etkili sızdırmazlık sağlayarak motor performansını destekler.',
      imageUrl:
        '/assets/parcalar/OPEL-Astra_urun_resimleri/supap-lastigi-payen-pa5041.png',
      price: 160,
    },
    {
      id: 28,
      name: 'PAYEN - Supap Lastiği',
      description:
        'PAYEN supap lastiği, supap gövdesinden yağ geçişini keserek motorun daha verimli çalışmasına katkıda bulunur. Uzun ömürlü ve güvenilirdir.',
      imageUrl:
        '/assets/parcalar/OPEL-Astra_urun_resimleri/supap-lastigi-skt-4s021v.png',
      price: 170,
    },
    {
      id: 29,
      name: 'ELRING - Supap Lastiği',
      description:
        'ELRING supap lastiği, motor içerisindeki supap sisteminde etkili sızdırmazlık sunar. Motor ömrünü uzatır ve yağ tüketimini azaltır.',
      imageUrl:
        '/assets/parcalar/OPEL-Astra_urun_resimleri/supap-lastigi-skt-4s025v.png',
      price: 180,
    },
    {
      id: 30,
      name: 'SKT - Supap Lastiği',
      description:
        'SKT markasının bu supap lastiği modeli, yüksek sıcaklık ve basınca dayanıklı yapısıyla dikkat çeker. Supap sistemini yağ sızıntılarına karşı korur.',
      imageUrl:
        '/assets/parcalar/OPEL-Astra_urun_resimleri/supap-lastigi-topran-107-502.png',
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
