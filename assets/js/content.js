/* =====================================================================
   The Lens Perspective Photography — Image content manifest
   Single source of truth for every managed image on the site.
   • Each "slot" has a key (used as data-img / data-bg on the page),
     a friendly label, a type (img | bg) and a default source URL.
   • The admin panel (admin.html) reads this list to build its form.
   • Live overrides are stored in localStorage["tlp_images"] and applied
     by the renderer in main.js — so you never touch the HTML.
   ===================================================================== */
(function () {
  "use strict";
  var P = "https://lh3.googleusercontent.com/aida-public/";

  // Default placeholder sources (swap freely from the admin panel).
  var IMG = {
    piano:       P + "AB6AXuDJUn6vTKie6SniZ9Q0rNKvf8ESgDcu7fcVaCbbNJzE6i_BTjXPBd-bSpSa3Pom2iyBlLddb5y_Avn9RI2M2g1fX6heLSV_7uKA3f1dwZAQ1LXXu8fJVxlLySGb-LyaX9im1RQCcMC8-qgM6xxasVMQLU6UVifobMxRgWCFUH-McYeM7tCSaO9Ehnh1K_M0MoArFH6hAq0aRwgUfficNUfgN6pP8WJA9nrakRQ6oOTat1XIcf8zQ_LVkeCqIfNmgdahTg2LHKwifyM",
    bride:       P + "AB6AXuCvkAjzH6pi9pJzYifuR3Nnj4xQ4V5P7VU1y5pUxPL05bVzoO31qcaQhh44PiJMGVD52_t76jeit-00uBEal2dSu7us0FFK9QJBIon5UgJooG_GQ9JBKhIWN2IAp1Q5DM2tNXGp8Vzx7XJi9sxhm7lwBxKcMPTGAGRR9GoRC8mNmF9Ajf9gWAMmx3kvDG1abPhRHcyed4CazR-A2sjaXfbrJ1dS7egtn1mjgo-DCcMSf99JzhXU11porxlQ_ORaQi_yn1l1GIcFFq0",
    eventtable:  P + "AB6AXuCeBZsOd9myKL_8VGVVLHTDRCGDN3NDVqHQA2_KrIOavIFdWlRk1gVQtsyQ8yy6JrN2r9dBDjSDBqRVQKxYoJ6XxtSn8b6fbYgwAl3ftOhfVJJ7dkcShsRVfXxDMujyBPsHgpOiakRh9ET1Ck2tCS3IOhHHoK4hXq_uqhg5XqDwmkz8_avors5PAFRHfgQ74CeTwXbcNFwCEXpY2zaCMRRSGq7fUjtoMmODYXrdFnDHInCeAYxy77bAX7syct8o8jD4BL3saedVIHc",
    paris:       P + "AB6AXuCdRx1Bu4rJc0ThQt-ZONSpZ-pHDz4Qg1bMCKfhBLkIYmypRR-9S0ka0r5UzcLBd58UC3UeQ1c_zoliNwME62M-ZLzHYZ6H0AIY77u7Mo2bm2tEaHlt4-Xoj2m-a33fSYQxAgsPCgt4aTxEvU230udNSKZdLeumH8M858tn5zcdu3TxXO09axIBZS_PRofIlm5P9ZMqO4eehb15mbM8lsHWCs5Bh3iZfP-x1TXSqfo8FVlmMvdzMEU3E3WUgE2EVp0sK7DgA8CZnCU",
    weddinghall: P + "AB6AXuBYfmiOHKg-XrEdvJ8TJGY6ssHP6FFL4zV5kyV19I-_YFlbs0SuHRfXxjrdf9SnOflCqxj0qLF4ZYW2NyK1O8Z77gGnsCAFQLUoRxGeH3h2EvBAQP5r8l847a84LFU-HYzb09C4HFaDwpCUZrkSVgg_E8Cnu_XjfYIGORhr7iOj3_wrfeL_YwWUiFs51hGdaBbvxPdjuQtL6GKpC6GS-OmN4lZx8jb6q4YcdQ7DSQfe1cIXLI8zDjgCItbork8AhgEnphT9wVdvZfw",
    giftbox:     P + "AB6AXuDImHFV5Hmh35U5FkZy03ZHjFQQl68OpSjwHQtPYAIbwYuWcvfphoNT0NZzRHNLrz-v8VSBqbVJgskhXDxoaxeQv5Wf5yzTxqSQn4BZK6fl1aIsb42SMFfDGuBpaB98VFgiKysJhVNbijTYi3GRS58AQA-H-ployyWGWSvyzGDCFS1xSIeP0P-8h6rXUvo8iN7Ohgswk_HIjNoz38L0ZbC00Hgd8QaXZEHniFH3EqmsU0RVmPLTAOxXXZ8AVxGUNaE2fLviyxivhb8",
    architecture:P + "AB6AXuAAB_hIQZoMEZnnnS4Z8DYSRS5gFhKIeGO08bMiIvBPYRrQBrYMY5cynI4u75DuXPqy-eEG-kraVjzygG1cB1IoNe6n620t_MaW9BLlYSdxT5yIpqQp_ALVbmjWVsplCIlmMgupc1r93u3fsO3P7zMFvHMx9LFBI7hGfwCGCA_MZqR3DjasKNe84NZhcOxe1GfJ7IbRd7WTqib5BKzESnI52eRHTnygQoJkZsTxs8vzfzYFsx9rmm4M2l5t2cRQMPROw_jX_hoqrMM",
    couple:      P + "AB6AXuD6Dvv_hGu_ByMNmKcwkkVLX2txTfhSPlJePpFLjdOsdf4XTq6XvVTg6_5o-HZ8Af4w151SPL9urOk7r4bAGGFgWTdv9fKSs11s46GgLJkzckFZcjaF3Qt8qOxFhJgLyB0KVVrmMyX9mnJdOrph52ollCVGqcxskSFXFWwfELBBEGiW69i6jIBxpCQ20X_AIuo9QAeN6Lg9dGZ7FZANe0ZiFkjbf8crrmkvvocZKhc6pDYzTh46lDbPZEqZgh-v8mecFU5h3Z6nXu8",
    lake:        P + "AB6AXuCKbeUwFL18zsV_rTwRrTdp7ef5HVOLeSv10eWgixvTrmA_e3eI3_crGnXcM3Sa8_o0bUPcRknL6phDB56K8FceM1Mf1mL9v7dFiSsNqNzcAMQoDfSHb6CujPChDFwQVtMIzEI4s8QiLA96oBY-zp_oDj3Zs2kTK7PT-fZvft5i8-NVro_SrXdpRl3Xpfti3-Eg4yf3TVY_B5WhzuLHjavaijShD8mWBsEvN0We9BJOtxwCBhfVpyAdFaEYJvEuSy7ccGtkXBHgVnQ",
    roses:       P + "AB6AXuDyPd42fW8f3tY8sq3x4lzLg_3L1jbnUUix66LnAN4hw3LRlcimsvCjqqDTE_rNvxkL7VasPHnt3K-daE_L5wGVusJ0RFdubMfkBLbswfnyXpwqllai7TT6G8lgEhUrq6M9GqgzYoodplgHFUoRn5EVbbqFfEVFU0XktIZBwW8t33DB6DPVVksRHTgeTXvVuhiZP_Acr0PrdeY_EeHuNQjQHnAxbAuzbl7c5AZUs5Bg-Tg2vdp56ZF7V9TLSQ-ScVS0eDG3zcZLPzc",
    gala:        P + "AB6AXuDLwSmDiWx_38Qu-kZLF4Pw8ryHSyig5mJdhDWuVr2ALPW8quXFyw2WerfT-yfueaN7qPdCtaJq7QQX2LHg9FxMVufoC5uXprPByjJrI53PWPD4rs6uRctbokASy1xzSzsQZI1qqNRFOqtAmLcmQTMNrK33joBO2xmPWbUxe_UYUXuA7E7QzoyCi93rYmEZg1tw9Ly2yuksW7lR6HPsNv_CLd3RD588MZSVjtbRdZDcKeZsioFFoTsMhoi6a1yI8KyIR6E6qskJvgE",
    hamper:      P + "AB6AXuDImHFV5Hmh35U5FkZy03ZHjFQQl68OpSjwHQtPYAIbwYuWcvfphoNT0NZzRHNLrz-v8VSBqbVJgskhXDxoaxeQv5Wf5yzTxqSQn4BZK6fl1aIsb42SMFfDGuBpaB98VFgiKysJhVNbijTYi3GRS58AQA-H-ployyWGWSvyzGDCFS1xSIeP0P-8h6rXUvo8iN7Ohgswk_HIjNoz38L0ZbC00Hgd8QaXZEHniFH3EqmsU0RVmPLTAOxXXZ8AVxGUNaE2fLviyxivhb8",
    driedbq:     P + "AB6AXuCxrICXoEhW_e28KHXh7nOQ8IZ6tt4cfqx3rRjk9jqA1kgvtHkX7jikJyjN8OXbxcUuuR0h7o21TCodh4-naT9pWEbwrusLM2vKdCU_vXDI4OJ69TBR1uuF6zHogRDm2p2IE8i4xN3jCN661Qq6PKaKQWssfHPZgtMj54h21YyJ9zhmgVRT7bAW4hEekIMsBPijnA3YdQ-YUCkm-CJUGRzmIrU_N8EZH6StOX6Mi14fPd78w8AQyj8PSFzZze1v448csz8mMfMwIXs",
    stylist:     P + "AB6AXuCbW3yJPxo4ozYZO9mUuoyk-NahYxWphwk4GaY1OqR8i2sP9ktBCraZGAnxTz_ib-DTsn-JyN4w2y_Z4lKLOE5nhCChiwnA76qDZqz20gzhu6noB-opeBaOi7Grs1VLV9tGdoyZSRpo9miB-PkNMvGabPJ02VMtDYxoXxmEXOtuI0NNH8ze_X2zHvvn2cGbcyvR0V97UtAEyPVpAv-Emz-y4D7Vw0_Ge5ZIVLqNLKaiPS1aJkpNv6cUCN6LWlM6IuW0VVFXPl-bVVE",
    forest:      P + "AB6AXuAFqMh_vvhJGUadDYwyKlmesuwGFtGv6Qcfgq3TDw_G_2fs6EMyjHV79mQ0mHY2glbiB28FNzIhfCp8RYkDoxKAwfI4RAkNRYKx1S53tejwTgUS4bHqZxIAyj45Q1AziEeBkhLIDu3h7_cb0Yvp9pdzdTHIBkU8dishzCnd_P0sz7bZNDgzk8KDpVlTAZFNLIcN-c-8J6p1zBM7LS9HzE3Io69yi8xpI526X7SrvSkhjDqLg89gqsvryS7Brz0tzpAXJfTqkQvokTg"
  };

  // Slots grouped by page for the admin UI.
  window.TLP_IMAGE_GROUPS = [
    { page: "Home", slots: [
      { key: "home.hero",             label: "Hero background",            type: "bg",  def: IMG.piano },
      { key: "home.card_photography", label: "Card — Photography",         type: "bg",  def: IMG.bride },
      { key: "home.card_events",      label: "Card — Events & Gifting",    type: "bg",  def: IMG.eventtable },
      { key: "home.archive_1",        label: "Archive strip 1",            type: "img", def: IMG.paris },
      { key: "home.archive_2",        label: "Archive strip 2",            type: "img", def: IMG.weddinghall },
      { key: "home.archive_3",        label: "Archive strip 3",            type: "img", def: IMG.giftbox },
      { key: "home.archive_4",        label: "Archive strip 4",            type: "img", def: IMG.architecture },
      { key: "home.archive_5",        label: "Archive strip 5",            type: "img", def: IMG.couple },
      { key: "home.cta",              label: "Closing CTA background",     type: "bg",  def: IMG.lake }
    ]},
    { page: "About", slots: [
      { key: "about.feature",     label: "Wide feature image",            type: "img", def: IMG.weddinghall },
      { key: "about.founder",     label: "Founder portrait — Rasha (Lens)", type: "img", def: IMG.bride },
      { key: "about.founder_tbt", label: "Founder portrait — Abeer (TBT)",  type: "img", def: IMG.stylist }
    ]},
    { page: "Services", slots: [
      { key: "services.card_weddings",  label: "Card — Weddings",          type: "img", def: IMG.bride },
      { key: "services.card_product",   label: "Card — Product Photography",type: "img", def: IMG.giftbox },
      { key: "services.card_events",    label: "Card — Event Decor",       type: "img", def: IMG.eventtable },
      { key: "services.card_portraits", label: "Card — Portraits",         type: "img", def: IMG.couple },
      { key: "services.card_corporate", label: "Card — Corporate & Galas", type: "img", def: IMG.forest },
      { key: "services.card_gifting",   label: "Card — Gifting Suites",    type: "img", def: IMG.hamper }
    ]},
    { page: "Weddings", slots: [
      { key: "weddings.hero",      label: "Hero background",  type: "bg",  def: IMG.couple },
      { key: "weddings.gallery_1", label: "Gallery — large",  type: "img", def: IMG.weddinghall },
      { key: "weddings.gallery_2", label: "Gallery — square", type: "img", def: IMG.bride },
      { key: "weddings.gallery_3", label: "Gallery — square", type: "img", def: IMG.couple },
      { key: "weddings.gallery_4", label: "Gallery — wide",   type: "img", def: IMG.eventtable },
      { key: "weddings.cta",       label: "CTA background",   type: "bg",  def: IMG.lake }
    ]},
    { page: "Product Photography", slots: [
      { key: "product.hero",      label: "Hero image",   type: "img", def: IMG.giftbox },
      { key: "product.gallery_1", label: "Gallery 1",    type: "img", def: IMG.hamper },
      { key: "product.gallery_2", label: "Gallery 2",    type: "img", def: IMG.roses },
      { key: "product.gallery_3", label: "Gallery 3",    type: "img", def: IMG.driedbq }
    ]},
    { page: "Event Decoration & Gifting", slots: [
      { key: "events.hero",      label: "Hero image",      type: "img", def: IMG.roses },
      { key: "events.gallery_1", label: "Case study — large", type: "img", def: IMG.gala },
      { key: "events.gallery_2", label: "Gallery — square",   type: "img", def: IMG.hamper },
      { key: "events.gallery_3", label: "Gallery — square",   type: "img", def: IMG.driedbq },
      { key: "events.gallery_4", label: "Gallery — wide",     type: "img", def: IMG.stylist },
      { key: "events.cta",       label: "CTA background",     type: "bg",  def: IMG.forest }
    ]},
    { page: "TBT Events (Balloon Tales)", slots: [
      { key: "bt.logo",      label: "Brand logo",             type: "img", def: "assets/img/tbt-logo.svg" },
      { key: "bt.hero",      label: "Hero background",        type: "bg",  def: IMG.gala },
      { key: "bt.intro",     label: "Intro image",            type: "img", def: IMG.roses },
      { key: "bt.service_1", label: "Service — Productions",  type: "img", def: IMG.forest },
      { key: "bt.service_2", label: "Service — Floral/Balloon",type: "img", def: IMG.roses },
      { key: "bt.service_3", label: "Service — Gifting",      type: "img", def: IMG.hamper },
      { key: "bt.gallery_1", label: "Gallery 1",              type: "img", def: IMG.eventtable },
      { key: "bt.gallery_2", label: "Gallery 2",              type: "img", def: IMG.driedbq },
      { key: "bt.gallery_3", label: "Gallery 3",              type: "img", def: IMG.stylist },
      { key: "bt.gallery_4", label: "Gallery 4",              type: "img", def: IMG.gala },
      { key: "bt.gallery_5", label: "Gallery 5",              type: "img", def: IMG.hamper },
      { key: "bt.gallery_6", label: "Gallery 6",              type: "img", def: IMG.driedbq },
      { key: "bt.cta",       label: "CTA background",         type: "bg",  def: IMG.forest }
    ]}
  ];

  // Flat default map { key: src } for the renderer / reset.
  window.TLP_IMAGE_DEFAULTS = (function () {
    var m = {};
    window.TLP_IMAGE_GROUPS.forEach(function (g) {
      g.slots.forEach(function (s) { m[s.key] = s.def; });
    });
    return m;
  })();

  // Read saved overrides (set from admin.html). Safe if storage unavailable.
  window.TLP_getOverrides = function () {
    try { return JSON.parse(localStorage.getItem("tlp_images") || "{}"); }
    catch (e) { return {}; }
  };

  /* ---- Editable TEXT / DETAILS (managed from admin.html) -------------- */
  window.TLP_TEXT_GROUPS = [
    { page: "The Lens Perspective Photography — details", fields: [
      { key: "lense.founder",       label: "Founder name",      type: "text",     def: "Rasha Khan" },
      { key: "lense.tagline",       label: "Tagline",           type: "text",     def: "Mumbai wedding & commercial photographer · 10+ years" },
      { key: "lense.bio",           label: "Short bio",         type: "textarea", def: "A Mumbai wedding & commercial photographer with 10+ years behind the lens, Rasha founded The Lens Perspective Photography with a love for candid, traditional and intimate storytelling — capturing the feeling of a moment, not just the frame." },
      { key: "lense.quote",         label: "Founder quote",     type: "textarea", def: "I don't photograph events. I photograph the way they made everyone feel." },
      { key: "lense.email",         label: "Email",             type: "text",     def: "designers03studio@gmail.com" },
      { key: "lense.phone",         label: "Phone",             type: "text",     def: "+91 75069 91054" },
      { key: "lense.instagram",     label: "Instagram handle",  type: "text",     def: "@the_lensperspective" },
      { key: "lense.instagram_url", label: "Instagram URL",     type: "text",     def: "https://instagram.com/the_lensperspective" },
      { key: "lense.wedmegood_url", label: "WedMeGood URL",     type: "text",     def: "" }
    ]},
    { page: "TBT Events — details", fields: [
      { key: "tbt.name",          label: "Brand name",        type: "text",     def: "TBT Events by Abeer K" },
      { key: "tbt.founder",       label: "Founder name",      type: "text",     def: "Abeer Khan" },
      { key: "tbt.tagline",       label: "Tagline",           type: "text",     def: "Event décor in Mumbai — custom balloon, floral & lighting installations" },
      { key: "tbt.bio",           label: "Short bio",         type: "textarea", def: "Abeer Khan is the founder of TBT Events, a boutique décor studio based in Mumbai. She and her team craft fresh floral arrangements, bespoke balloon installations, ambient lighting, and thoughtfully curated props — transforming birthdays, weddings, and private celebrations into refined, memorable experiences. Every setup is designed with intention: a considered palette, a curated mood, and the small details that make an occasion feel unmistakably yours." },
      { key: "tbt.quote",         label: "Founder quote",     type: "textarea", def: "We don't simply style a space — we shape the feeling people carry home." },
      { key: "tbt.email",         label: "Email",             type: "text",     def: "designers03studio@gmail.com" },
      { key: "tbt.phone",         label: "Phone",             type: "text",     def: "+91 90047 04237" },
      { key: "tbt.whatsapp_url",  label: "WhatsApp URL",      type: "text",     def: "https://wa.me/919004704237" },
      { key: "tbt.instagram",     label: "Instagram handle",  type: "text",     def: "@tbt.events" },
      { key: "tbt.instagram_url", label: "Instagram URL",     type: "text",     def: "https://instagram.com/tbt.events" },
      { key: "tbt.location",      label: "Location",          type: "text",     def: "Mumbai, India" }
    ]},
    { page: "Home — text", fields: [
      { key: "home.hero_eyebrow", label: "Hero eyebrow",  type: "text",     def: "Timeless Elegance · Est. 2012" },
      { key: "home.hero_title",   label: "Hero heading",  type: "textarea", def: "Capturing emotions, crafting moments." },
      { key: "home.hero_text",    label: "Hero subtext",  type: "textarea", def: "Fine-art photography and atmospheric event design for those who believe a moment, framed with intention, becomes a legacy." },
      { key: "home.intro_eyebrow",label: "Intro eyebrow", type: "text",     def: "Studio" },
      { key: "home.intro_heading",label: "Intro heading", type: "textarea", def: "We are a photography and event-design studio devoted to the quiet, beautiful in-between — the moments most people walk past." },
      { key: "home.services_title",label: "Services heading", type: "text", def: "Two disciplines, one perspective." },
      { key: "home.studios_title",label: "Studios heading",type: "text",     def: "Two studios, one creative family." },
      { key: "home.archive_title",label: "Archive heading",type: "text",     def: "The Visual Archive" },
      { key: "home.testi_title",  label: "Testimonials heading", type: "text", def: "Voices of perspective" },
      { key: "home.cta_title",    label: "CTA heading",   type: "text",     def: "Every frame is a legacy." },
      { key: "home.cta_text",     label: "CTA text",      type: "textarea", def: "Ready to transform your vision into something timeless? Let us craft your story with the precision and emotion it deserves." },
      { key: "home.cta_btn",      label: "CTA button",    type: "text",     def: "Book Your Story" }
    ]},
    { page: "About — text", fields: [
      { key: "about.hero_eyebrow", label: "Hero eyebrow", type: "text",     def: "Our story" },
      { key: "about.hero_title",   label: "Hero heading", type: "textarea", def: "We frame feeling, not just faces." },
      { key: "about.hero_note",    label: "Hero side note", type: "textarea", def: "The Lens Perspective Photography began with a simple conviction — that the most beautiful moments are the quiet ones, and they deserve to be remembered cinematically." },
      { key: "about.philosophy_title", label: "Philosophy heading", type: "text", def: "A cinematic philosophy." },
      { key: "about.founders_title", label: "Founders heading", type: "text", def: "Meet the founders." },
      { key: "about.process_title", label: "Process heading", type: "text",  def: "How we work." },
      { key: "about.cta_title",    label: "CTA heading",  type: "text",     def: "Let's create something timeless." }
    ]},
    { page: "Services — text", fields: [
      { key: "services.hero_eyebrow", label: "Hero eyebrow", type: "text",  def: "What we offer" },
      { key: "services.hero_title",   label: "Hero heading", type: "text",  def: "Services" },
      { key: "services.hero_text",    label: "Hero subtext", type: "textarea", def: "A considered suite of photography and event craft — each discipline delivered with the same perspective and obsessive attention to detail." },
      { key: "services.packages_title", label: "Packages heading", type: "text", def: "Considered collections." },
      { key: "services.cta_title",    label: "CTA heading",  type: "text",  def: "Not sure which is right for you?" }
    ]},
    { page: "Weddings — text", fields: [
      { key: "weddings.hero_eyebrow", label: "Hero eyebrow", type: "text",  def: "Wedding Photography" },
      { key: "weddings.hero_title",   label: "Hero heading", type: "textarea", def: "The story of us, beautifully told." },
      { key: "weddings.intro_title",  label: "Intro heading", type: "textarea", def: "More than a day. A legacy." },
      { key: "weddings.cta_title",    label: "CTA heading",  type: "text",  def: "Reserve your date." }
    ]},
    { page: "Product Photography — text", fields: [
      { key: "product.hero_eyebrow", label: "Hero eyebrow", type: "text",   def: "Product Photography" },
      { key: "product.hero_title",   label: "Hero heading", type: "textarea", def: "Objects, made irresistible." },
      { key: "product.hero_text",    label: "Hero subtext", type: "textarea", def: "Editorial still life and brand imagery that elevate your product into something worth desiring. We sculpt with light, honour texture, and let restraint do the talking." },
      { key: "product.cta_title",    label: "CTA heading",  type: "text",   def: "Let's make your product the hero." }
    ]},
    { page: "Events / Decor — text", fields: [
      { key: "events.hero_eyebrow", label: "Hero eyebrow", type: "text",    def: "Atmospheric Design" },
      { key: "events.hero_title",   label: "Hero heading", type: "textarea", def: "The art of ethereal gatherings" },
      { key: "events.hero_text",    label: "Hero subtext", type: "textarea", def: "Transforming spaces into cinematic narratives through bespoke floral architecture and curated luxury gifting experiences." },
      { key: "events.cta_title",    label: "CTA heading",  type: "text",    def: "Ready to elevate your perspective?" }
    ]},
    { page: "Portfolio — text", fields: [
      { key: "portfolio.hero_eyebrow", label: "Hero eyebrow", type: "text", def: "Curated works" },
      { key: "portfolio.hero_title",   label: "Hero heading", type: "text", def: "The Visual Archive" },
      { key: "portfolio.hero_text",    label: "Hero subtext", type: "textarea", def: "A selection of moments and milestones, framed with intention. Filter by discipline." },
      { key: "portfolio.cta_title",    label: "CTA heading",  type: "text", def: "Your story belongs in this archive." }
    ]},
    { page: "Testimonials — text", fields: [
      { key: "testimonials.hero_eyebrow", label: "Hero eyebrow", type: "text", def: "Kind words" },
      { key: "testimonials.hero_title",   label: "Hero heading", type: "text", def: "Voices of perspective" },
      { key: "testimonials.hero_text",    label: "Hero subtext", type: "textarea", def: "The trust of our clients is the truest measure of our craft. A few words from those who let us tell their stories." },
      { key: "testimonials.cta_title",    label: "CTA heading",  type: "text", def: "We'd be honoured to tell your story next." }
    ]},
    { page: "Contact — text", fields: [
      { key: "contact.hero_eyebrow", label: "Hero eyebrow", type: "text",   def: "The Lens Perspective Photography" },
      { key: "contact.hero_title",   label: "Hero heading", type: "text",   def: "Book your story" },
      { key: "contact.hero_text",    label: "Hero subtext", type: "textarea", def: "Photography enquiries with Rasha Khan — Mumbai wedding & commercial photographer. Candid, traditional & intimate weddings. We respond personally, usually within 24 hours." },
      { key: "contact.faq_title",    label: "FAQ heading",  type: "text",   def: "Frequently asked." }
    ]},
    { page: "TBT Events — page text", fields: [
      { key: "tbt.hero_eyebrow", label: "Hero eyebrow", type: "text",       def: "Events · Décor · Floral · Gifting" },
      { key: "tbt.hero_title",   label: "Hero heading", type: "textarea",   def: "Where celebrations come alive." },
      { key: "tbt.hero_text",    label: "Hero subtext", type: "textarea",   def: "Custom productions, floral & balloon installations, lighting and bespoke gifting — atmosphere designed by Abeer Khan." },
      { key: "tbt.intro_title",  label: "Intro heading", type: "text",      def: "Atmosphere, designed in detail." },
      { key: "tbt.services_title", label: "Services heading", type: "text", def: "Our services." },
      { key: "tbt.book_title",   label: "Booking heading", type: "text",    def: "Let's design your event." },
      { key: "tbt.cta_title",    label: "CTA heading",  type: "text",       def: "Let's make it unforgettable." }
    ]},
    { page: "Footer / shared", fields: [
      { key: "site.tagline", label: "Footer tagline", type: "text", def: "Articulating beauty through light, shadow and exquisite detail." },
      { key: "site.email",   label: "Footer email",   type: "text", def: "designers03studio@gmail.com" },
      { key: "site.phone",   label: "Footer phone",   type: "text", def: "+91 75069 91054" }
    ]}
  ];

  window.TLP_TEXT_DEFAULTS = (function () {
    var m = {};
    window.TLP_TEXT_GROUPS.forEach(function (g) { g.fields.forEach(function (f) { m[f.key] = f.def; }); });
    return m;
  })();

  window.TLP_getText = function () {
    try { return JSON.parse(localStorage.getItem("tlp_text") || "{}"); }
    catch (e) { return {}; }
  };

  /* ---- Dynamic image galleries -------------------------------------------
     Sections whose images are NOT fixed: the admin can add or delete any
     number of photos, and they render dynamically on the page. No default
     placeholders — each gallery starts empty until you add images.
     Stored as { <galleryId>: [ { url, alt }, ... ] } in localStorage
     ("tlp_galleries") for preview and published to the server to go live. */
  // Only galleries that actually render on a page are listed here, so the
  // admin never shows a gallery whose photos wouldn't appear anywhere.
  window.TLP_GALLERIES = [
    { id: "portfolio", label: "Portfolio gallery (photos & videos)", page: "Portfolio" }
  ];
  window.TLP_getGalleries = function () {
    try { return JSON.parse(localStorage.getItem("tlp_galleries") || "{}"); }
    catch (e) { return {}; }
  };

  /* Media Library — committed image FILES that live in assets/img/.
     These show in the admin's "Library" picker alongside uploaded photos.
     To add your own: drop the file into assets/img/, then add its path
     here (e.g. "assets/img/hero.jpg"), and redeploy. */
  window.TLP_ASSET_LIBRARY = [
    "assets/img/lens-logo.png",
    "assets/img/tbt-logo.svg"
  ];
})();
