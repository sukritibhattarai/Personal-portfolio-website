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
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var status = form.querySelector(".form-status");
      status.textContent = "Direct contact details are being updated. Please check back soon.";
      status.classList.add("show");
    });
  }

  var profileInput = document.querySelector("#profile-photo-input");
  var profileImage = document.querySelector("#profile-photo");
  var profileMonogram = document.querySelector(".profile-monogram");
  var profileReset = document.querySelector("#profile-photo-reset");
  var profileStatus = document.querySelector("#profile-photo-status");
  if (profileInput && profileImage && profileMonogram && profileReset) {
    var previewUrl = "";
    profileInput.addEventListener("change", function () {
      var file = profileInput.files && profileInput.files[0];
      if (!file) return;
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        profileStatus.textContent = "Please choose a JPG, PNG, or WebP photo.";
        return;
      }
      if (file.size > 8 * 1024 * 1024) {
        profileStatus.textContent = "Please choose a photo smaller than 8 MB.";
        return;
      }
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      previewUrl = URL.createObjectURL(file);
      profileImage.src = previewUrl;
      profileImage.hidden = false;
      profileMonogram.hidden = true;
      profileReset.hidden = false;
      profileStatus.textContent = "Your photo preview is ready. Send this photo in chat to publish it for every visitor.";
    });
    profileReset.addEventListener("click", function () {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      previewUrl = "";
      profileInput.value = "";
      profileImage.removeAttribute("src");
      profileImage.hidden = true;
      profileMonogram.hidden = false;
      profileReset.hidden = true;
      profileStatus.textContent = "Preview only on this device. Send the final photo to publish it for everyone.";
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
