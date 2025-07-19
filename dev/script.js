let theme = 1;
function toggleTheme(ele) {
    (theme) ? theme = 0: theme = 1;
    (!theme) ? ele.innerText = "light_mode" : ele.innerText = "dark_mode";
  document.documentElement.classList.toggle('dark');
}
