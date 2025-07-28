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
  selector: 'app-part-4008',
  templateUrl: './part-4008.component.html',
  styleUrls: ['./part-4008.component.css'],
})
export class Part4008Component {
  searchQuery = '';
  products: Product[] = [
    {
      id: 1,
      name: 'FITPART - Polen Filtresi',
      description:
        'Aracın içine giren havayı toz, polen ve zararlı partiküllerden arındırır. Temiz ve sağlıklı bir iç ortam sağlar.',
      imageUrl:
        '/assets/parcalar/Peugeot_4008_urun_resimleri/polen-filtresi-fitpart-fit04009075p.png',
      price: 150,
    },
    {
      id: 2,
      name: 'BSG - Vantilatör Kayış Gergi Rulmanı',
      description:
        'Kayış sisteminin gerginliğini koruyarak düzgün çalışmasını sağlar. Motor performansını ve verimliliği artırır.',
      imageUrl:
        '/assets/parcalar/Peugeot_4008_urun_resimleri/vantilator-kayis-gergi-rulmani-bsg-bsg70615024.png',
      price: 200,
    },
    {
      id: 3,
      name: 'BSG - Yağ Filtresi',
      description:
        'Motor yağını temizleyerek motorun ömrünü uzatır. Tortu ve kirleri filtreleyerek motorun verimli çalışmasına yardımcı olur.',
      imageUrl:
        '/assets/parcalar/Peugeot_4008_urun_resimleri/yag-filtresi-bsg-bsg-62-140-003.png',
      price: 120,
    },
    {
      id: 4,
      name: 'MAHER - Yağ Filtresi',
      description:
        'Yüksek filtrasyon kalitesi ile motor yağındaki kirleticileri tutar. Uzun ömürlü ve dayanıklı yapı.',
      imageUrl:
        '/assets/parcalar/Peugeot_4008_urun_resimleri/yag-filtresi-grat-12200.png',
      price: 130,
    },
    {
      id: 5,
      name: 'MAHER - Yağ Filtresi',
      description:
        'Motor yağının temiz kalmasını sağlayarak sürtünmeyi azaltır. Performansı ve yakıt tasarrufunu destekler.',
      imageUrl:
        '/assets/parcalar/Peugeot_4008_urun_resimleri/yag-filtresi-kruger-kof15001.png',
      price: 125,
    },
    {
      id: 6,
      name: 'KRUGER - Yağ Filtresi',
      description:
        'Uzun ömürlü yapısıyla motoru zararlı partiküllerden korur. Yüksek kalite standartlarına uygundur.',
      imageUrl:
        '/assets/parcalar/Peugeot_4008_urun_resimleri/yag-filtresi-kruger-kof18011.png',
      price: 140,
    },
    {
      id: 7,
      name: 'GRAT - Yağ Filtresi',
      description:
        'Motor yağında oluşan tortu ve metalleri filtreleyerek motor sağlığını korur. Uygun fiyatlı kaliteli çözüm.',
      imageUrl:
        '/assets/parcalar/Peugeot_4008_urun_resimleri/yag-filtresi-maher-19758.png',
      price: 110,
    },
    {
      id: 8,
      name: 'KRUGER - Yağ Filtresi',
      description:
        'Düşük iç dirençle maksimum yağ akışı sağlar. Performans odaklı motorlar için idealdir.',
      imageUrl:
        '/assets/parcalar/Peugeot_4008_urun_resimleri/yag-filtresi-phaff-dy877.png',
      price: 135,
    },
    {
      id: 9,
      name: 'WEGNA - Yağ Filtresi',
      description:
        'Gelişmiş filtreleme teknolojisi sayesinde motorunuzu korur. Dayanıklı ve güvenilir yapı.',
      imageUrl:
        '/assets/parcalar/Peugeot_4008_urun_resimleri/yag-filtresi-wegna-wo1027.png',
      price: 145,
    },
    {
      id: 10,
      name: 'PHAFF - Yağ Filtresi',
      description:
        'Motor performansını optimize eder, yüksek filtrasyon seviyesi ile partikül tutma kapasitesi yüksektir.',
      imageUrl:
        '/assets/parcalar/Peugeot_4008_urun_resimleri/yag-musuru-maher-24614.png',
      price: 155,
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
    const quantity = product.quantity || 1;
    this.basketService.addToCart({ ...product, quantity });
    this.snackBar.open(
      `${quantity} adet "${product.name}" sepete eklendi.`,
      'Kapat',
      {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
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
