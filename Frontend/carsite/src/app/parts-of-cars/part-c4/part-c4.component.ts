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
  selector: 'app-part-c4',
  templateUrl: './part-c4.component.html',
  styleUrls: ['./part-c4.component.css'],
})
export class PartC4Component {
  searchQuery = '';

  products: Product[] = [
    {
      id: 51,
      name: 'FROW - Sol veya Sağ Arka Fren Hortumu',
      description:
        'Bu fren hortumu, aracınızın arka sağ veya sol tarafına uyumlu olup yüksek basınca dayanıklıdır. Güvenli frenleme performansı için ideal bir yedek parça tercihidir.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c4/fren-hortumu-arka-sag-veya-sol-frow-2901112003.png',
      price: 250,
    },
    {
      id: 52,
      name: 'Sahin - Kol Yatak',
      description:
        'Motor performansını ve dayanıklılığını artırmak için tasarlanmış kol yatağı, sürtünmeyi azaltarak uzun ömürlü kullanım sağlar.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c4/kol-yatak-sahin-kl4344050.png',
      price: 120,
    },
    {
      id: 53,
      name: 'Maher - Radyatör Kapağı',
      description:
        'Radyatör sisteminin basınç dengesini korur ve motorun sağlıklı bir şekilde çalışmasını destekler. Yüksek sıcaklığa karşı dayanıklıdır.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c4/radyator-kapagi-maher-09600.png',
      price: 80,
    },
    {
      id: 54,
      name: 'CDF - Supap Lastiği',
      description:
        'CDF markasına ait supap lastiği, motor supaplarının sızdırmazlığını sağlayarak yağ tüketimini azaltır ve verimli motor performansı sunar.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c4/supap-lastigi-cdf-113v.png',
      price: 30,
    },
    {
      id: 55,
      name: 'Corteco - Supap Lastiği',
      description:
        'Corteco’nun yüksek kaliteli supap lastiği, motor içi sızdırmazlık sağlar ve aşınmayı minimuma indirerek uzun ömürlü kullanım sunar.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c4/supap-lastigi-corteco-49472932.png',
      price: 35,
    },
    {
      id: 56,
      name: 'PSA Orjinal - Supap Lastiği',
      description:
        'Orijinal PSA üretimi olan bu supap lastiği, fabrika çıkış kalitesine sahiptir. Uyumlu ve güvenilir performans sağlar.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c4/supap-lastigi-psa-orjinal-095651.png',
      price: 50,
    },
    {
      id: 57,
      name: 'REINZ - Supap Lastiği',
      description:
        'REINZ markasının bu supap lastiği, yüksek sıcaklık dayanımı ve mükemmel sızdırmazlık özellikleri ile motor güvenliğini artırır.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c4/supap-lastigi-reinz-703554800.png',
      price: 40,
    },
    {
      id: 58,
      name: 'SKT - Supap Lastiği (4S048V)',
      description:
        'SKT’nin bu modeli, motor yağı sızıntılarını önleyerek yakıt tasarrufu ve daha temiz bir motor performansı sunar.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c4/supap-lastigi-skt-4s048v.png',
      price: 32,
    },
    {
      id: 59,
      name: 'SKT - Supap Lastiği (4S068V)',
      description:
        'Uzun ömürlü, kaliteli kauçuk yapısıyla motorun verimli çalışmasına katkı sağlar. SKT güvencesiyle üretilmiştir.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c4/supap-lastigi-skt-4s068v.png',
      price: 32,
    },
    {
      id: 60,
      name: 'FASE - Yağ Filtresi',
      description:
        'Motor yağının temizliğini sağlayarak kir ve tortuların motora zarar vermesini önler. FASE kalitesiyle güvenilir performans sunar.',
      imageUrl:
        'assets/parcalar/urun_resimleri_citroen_c4/yag-filtresi-fase-11-232-001.png',
      price: 60,
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
