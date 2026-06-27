document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. 高級ホテル仕様：イマーシブ・クロスフェード・スライダー
    // ==========================================================================
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    const slideInterval = 6000; // 6秒ごとに切り替え

    function nextSlide() {
        // 現在のシネマティック効果（ズーム）をリセットするために一度クラスを外す
        slides[currentSlide].classList.remove('active');
        
        // 次のスライドのインデックスを計算
        currentSlide = (currentSlide + 1) % slides.length;
        
        // 次のスライドをフェードイン＋ズーム開始
        slides[currentSlide].classList.add('active');
    }

    // スライダーの定期実行をスタート
    if (slides.length > 0) {
        setInterval(nextSlide, slideInterval);
    }


    // ==========================================================================
    // 2. 煌めくジュエル（ダイヤモンド型）・パーティクル背景
    // ==========================================================================
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');

    let particlesArray = [];
    const numberOfParticles = 35; // 上品さを保つため、あえて少なめの数に制限

    // 画面サイズに合わせてキャンバスをリサイズ
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // 粒子（クリスタル）のクラス定義
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 1; // 粒子の基本サイズ（控えめ）
            this.speedX = Math.random() * 0.3 - 0.15; // 横方向の微細な揺れ
            this.speedY = Math.random() * -0.4 - 0.1;  // 上部へゆっくりと浮遊
            this.opacity = Math.random() * 0.6 + 0.1;
            this.fadeSpeed = Math.random() * 0.004 + 0.002; // 明滅の速度
            this.growing = true;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // 画面上部に消えたら下部から再配置
            if (this.y < 0) {
                this.y = canvas.height;
                this.x = Math.random() * canvas.width;
            }
            // 左右の画面端での反転処理
            if (this.x < 0 || this.x > canvas.width) {
                this.speedX = -this.speedX;
            }

            // 優雅な明滅（Glimmer効果）
            if (this.growing) {
                this.opacity += this.fadeSpeed;
                if (this.opacity >= 0.75) this.growing = false;
            } else {
                this.opacity -= this.fadeSpeed;
                if (this.opacity <= 0.1) this.growing = true;
            }
        }

        draw() {
            ctx.save();
            ctx.beginPath();
            ctx.translate(this.x, this.y);
            
            // 円形ではなく、ジュエリーを彷彿とさせる繊細な「菱形（ダイヤモンド型）」を描画
            ctx.moveTo(0, -this.size * 1.6);
            ctx.lineTo(this.size, 0);
            ctx.lineTo(0, this.size * 1.6);
            ctx.lineTo(-this.size, 0);
            
            ctx.closePath();
            
            // 高級感あるシャンパンゴールドの光
            ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
            
            // ほのかな発光エフェクト（グラデーションの代わり）
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#d4af37';
            
            ctx.fill();
            ctx.restore();
        }
    }

    // 粒子の初期化
    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    // アニメーションループの実行
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
});
