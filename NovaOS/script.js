document.addEventListener("DOMContentLoaded", function () {
  const box = document.querySelector('.box');

  function handleScroll() {
    const boxPosition = box.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (boxPosition < screenPosition) {
      box.classList.add('triggered');
    } else {
      box.classList.remove('triggered');
    }
  }

  window.addEventListener('scroll', handleScroll);
});

const scrollable1 = document.getElementsByClassName('scrollerbox')[0];
const scrollable2 = document.getElementsByClassName('scrollerbox')[1];

let isDown1 = false;
let startX1, startY1, scrollLeft1, scrollTop1;

scrollable1.addEventListener('mousedown', (e) => {
  isDown1 = true;
  scrollable1.classList.add('active');
  startX1 = e.pageX - scrollable1.offsetLeft;
  startY1 = e.pageY - scrollable1.offsetTop;
  scrollLeft1 = scrollable1.scrollLeft;
  scrollTop1 = scrollable1.scrollTop;
});

scrollable1.addEventListener('mouseleave', () => {
  isDown1 = false;
  scrollable1.classList.remove('active');
});

scrollable1.addEventListener('mouseup', () => {
  isDown1 = false;
  scrollable1.classList.remove('active');
});

scrollable1.addEventListener('mousemove', (e) => {
  if (!isDown1) return;
  e.preventDefault();
  const x = e.pageX - scrollable1.offsetLeft;
  const y = e.pageY - scrollable1.offsetTop;
  const walkX1 = (x - startX1) * 2;
  const walkY1 = (y - startY1) * 2;
  scrollable1.scrollLeft = scrollLeft1 - walkX1;
  scrollable1.scrollTop = scrollTop1 - walkY1;
});

let isDown2 = false;
let startX2, startY2, scrollLeft2, scrollTop2;

scrollable2.addEventListener('mousedown', (e) => {
  isDown2 = true;
  scrollable2.classList.add('active');
  startX2 = e.pageX - scrollable2.offsetLeft;
  startY2 = e.pageY - scrollable2.offsetTop;
  scrollLeft2 = scrollable2.scrollLeft;
  scrollTop2 = scrollable2.scrollTop;
});

scrollable2.addEventListener('mouseleave', () => {
  isDown2 = false;
  scrollable2.classList.remove('active');
});

scrollable2.addEventListener('mouseup', () => {
  isDown2 = false;
  scrollable2.classList.remove('active');
});

scrollable2.addEventListener('mousemove', (e) => {
  if (!isDown2) return;
  e.preventDefault();
  const x = e.pageX - scrollable2.offsetLeft;
  const y = e.pageY - scrollable2.offsetTop;
  const walkX2 = (x - startX2) * 2;
  const walkY2 = (y - startY2) * 2;
  scrollable2.scrollLeft = scrollLeft2 - walkX2;
  scrollable2.scrollTop = scrollTop2 - walkY2;
});

document.querySelector("#yearupdate").innerText = "©" + (new Date()).getFullYear();

window.addEventListener('scroll', () => {
  const body44 = document.querySelectorAll(".bgimg")[0];
  const launchbtn = document.querySelector("#altlaunchbtn");
  if (window.scrollY > 150) {
    body44.classList.add('scrolled');
    launchbtn.classList.add('doit');
  } else {
    body44.classList.remove('scrolled');
    launchbtn.classList.remove('doit');
    if (body44.src !== "https://images.unsplash.com/photo-1712111474888-29e9431241b6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") {
      body44.style.opacity = '0';

      setTimeout(() => {
        body44.src = "https://images.unsplash.com/photo-1712111474888-29e9431241b6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        body44.style.opacity = '1';
      }, 500);
    }
  }
});

document.querySelectorAll('.ban').forEach(banElement => {
  banElement.addEventListener('mouseover', function () {
    const bgImage = window.getComputedStyle(this).backgroundImage;
    const urlMatch = bgImage.match(/url\(["']?(.+?)["']?\)/);

    if (urlMatch && urlMatch[1]) {
      const newImageUrl = urlMatch[1];
      const bgimg = document.querySelector('.bgimg');

      if (bgimg.src !== newImageUrl && newImageUrl != "https://images.unsplash.com/photo-1730632694635-562d4356fd8d?q=80&w=1867&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") {
        bgimg.style.opacity = '0';

        setTimeout(() => {
          bgimg.src = newImageUrl;

          bgimg.style.opacity = '.5';
        }, 500);
      }
    }
  });
});