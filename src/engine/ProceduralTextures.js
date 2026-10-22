// Procedural PBR Texture & 2x Retina Supersampled 3D Label Sprite Generator
// Vespa-X09 Cyber-Organic Edition: Linear-filtered high-DPI 3D HUD callouts with zero mipmap blur.

export class ProceduralTextures {
  constructor(THREE) {
    this.THREE = THREE;
    this.cache = new Map();
  }

  _getOrCreate(key, generatorFn) {
    if (this.cache.has(key)) return this.cache.get(key);
    const tex = generatorFn();
    this.cache.set(key, tex);
    return tex;
  }

  // 2x Retina Supersampled (1024x256) Cyber HUD 3D Floating Label Sprite
  // Disables mipmapping (LinearFilter) so 3D text is razor-sharp at every angle and distance.
  labelSprite(text, opts = {}) {
    const THREE = this.THREE;
    const {
      bg = 'rgba(8, 12, 21, 0.94)',
      border = '#f59e0b',
      color = '#f8fafc',
      subtext = '',
      scale = 1.65
    } = opts;

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = subtext ? 280 : 196;
    const ctx = canvas.getContext('2d');

    const drawCard = (mainTxt, subTxt, borderCol) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const drawRoundRect = (x, y, w, h, rad) => {
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(x, y, w, h, rad);
        } else {
          ctx.rect(x, y, w, h);
        }
      };

      const pad = 16;
      const w = canvas.width - pad * 2;
      const h = canvas.height - pad * 2;
      const r = 36;

      // Outer dark glass cyber card
      ctx.fillStyle = bg;
      ctx.strokeStyle = borderCol;
      ctx.lineWidth = 8;
      ctx.beginPath();
      drawRoundRect(pad, pad, w, h, r);
      ctx.fill();
      ctx.stroke();

      // Inner subtle cyber frame line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      drawRoundRect(pad + 12, pad + 12, w - 24, h - 24, r - 8);
      ctx.stroke();

      // Glowing status indicator dot
      const dotY = subTxt ? 92 : canvas.height / 2;
      ctx.fillStyle = borderCol;
      ctx.beginPath();
      ctx.arc(68, dotY, 16, 0, Math.PI * 2);
      ctx.fill();

      // Outer ring around dot
      ctx.strokeStyle = borderCol;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(68, dotY, 26, 0, Math.PI * 2);
      ctx.stroke();

