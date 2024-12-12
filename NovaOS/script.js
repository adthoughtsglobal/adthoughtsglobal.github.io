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
  
  const scrollable = document.querySelector('.scrollerbox');

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