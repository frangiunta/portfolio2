import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, NgZone, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-background',
  standalone: true,
  template: `<canvas #rendererCanvas></canvas>`,
  styles: [`
    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 0; /* Elevado a 0 para que pase por delante del fondo del body */
      pointer-events: none; /* Permite que los clics traspasen el canvas hacia el contenido */
      background: #000;
    }
    canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
  `]
})
export class BackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('rendererCanvas') rendererCanvas!: ElementRef<HTMLCanvasElement>;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.OrthographicCamera;
  private frameId: number | null = null;
  private uniforms: any;

  // Suavizado del mouse
  private targetMouse = new THREE.Vector2(0.5, 0.5);
  private smoothedMouse = new THREE.Vector2(0.5, 0.5);
  private lerpFactor = 0.05;

  private onMouseMoveHandler?: (e: MouseEvent) => void;
  private onResizeHandler?: () => void;

  private vertexShader = `
    void main() {
      gl_Position = vec4(position, 1.0);
    }
  `;

  private fragmentShader = `
    precision mediump float;
    uniform float time;
    uniform vec2 mouse;
    uniform vec2 resolution;

    void main( void ) {
      vec2 p = (gl_FragCoord.xy - resolution.xy) / min(resolution.x, resolution.y);
      
      // La posición del mouse afecta sutilmente la escala
      p *= (1.0 + mouse.x * 0.2);

      for(int i = 1; i < 5; i++) {
        p += sin(p.yx * vec2(1.6, 1.1) * float(i + 11) + time * float(i) * vec2(3.4, 0.5) / 10.0) * 0.1;
      }
      
      float c = (abs(sin(p.y + time * 0.1) + sin(p.x + time * 0.1))) * 0.5;
      
      // Colores personalizados: F527E0 (Rosa) y 4F17E8 (Morado)
      vec3 color1 = vec3(0.525, 0.651, 0.369); 
      vec3 color2 = vec3(0.231, 0.776, 0.851);
      
      // Mezclar los colores y aplicar la intensidad animada
      vec3 finalColor = mix(color2, color1, c);
      gl_FragColor = vec4(finalColor * (c * 1.5), 1.0);
    }
  `;

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    // Solo iniciamos Three.js si estamos en el entorno del navegador (no en el servidor)
    if (isPlatformBrowser(this.platformId)) {
      this.initThree();
      this.animate();
      this.listenToInputs();
    }
  }

  private initThree(): void {
    const canvas = this.rendererCanvas.nativeElement;
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

    this.uniforms = {
      time: { value: 0.0 },
      mouse: { value: new THREE.Vector2(0.5, 0.5) },
      resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader
    });

    this.scene.add(new THREE.Mesh(geometry, material));
    this.onResize();
  }

  private listenToInputs(): void {
    this.onResizeHandler = () => this.onResize();
    this.onMouseMoveHandler = (e: MouseEvent) => {
      this.targetMouse.x = e.clientX / window.innerWidth;
      this.targetMouse.y = e.clientY / window.innerHeight;
    };

    window.addEventListener('resize', this.onResizeHandler);
    window.addEventListener('mousemove', this.onMouseMoveHandler);
  }

  private onResize(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
  }

  private animate(): void {
    this.ngZone.runOutsideAngular(() => {
      const render = (time: number) => {
        // Interpolación lineal para el movimiento suave
        this.smoothedMouse.x += (this.targetMouse.x - this.smoothedMouse.x) * this.lerpFactor;
        this.smoothedMouse.y += (this.targetMouse.y - this.smoothedMouse.y) * this.lerpFactor;

        this.uniforms.mouse.value.copy(this.smoothedMouse);
        this.uniforms.time.value = time * 0.001;

        this.renderer.render(this.scene, this.camera);
        this.frameId = requestAnimationFrame(render);
      };
      this.frameId = requestAnimationFrame(render);
    });
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.frameId) cancelAnimationFrame(this.frameId);
      
      if (this.onResizeHandler) window.removeEventListener('resize', this.onResizeHandler);
      if (this.onMouseMoveHandler) window.removeEventListener('mousemove', this.onMouseMoveHandler);
      
      if (this.renderer) {
        this.renderer.dispose();
      }
    }
  }
}
