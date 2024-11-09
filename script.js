var lastitm, animations = true;
function animateText(element, text) {
  if (lastitm == text || !animations) {
    return
  }
  lastitm = text;
  element.innerHTML = '';

  const span = document.createElement('span');
  span.textContent = text;
  element.appendChild(span);
}

var madefor = [
  "Developers",
  "Creators",
  "Ease of use",
  "Efficiency",
  "the Web",
  "You",
  "Designers"
];

setInterval(function() {
  animateText(document.getElementById("flashcards"), madefor[Math.floor(Math.random() * madefor.length)]);
}, 1500);

document.addEventListener('DOMContentLoaded', function() {
  const hand = document.querySelector('#handsoftheguy');

  document.querySelector('.flash svg').addEventListener('mouseenter', function() {
    hand.setAttribute('d', 'M246.07758,147.84194c0,0 -4.11314,6.3764 -14.36498,6.668c-4.19501,0.11932 -8.87575,-2.69066 -11.83066,-2.51425c-5.42612,0.32395 -15.03978,0.8979 -15.03978,0.8979');
  });

  document.querySelector('.flash svg').addEventListener('mouseleave', function() {
    hand.setAttribute('d', 'M241.41802,146.28875c0,0 0.54642,7.92959 -9.70542,8.22119c-4.19501,0.11932 -8.87575,-2.69066 -11.83066,-2.51425c-5.42612,0.32395 -15.03978,0.8979 -15.03978,0.8979');
  });
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

function pauseplayanims() {
  let x = document.getElementById('dod');
  if (x.getAttribute("name") == `play-outline`) {
    x.setAttribute("name", "pause-outline");
    animations = true;
    removeAnimations(1)
  } else {
    x.setAttribute("name", "play-outline");
    animations = false;
    document.getElementById("flashcards").innerText = "Everything"
    removeAnimations(0)
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