document.addEventListener("DOMContentLoaded", () => {
  Promise.all([
    fetch("nav.html").then(res => res.text()),
    fetch("footer.html").then(res => res.text())
  ]).then(([navHTML, footerHTML]) => {
    const headerDiv = document.createElement("div");
    headerDiv.innerHTML = navHTML;
    document.body.insertBefore(headerDiv, document.body.firstChild);

    const footerDiv = document.createElement("div");
    footerDiv.innerHTML = footerHTML;
    document.body.appendChild(footerDiv);

    // Wait for nav to load before attaching event handlers
    setTimeout(() => {
      const hamburger = document.querySelector(".hamburger");
      const navMenu = document.querySelector(".nav-menu");
      const submenuParent = document.querySelector(".has-submenu");

      hamburger?.addEventListener("click", () => {
        navMenu?.classList.toggle("active");
      });

      submenuParent?.addEventListener("click", function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          this.classList.toggle("open");
        }
      });

      document.addEventListener("click", (e) => {
        const isClickInside = submenuParent?.contains(e.target) || hamburger?.contains(e.target);
        if (!isClickInside && window.innerWidth <= 768) {
          submenuParent?.classList.remove("open");
        }
      });
    }, 100); 
  });
});