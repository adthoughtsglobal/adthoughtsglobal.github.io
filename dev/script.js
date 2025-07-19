let theme = 1;
function toggleTheme(ele) {
    (theme) ? theme = 0: theme = 1;
    (!theme) ? ele.innerText = "light_mode" : ele.innerText = "dark_mode";
  document.documentElement.classList.toggle('dark');
}
const el = document.getElementById("lightboxanim");
const words = ["scalable", "secure", "reliable", "reasonable", "expressive", "for you"];
let index = 0;

function scrambleChar(finalChar, cb) {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    let count = 0;
    const max = Math.floor(Math.random() * 3) + 2;
    const interval = setInterval(() => {
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
        setTimeout(() => scrambleChar.call({i}, next[i] || ' ', () => {}), 20 + Math.random() * 300);
    });
}

setInterval(updateWord, 3000);