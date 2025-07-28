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
  selector: 'app-part-5008',
  templateUrl: './part-5008.component.html',
  styleUrls: ['./part-5008.component.css'],
})
export class Part5008Component {
  searchQuery = '';

  products: Product[] = [
    {
      id: 11,
      name: 'CDF - Supap Lastiği',
      description:
        'CDF supap lastiği, motor içerisindeki yağın yanma odasına sızmasını önleyerek yağ tüketimini azaltır. Motorun daha verimli ve temiz çalışmasına yardımcı olur.',
      imageUrl:
        '/assets/parcalar/Peugeot_5008_urun_resimleri/fren-hortumu-arka-sag-veya-sol-frow-2901112003.png',
      price: 100,
    },
    {
      id: 12,
      name: 'CORTECO - Supap Lastiği',
      description:
        'Corteco kalitesiyle üretilmiş supap lastiği, yüksek sıcaklığa dayanıklıdır ve supap sızdırmazlığını güvenle sağlar. Motor performansını artırır, yağ yakımını azaltır.',
      imageUrl:
        '/assets/parcalar/Peugeot_5008_urun_resimleri/hava-filtresi-fitpart-fit04003021o.png',
      price: 110,
    },
    {
      id: 13,
      name: 'SKT - Supap Lastiği',
      description:
        'SKT supap lastiği, motorun çalışma esnasında yağ kaçaklarını engelleyerek supap odasının temiz kalmasını sağlar. Dayanıklı ve uzun ömürlü bir çözümdür.',
      imageUrl:
        '/assets/parcalar/Peugeot_5008_urun_resimleri/salincak-burcu-on-sag-veya-sol-votto-1023704.png',
      price: 120,
    },
    {
      id: 14,
      name: 'FROW - Fren Hortumu Arka Sağ veya Sol',
      description:
        'FROW marka arka fren hortumu, fren hidroliğini güvenli şekilde taşır ve fren sisteminin doğru çalışmasını sağlar. Yüksek basınca ve aşınmaya dayanıklıdır.',
      imageUrl:
        '/assets/parcalar/Peugeot_5008_urun_resimleri/supap-lastigi-cdf-116v.png',
      price: 130,
    },
    {
      id: 15,
      name: 'VOTTO - Salıncak Burcu Ön Sağ veya Sol',
      description:
        'Votto salıncak burcu, süspansiyon sistemindeki darbeleri emer ve yol tutuşunu iyileştirir. Ön sağ veya sol tarafa uyumlu şekilde tasarlanmıştır.',
      imageUrl:
        '/assets/parcalar/Peugeot_5008_urun_resimleri/supap-lastigi-corteco-49472932.png',
      price: 140,
    },
    {
      id: 16,
      name: 'PSA - Supap Lastiği',
      description:
        'PSA orijinal supap lastiği, motorla tam uyumlu şekilde çalışır ve yağın yanma odasına karışmasını önler. Dayanıklı malzemesi sayesinde uzun ömür sunar.',
      imageUrl:
        '/assets/parcalar/Peugeot_5008_urun_resimleri/supap-lastigi-psa-orjinal-095651.png',
      price: 150,
    },
    {
      id: 17,
      name: 'REINZ - Supap Lastiği',
      description:
        'Reinz supap lastiği, üstün sızdırmazlık sağlar ve motorun yüksek sıcaklık altında bile verimli çalışmasını destekler. Yağ tüketimini düşürür.',
      imageUrl:
        '/assets/parcalar/Peugeot_5008_urun_resimleri/supap-lastigi-reinz-703554800.png',
      price: 160,
    },
    {
      id: 18,
      name: 'SKT - Supap Lastiği',
      description:
        'SKT tarafından üretilen bu supap lastiği, motorun içinde istenmeyen yağ kaçaklarını engelleyerek temiz ve verimli bir çalışma ortamı oluşturur.',
      imageUrl:
        '/assets/parcalar/Peugeot_5008_urun_resimleri/supap-lastigi-skt-4s047v.png',
      price: 170,
    },
    {
      id: 19,
      name: 'SKT - Supap Lastiği',
      description:
        'Motor içi sızdırmazlıkta yüksek performans sunan SKT supap lastiği, sıcaklığa dayanıklı yapısı ile uzun süreli motor koruması sağlar.',
      imageUrl:
        '/assets/parcalar/Peugeot_5008_urun_resimleri/supap-lastigi-skt-4s048v.png',
      price: 180,
    },
    {
      id: 20,
      name: 'FASE - Yağ Filtre Kabı',
      description:
        'FASE yağ filtre kabı, motor yağ filtresinin sabit ve güvenli şekilde çalışmasını sağlar. Sızdırmaz yapısıyla motor yağ devrini korur.',
      imageUrl:
        '/assets/parcalar/Peugeot_5008_urun_resimleri/yag-filtresi-fase-11-232-001.png',
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
