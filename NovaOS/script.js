document.addEventListener("DOMContentLoaded", function() {
    const box = document.querySelector('.box');
  
    function handleScroll() {
      const boxPosition = box.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
  
      if (boxPosition < screenPosition) {
        box.classList.add('triggered'); // Add a class to trigger the animation
      } else {
        box.classList.remove('triggered'); // Remove the class if element is not in view
      }
    }
  
    window.addEventListener('scroll', handleScroll);
  });
  
  const scrollable = document.getElementsByClassName('scrollerbox')[0];

let isDown = false;
let startX, startY, scrollLeft, scrollTop;

scrollable.addEventListener('mousedown', (e) => {
  isDown = true;
  scrollable.classList.add('active');
  startX = e.pageX - scrollable.offsetLeft;
  startY = e.pageY - scrollable.offsetTop;
  scrollLeft = scrollable.scrollLeft;
  scrollTop = scrollable.scrollTop;
});

scrollable.addEventListener('mouseleave', () => {
  isDown = false;
});

scrollable.addEventListener('mouseup', () => {
  isDown = false;
});

scrollable.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - scrollable.offsetLeft;
  const y = e.pageY - scrollable.offsetTop;
  const walkX = (x - startX) * 1;
  const walkY = (y - startY) * 1;
  scrollable.scrollLeft = scrollLeft - walkX;
  scrollable.scrollTop = scrollTop - walkY;
});

const scrollable2 = document.getElementsByClassName('scrollerbox')[1];

let isDown2 = false;
let startX2, startY2, scrollLeft2, scrollTop2;

scrollable2.addEventListener('mousedown', (e) => {
  isDown2 = true;
  scrollable.classList.add('active');
  startX = e.pageX - scrollable.offsetLeft;
  startY = e.pageY - scrollable.offsetTop;
  scrollLeft = scrollable.scrollLeft;
  scrollTop = scrollable.scrollTop;
});

scrollable2.addEventListener('mouseleave', () => {
  isDown2 = false;
});

scrollable2.addEventListener('mouseup', () => {
  isDown2 = false;
});

scrollable2.addEventListener('mousemove', (e) => {
  if (!isDown2) return;
  e.preventDefault();
  const x = e.pageX - scrollable2.offsetLeft;
  const y = e.pageY - scrollable2.offsetTop;
  const walkX2 = (x - startX2) * 1;
  const walkY2 = (y - startY2) * 1;
  scrollable2.scrollLeft = scrollLeft2 - walkX2;
  scrollable2.scrollTop = scrollTop2 - walkY2;
});