const path = document.querySelector('#handsoftheguy');
const flash = document.querySelector('.flash>svg');

const keyframes = [
  "M246.07758,147.84194c0,0 -4.11314,6.3764 -14.36498,6.668c-4.19501,0.11932 -8.87575,-2.69066 -11.83066,-2.51425c-5.42612,0.32395 -15.03978,0.8979 -15.03978,0.8979",
  "M241.41802,146.28875c0,0 0.54642,7.92959 -9.70542,8.22119c-4.19501,0.11932 -8.87575,-2.69066 -11.83066,-2.51425c-5.42612,0.32395 -15.03978,0.8979 -15.03978,0.8979",
  "M246.07758,147.84194c0,0 -4.11314,6.3764 -14.36498,6.668c-4.19501,0.11932 -8.87575,-2.69066 -11.83066,-2.51425c-5.42612,0.32395 -15.03978,0.8979 -15.03978,0.8979"
];

let frame = 0;
let direction = 1;
let animationFrameId;

function animateHands() {
  path.setAttribute('d', keyframes[frame]);

  frame += direction;
  if (frame === keyframes.length - 1 || frame === 0) {
    direction *= -1;
  }

  animationFrameId = setTimeout(() => {
    requestAnimationFrame(animateHands);
  }, 333);
}

flash.addEventListener('mouseenter', () => {
  animateHands();
});

flash.addEventListener('mouseleave', () => {
  clearTimeout(animationFrameId);
});


let lastScrollTop = 0;
const navbar = document.querySelector('.nav');
navbar.style.background = 'transparent';
navbar.style.color = 'black';

window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop === 0) {
    navbar.style.background = 'transparent';
    navbar.style.color = 'black';
  } else {
    navbar.style.background = '';
    navbar.style.color = 'white';
    if (scrollTop > lastScrollTop) {
      navbar.style.top = '-60px'; // Adjust based on navbar height
    } else {
      navbar.style.top = '0';
    }
  }

  lastScrollTop = scrollTop;
});

function removeAnimations(rev) {
  let element = document.getElementById('device')
  if (rev) {
    element.style.animation = '';
    element.style.webkitAnimation = '';
  } else {
    element.style.animation = 'none';
    element.style.webkitAnimation = 'none';
  }

}


const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
if (motionMediaQuery.matches) {
  pauseplayanims();
}

const carouselTrack = document.getElementById("carouselTrack");

function scrollCarouselLeft() {
  if (carouselTrack) {
    carouselTrack.scrollBy({ left: -carouselTrack.clientWidth, behavior: 'smooth' });
  }
}

function scrollCarouselRight() {
  if (carouselTrack) {
    carouselTrack.scrollBy({ left: carouselTrack.clientWidth, behavior: 'smooth' });
  }
}


function cycleTextShadow() {
  const elements = document.querySelectorAll('.footer .socials i');
  const delayBetween = 100;
  const glowDuration = 300;

  elements.forEach((el, i) => {
      setTimeout(() => {
          el.style.textShadow = '0 0 10px white';
          el.style.opacity = '1';
          el.style.transform = 'rotate(45deg) scale(1.1)';
          setTimeout(() => {
              el.style.textShadow = '';
              el.style.transform = 'none';
              el.style.opacity = '.5';
          }, glowDuration);
      }, i * delayBetween);
  });
}
