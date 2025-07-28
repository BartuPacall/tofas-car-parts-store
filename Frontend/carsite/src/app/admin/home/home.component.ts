import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], // dikkat: styleUrl değil, style**Urls**
})
export class HomeComponent implements AfterViewInit {
  showWelcome = true;

  @ViewChild('confettiCanvas') confettiCanvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  private confettiParticles: ConfettiParticle[] = [];
  private animationFrameId: any;
  private animationDuration = 3000;
  private animationStartTime: number = 0;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.ctx = this.confettiCanvas.nativeElement.getContext('2d')!;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    const canvas = this.confettiCanvas.nativeElement;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }

  start() {
    this.triggerConfetti();
    setTimeout(() => {
      this.showWelcome = false;
      this.router.navigate(['/admin/users']); // 👈 Yönlendirme burası
    }, this.animationDuration);
  }

  triggerConfetti() {
    this.createConfetti();
    this.animationStartTime = performance.now();
    this.animateConfetti();
  }

  createConfetti() {
    this.confettiParticles = [];
    const colors = [
      '#ff0a54',
      '#ff477e',
      '#ff85a1',
      '#fbb1b1',
      '#00c6ff',
      '#0072ff',
    ];
    for (let i = 0; i < 150; i++) {
      this.confettiParticles.push(new ConfettiParticle(this.ctx, colors));
    }
  }

  animateConfetti = () => {
    const now = performance.now();
    const elapsed = now - this.animationStartTime;

    if (elapsed > this.animationDuration) {
      this.ctx.clearRect(
        0,
        0,
        this.confettiCanvas.nativeElement.width,
        this.confettiCanvas.nativeElement.height
      );
      cancelAnimationFrame(this.animationFrameId);
      return;
    }

    this.ctx.clearRect(
      0,
      0,
      this.confettiCanvas.nativeElement.width,
      this.confettiCanvas.nativeElement.height
    );
    this.confettiParticles.forEach((p) => p.update());
    this.confettiParticles.forEach((p) => p.draw());
    this.animationFrameId = requestAnimationFrame(this.animateConfetti);
  };
}

class ConfettiParticle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D, colors: string[]) {
    this.ctx = ctx;
    this.x = Math.random() * ctx.canvas.width;
    this.y = Math.random() * -ctx.canvas.height;
    this.size = 7 + Math.random() * 5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.speedX = (Math.random() - 0.5) * 5;
    this.speedY = 2 + Math.random() * 4;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 10;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotationSpeed;

    if (this.y > this.ctx.canvas.height) {
      this.y = Math.random() * -this.ctx.canvas.height;
      this.x = Math.random() * this.ctx.canvas.width;
    }
  }

  draw() {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size / 2);
    ctx.restore();
  }
}
