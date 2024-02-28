const swiper = new Swiper('.swiper', {
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

window.addEventListener('DOMContentLoaded', () => {
  // コンテナを指定
  const section = document.querySelector('.cherry-blossom-container');

  // 花びらを生成する関数
  const createPetal = () => {
    const petalEl = document.createElement('span');
    petalEl.className = 'petal';
    const minSize = 10;
    const maxSize = 15;
    const size = Math.random() * (maxSize + 1 - minSize) + minSize;
    petalEl.style.width = `${size}px`;
    petalEl.style.height = `${size}px`;
    petalEl.style.left = Math.random() * innerWidth + 'px';
    section.appendChild(petalEl);

    // 一定時間が経てば花びらを消す
    setTimeout(() => {
      petalEl.remove();
    }, 10000);
  }

  // 花びらを生成する間隔をミリ秒で指定
  setInterval(createPetal, 300);
});

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

const canvas = document.getElementById("effectimg");
const ctx = canvas.getContext("2d");
const imgCnt = 40;                  // 画像の数 //
const aryImg = [];
const aryCloud = [];
const effectimgw = 2000;               // canvasの横サイズ //
const effectimgh = 1000;               // canvasの縦サイズ //
const imgBaseSizeW = 16;            // 画像の横 //
const imgBaseSizeH = 20;            // 画像の縦 //
const aspectMax = 2.5;
const aspectMin = 0.5;
const speedMax = 2.0;              // 速度の最大値 //
const speedMin = 0.5;              // 速度の最小値 //
const wind = 100;
const img = new Image();
img.src = "https://www.solluna.blog/wp-content/uploads/2023/02/sakura.png";       // 桜の画像を設定してください。//
img.onload = () => {
  resizeCanvas();
  flow_start();
};

function setImagas() {
  let aspect = 0;
  for (let i = 0; i < imgCnt; i++) {
    aspect = Math.random() * (aspectMax - aspectMin) + aspectMin;
    aryImg.push({
      "posx": Math.random() * effectimgw,
      "posy": Math.random() * effectimgh,
      "sizew": imgBaseSizeW * aspect,
      "sizeh": imgBaseSizeH * aspect,
      "speedy": Math.random() * (speedMax - speedMin) + speedMin,
      "angle": Math.random() * 360,
    });
  }
}

let idx = 0;
let idxc = 0;
let cos = 0;
let sin = 0;
const rad = Math.PI / 180;
function flow() {
  ctx.clearRect(0, 0, effectimgw, effectimgh);
  for (idx = 0; idx < imgCnt; idx++) {
    aryImg[idx].posx += wind / aryImg[idx].sizew;
    aryImg[idx].posy += aryImg[idx].speedy;
    (idx % 2) ? aryImg[idx].angle += 1 : aryImg[idx].angle -= 1;
    cos = Math.cos(aryImg[idx].angle * rad);
    sin = Math.sin(aryImg[idx].angle * rad);
    ctx.setTransform(cos, sin, sin, cos, aryImg[idx].posx, aryImg[idx].posy);
    ctx.drawImage(img, 0, 0, aryImg[idx].sizew, aryImg[idx].sizeh);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (aryImg[idx].posy >= effectimgh) {
      aryImg[idx].posy = -aryImg[idx].sizeh;
      if (imgCnt < idx) {
        aryImg.splice(idx, 1);
      }
    }
    if (aryImg[idx].posx >= effectimgw) {
      aryImg[idx].posx = -aryImg[idx].sizew;
      if (imgCnt < idx) {
        aryImg.splice(idx, 1);
      }
    }
  }
  for (idxc = 0; idxc < aryCloud.length; idxc++) {
    ctx.drawImage(aryCloud[idxc].img, aryCloud[idxc].posx, aryCloud[idxc].posy, aryCloud[idxc].img.width, aryCloud[idxc].img.height);
    aryCloud[idxc].posx += aryCloud[idxc].speed / 15;
    if (aryCloud[idxc].posx > effectimgw) {
      aryCloud[idxc].posx = -aryCloud[idxc].img.width;
    }
  }
}

function flow_start() {
  setImagas();
  setInterval(flow, 10);
}
