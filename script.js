let theme = 1;
function toggleTheme(ele = document.getElementById("dmodetogbtn")) {
  (theme) ? theme = 0 : theme = 1;
  (!theme) ? ele.innerText = "light_mode" : ele.innerText = "dark_mode";
  document.documentElement.classList.toggle('dark');
}

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  toggleTheme();
}

const el = document.getElementById("lightboxanim");
const words = ["scalable", "secure", "reliable", "reasonable", "expressive", "for you"];
let index = 0;
let elChars = [];

function scrambleChar(finalChar, cb) {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let count = 0;
  const max = Math.floor(Math.random() * 3) + 2;
  const interval = setInterval(() => {
    if (elChars[this.i].textContent)
      elChars[this.i].textContent = chars[Math.floor(Math.random() * chars.length)];
    count++;
    if (Math.random() < 0.3 && count >= 2) elChars[this.i].textContent = finalChar;
    if (count >= max) {
      clearInterval(interval);
      elChars[this.i].textContent = finalChar;
      cb();
    }
  }, 80 + Math.random() * 60);
}

function updateWord() {
  index = (index + 1) % words.length;
  const next = words[index];
  const len = next.length;
  const current = el.textContent;
  el.innerHTML = '';
  const padded = current.padEnd(len).slice(0, len);
  elChars = Array.from(padded).map((c, i) => {
    const span = document.createElement('span');
    span.textContent = c;
    el.appendChild(span);
    return span;
  });

  elChars.forEach((span, i) => {
    setTimeout(() => scrambleChar.call({ i }, next[i] || ' ', () => { }), 20 + Math.random() * 300);
  });
}

setInterval(updateWord, 3000);

const nav = document.getElementById('navigation');
const threshold = parseFloat(getComputedStyle(document.documentElement).fontSize);
window.addEventListener('scroll', () => {
  if (window.scrollY > threshold) { nav.classList.add('fixed'); }
  else { nav.classList.remove('fixed'); }
});


function goToContent(pageName) {
  document.querySelectorAll(".content_body").forEach((element) => { element.style.display = "none"; });
  document.getElementById(pageName).style.display = "flex";
  window.scrollTo({ top: 0, behavior: 'smooth' });
  AOS.init();
}

document.addEventListener("DOMContentLoaded", () => {
document.querySelectorAll('.sections_nav a').forEach(link => {
  link.addEventListener('click', function (e) {
    document.querySelectorAll('.sections_nav a').forEach(l => l.classList.remove('current'));
    this.classList.add('current');
  });
});


  const params = new URLSearchParams(window.location.search)
  if (params.has("page")) {
    console.log(params)
    goToContent(params.get("page"))
    window.history.replaceState({}, document.title, window.location.pathname)
  } else {
    goToContent("main_content")
  }
  if (window.location.hash) {
    history.replaceState(null, null, window.location.href.split('#')[0]);
  }

  window.addEventListener('hashchange', () => {
    if (window.location.hash) {
      history.replaceState(null, null, window.location.href.split('#')[0]);
    }
  });

})

function copyLink(param) {
  const url = window.location.origin + window.location.pathname + param;
  navigator.clipboard.writeText(url)
}

function readPost(title) {

}


  AOS.init();