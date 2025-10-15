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

document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch('blog/content.json')
  const posts = await res.json()
  const sidebar = document.querySelector('.blog_sidebar')
  sidebar.innerHTML = '<span class="sidebar_title">POSTS</span>' + posts.map(p => `<div class="single_blog_button" onclick="readPost('${p.title}')">${p.title}</div>`).join('')
  const newest = posts.sort((a, b) => b.time - a.time)[0]
  document.querySelector('#blogSnippet').innerText = newest.title;
  readPost(newest.title);
})

async function readPost(title) {
  const res = await fetch('blog/content.json')
  const posts = await res.json()
  const post = posts.find(p => p.title === title)
  if (!post) return
  document.querySelector('.post_title h1').textContent = post.title
  const date = new Date(post.time)
  document.querySelector('.title_more .date').textContent = date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
  const words = post.content.split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(words / 200))
  document.querySelector('.estReadTime').textContent = `${minutes} Minute${minutes > 1 ? 's' : ''}`
  const html = post.content
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>')
    .replace(/\*(.*?)\*/gim, '<i>$1</i>')
    .replace(/__(.*?)__/gim, '<u>$1</u>')
    .replace(/`(.*?)`/gim, '<code>$1</code>')
    .replace(/~(.*?)~/gim, '<del>$1</del>')
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank">$1</a>')
    .replace(/\n/g, '<br>')
    .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
  document.querySelector('.post_body').innerHTML = `<p>${html}</p>`
}

AOS.init();