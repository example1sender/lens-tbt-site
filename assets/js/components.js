/* =====================================================================
   The Lens Perspective Photography — Reusable shell (Navigation + Footer)
   Single source of truth, injected into every page.
   Page sets <body data-page="..."> ; markup hosts:
     <header id="site-nav"></header> ... <div id="site-footer"></div>
   ===================================================================== */
(function () {
  "use strict";

  var BRAND = "The Lens Perspective Photography";

  // Services are split into the two sub-brands so visitors see them separately.
  var SERVICE_GROUPS = [
    { brand: "The Lens Perspective", tag: "Photography", items: [
      { key: "weddings",  label: "Weddings",                     href: "weddings.html" },
      { key: "product",   label: "Product Photography",          href: "product-photography.html" },
      { key: "events",    label: "Event Decoration & Gifting",   href: "events-gifting.html" },
      { key: "portfolio", label: "Portraits & Portfolio",        href: "portfolio.html" },
      { key: "services",  label: "All Photography Services",     href: "services.html" }
    ]},
    { brand: "TBT Events by Abeer K", tag: "Décor · Floral · Gifting", items: [
      { key: "balloon-tales", label: "TBT Events — Overview",         href: "balloon-tales.html" },
      { label: "Custom Productions",             href: "balloon-tales.html#work" },
      { label: "Floral & Balloon Installations", href: "balloon-tales.html#work" },
      { label: "Curated Gifting",                href: "balloon-tales.html#work" },
      { label: "Plan an Event",                  href: "balloon-tales.html#book" }
    ]}
  ];

  var NAV = [
    { key: "home",     label: "Home",      href: "index.html" },
    { key: "about",    label: "About",     href: "about.html" },
    { key: "services", label: "Services",  href: "services.html", groups: SERVICE_GROUPS },
    { key: "balloon-tales", label: "TBT Events", href: "balloon-tales.html" },
    { key: "portfolio",    label: "Portfolio",    href: "portfolio.html" },
    { key: "testimonials", label: "Testimonials", href: "testimonials.html" }
  ];

  // Footer service lists are built inside buildFooter() from the two sub-brands.

  function active(key, current) { return key === current ? " is-active" : ""; }

  /* ----------------------------------------------------------------- NAV */
  function buildNav(current) {
    // The TBT Events page is its own sub-brand — show its logo + name lockup in the top bar.
    var brandLink = current === "balloon-tales"
      ? '<a href="balloon-tales.html" class="group flex items-center gap-3 md:gap-3.5">' +
          '<img data-img="bt.logo" src="assets/img/tbt-logo.svg" alt="TBT Events by Abeer K" class="w-11 h-11 md:w-12 md:h-12 rounded-full ring-1 ring-secondary/40 shadow-sm shrink-0">' +
          '<span class="h-9 w-px bg-outline-variant hidden sm:block" aria-hidden="true"></span>' +
          '<span class="leading-none">' +
            '<span class="block font-headline-lg text-xl md:text-[23px] text-on-background tracking-tight group-hover:text-secondary transition-colors">TBT Events</span>' +
            '<span class="block text-[10px] font-semibold tracking-[0.28em] uppercase text-secondary mt-1.5 whitespace-nowrap">by Abeer K · Mumbai</span>' +
          '</span>' +
        '</a>'
      : '<a href="index.html" class="group flex items-center gap-3 md:gap-3.5">' +
          '<img src="assets/img/lens-logo.png" alt="The Lens Perspective Photography" class="w-11 h-11 md:w-12 md:h-12 rounded-full ring-1 ring-secondary/40 shadow-sm shrink-0 object-cover">' +
          '<span class="h-9 w-px bg-outline-variant hidden sm:block" aria-hidden="true"></span>' +
          '<span class="leading-none">' +
            '<span class="block font-headline-lg text-lg md:text-[21px] text-on-background tracking-tight group-hover:text-secondary transition-colors">The Lens Perspective</span>' +
            '<span class="block text-[9.5px] font-semibold tracking-[0.3em] uppercase text-secondary mt-1.5">Photography</span>' +
          '</span>' +
        '</a>';

    var ctaLabel = current === "balloon-tales" ? "Plan Your Event" : "Book a Session";
    var ctaHref = current === "balloon-tales" ? "balloon-tales.html#book" : "contact.html";

    var desktop = NAV.map(function (item) {
      if (item.groups) {
        var cols = item.groups.map(function (g, gi) {
          var links = g.items.map(function (c) {
            return '<a href="' + c.href + '" role="menuitem" class="block px-3 py-2 rounded-md hover:text-secondary hover:bg-secondary/5 transition-colors text-sm whitespace-nowrap ' + (c.key && c.key === current ? 'text-secondary' : 'text-on-surface-variant') + '">' + c.label + '</a>';
          }).join("");
          return (gi ? '<div class="w-px bg-outline-variant/70 self-stretch"></div>' : '') +
            '<div class="p-3 min-w-[232px]">' +
              '<p class="px-3 text-[11px] font-semibold tracking-[0.2em] uppercase text-secondary">' + g.brand + '</p>' +
              '<p class="px-3 text-[10.5px] text-on-surface-variant/55 mb-2">' + g.tag + '</p>' +
              links +
            '</div>';
        }).join("");
        return '' +
          '<div class="relative group/drop">' +
            '<a href="' + item.href + '" aria-haspopup="true" class="nav-link inline-flex items-center gap-1 text-on-background/80 hover:text-secondary transition-colors text-[13px] font-medium tracking-wide' + active(item.key, current) + '">' +
              item.label +
              '<span class="material-symbols-outlined text-base transition-transform duration-300 group-hover/drop:rotate-180">expand_more</span>' +
            '</a>' +
            '<div role="menu" class="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible translate-y-2 group-hover/drop:opacity-100 group-hover/drop:visible group-hover/drop:translate-y-0 transition-all duration-300">' +
              '<div class="bg-surface border border-outline-variant rounded-xl shadow-xl flex overflow-hidden">' + cols + '</div>' +
            '</div>' +
          '</div>';
      }
      return '<a href="' + item.href + '" class="nav-link text-on-background/80 hover:text-secondary transition-colors text-[13px] font-medium tracking-wide' + active(item.key, current) + '">' + item.label + '</a>';
    }).join("");

    var mobile = NAV.map(function (item) {
      if (item.groups) {
        var groupsHtml = item.groups.map(function (g) {
          var links = g.items.map(function (c) {
            return '<a href="' + c.href + '" class="menu-link block text-body-lg hover:text-secondary transition-colors ' + (c.key && c.key === current ? 'text-secondary' : 'text-on-surface-variant') + '">' + c.label + '</a>';
          }).join("");
          return '<div class="space-y-2.5">' +
              '<p class="text-[11px] font-semibold tracking-[0.24em] uppercase text-secondary">' + g.brand + '</p>' +
              '<div class="space-y-2.5 pl-4 border-l border-outline-variant">' + links + '</div>' +
            '</div>';
        }).join("");
        return '<div data-acc>' +
            '<button type="button" data-acc-btn aria-expanded="false" class="menu-link w-full flex items-center justify-between font-headline-lg text-4xl text-on-background hover:text-secondary transition-colors">' +
              '<span>' + item.label + '</span>' +
              '<span class="material-symbols-outlined text-3xl transition-transform duration-300" data-acc-icon>expand_more</span>' +
            '</button>' +
            '<div data-acc-panel style="max-height:0;overflow:hidden;transition:max-height .4s cubic-bezier(0.16,1,0.3,1)">' +
              '<div class="pt-5 pb-1 space-y-5">' + groupsHtml + '</div>' +
            '</div>' +
          '</div>';
      }
      return '<a href="' + item.href + '" class="menu-link block font-headline-lg text-4xl text-on-background hover:text-secondary transition-colors' + (item.key === current ? ' text-secondary' : '') + '">' + item.label + '</a>';
    }).join("");

    return '' +
      '<a class="skip-link" href="#main">Skip to content</a>' +
      '<nav aria-label="Primary" class="fixed top-0 left-0 w-full z-50 bg-background/85 backdrop-blur-md border-b border-outline-variant/70">' +
        '<div class="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 md:py-5 w-full max-w-container-max mx-auto">' +
          brandLink +
          '<div class="hidden lg:flex items-center gap-8 xl:gap-10">' + desktop + '</div>' +
          '<div class="flex items-center gap-3">' +
            '<a href="' + ctaHref + '" class="hidden sm:inline-block btn-pill px-6 py-2.5 bg-secondary text-on-secondary text-[12px] font-semibold tracking-wide uppercase whitespace-nowrap hover:bg-secondary-fixed transition-all duration-300 active:scale-95">' + ctaLabel + '</a>' +
            '<button id="menuToggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu" class="lg:hidden w-10 h-10 flex items-center justify-center text-on-background">' +
              '<span class="material-symbols-outlined" id="menuIcon">menu</span>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</nav>' +
      '<div id="mobileMenu" class="hidden-menu fixed inset-0 z-40 bg-background lg:hidden flex flex-col">' +
        '<div class="flex-1 overflow-y-auto">' +
          '<div class="min-h-full flex flex-col justify-center gap-4 px-margin-mobile py-24">' + mobile +
            '<a href="' + ctaHref + '" class="menu-link inline-block mt-4 btn-pill px-8 py-4 bg-secondary text-on-secondary text-[12px] font-semibold tracking-wide uppercase text-center hover:bg-secondary-fixed transition-all">' + ctaLabel + '</a>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  /* -------------------------------------------------------------- FOOTER */
  function buildFooter() {
    var year = new Date().getFullYear();
    function footLinks(items) {
      return items.map(function (s) {
        return '<li><a class="text-on-primary/70 hover:text-secondary-container transition-colors gold-underline-hover" href="' + s.href + '">' + s.label + '</a></li>';
      }).join("");
    }
    var lensItems = [
      { label: "Weddings", href: "weddings.html" },
      { label: "Product Photography", href: "product-photography.html" },
      { label: "Event Decoration & Gifting", href: "events-gifting.html" },
      { label: "Portraits & Portfolio", href: "portfolio.html" }
    ];
    var tbtItems = [
      { label: "TBT Events — Overview", href: "balloon-tales.html" },
      { label: "Custom Productions", href: "balloon-tales.html#work" },
      { label: "Floral & Balloon Installations", href: "balloon-tales.html#work" },
      { label: "Curated Gifting", href: "balloon-tales.html#work" }
    ];

    return '' +
      '<footer class="w-full bg-primary text-on-primary pt-24 md:pt-32 pb-10">' +
        '<div class="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">' +
          '<div class="md:col-span-1">' +
            '<div class="flex items-center gap-3 mb-6">' +
              '<img src="assets/img/lens-logo.png" alt="The Lens Perspective Photography" class="w-12 h-12 rounded-full ring-1 ring-secondary-container/40 shrink-0 object-cover">' +
              '<h3 class="font-headline-lg text-2xl md:text-[26px] text-on-primary leading-tight">' + BRAND + '</h3>' +
            '</div>' +
            '<p data-text="site.tagline" class="text-on-primary/60 max-w-xs mb-6 leading-relaxed">Articulating beauty through light, shadow and exquisite detail.</p>' +
            '<div class="space-y-2 text-sm">' +
              '<p><a data-text="site.email" data-href-mail="site.email" class="text-on-primary/70 hover:text-secondary-container transition-colors" href="mailto:designers03studio@gmail.com">designers03studio@gmail.com</a></p>' +
              '<p><a data-text="site.phone" data-href-tel="site.phone" class="text-on-primary/70 hover:text-secondary-container transition-colors" href="tel:+917506991054">+91 75069 91054</a></p>' +
            '</div>' +
          '</div>' +
          '<div>' +
            '<h4 class="text-[12px] font-semibold tracking-[0.22em] uppercase text-secondary-container mb-5">The Lens Perspective</h4>' +
            '<ul class="space-y-3 mb-8">' + footLinks(lensItems) + '</ul>' +
            '<h4 class="text-[12px] font-semibold tracking-[0.22em] uppercase text-secondary-container mb-5">TBT Events</h4>' +
            '<ul class="space-y-3">' + footLinks(tbtItems) + '</ul>' +
          '</div>' +
          '<div>' +
            '<h4 class="text-[12px] font-semibold tracking-[0.22em] uppercase text-secondary-container mb-7">Company</h4>' +
            '<ul class="space-y-3.5">' +
              '<li><a class="text-on-primary/70 hover:text-secondary-container transition-colors gold-underline-hover" href="about.html">About Us</a></li>' +
              '<li><a class="text-on-primary/70 hover:text-secondary-container transition-colors gold-underline-hover" href="balloon-tales.html">TBT Events by Abeer K</a></li>' +
              '<li><a class="text-on-primary/70 hover:text-secondary-container transition-colors gold-underline-hover" href="testimonials.html">Testimonials</a></li>' +
              '<li><a class="text-on-primary/70 hover:text-secondary-container transition-colors gold-underline-hover" href="contact.html">Contact &amp; Booking</a></li>' +
            '</ul>' +
          '</div>' +
          '<div>' +
            '<h4 class="text-[12px] font-semibold tracking-[0.22em] uppercase text-secondary-container mb-7">Newsletter</h4>' +
            '<p class="text-on-primary/60 text-sm mb-4 leading-relaxed">Stories, behind-the-scenes and seasonal offers.</p>' +
            '<form class="relative" data-newsletter novalidate>' +
              '<label class="sr-only" for="newsletterEmail">Email address</label>' +
              '<input id="newsletterEmail" name="email" type="email" required placeholder="Email Address" class="w-full bg-transparent border-b border-on-primary/30 py-2 pr-8 focus:border-secondary transition-colors outline-none text-on-primary placeholder:text-on-primary/40">' +
              '<button type="submit" aria-label="Subscribe" class="absolute right-0 bottom-2 text-secondary-container hover:translate-x-1 transition-transform"><span class="material-symbols-outlined">arrow_forward</span></button>' +
              '<p class="field-error" data-newsletter-msg aria-live="polite"></p>' +
            '</form>' +
            '<div class="flex gap-5 mt-6">' +
              '<a href="#" aria-label="Instagram" class="text-on-primary/70 hover:text-secondary-container transition-colors"><span class="material-symbols-outlined">photo_camera</span></a>' +
              '<a href="#" aria-label="Share" class="text-on-primary/70 hover:text-secondary-container transition-colors"><span class="material-symbols-outlined">share</span></a>' +
              '<a data-href-mail="site.email" href="mailto:designers03studio@gmail.com" aria-label="Email" class="text-on-primary/70 hover:text-secondary-container transition-colors"><span class="material-symbols-outlined">mail</span></a>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="mt-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pt-8 border-t border-on-primary/15 flex flex-col md:flex-row justify-between items-center gap-4">' +
          '<p class="text-on-primary/50 text-sm">© ' + year + ' ' + BRAND + '. All Rights Reserved.</p>' +
          '<div class="flex items-center gap-5">' +
            '<span class="text-on-primary/40 text-xs tracking-[0.22em] uppercase">Cinematic Photography &amp; Events</span>' +
            '<a href="login.html" aria-label="Admin login" class="text-on-primary/40 hover:text-secondary-container text-xs tracking-[0.18em] uppercase transition-colors">Admin</a>' +
          '</div>' +
        '</div>' +
      '</footer>';
  }

  /* --------------------------------------------------------------- MOUNT */
  function mount() {
    var current = document.body.getAttribute("data-page") || "";
    var navHost = document.getElementById("site-nav");
    var footHost = document.getElementById("site-footer");
    if (navHost) navHost.innerHTML = buildNav(current);
    if (footHost) footHost.innerHTML = buildFooter();

    var toggle = document.getElementById("menuToggle");
    var menu = document.getElementById("mobileMenu");
    var icon = document.getElementById("menuIcon");
    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        var open = !menu.classList.contains("hidden-menu");
        menu.classList.toggle("hidden-menu");
        toggle.setAttribute("aria-expanded", String(!open));
        if (icon) icon.textContent = open ? "menu" : "close";
        document.body.style.overflow = open ? "" : "hidden";
      });
      menu.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          menu.classList.add("hidden-menu");
          toggle.setAttribute("aria-expanded", "false");
          if (icon) icon.textContent = "menu";
          document.body.style.overflow = "";
        });
      });
      // Expandable "Services" accordion inside the mobile menu
      menu.querySelectorAll("[data-acc-btn]").forEach(function (btn) {
        var acc = btn.closest("[data-acc]");
        var panel = acc.querySelector("[data-acc-panel]");
        var ic = acc.querySelector("[data-acc-icon]");
        btn.addEventListener("click", function () {
          var open = panel.style.maxHeight && panel.style.maxHeight !== "0px";
          panel.style.maxHeight = open ? "0px" : panel.scrollHeight + "px";
          btn.setAttribute("aria-expanded", String(!open));
          if (ic) ic.style.transform = open ? "rotate(0deg)" : "rotate(180deg)";
        });
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else { mount(); }
})();
