(function () {
  var config = {
    bookingUrl: ""
  };

  var menuButton = document.querySelector(".menu-button");
  var nav = document.querySelector(".site-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      var open = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!open));
      menuButton.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
      nav.classList.toggle("open", !open);
      document.body.classList.toggle("menu-open", !open);
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
        nav.classList.remove("open");
        document.body.classList.remove("menu-open");
      });
    });
  }

  document.querySelectorAll("[data-booking]").forEach(function (link) {
    if (config.bookingUrl) {
      link.href = config.bookingUrl;
      link.target = "_blank";
      link.rel = "noopener";
    }
  });

  var form = document.querySelector("#consultation-form");
  if (form) {
    var status = form.querySelector(".form-status");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var button = form.querySelector('button[type="submit"]');
      button.disabled = true;
      button.textContent = "Sending your request…";
      form.setAttribute("aria-busy", "true");
      status.textContent = "Sending your consultation request…";
      status.classList.remove("error");
      status.classList.add("show");

      fetch("https://formsubmit.co/ajax/bhattaraisukriti71@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      })
        .then(function (response) {
          return response.json().then(function (data) {
            return { ok: response.ok, data: data };
          });
        })
        .then(function (result) {
          var delivered = result.ok && (result.data.success === true || result.data.success === "true");
          if (!delivered) throw new Error(result.data.message || "Form delivery failed");
          form.reset();
          status.textContent = "Thank you! Your consultation request was sent successfully. I’ll reply to your email as soon as possible.";
        })
        .catch(function () {
          status.textContent = "Your request could not be sent right now. Please email bhattaraisukriti71@gmail.com directly.";
          status.classList.add("error");
        })
        .finally(function () {
          button.disabled = false;
          button.textContent = "Book a Free Consultation Call";
          form.removeAttribute("aria-busy");
        });
    });
  }

  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();

  var observer = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 }) : null;
  document.querySelectorAll(".reveal").forEach(function (item) {
    if (observer) observer.observe(item);
    else item.classList.add("is-visible");
  });
})();