      // Razor-sharp main title text
      ctx.fillStyle = color;
      ctx.font = '800 54px "Orbitron", "Inter", "Segoe UI", system-ui, sans-serif';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(mainTxt || ''), 116, subTxt ? 94 : canvas.height / 2, 868);

      // Crisp monospace/sans subtext
      if (subTxt) {
        ctx.fillStyle = '#38bdf8';
        ctx.font = '600 38px "Inter", "Segoe UI", monospace, sans-serif';
        ctx.fillText(String(subTxt), 116, 192, 868);
      }
    };

    drawCard(text, subtext, border);

    const texture = new THREE.CanvasTexture(canvas);
    // CRITICAL FOR RAZOR-SHARP 3D TEXT: Disable trilinear mipmap blurring!
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;

    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthTest: false
    });
    const sprite = new THREE.Sprite(material);
    const aspect = canvas.width / canvas.height;
    sprite.scale.set(scale * aspect * 0.42, scale * 0.42, 1);
    sprite.renderOrder = 999;

    sprite.updateText = (newText, newSubtext = subtext, newBorder = border) => {
      drawCard(newText, newSubtext, newBorder);
      texture.needsUpdate = true;
    };

    return sprite;
  }

  wood(tint = '#b45309') {
    return this._getOrCreate(`wood_${tint}`, () => {
      const THREE = this.THREE;
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = tint;
      ctx.fillRect(0, 0, 512, 512);

      for (let i = 0; i < 240; i++) {
        ctx.strokeStyle = i % 2 === 0 ? 'rgba(69, 26, 3, 0.28)' : 'rgba(254, 243, 199, 0.14)';
        ctx.lineWidth = 1 + Math.random() * 3;
        ctx.beginPath();
        const y = (i / 240) * 512;
        ctx.moveTo(0, y);
        for (let x = 0; x <= 512; x += 32) {
          ctx.lineTo(x, y + Math.sin(x * 0.02 + i * 0.4) * 6);
        }
        ctx.stroke();
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      return tex;
    });
  }

  brushedMetal(baseColor = '#64748b') {
    return this._getOrCreate(`metal_${baseColor}`, () => {
      const THREE = this.THREE;
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 600; i++) {
        ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.12)';
        ctx.fillRect(0, Math.random() * 256, 256, 1);
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      return tex;
    });
  }

  sandpaper() {
    return this._getOrCreate('sandpaper', () => {
      const THREE = this.THREE;
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#78350f';
      ctx.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 4500; i++) {
        ctx.fillStyle = i % 3 === 0 ? '#f59e0b' : i % 3 === 1 ? '#451a03' : '#b45309';
        ctx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      return tex;
    });
  }

  turf() {
    return this._getOrCreate('turf', () => {
      const THREE = this.THREE;
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#065f46';
      ctx.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 4000; i++) {
        ctx.fillStyle = i % 3 === 0 ? '#10b981' : i % 3 === 1 ? '#047857' : '#34d399';
        ctx.fillRect(Math.random() * 256, Math.random() * 256, 2, 4);
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      return tex;
    });
  }

  earthDay() {
    return this._getOrCreate('earthDay', () => {
      const THREE = this.THREE;
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      const grad = ctx.createLinearGradient(0, 0, 0, 512);
      grad.addColorStop(0, '#082f49');
      grad.addColorStop(0.5, '#0284c7');
      grad.addColorStop(1, '#082f49');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 512);

      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, 1024, 34);
      ctx.fillRect(0, 478, 1024, 34);

      const drawContinent = (pts, color = '#10b981') => {
        ctx.fillStyle = color;
        ctx.beginPath();
        pts.forEach(([x, y], idx) => (idx === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
        ctx.closePath();
        ctx.fill();
      };

      drawContinent([
        [120, 65], [275, 60], [310, 120], [268, 168], [242, 175],
        [232, 195], [218, 215], [190, 185], [155, 130]
      ], '#10b981');
      drawContinent([[175, 135], [235, 140], [230, 180], [185, 170]], '#f59e0b');
      drawContinent([
        [245, 225], [335, 255], [350, 315], [305, 420], [275, 425], [255, 310]
      ], '#059669');
      drawContinent([
        [465, 185], [565, 185], [610, 250], [575, 385], [520, 390], [485, 285], [450, 235]
      ], '#d97706');
      drawContinent([
        [455, 75], [840, 65], [895, 145], [810, 225], [690, 215], [590, 175], [465, 160]
      ], '#10b981');
      drawContinent([
        [775, 315], [875, 315], [885, 380], [790, 385]
      ], '#f59e0b');

      // Glowing Dickinson TX marker beacon
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(236, 172, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      return new THREE.CanvasTexture(canvas);
    });
  }

  moonRegolith() {
    return this._getOrCreate('moonRegolith', () => {
      const THREE = this.THREE;
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(0, 0, 512, 256);

      for (let i = 0; i < 18; i++) {
        ctx.fillStyle = 'rgba(51, 65, 85, 0.42)';
        ctx.beginPath();
        ctx.arc(Math.random() * 512, Math.random() * 256, 20 + Math.random() * 45, 0, Math.PI * 2);
        ctx.fill();
      }
      for (let i = 0; i < 95; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 256;
        const r = 3 + Math.random() * 16;
        ctx.strokeStyle = 'rgba(248, 250, 252, 0.65)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = 'rgba(30, 41, 59, 0.4)';
        ctx.fill();
      }
      return new THREE.CanvasTexture(canvas);
    });
  }

  rockStrata() {
    return this._getOrCreate('rockStrata', () => {
      const THREE = this.THREE;
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      const layers = [
        '#78350f', '#92400e', '#b45309', '#d97706',
        '#475569', '#64748b', '#f59e0b', '#1e293b'
      ];
      const h = 512 / layers.length;
      layers.forEach((col, i) => {
        ctx.fillStyle = col;
        ctx.fillRect(0, i * h, 512, h + 4);
        for (let d = 0; d < 350; d++) {
          ctx.fillStyle = d % 2 === 0 ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.22)';
          ctx.fillRect(Math.random() * 512, i * h + Math.random() * h, 3, 2);
        }
      });
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      return tex;
    });
  }

  // Vespa-X09 Dark Obsidian & Glowing Cyan/Amber Telemetry Grid
  labGrid() {
    return this._getOrCreate('labGrid', () => {
      const THREE = this.THREE;
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#0c101a';
      ctx.fillRect(0, 0, 512, 512);

      ctx.strokeStyle = 'rgba(0, 240, 255, 0.16)';
      ctx.lineWidth = 2;
      for (let i = 0; i <= 512; i += 64) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 512);
        ctx.moveTo(0, i);
        ctx.lineTo(512, i);
        ctx.stroke();
      }

      // Glowing amber intersection nodes
      ctx.fillStyle = 'rgba(245, 158, 11, 0.45)';
      for (let x = 0; x <= 512; x += 128) {
        for (let y = 0; y <= 512; y += 128) {
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(6, 6);
      return tex;
    });
  }

  disposeAll() {
    this.cache.forEach((tex) => tex.dispose && tex.dispose());
    this.cache.clear();
  }
}
