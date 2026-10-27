/* ==========================================================================
   APEX BEE - app.js
   Single JavaScript file: page content, hash router, shell (floating header,
   icon rail / full menu, footer), splash, reveals, tabs, contact form.
   Vanilla JS only. No dependencies.

   ROUTES (hash based)   #/  #/about  #/services  #/<service-slug>
                         #/portfolio  #/project-details  #/process
                         #/contact  #/faq  #/privacy-policy  #/terms
                         anything else -> 404 page

   EDIT HERE: CONFIG (contacts, portrait photo, optional form endpoint) and
   WORK (add verified portfolio projects when you have them).
   ========================================================================== */
(function () {
  'use strict';

  /* ---------------------------------------------------------------- CONFIG */
  const CONFIG = {
    brand: 'Apex Bee',
    slogan: 'Everything Your Brand Needs',
    logo: 'apex.jpg',
    /* Optional: put a photo in the same folder (e.g. 'portrait.jpg') and set it
       here to replace the logo inside the hero circle. */
    portrait: '',
    tag: 'Hello, we\u2019re Apex Bee.',
    email: 'apexbee08@gmail.com',
    whatsapp: [
      { number: '2348106821963', label: '+234 810 682 1963' },
      { number: '2349019104417', label: '+234 901 910 4417' }
    ],
    x: { handle: '@apex_bee_', url: 'https://x.com/apex_bee_' },
    /* Optional: paste a Formspree / Web3Forms / similar endpoint URL to send the
       contact form straight to an inbox. Leave empty to use the WhatsApp/email
       fallback. */
    formEndpoint: '',
    cooldownMs: 30000,
    legalDate: '24 October 2026'
  };

  /* ---------------------------------------------------------- PORTFOLIO DATA
     Leave empty until you have verified projects. Schema:
     { id:'slug', title:'', category:'creative'|'web'|'automation',
       services:'Video Editing, Motion Graphics', year:'', summary:'',
       challenge:'', approach:'', outcome:'' } */
  const WORK = [];

  /* ------------------------------------------------------------------ ICONS */
  const ICONS = {
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    layers: '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
    briefcase: '<rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    workflow: '<rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h8"/>',
    close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    panelOpen: '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M9 4v16"/><path d="m15 9 3 3-3 3"/>',
    panelClose: '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M9 4v16"/><path d="m17 9-3 3 3 3"/>'
  };
  const BRAND_ICONS = {
    whatsapp: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z',
    x: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    gmail: 'M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z'
  };
  function icon(name) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + ICONS[name] + '</svg>';
  }
  function brandIcon(name) {
    return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="' + BRAND_ICONS[name] + '"/></svg>';
  }

  /* Logo mark: vector trace of the AB monogram in apex.jpg. Gold uses a
     gradient, the B and swoosh use currentColor (black on light surfaces).
     Defined once as a <symbol> and reused with <use>. */
  const MARK_GOLD = 'M17.2 533.2C18.3 531.1 20.9 525.2 21.8 523.0C25.4 514.2 29.6 505.3 30.7 503.9C31.4 503.1 32.0 501.8 32.0 501.1C32.0 500.4 34.3 495.0 37.1 489.2C40.0 483.3 43.5 475.8 45.0 472.5C46.6 469.2 52.5 456.8 58.2 445.0C64.0 433.2 71.6 417.4 75.1 410.0C78.6 402.6 92.6 374.5 106.1 347.5C128.9 302.1 136.2 287.8 154.8 251.9C158.6 244.5 166.1 229.9 171.5 219.5C176.9 209.1 182.0 199.2 183.0 197.5C185.1 194.0 190.5 183.9 198.3 169.0C204.6 156.9 208.1 150.3 213.6 140.5C220.0 128.9 221.5 126.2 232.0 106.5C234.3 102.1 237.5 96.5 238.9 94.0C240.4 91.5 242.9 86.9 244.5 83.7C246.1 80.5 247.8 77.7 248.2 77.4C248.6 77.1 249.0 76.2 249.0 75.4C249.0 74.6 249.5 73.4 250.1 72.7C250.6 72.0 254.7 65.0 259.2 57.0C277.8 23.5 280.7 18.3 282.5 14.8C287.6 5.0 287.8 5.1 295.2 19.0C301.9 31.5 305.3 37.8 323.6 70.3C331.2 83.9 338.6 96.9 339.8 99.3C341.1 101.6 343.5 106.0 345.2 109.0C346.9 112.0 349.7 117.2 351.5 120.5C353.2 123.8 356.5 129.7 358.7 133.5C360.9 137.3 364.4 143.7 366.5 147.5C368.6 151.3 371.1 155.6 372.0 157.0C372.9 158.4 374.9 162.2 376.5 165.5C378.0 168.8 381.0 174.4 383.1 178.1C385.1 181.7 388.9 188.5 391.3 193.2C393.8 198.0 398.3 206.3 401.3 211.7C419.8 244.9 419.5 244.0 412.4 244.0C407.1 244.0 381.0 247.1 366.5 249.5C338.7 253.9 342.7 254.8 336.7 242.8C334.1 237.7 331.6 232.8 331.1 232.0C330.7 231.2 329.8 229.5 329.2 228.3C323.0 216.4 316.4 204.0 315.0 202.0C314.1 200.6 312.3 197.0 311.1 194.0C309.8 191.0 308.4 188.1 308.0 187.5C306.7 185.9 301.0 175.3 296.2 165.5C287.0 147.0 288.0 146.8 276.2 169.0C274.3 172.6 272.0 176.6 271.1 178.0C269.2 180.9 265.7 187.4 260.0 198.5C257.7 202.9 255.2 207.2 254.4 208.1C253.6 208.9 253.0 210.0 253.0 210.3C253.0 210.7 251.9 212.7 250.7 214.8C249.4 216.8 246.6 221.7 244.5 225.5C235.8 241.8 233.6 245.6 231.8 248.2C230.8 249.6 230.0 251.1 230.0 251.4C230.0 251.8 226.7 257.8 222.6 264.8C218.6 271.8 213.6 280.6 211.5 284.5C209.5 288.3 205.9 294.8 203.6 299.0C201.2 303.1 197.4 310.1 195.0 314.5C192.6 318.9 189.6 324.3 188.4 326.5C186.2 330.5 177.8 346.4 173.3 355.0C170.0 361.4 168.7 363.4 167.3 364.3C165.2 365.6 147.1 380.8 138.0 388.8C129.8 396.0 100.0 425.7 93.3 433.3C72.2 457.0 50.3 485.6 32.5 512.3C27.9 519.3 24.4 523.7 24.0 523.0C23.5 522.2 23.1 522.3 22.7 523.5C22.3 524.4 22.4 524.8 23.0 524.5C24.7 523.5 24.2 524.7 20.9 529.4C18.3 533.4 16.1 535.6 17.2 533.2ZM366.5 459.3C365.1 457.2 364.0 455.0 364.0 454.4C364.0 452.6 350.2 424.2 349.0 423.5C348.5 423.2 348.0 422.1 348.0 421.0C348.0 418.9 335.1 391.7 333.8 391.2C333.4 391.0 333.0 390.2 333.0 389.5C333.0 388.7 331.2 384.5 329.0 380.1C326.8 375.7 325.0 371.9 325.0 371.6C325.0 371.3 322.3 365.4 318.9 358.4C314.6 349.4 313.2 345.4 313.9 344.7C315.4 343.2 328.4 338.8 348.5 332.9C357.9 330.2 367.1 327.5 369.1 326.9C376.1 324.8 376.2 324.9 386.4 346.0C391.6 356.7 396.3 366.0 396.8 366.6C397.3 367.2 403.1 378.6 409.6 392.0C416.2 405.4 426.5 426.5 432.6 438.9C440.2 454.3 443.4 461.7 442.6 462.2C442.0 462.6 425.2 463.0 405.3 463.0L369.1 463.0 L366.5 459.3Z';
  const MARK_BLACK = 'M18.0 534.5C19.8 531.2 21.9 527.8 22.6 526.9C24.2 525.1 24.5 523.6 23.0 524.5C22.4 524.8 22.3 524.4 22.7 523.5C23.1 522.3 23.5 522.2 24.0 523.0C24.4 523.7 27.9 519.3 32.5 512.3C124.4 373.9 239.2 295.5 386.6 270.5C401.4 268.0 429.9 264.5 430.4 265.1C430.5 265.3 433.3 270.2 436.5 276.0C439.7 281.8 444.0 289.5 446.1 293.2L449.9 299.9 L446.7 300.4C444.9 300.7 440.4 301.2 436.5 301.5C417.1 303.2 385.8 308.6 361.4 314.6C338.0 320.2 296.3 334.1 295.3 336.5C294.8 337.9 303.6 357.1 338.1 429.7L359.5 475.0 L421.7 475.0C500.7 475.0 509.3 474.1 525.9 464.3C562.0 442.8 558.7 387.4 520.3 373.0C506.9 367.9 504.8 367.8 449.0 367.3L396.5 366.8 L386.7 346.6L376.9 326.5 L381.2 325.2C401.3 319.3 454.1 312.0 477.8 312.0C518.2 311.9 540.0 294.7 540.0 263.0C540.0 230.1 523.6 221.1 463.3 221.0L430.2 221.0 L424.7 210.8C421.6 205.1 414.9 192.3 409.7 182.2L400.2 163.9 L457.8 164.3C526.4 164.8 532.9 165.7 555.0 177.1C614.3 207.7 618.1 296.5 561.7 333.7L556.9 336.8 L564.2 340.5C642.3 380.3 625.1 500.0 537.8 524.0C518.0 529.4 521.2 529.2 423.0 529.7L331.5 530.1 L327.6 521.3C323.9 512.9 294.8 450.0 264.9 385.6C257.2 369.2 251.0 355.4 251.0 354.9C251.0 353.0 247.5 354.3 230.3 362.9C155.9 399.9 82.6 458.9 25.5 528.0C14.4 541.4 14.0 541.7 18.0 534.5Z';

  function markSprite() {
    return '<svg class="visually-hidden" width="0" height="0" aria-hidden="true" focusable="false"><defs>' +
      '<linearGradient id="abGold" x1="0.1" y1="1" x2="0.65" y2="0"><stop offset="0" stop-color="#B8860B"/><stop offset="0.5" stop-color="#E8B923"/><stop offset="1" stop-color="#FFD42E"/></linearGradient></defs>' +
      '<symbol id="ab-mark" viewBox="0 0 630 550"><path fill="url(#abGold)" fill-rule="evenodd" d="' + MARK_GOLD + '"/>' +
      '<path fill="currentColor" fill-rule="evenodd" d="' + MARK_BLACK + '"/></symbol></svg>';
  }
  function brandMark() {
    return '<span class="brand__mark"><svg viewBox="0 0 630 550" aria-hidden="true" focusable="false"><use href="#ab-mark"/></svg></span>';
  }
  function brandLockup() {
    return '<a class="brand" href="#/" aria-label="Apex Bee home">' + brandMark() + '<span class="brand__name">Apex Bee</span></a>';
  }

  /* --------------------------------------------------------------- SERVICES */
  const SERVICES = [
    {
      n: 1, slug: 'video-editing', title: 'Video Editing',
      short: 'Raw footage shaped into polished videos with considered pacing, clean sound and a consistent look.',
      intro: 'We edit footage into videos that hold attention and carry your brand: promotional films, social cut-downs, campaign edits and more.',
      includes: ['Promotional and brand videos', 'Short-form edits for Reels, TikTok and Shorts', 'Campaign and social cut-downs', 'Colour correction and grading', 'Audio clean-up, music and sound balance', 'Titles, captions and subtitles', 'Exports prepared for each platform'],
      approach: [
        ['Brief and footage review', 'We start with your goal, audience and raw material, then agree the style and length.'],
        ['Rough cut to refinement', 'You review a first cut, then we refine pacing, sound, colour and graphics.'],
        ['Delivery', 'Final files are exported in the formats and ratios your channels need.']
      ]
    },
    {
      n: 2, slug: 'motion-graphics', title: 'Motion Graphics',
      short: 'Animated visuals that explain, introduce and add energy: logo animation, explainers and social motion.',
      intro: 'Motion graphics turn ideas and identities into movement. We design animation that is clear, on-brand and built for the screens it will be seen on.',
      includes: ['Logo animation and brand stings', 'Explainer and product animations', 'Animated social posts and ads', 'Lower thirds, titles and transitions', 'Kinetic typography', 'Animated infographics and data visuals', 'Motion assets matched to your colours and type'],
      approach: [
        ['Concept and storyboard', 'We agree the message, style and structure before animating anything.'],
        ['Design and animation', 'Frames are designed in your brand language, then brought to life with timing and easing.'],
        ['Review and export', 'We refine with your feedback and export for web, social or broadcast use.']
      ]
    },
    {
      n: 3, slug: 'graphic-design', title: 'Graphic Design',
      short: 'Social graphics, print, presentations and campaign visuals designed with clarity and craft.',
      intro: 'From a single post to a full campaign set, we design graphics that look consistent, read clearly and suit where they will be used.',
      includes: ['Social media graphics', 'Posters, flyers and print collateral', 'Presentations and pitch decks', 'Packaging and label artwork', 'Ad creatives and banners', 'Brochures and menus', 'Print-ready and web-ready file exports'],
      approach: [
        ['Understand the use', 'Format, audience and placement shape every layout decision.'],
        ['Design options', 'We develop a focused direction and refine it with your feedback.'],
        ['Final files', 'You receive organised, correctly sized files ready for print or screen.']
      ]
    },
    {
      n: 4, slug: 'brand-design', title: 'Brand Design',
      short: 'Logos, colour, typography and guidelines that give a brand a clear, consistent identity.',
      intro: 'A brand is more than a logo. We build or refine the visual system that makes everything you publish feel like it comes from the same place.',
      includes: ['Logo design and refinement', 'Colour palette and typography selection', 'Brand guidelines document', 'Business stationery and collateral', 'Social profile and cover assets', 'Messaging and tone-of-voice direction', 'Templates that keep future work consistent'],
      approach: [
        ['Discovery', 'We learn what your brand stands for, who it serves and where it competes.'],
        ['Identity system', 'Logo, colour, type and supporting elements are designed to work together.'],
        ['Guidelines and handover', 'Everything is documented so your team can apply the brand correctly.']
      ]
    },
    {
      n: 5, slug: 'website-development', title: 'Brand Website Development',
      short: 'Fast, responsive brand and company websites built around your identity and goals.',
      intro: 'We design and build brand websites that present you properly, work on every screen size and make it easy for visitors to contact you.',
      includes: ['Multi-page brand and company websites', 'Custom, responsive layouts', 'Content structure and navigation', 'Contact forms and enquiry routes', 'WhatsApp and social links', 'Search-friendly structure: titles, meta and semantic markup', 'Performance and accessibility fundamentals'],
      approach: [
        ['Structure and design', 'We map pages and content first, then design the look and feel.'],
        ['Build', 'The site is built with clean, maintainable code and tested across screen sizes.'],
        ['Launch and handover', 'We help you go live and explain how to manage the site afterwards.']
      ]
    },
    {
      n: 6, slug: 'ecommerce-development', title: 'E-commerce Website Development',
      short: 'Online stores with clear product pages, simple checkout and a mobile-first shopping experience.',
      intro: 'We build online stores that make it easy to browse, trust and buy, with the structure you need to manage products and orders.',
      includes: ['Product catalogue and category structure', 'Product pages designed to sell', 'Cart and checkout flow', 'Payment gateway integration (depends on provider and region)', 'Order and inventory management where the platform supports it', 'Mobile-first shopping experience', 'Hand-over guidance for managing your store'],
      approach: [
        ['Plan the store', 'We define products, categories, payment needs and the buying journey.'],
        ['Design and build', 'Storefront and checkout are built to be fast, clear and consistent with your brand.'],
        ['Test and launch', 'We test the full purchase flow before going live.']
      ]
    },
    {
      n: 7, slug: 'content-creation', title: 'Content Creation',
      short: 'Planned, on-brand content for your channels: visuals, video, captions and calendars.',
      intro: 'Consistent content is hard to sustain. We plan and produce content that fits your brand voice and the platforms you publish on.',
      includes: ['Content planning for your channels', 'Photo and video content', 'Short-form social content', 'Captions and copywriting', 'Content calendars', 'Brand-consistent templates', 'Repurposing long content into shorter clips'],
      approach: [
        ['Strategy', 'We decide what to say, where, and how often, based on your goals.'],
        ['Production', 'Content is created in your brand style and prepared for each platform.'],
        ['Review and iterate', 'We adjust formats and topics as you see what works for your audience.']
      ]
    },
    {
      n: 8, slug: 'ai-automation', title: 'AI Integration and Automation',
      short: 'Chatbots, assistants and workflow automation that remove repetitive manual work.',
      intro: 'We connect AI and automation to your day-to-day work so routine tasks run on their own and your team can focus on what needs a human.',
      includes: ['AI chatbots and assistants', 'Workflow automation across the tools you use', 'Automated responses and lead capture', 'Content and data processing', 'API integrations', 'Internal tools that save repeated manual effort', 'Documentation of what is automated and how'],
      approach: [
        ['Find repeatable work', 'We identify tasks that are frequent, rule-based and worth automating.'],
        ['Build and connect', 'We build the automation and connect it to your existing tools.'],
        ['Test and hand over', 'We test edge cases, document the setup and show you how to monitor it.']
      ]
    },
    {
      n: 9, slug: 'website-redesign', title: 'Website Redesign and Rebranding',
      short: 'Refresh an existing website and align it with a stronger, more consistent brand.',
      intro: 'If your site or brand no longer reflects your business, we review what you have, keep what works and redesign the rest.',
      includes: ['Review of your existing site and brand', 'Visual and user-experience refresh', 'Rebranding alignment across site and assets', 'Content restructuring', 'Mobile and speed improvements', 'Preserving content and links that already work', 'Launch support'],
      approach: [
        ['Audit', 'We assess design, content, structure and performance to find what to keep and what to change.'],
        ['Redesign', 'We rework layout, visuals and navigation around a clear brand direction.'],
        ['Migrate and launch', 'Content is carried over carefully and the new site is tested before launch.']
      ]
    },
    {
      n: 10, slug: 'website-consultation', title: 'Website Consultation',
      short: 'Clear, practical advice on your website: structure, platform, performance and priorities.',
      intro: 'Not sure what your website needs? A consultation gives you an honest review and a clear list of what to do next.',
      includes: ['Review of your current or planned website', 'Structure and user-experience feedback', 'Platform and technology advice', 'Prioritised roadmap of improvements', 'Search and accessibility pointers', 'Guidance on scope and budget', 'A written summary of recommendations'],
      approach: [
        ['Understand your goals', 'We start with what the site needs to achieve for your business.'],
        ['Review', 'We examine the site or plan against those goals and best practice.'],
        ['Recommendations', 'You receive clear next steps, ordered by impact.']
      ]
    },
    {
      n: 11, slug: 'software-development', title: 'Software Development',
      short: 'Custom web applications, dashboards and business tools built around how you work.',
      intro: 'When off-the-shelf tools do not fit, we build software that does: custom apps, internal systems and the backends behind them.',
      includes: ['Custom web applications and dashboards', 'Business tools and internal systems', 'APIs and backend services', 'Database design', 'Admin panels', 'Ongoing maintenance and iteration', 'Technical documentation'],
      approach: [
        ['Define the problem', 'We turn your needs into clear requirements and a sensible first version.'],
        ['Build in stages', 'Features are delivered step by step so you can review progress early.'],
        ['Deploy and support', 'We help launch the software and refine it as real use shows what to improve.']
      ]
    },
    {
      n: 12, slug: 'social-app-integration', title: 'Social App Integration',
      short: 'Connect your website or product to WhatsApp, social platforms and messaging channels.',
      intro: 'We connect your site and tools to the social and messaging platforms your customers already use, so reaching you takes one tap.',
      includes: ['WhatsApp click-to-chat and messaging links', 'Social profile links and embedded content', 'Social sharing with proper preview cards', 'Messaging channel integration', 'Routing enquiries to the right channel', 'Social sign-in where appropriate', 'Setup guidance for each platform'],
      approach: [
        ['Choose the channels', 'We decide which platforms matter most to your customers.'],
        ['Integrate', 'Links, embeds and connections are set up and tested on mobile and desktop.'],
        ['Verify', 'We check that every channel behaves correctly before you go live.']
      ]
    }
  ];

  /* Short labels so footer columns stay tidy */
  const FOOT_LABEL = {
    'video-editing': 'Video Editing', 'motion-graphics': 'Motion Graphics', 'graphic-design': 'Graphic Design',
    'brand-design': 'Brand Design', 'website-development': 'Brand Websites', 'ecommerce-development': 'E-commerce Websites',
    'content-creation': 'Content Creation', 'ai-automation': 'AI &amp; Automation', 'website-redesign': 'Redesign &amp; Rebranding',
    'website-consultation': 'Website Consultation', 'software-development': 'Software Development', 'social-app-integration': 'Social App Integration'
  };

  const FAQ = [
    ['What does Apex Bee do?', 'Apex Bee is a creative and technology company. We cover video editing, motion graphics, graphic and brand design, websites and e-commerce, content creation, AI and automation, software development and social app integration.'],
    ['Can I order just one service?', 'Yes. You can work with us on a single service, such as a logo or an edited video, or combine several for a complete brand and web presence.'],
    ['How do I get started?', 'Message us on WhatsApp, send an email to ' + CONFIG.email + ' or use the contact form. Tell us what you need, and we will reply to discuss scope and next steps.'],
    ['How is pricing decided?', 'Pricing depends on the scope of the work. We confirm costs and what is included before the project begins.'],
    ['Do you work with brands that already exist?', 'Yes. We can work within your existing identity, refine it, or help you redesign and rebrand.'],
    ['Do you build online stores?', 'Yes. Our e-commerce service covers product pages, cart and checkout, and payment integration, depending on the platform and payment provider you choose.'],
    ['Who owns the final work?', 'Ownership and usage terms are agreed in writing for each project before work starts.'],
    ['Can you integrate WhatsApp and social channels into my website?', 'Yes. Our social app integration service connects your site to WhatsApp, X and other messaging and social platforms so customers can reach you in one tap.'],
    ['Does the contact form send an email?', 'This website is static. Unless a form service has been connected, the form prepares your message and lets you send it through WhatsApp or email.']
  ];

  /* Brand-building framework (from the Apex Bee process note) */
  const VISION = 'To be Africa\u2019s most impactful ecosystem, raising a generation of innovators, transforming businesses, and building solutions that shape the future.';
  const MISSION = 'To empower individuals, businesses, and communities with knowledge, technology, and systems that create sustainable growth and generational impact.';
  const FRAMEWORK = [
    ['Information', 'Informed decisions start with the right information. Without it, a business keeps working hard without tangible results; with it, owners can choose a direction and commit to it with confidence.'],
    ['Access', 'A business needs access to everything that sustains and grows it: the resources to promote its products and services, create awareness, and obtain the goods and services it depends on.'],
    ['Fundamental Laws', 'Clear, independent principles give a business a solid foundation. Setting them early provides direction and a consistent basis for its operations and growth.'],
    ['Strategy', 'Progress depends largely on the quality of the support system built around a business. Without a strategy, there is a limit to how far it can grow and what it can achieve.'],
    ['Positioning', 'Positioning places a business where its intended audience can find it. Even a strong strategy will not reach audiences whose needs, interests or desires do not match the offer, and that is often a question of fit rather than affordability.'],
    ['Language', 'How a business speaks to its audience matters. Clear, consistent communication carries the message, builds connection and makes the value of its products and services plain.'],
    ['Visual Identity', 'The digital space demands more than cheap publicity. A strong visual identity presents the business professionally and makes it more recognisable in a competitive market.'],
    ['Complete Brand Foundation', 'A brand foundation is a system: structured elements working together to produce predictable outcomes. With the essentials in place, the business gains consistency and a base for long-term growth.'],
    ['Evolutionary Blueprint', 'Markets change, and audiences lose interest in what has become familiar. New ideas, ongoing reasons to engage and steady reminders keep a business relevant and memorable.']
  ];

  /* slug, label, icon */
  const NAV = [
    ['', 'Home', 'home'], ['about', 'About', 'user'], ['services', 'Services', 'layers'],
    ['portfolio', 'Work', 'briefcase'], ['process', 'Process', 'workflow'], ['contact', 'Contact', 'mail']
  ];
  const NAV_MORE = [['faq', 'FAQ', 'help'], ['privacy-policy', 'Privacy Policy', 'shield'], ['terms', 'Terms of Use', 'file']];

  const MARQUEE_ITEMS = [CONFIG.slogan].concat(SERVICES.map(function (s) { return s.title; }));

  /* ---------------------------------------------------------------- HELPERS */
  const $ = function (sel, root) { return (root || document).querySelector(sel); };
  const $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  const pad = function (n) { return n < 10 ? '0' + n : String(n); };
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function wa(number, text) {
    return 'https://wa.me/' + number + (text ? '?text=' + encodeURIComponent(text) : '');
  }
  function mailto(subject, body) {
    return 'mailto:' + CONFIG.email + (subject ? '?subject=' + encodeURIComponent(subject) + (body ? '&body=' + encodeURIComponent(body) : '') : '');
  }
  function ext(href) { return 'href="' + href + '" target="_blank" rel="noopener noreferrer"'; }
  function has(obj, key) { return Object.prototype.hasOwnProperty.call(obj, key); }
  function findService(slug) { return SERVICES.filter(function (s) { return s.slug === slug; })[0]; }

  /* ----------------------------------------------------------- SHARED PARTS */
  function sectionHead(eyebrow, titleHtml, lead) {
    return '<div class="section__head">' +
      '<span class="eyebrow reveal">' + eyebrow + '</span>' +
      '<h2 class="display-2 reveal reveal--d1">' + titleHtml + '</h2>' +
      (lead ? '<p class="lead reveal reveal--d2">' + lead + '</p>' : '') +
      '</div>';
  }

  function pageHero(crumbs, eyebrow, titleHtml, lead) {
    const trail = crumbs.map(function (c, i) {
      const last = i === crumbs.length - 1;
      return '<li>' + (last ? '<span aria-current="page">' + c[0] + '</span>' : '<a href="' + c[1] + '">' + c[0] + '</a>') + '</li>';
    }).join('');
    return '<section class="page-hero"><div class="container">' +
      '<nav aria-label="Breadcrumb"><ol class="breadcrumb">' + trail + '</ol></nav>' +
      '<span class="eyebrow reveal">' + eyebrow + '</span>' +
      '<h1 class="display-1 reveal reveal--d1" id="page-title">' + titleHtml + '</h1>' +
      (lead ? '<p class="lead reveal reveal--d2">' + lead + '</p>' : '') +
      '</div></section>';
  }

  function serviceRows(list) {
    return '<ul class="service-list reveal">' + list.map(function (s) {
      return '<li class="service-row">' +
        '<span class="service-row__num">' + pad(s.n) + '</span>' +
        '<h3 class="service-row__title">' + s.title + '</h3>' +
        '<p class="service-row__desc">' + s.short + '</p>' +
        '<span class="service-row__arrow">' + icon('arrow') + '</span>' +
        '<a class="service-row__cover" href="#/' + s.slug + '" aria-label="' + s.title + '"></a>' +
        '</li>';
    }).join('') + '</ul>';
  }

  function ctaBand(titleHtml, text, href, label) {
    return '<section class="cta-band"><div class="container cta-band__inner">' +
      '<div class="stack"><h2 class="display-2 reveal">' + titleHtml + '</h2>' +
      '<p class="reveal reveal--d1">' + text + '</p></div>' +
      '<a class="btn btn--dark reveal reveal--d2" href="' + href + '">' + label + icon('arrow') + '</a>' +
      '</div></section>';
  }

  function factGrid(items) {
    return '<div class="facts">' + items.map(function (f) {
      return '<div class="facts__item reveal"><h3>' + f[0] + '</h3><p>' + f[1] + '</p>' +
        (f[2] ? '<a class="link-arrow" href="' + f[2] + '">' + (f[3] || 'Learn more') + icon('arrow') + '</a>' : '') + '</div>';
    }).join('') + '</div>';
  }

  function portraitHtml() {
    const photo = CONFIG.portrait;
    return '<div class="hero__figure reveal reveal--d2"><div class="hero__portrait' + (photo ? '' : ' hero__portrait--logo') + '">' +
      '<img src="' + esc(photo || CONFIG.logo) + '" alt="' + (photo ? 'Apex Bee' : 'Apex Bee logo') + '" width="380" height="380" decoding="async"></div>' +
      '<span class="hero__tag">' + esc(CONFIG.tag) + '</span></div>';
  }

  /* Marquee: placed right after the "Hello, we're Apex Bee" caption */
  function marqueeHtml() {
    const group = function (hidden) {
      return '<div class="marquee__group"' + (hidden ? ' aria-hidden="true"' : '') + '>' +
        MARQUEE_ITEMS.map(function (t) { return '<span class="marquee__item">' + t + '</span>'; }).join('') + '</div>';
    };
    return '<div class="hero__marquee marquee" role="presentation"><div class="marquee__track">' + group(false) + group(true) + '</div></div>';
  }

  /* ------------------------------------------------------------------ PAGES */
  function pageHome() {
    return {
      title: CONFIG.brand + ' | ' + CONFIG.slogan,
      desc: 'Apex Bee is a creative and technology company: video editing, motion graphics, design, websites, software, AI and automation. Everything your brand needs.',
      html:
        '<section class="hero"><div class="hero__bg" aria-hidden="true"></div>' +
        '<div class="container hero__inner"><div class="hero__copy">' +
        '<span class="eyebrow reveal">Creative &amp; technology company</span>' +
        '<h1 class="display-1 hero__title reveal reveal--d1" id="page-title">Everything your brand needs, <em>made with intent.</em></h1>' +
        '<p class="lead hero__lead reveal reveal--d2">Apex Bee brings video, motion, design, websites, software and automation together, so your brand looks sharp and works hard everywhere it appears.</p>' +
        '<div class="hero__actions reveal reveal--d3">' +
        '<a class="btn btn--gold" href="#/services">' + icon('layers') + 'Our services' + icon('arrow') + '</a>' +
        '<a class="btn btn--ghost" href="#/contact">' + icon('mail') + 'Start a project' + icon('arrow') + '</a></div>' +
        '</div>' + portraitHtml() + marqueeHtml() + '</div></section>' +

        '<section class="section section--light"><div class="container split">' +
        '<div class="split__body">' +
        '<span class="eyebrow reveal">Why Apex Bee</span>' +
        '<h2 class="display-2 reveal reveal--d1">Creative and technical work, <em>under one roof.</em></h2>' +
        '<p class="lead reveal reveal--d2">Brands usually juggle designers, editors, developers and tools that never quite match. We handle the creative and the technical side together, so every touchpoint feels like the same brand.</p>' +
        '<a class="link-arrow reveal reveal--d3" href="#/about">About Apex Bee' + icon('arrow') + '</a>' +
        '</div>' +
        '<div class="split__media reveal"><img src="' + CONFIG.logo + '" alt="Apex Bee logo" width="320" height="320" loading="lazy"></div>' +
        '</div></section>' +

        '<section class="section section--dark"><div class="container">' +
        sectionHead('Services', 'Twelve ways we <em>build your brand.</em>', 'Choose one service or combine several. Each page explains what is included and how we work.') +
        serviceRows(SERVICES) +
        '</div></section>' +

        '<section class="section section--light"><div class="container">' +
        sectionHead('What to expect', 'Clear, careful and <em>easy to work with.</em>') +
        factGrid([
          ['One partner, many skills', 'Video, design, web, software and automation handled together, so nothing gets lost between suppliers.'],
          ['Clear communication', 'You know what is being made, when you will see it and what we need from you.'],
          ['Built for real use', 'Work is designed for the screens, platforms and people it will actually meet.']
        ]) +
        '</div></section>' +

        '<section class="section section--silk"><div class="container">' +
        sectionHead('How we work', 'A clear path from <em>brief to delivery.</em>') +
        '<div class="steps">' +
        [['Listen', 'We learn your goals, audience and constraints before proposing anything.'],
         ['Shape', 'We agree direction, scope and format so everyone knows what is being made.'],
         ['Create', 'We design, edit or build, sharing work for your feedback along the way.'],
         ['Deliver', 'Final files or the live product are handed over, with guidance on using them.']
        ].map(function (s) {
          return '<div class="step reveal"><h3>' + s[0] + '</h3><p>' + s[1] + '</p></div>';
        }).join('') +
        '</div><div style="margin-top:2rem"><a class="link-arrow reveal" href="#/process">See the full process' + icon('arrow') + '</a></div>' +
        '</div></section>' +

        ctaBand('Ready to build <em>something sharp?</em>', 'Tell us what you need. Scope, timeline and pricing are confirmed once we understand the brief.', '#/contact', 'Contact Apex Bee')
    };
  }

  function pageAbout() {
    return {
      title: 'About | ' + CONFIG.brand,
      desc: 'Apex Bee is a creative and technology company helping brands look sharp and work well across video, design, web, software and automation.',
      html:
        pageHero([['Home', '#/'], ['About']], 'About', 'A creative and technology company <em>for modern brands.</em>',
          'Apex Bee combines creative production with web and software development, so your brand is consistent from the first impression to the final click.') +

        '<section class="section section--light"><div class="container split">' +
        '<div class="split__media reveal"><img src="' + CONFIG.logo + '" alt="Apex Bee logo" width="320" height="320" loading="lazy"></div>' +
        '<div class="split__body">' +
        '<span class="eyebrow reveal">Who we are</span>' +
        '<h2 class="display-2 reveal reveal--d1">One team for the <em>whole brand.</em></h2>' +
        '<p class="reveal reveal--d2">' + CONFIG.brand + ' works across the creative and technical sides of building a brand: video and motion, graphic and brand design, content, websites, e-commerce, software, AI and automation.</p>' +
        '<p class="reveal reveal--d3">Our slogan, <strong>' + CONFIG.slogan + '</strong>, describes how we want to work: one dependable partner who can take an idea from concept to something people can watch, use or buy.</p>' +
        '</div></div></section>' +

        '<section class="section section--dark"><div class="container">' +
        sectionHead('What we do', 'Three areas, <em>one standard.</em>') +
        factGrid([
          ['Creative production', 'Video editing, motion graphics, graphic design, brand design and content creation.', '#/video-editing', 'See creative services'],
          ['Web and software', 'Brand websites, online stores, redesigns, consultation and custom software.', '#/website-development', 'See web services'],
          ['Automation and integration', 'AI integration, workflow automation and social app integration.', '#/ai-automation', 'See automation services']
        ]) +
        '</div></section>' +

        '<section class="section section--light"><div class="container">' +
        sectionHead('Principles', 'How we approach <em>every project.</em>') +
        factGrid([
          ['Clarity first', 'Good work starts with a clear brief. We ask the right questions early so the result fits its purpose.'],
          ['Craft in the details', 'Typography, spacing, timing and sound decide whether work feels professional. We care about all of them.'],
          ['Built to be used', 'Designs and software have to work in the real world: on small screens, with real content, for real people.']
        ]) +
        '</div></section>' +

        '<section class="section section--dark"><div class="container split">' +
        '<div class="split__body"><span class="eyebrow reveal">Get in touch</span>' +
        '<h2 class="display-2 reveal reveal--d1">Talk to us <em>directly.</em></h2>' +
        '<p class="lead reveal reveal--d2">The quickest way to reach us is WhatsApp. You can also email or follow us on X.</p></div>' +
        contactList() + '</div></section>' +

        ctaBand('Let us talk about <em>your brand.</em>', 'Message us on WhatsApp, email us, or send a note through the contact page.', '#/contact', 'Get in touch')
    };
  }

  function pageServices() {
    return {
      title: 'Services | ' + CONFIG.brand,
      desc: 'Video editing, motion graphics, graphic and brand design, websites, e-commerce, content creation, AI automation, software development and more from Apex Bee.',
      html:
        pageHero([['Home', '#/'], ['Services']], 'Services', 'Everything your brand needs, <em>in one place.</em>',
          'Twelve services across creative production, web and software. Open any service to see what it includes and how we work.') +
        '<section class="section section--light"><div class="container">' + serviceRows(SERVICES) + '</div></section>' +
        '<section class="section section--dark"><div class="container">' +
        sectionHead('Not sure where to start?', 'Think in <em>three groups.</em>') +
        factGrid([
          ['Creative', 'Video editing, motion graphics, graphic design, brand design and content creation. For how your brand looks and sounds.', '#/video-editing', 'Start here'],
          ['Web and software', 'Websites, e-commerce, redesigns, consultation and custom software. For where your brand lives and works.', '#/website-development', 'Start here'],
          ['Automation and integration', 'AI integration, automation and social app integration. For saving time and reaching customers where they are.', '#/ai-automation', 'Start here']
        ]) +
        '</div></section>' +
        ctaBand('Need help <em>choosing?</em>', 'A short conversation is often enough to point you to the right service.', '#/contact', 'Talk to us')
    };
  }

  function pageService(s) {
    const related = [1, 2, 3].map(function (i) { return SERVICES[(s.n - 1 + i) % SERVICES.length]; });
    return {
      title: s.title + ' | ' + CONFIG.brand,
      desc: s.short,
      html:
        pageHero([['Home', '#/'], ['Services', '#/services'], [s.title]], 'Service ' + pad(s.n), s.title, s.intro) +

        '<section class="section section--light"><div class="container split">' +
        '<div class="split__body"><span class="eyebrow reveal">What this can include</span>' +
        '<h2 class="display-2 reveal reveal--d1">The scope, <em>in plain terms.</em></h2>' +
        '<p class="reveal reveal--d2">' + s.short + ' Every project is scoped to your needs, and we confirm what is included before work begins.</p></div>' +
        '<ul class="checklist reveal">' + s.includes.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>' +
        '</div></section>' +

        '<section class="section section--dark"><div class="container">' +
        sectionHead('Approach', 'How we <em>handle it.</em>') +
        factGrid(s.approach) + '</div></section>' +

        '<section class="section section--light"><div class="container">' +
        sectionHead('Related', 'You might also <em>need.</em>') + serviceRows(related) +
        '</div></section>' +

        ctaBand('Talk to us about <em>' + s.title + '.</em>', 'Tell us what you have in mind. Scope, timeline and pricing are confirmed after we understand the brief.', '#/contact?service=' + s.slug, 'Start this project')
    };
  }

  function emptyWork() {
    return '<section class="section section--light"><div class="container split">' +
      '<div class="split__body"><span class="eyebrow reveal">Portfolio</span>' +
      '<h2 class="display-2 reveal reveal--d1">Case studies are <em>on the way.</em></h2>' +
      '<p class="lead reveal reveal--d2">We publish only finished, verified projects. Until our first case studies are ready, tell us what you are planning and we will walk you through how we would approach it.</p>' +
      '<div class="hero__actions reveal reveal--d3" style="justify-content:flex-start">' +
      '<a class="btn btn--dark" href="#/contact">Start a project' + icon('arrow') + '</a>' +
      '<a class="btn btn--ghost-dark" href="#/services">View services</a></div></div>' +
      '<div class="split__media reveal"><img src="' + CONFIG.logo + '" alt="Apex Bee logo" width="320" height="320" loading="lazy"></div>' +
      '</div></section>';
  }

  function pagePortfolio() {
    const cats = [['all', 'All'], ['creative', 'Creative'], ['web', 'Web and software'], ['automation', 'Automation']];
    const catLabel = { creative: 'Creative', web: 'Web and software', automation: 'Automation' };
    let body = emptyWork();
    if (WORK.length) {
      body = '<section class="section section--light"><div class="container">' +
        '<div class="filters reveal" role="group" aria-label="Filter projects">' + cats.map(function (c, i) {
          return '<button class="filter' + (i === 0 ? ' is-active' : '') + '" type="button" data-filter="' + c[0] + '" aria-pressed="' + (i === 0) + '">' + c[1] + '</button>';
        }).join('') + '</div>' +
        '<ul class="work-list" id="workList">' + WORK.map(function (w) {
          return '<li class="work-item reveal" data-cat="' + esc(w.category) + '"><div>' +
            '<p class="work-item__meta">' + esc(catLabel[w.category] || 'Project') + '</p>' +
            '<h3 class="display-3">' + esc(w.title) + '</h3></div><div class="stack">' +
            '<p>' + esc(w.summary || '') + '</p>' +
            '<a class="link-arrow" href="#/project-details?id=' + encodeURIComponent(w.id) + '">View project' + icon('arrow') + '</a></div></li>';
        }).join('') + '</ul>' +
        '<p class="form__note" id="workEmpty" hidden>No projects in this category yet.</p></div></section>';
    }
    return {
      title: 'Portfolio | ' + CONFIG.brand,
      desc: 'Selected creative, web and software work from Apex Bee.',
      html:
        pageHero([['Home', '#/'], ['Work']], 'Portfolio', 'Selected work, <em>shown with context.</em>',
          'We only publish real, finished projects, each with the context behind it.') +
        body +
        ctaBand('Want to be <em>our next project?</em>', 'Tell us about your idea and we will show you how we would approach it.', '#/contact', 'Start a project'),
      mount: WORK.length ? function (root) {
        const buttons = $$('.filter', root);
        const list = $$('.work-item', root);
        const empty = $('#workEmpty', root);
        buttons.forEach(function (b) {
          b.addEventListener('click', function () {
            const f = b.getAttribute('data-filter');
            buttons.forEach(function (x) {
              const on = x === b;
              x.classList.toggle('is-active', on);
              x.setAttribute('aria-pressed', String(on));
            });
            let shown = 0;
            list.forEach(function (item) {
              const match = f === 'all' || item.getAttribute('data-cat') === f;
              item.style.display = match ? '' : 'none';
              if (match) shown++;
            });
            empty.hidden = shown !== 0;
          });
        });
      } : null
    };
  }

  function pageProject(params) {
    const id = params.get('id');
    const w = id ? WORK.filter(function (x) { return x.id === id; })[0] : null;
    if (!w) {
      return {
        title: 'Project Details | ' + CONFIG.brand,
        desc: 'Project details from Apex Bee.',
        html:
          pageHero([['Home', '#/'], ['Work', '#/portfolio'], ['Project details']], 'Case study', 'No project <em>selected.</em>',
            'Project case studies will appear here once they are published.') +
          emptyWork()
      };
    }
    const rows = [['Services', w.services], ['Year', w.year], ['Overview', w.summary], ['Challenge', w.challenge], ['Approach', w.approach], ['Outcome', w.outcome]]
      .filter(function (r) { return r[1]; });
    return {
      title: w.title + ' | ' + CONFIG.brand,
      desc: w.summary || 'Project details and case study from Apex Bee.',
      html:
        pageHero([['Home', '#/'], ['Work', '#/portfolio'], ['Project details']], 'Case study', esc(w.title), '') +
        '<section class="section section--light"><div class="container"><div class="steps">' +
        rows.map(function (r) { return '<div class="step reveal"><h3>' + r[0] + '</h3><p>' + esc(r[1]) + '</p></div>'; }).join('') +
        '</div><div style="margin-top:2rem"><a class="link-arrow" href="#/portfolio">Back to portfolio' + icon('arrow') + '</a></div></div></section>' +
        ctaBand('Have a project <em>in mind?</em>', 'Tell us what you are planning.', '#/contact', 'Contact Apex Bee')
    };
  }

  function frameworkSteps(lawsTitle) {
    return '<div class="steps">' + FRAMEWORK.map(function (s, i) {
      return '<div class="step"><h3>' + (i === 2 ? lawsTitle : s[0]) + '</h3><p>' + s[1] + '</p></div>';
    }).join('') + '</div>';
  }

  function pageProcess() {
    const delivery = [
      ['Discovery and brief', 'We learn about your business, audience and goals, and agree what success looks like for the project.'],
      ['Direction and scope', 'We propose an approach and confirm what will be delivered, so expectations are clear from the start.'],
      ['Creation', 'We design, edit or build, sharing progress at agreed points so you can guide the work.'],
      ['Review and refinement', 'We refine based on your feedback until the work meets the brief.'],
      ['Delivery and handover', 'Final files or the live product are handed over with guidance on how to use and maintain them.']
    ];
    return {
      title: 'Process | ' + CONFIG.brand,
      desc: 'The Apex Bee vision, mission and nine-step brand-building process for startups, small businesses and established brands.',
      html:
        pageHero([['Home', '#/'], ['Process']], 'Process', 'A clear process, <em>built on a clear purpose.</em>',
          'Our vision and mission set the direction. Our process turns it into practical steps for startups, small businesses and established brands.') +

        '<section class="section section--dark"><div class="container">' +
        sectionHead('Vision and mission', 'Where we are going, <em>and why.</em>') +
        '<div class="statements">' +
        '<div class="statement reveal"><h3>Vision</h3><p>' + VISION + '</p></div>' +
        '<div class="statement reveal reveal--d1"><h3>Mission</h3><p>' + MISSION + '</p></div>' +
        '</div></div></section>' +

        '<section class="section section--light"><div class="container">' +
        sectionHead('Brand-building process', 'Nine steps to a <em>solid brand foundation.</em>', 'The same nine steps guide every business we work with. Choose the track that fits where you are.') +
        '<div class="tabs reveal" role="tablist" aria-label="Choose a business track">' +
        '<button class="tab" type="button" role="tab" id="tab-startup" aria-controls="panel-startup" aria-selected="true">Startups and small businesses</button>' +
        '<button class="tab" type="button" role="tab" id="tab-big" aria-controls="panel-big" aria-selected="false" tabindex="-1">Big brand businesses</button></div>' +
        '<div class="tabpanel" role="tabpanel" id="panel-startup" aria-labelledby="tab-startup">' + frameworkSteps('Fundamental Laws of Startup Businesses') + '</div>' +
        '<div class="tabpanel" role="tabpanel" id="panel-big" aria-labelledby="tab-big" hidden>' + frameworkSteps('Fundamental Laws of Business') + '</div>' +
        '</div></section>' +

        '<section class="section section--silk"><div class="container">' +
        sectionHead('Project delivery', 'How a project <em>runs day to day.</em>', 'Every project is different, but the way we work stays consistent: clear scope, regular check-ins and careful delivery.') +
        '<div class="steps">' + delivery.map(function (s) { return '<div class="step reveal"><h3>' + s[0] + '</h3><p>' + s[1] + '</p></div>'; }).join('') + '</div>' +
        '</div></section>' +

        '<section class="section section--dark"><div class="container">' +
        sectionHead('Working together', 'What you can <em>expect.</em>') +
        factGrid([
          ['Clear communication', 'You will know what is being made, when you will see it and what we need from you.'],
          ['Agreed scope', 'Deliverables, revisions and costs are confirmed before work begins.'],
          ['Careful handover', 'You receive organised files or a working product, with guidance on using them.']
        ]) + '</div></section>' +

        ctaBand('Start with <em>a conversation.</em>', 'Share your goals and we will suggest a sensible first step.', '#/contact', 'Contact us'),
      mount: function (root) {
        const tabs = $$('.tab', root);
        function select(tab, focus) {
          tabs.forEach(function (t) {
            const on = t === tab;
            t.setAttribute('aria-selected', String(on));
            t.tabIndex = on ? 0 : -1;
            $('#' + t.getAttribute('aria-controls'), root).hidden = !on;
          });
          if (focus) tab.focus();
        }
        tabs.forEach(function (t, i) {
          t.addEventListener('click', function () { select(t, false); });
          t.addEventListener('keydown', function (e) {
            let next = null;
            if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
            if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
            if (e.key === 'Home') next = tabs[0];
            if (e.key === 'End') next = tabs[tabs.length - 1];
            if (next) { e.preventDefault(); select(next, true); }
          });
        });
      }
    };
  }

  function contactList() {
    const item = function (iconHtml, label, value, attrs) {
      return '<li><a class="contact-link" ' + attrs + '><span class="contact-link__icon">' + iconHtml + '</span>' +
        '<span class="contact-link__text"><span class="contact-link__label">' + label + '</span><span class="contact-link__value">' + value + '</span></span></a></li>';
    };
    return '<ul class="contact-list reveal">' +
      CONFIG.whatsapp.map(function (w, i) {
        return item(brandIcon('whatsapp'), 'WhatsApp ' + (i + 1), w.label, ext(wa(w.number, 'Hello Apex Bee, I would like to discuss a project.')));
      }).join('') +
      item(brandIcon('gmail'), 'Email', CONFIG.email, 'href="' + mailto('Project enquiry', 'Hello Apex Bee,') + '"') +
      item(brandIcon('x'), 'X', CONFIG.x.handle, ext(CONFIG.x.url)) +
      '</ul>';
  }

  function pageContact(params) {
    const pre = params.get('service') || '';
    const options = '<option value="">Select a service (optional)</option>' +
      SERVICES.map(function (s) {
        return '<option value="' + s.slug + '"' + (s.slug === pre ? ' selected' : '') + '>' + s.title + '</option>';
      }).join('') + '<option value="not-sure">Not sure yet</option>';
    const field = function (id, label, control) {
      return '<div class="field"><label class="field__label" for="cf-' + id + '">' + label + '</label>' + control +
        '<p class="field__error" id="cf-' + id + '-err" aria-live="polite"></p></div>';
    };
    return {
      title: 'Contact | ' + CONFIG.brand,
      desc: 'Contact Apex Bee on WhatsApp, email or X, or send an enquiry through the contact form.',
      html:
        pageHero([['Home', '#/'], ['Contact']], 'Contact', 'Tell us what <em>you need.</em>',
          'The fastest way to reach us is WhatsApp. You can also email us, follow us on X or use the form below.') +

        '<section class="section section--dark"><div class="container contact-grid">' +
        '<div class="stack"><span class="eyebrow reveal">Direct</span>' +
        '<h2 class="display-2 reveal reveal--d1">Reach us <em>directly.</em></h2>' +
        '<p class="lead reveal reveal--d2">Choose the channel that suits you. We will reply to discuss your project and next steps.</p></div>' +
        contactList() + '</div></section>' +

        '<section class="section section--light"><div class="container"><div class="prose">' +
        '<span class="eyebrow reveal">Send a message</span>' +
        '<h2 class="display-2 reveal reveal--d1" style="margin:1rem 0 2rem">Project <em>enquiry.</em></h2>' +
        '<form class="form reveal" id="contactForm" novalidate>' +
        field('name', 'Full name', '<input class="field__input" id="cf-name" name="name" type="text" autocomplete="name" maxlength="80" required aria-describedby="cf-name-err">') +
        field('email', 'Email address', '<input class="field__input" id="cf-email" name="email" type="email" autocomplete="email" maxlength="120" required aria-describedby="cf-email-err">') +
        field('phone', 'Phone / WhatsApp (optional)', '<input class="field__input" id="cf-phone" name="phone" type="tel" autocomplete="tel" maxlength="24" aria-describedby="cf-phone-err">') +
        field('service', 'Service', '<select class="field__input" id="cf-service" name="service" aria-describedby="cf-service-err">' + options + '</select>') +
        field('message', 'Message', '<textarea class="field__input" id="cf-message" name="message" maxlength="1500" required aria-describedby="cf-message-err"></textarea>') +
        '<div class="visually-hidden" aria-hidden="true"><label for="cf-website">Leave this field empty</label><input id="cf-website" name="website" type="text" tabindex="-1" autocomplete="off"></div>' +
        '<p class="form__status" id="cf-status" role="status" hidden></p>' +
        '<div><button class="btn btn--dark" type="submit">Send message' + icon('arrow') + '</button></div>' +
        '<p class="form__note">' + (CONFIG.formEndpoint
          ? 'Your message will be sent to Apex Bee.'
          : 'After you send, WhatsApp opens with your message ready. You can also send it by email.') + '</p>' +
        '</form></div></div></section>',
      mount: function (root) { mountContactForm($('#contactForm', root)); }
    };
  }

  function pageFaq() {
    return {
      title: 'FAQ | ' + CONFIG.brand,
      desc: 'Frequently asked questions about working with Apex Bee.',
      html:
        pageHero([['Home', '#/'], ['FAQ']], 'FAQ', 'Questions, <em>answered.</em>', 'If you do not see your question here, message us and we will help.') +
        '<section class="section section--light"><div class="container"><div class="prose"><div class="faq">' +
        FAQ.map(function (q) {
          return '<details class="faq__item reveal"><summary>' + q[0] + '</summary><p class="faq__answer">' + q[1] + '</p></details>';
        }).join('') + '</div></div></div></section>' +
        ctaBand('Still have <em>a question?</em>', 'Ask us directly on WhatsApp, by email or through the contact page.', '#/contact', 'Contact us')
    };
  }

  function legal(titleText, slugTitle, intro, sections) {
    return {
      title: titleText + ' | ' + CONFIG.brand,
      desc: titleText + ' for the Apex Bee website.',
      html:
        pageHero([['Home', '#/'], [slugTitle]], 'Legal', titleText, intro) +
        '<section class="section section--light"><div class="container"><div class="prose">' +
        '<p class="prose__meta">Last updated: ' + CONFIG.legalDate + '</p>' +
        sections.map(function (s) { return '<h2>' + s[0] + '</h2>' + s[1]; }).join('') +
        '</div></div></section>'
    };
  }

  function contactLine() {
    return '<p>You can contact us by email at <a href="mailto:' + CONFIG.email + '">' + CONFIG.email + '</a>, on WhatsApp (' +
      CONFIG.whatsapp[0].label + ' or ' + CONFIG.whatsapp[1].label + ') or on X (<a ' + ext(CONFIG.x.url) + '>' + CONFIG.x.handle + '</a>).</p>';
  }

  function pagePrivacy() {
    return legal('Privacy Policy', 'Privacy Policy',
      'How Apex Bee handles information you share through this website.', [
        ['Overview', '<p>This policy explains what information ' + CONFIG.brand + ' may receive when you use this website or contact us, and how we use it.</p>'],
        ['Information we collect', '<p>If you use the contact form or message us, we receive the details you choose to share, such as your name, email address, phone number and the content of your message.</p>'],
        ['How we use it', '<p>We use this information only to respond to your enquiry, discuss and deliver services, and keep a record of our communication with you.</p>'],
        ['WhatsApp, email and third-party services', '<p>Links on this site open third-party services such as WhatsApp, Gmail and X. Their own privacy policies apply once you use them. If a form service is connected to this site, your submission is processed by that provider as well.</p>'],
        ['Cookies and analytics', '<p>This website does not set tracking cookies by default. If analytics or similar tools are added later, this policy will be updated.</p>'],
        ['Retention', '<p>We keep enquiry information for as long as needed to respond and to manage any resulting work, unless the law requires otherwise.</p>'],
        ['Your choices', '<p>You can ask us to access, correct or delete the information you have shared.</p>' + contactLine()],
        ['Changes', '<p>We may update this policy from time to time. The latest version is always published on this page, with its update date at the top.</p>']
      ]);
  }

  function pageTerms() {
    return legal('Terms of Use', 'Terms',
      'The terms for using this website and engaging Apex Bee.', [
        ['Acceptance', '<p>By using this website you agree to these terms. If you do not agree, please do not use the site.</p>'],
        ['Our services', '<p>' + CONFIG.brand + ' provides creative and technology services as described on this website. Descriptions are general; the exact deliverables for any project are agreed with you in writing.</p>'],
        ['Quotes, scope and payment', '<p>Scope, timelines, pricing and payment terms are confirmed before work begins. Changes to the agreed scope may affect cost and delivery time.</p>'],
        ['Client content and approvals', '<p>You are responsible for ensuring you have the rights to any materials you provide. We will request your approval at agreed stages of the work.</p>'],
        ['Intellectual property', '<p>Ownership and usage rights for completed work are set out in the agreement for each project. The content and design of this website belong to ' + CONFIG.brand + ' unless stated otherwise.</p>'],
        ['Acceptable use', '<p>You agree not to misuse this website, attempt to disrupt it, or use it for unlawful purposes.</p>'],
        ['Limitation of liability', '<p>This website is provided as is. To the extent permitted by law, ' + CONFIG.brand + ' is not liable for losses arising from use of the website.</p>'],
        ['Governing law', '<p>These terms are governed by the laws applicable in the jurisdiction in which ' + CONFIG.brand + ' operates, unless a project agreement states otherwise.</p>'],
        ['Contact', contactLine()]
      ]);
  }

  function pageNotFound() {
    return {
      title: 'Page not found | ' + CONFIG.brand,
      desc: 'The page you are looking for could not be found.',
      html:
        '<section class="notfound"><div class="container stack-lg">' +
        '<p class="notfound__code" aria-hidden="true">404</p>' +
        '<h1 class="display-1" id="page-title">This page <em>does not exist.</em></h1>' +
        '<p class="lead">The link may be broken or the page may have moved. Head back home or explore our services.</p>' +
        '<div class="hero__actions" style="justify-content:flex-start"><a class="btn btn--gold" href="#/">' + icon('home') + 'Back home' + icon('arrow') + '</a>' +
        '<a class="btn btn--ghost" href="#/services">' + icon('layers') + 'View services' + '</a></div></div></section>'
    };
  }

  /* ---------------------------------------------------------------- ROUTER */
  function parseHash() {
    const raw = location.hash.replace(/^#\/?/, '');
    const parts = raw.split('?');
    return { slug: parts[0].replace(/\/+$/, ''), params: new URLSearchParams(parts[1] || '') };
  }

  function resolve(slug, params) {
    const map = {
      'about': pageAbout, 'services': pageServices, 'portfolio': pagePortfolio,
      'project-details': function () { return pageProject(params); },
      'process': pageProcess, 'contact': function () { return pageContact(params); },
      'faq': pageFaq, 'privacy-policy': pagePrivacy, 'terms': pageTerms
    };
    if (slug === '') return { page: pageHome(), key: '' };
    if (has(map, slug)) {
      const key = slug === 'project-details' ? 'portfolio' : slug;
      return { page: map[slug](), key: key };
    }
    const s = findService(slug);
    if (s) return { page: pageService(s), key: 'services' };
    return { page: pageNotFound(), key: null };
  }

  /* ----------------------------------------------------------------- SHELL */
  let main, menu, menuNav, toggleBtn, closeBtn, announcer, revealObserver;
  /* mode: 'rail' (slim icon rail, default) | 'full' (full-screen menu) */
  const state = { mode: 'rail', lastFocus: null, lastSubmit: 0, firstRender: true };

  function buildFooter() {
    const year = new Date().getFullYear();
    const contactItem = function (iconHtml, label, value, attrs) {
      return '<li><a class="footer__contact-item" ' + attrs + '><span class="footer__contact-icon">' + iconHtml + '</span>' +
        '<span class="footer__contact-text"><span class="footer__contact-label">' + label + '</span><span class="footer__contact-value">' + value + '</span></span></a></li>';
    };
    return '<footer class="site-footer"><div class="container footer__main">' +

      '<div class="footer__brand"><a class="footer__logo" href="#/" aria-label="Apex Bee home"><img src="' + CONFIG.logo + '" alt="Apex Bee logo" width="200" height="200" loading="lazy"></a>' +
      '<p class="footer__about">' + CONFIG.slogan + '. A creative and technology company for video, design, web, software and automation.</p>' +
      '<div class="footer__socials">' +
      CONFIG.whatsapp.map(function (w) {
        return '<a class="social-link" ' + ext(wa(w.number)) + ' aria-label="WhatsApp ' + w.label + '">' + brandIcon('whatsapp') + '</a>';
      }).join('') +
      '<a class="social-link" href="mailto:' + CONFIG.email + '" aria-label="Email ' + CONFIG.email + '">' + brandIcon('gmail') + '</a>' +
      '<a class="social-link" ' + ext(CONFIG.x.url) + ' aria-label="Apex Bee on X">' + brandIcon('x') + '</a></div></div>' +

      '<nav aria-label="Company"><h2 class="footer__title">Company</h2><ul class="footer__list">' +
      [['', 'Home'], ['about', 'About'], ['services', 'Services'], ['portfolio', 'Work'], ['process', 'Process'], ['faq', 'FAQ'], ['contact', 'Contact']].map(function (l) {
        return '<li><a href="#/' + l[0] + '">' + l[1] + '</a></li>';
      }).join('') + '</ul></nav>' +

      '<nav aria-label="Services"><h2 class="footer__title">Services</h2><ul class="footer__list footer__list--cols">' +
      SERVICES.map(function (s) { return '<li><a href="#/' + s.slug + '">' + FOOT_LABEL[s.slug] + '</a></li>'; }).join('') + '</ul></nav>' +

      '<div><h2 class="footer__title">Contact</h2><ul class="footer__contact">' +
      CONFIG.whatsapp.map(function (w, i) {
        return contactItem(brandIcon('whatsapp'), 'WhatsApp ' + (i + 1), w.label, ext(wa(w.number, 'Hello Apex Bee, I would like to discuss a project.')));
      }).join('') +
      contactItem(brandIcon('gmail'), 'Email', CONFIG.email, 'href="mailto:' + CONFIG.email + '"') +
      contactItem(brandIcon('x'), 'X', CONFIG.x.handle, ext(CONFIG.x.url)) +
      '</ul></div>' +

      '</div>' +
      '<div class="footer__bar"><div class="container footer__bottom"><p>&copy; ' + year + ' ' + CONFIG.brand + '. All rights reserved.</p>' +
      '<ul class="footer__legal"><li><a href="#/privacy-policy">Privacy Policy</a></li><li><a href="#/terms">Terms of Use</a></li><li><a href="#/faq">FAQ</a></li></ul></div></div>' +
      '</footer>';
  }

  function buildMenu() {
    const link = function (n) {
      return '<a class="menu__link" href="#/' + n[0] + '" data-key="' + n[0] + '" title="' + n[1] + '">' + icon(n[2]) + '<span class="menu__label">' + n[1] + '</span></a>';
    };
    return '<aside class="menu" id="menu" aria-label="Menu">' +
      '<div class="menu__head">' +
      '<button class="menu__toggle" type="button" data-menu-toggle aria-label="Expand menu" title="Expand menu"><span id="toggleIcon">' + icon('panelOpen') + '</span></button>' +
      '<div class="menu__brand menu__label"><strong>Apex Bee</strong><small>Navigation</small></div>' +
      '<button class="menu__close" type="button" data-close-menu aria-label="Collapse menu">' + icon('close') + '</button></div>' +
      '<div class="menu__divider"></div>' +
      '<nav class="menu__nav" id="menuNav" aria-label="Pages">' +
      '<div class="menu__group"><p class="menu__group-title">Main menu</p>' + NAV.map(link).join('') + '</div>' +
      '<div class="menu__group"><p class="menu__group-title">More</p>' + NAV_MORE.map(link).join('') + '</div>' +
      '</nav>' +
      '<button class="menu__more" type="button" data-menu-more aria-label="Scroll menu down">' + icon('down') + '</button>' +
      '<div class="menu__foot">' +
      '<a class="menu__cta menu__cta--wa" ' + ext(wa(CONFIG.whatsapp[0].number, 'Hello Apex Bee, I would like to discuss a project.')) + ' title="Chat on WhatsApp" aria-label="Chat on WhatsApp">' + brandIcon('whatsapp') + '<span class="menu__label">Chat on WhatsApp</span></a>' +
      '<a class="menu__cta menu__cta--mail" href="mailto:' + CONFIG.email + '" title="Email us" aria-label="Email us">' + brandIcon('gmail') + '<span class="menu__label">Email us</span></a>' +
      '</div></aside>';
  }

  function buildShell() {
    return markSprite() +
      '<a class="skip-link" href="#/" data-skip>Skip to content</a>' +
      '<header class="site-header"><div class="container site-header__inner">' +
      brandLockup() +
      '<div class="site-header__actions"><a class="btn btn--gold btn--sm" href="#/contact">Start a project</a>' +
      '<button class="hamburger" type="button" data-open-menu aria-controls="menu" aria-expanded="false" aria-label="Open menu">' +
      '<span class="hamburger__line"></span><span class="hamburger__line"></span><span class="hamburger__line"></span></button></div>' +
      '</div></header>' +
      '<div class="overlay" id="overlay"></div>' +
      buildMenu() +
      '<main id="main" tabindex="-1"></main>' +
      buildFooter() +
      '<div class="visually-hidden" id="announcer" aria-live="polite" role="status"></div>';
  }

  /* ------------------------------------------------------------- MENU LOGIC */
  function updateMore() {
    if (!menuNav) return;
    const more = menuNav.scrollHeight - menuNav.scrollTop - menuNav.clientHeight > 8;
    menu.classList.toggle('can-scroll', more);
  }

  function setMode(mode, restoreFocus) {
    if (mode === state.mode) return;
    state.mode = mode;
    const full = mode === 'full';

    menu.classList.toggle('is-full', full);
    document.body.classList.toggle('nav-open', full);

    $$('[data-open-menu]').forEach(function (b) {
      b.setAttribute('aria-expanded', String(full));
      b.setAttribute('aria-label', full ? 'Collapse menu' : 'Open menu');
    });
    const label = full ? 'Collapse menu to icons' : 'Expand menu';
    toggleBtn.setAttribute('aria-label', label);
    toggleBtn.title = label;
    $('#toggleIcon', toggleBtn).innerHTML = icon(full ? 'panelClose' : 'panelOpen');

    if (full) {
      state.lastFocus = document.activeElement;
      requestAnimationFrame(function () { closeBtn.focus({ preventScroll: true }); });
    } else if (restoreFocus && state.lastFocus && state.lastFocus.focus) {
      state.lastFocus.focus({ preventScroll: true });
    }
    requestAnimationFrame(updateMore);
  }

  function bindShell() {
    main = $('#main');
    menu = $('#menu');
    menuNav = $('#menuNav');
    toggleBtn = $('[data-menu-toggle]', menu);
    closeBtn = $('[data-close-menu]', menu);
    announcer = $('#announcer');

    menuNav.addEventListener('scroll', updateMore, { passive: true });
    window.addEventListener('resize', updateMore);

    document.addEventListener('click', function (e) {
      const t = e.target.closest ? e.target : null;
      if (!t) return;
      if (t.closest('[data-open-menu]')) { setMode(state.mode === 'full' ? 'rail' : 'full', true); return; }
      if (t.closest('[data-menu-toggle]')) { setMode(state.mode === 'full' ? 'rail' : 'full', true); return; }
      if (t.closest('[data-close-menu]')) { setMode('rail', true); return; }
      if (t.closest('[data-menu-more]')) { menuNav.scrollBy({ top: 160, behavior: reduceMotion.matches ? 'auto' : 'smooth' }); return; }
      if (t.closest('.overlay')) { setMode('rail', true); return; }
      if (t.closest('[data-skip]')) { e.preventDefault(); main.focus({ preventScroll: false }); return; }
      if (state.mode === 'full' && t.closest('.menu a[href^="#/"]')) setMode('rail', false);
    });

    document.addEventListener('keydown', function (e) {
      if (state.mode !== 'full') return;
      if (e.key === 'Escape') { e.preventDefault(); setMode('rail', true); return; }
      if (e.key === 'Tab') {
        const f = $$('a[href], button:not([disabled])', menu).filter(function (el) { return el.offsetParent !== null; });
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  function setActive(key) {
    $$('.menu__link').forEach(function (a) {
      const on = key !== null && a.getAttribute('data-key') === key;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  }

  function initReveal(root) {
    if (revealObserver) revealObserver.disconnect();
    const items = $$('.reveal', root);
    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); revealObserver.unobserve(en.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { revealObserver.observe(el); });
  }

  function setMeta(title, desc) {
    document.title = title;
    let m = $('meta[name="description"]');
    if (!m) { m = document.createElement('meta'); m.name = 'description'; document.head.appendChild(m); }
    m.setAttribute('content', desc);
  }

  function paint(result) {
    const page = result.page;
    main.innerHTML = page.html;
    setMeta(page.title, page.desc);
    setActive(result.key);
    if (page.mount) page.mount(main);
    initReveal(main);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const h1 = $('#page-title', main);
    if (h1 && !state.firstRender) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
    announcer.textContent = state.firstRender ? '' : 'Navigated to ' + page.title;
    state.firstRender = false;
  }

  /* Page change: quick opacity-only fade (no transforms on the whole page) */
  function route() {
    const r = parseHash();
    const result = resolve(r.slug, r.params);
    if (state.firstRender || reduceMotion.matches || !main.animate) { paint(result); return; }
    const out = main.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 120, easing: 'ease-out', fill: 'forwards' });
    out.onfinish = function () {
      paint(result);
      out.cancel();
      main.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, easing: 'ease-out' });
    };
  }

  /* ---------------------------------------------------------- CONTACT FORM */
  function mountContactForm(form) {
    if (!form) return;
    const status = $('#cf-status', form);
    const clean = function (v, max) {
      return String(v || '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, max);
    };

    function setError(name, msg) {
      const input = $('[name="' + name + '"]', form);
      const err = $('#cf-' + name + '-err', form);
      const wrap = input.closest('.field');
      err.textContent = msg || '';
      wrap.classList.toggle('is-invalid', !!msg);
      if (msg) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
    }

    function validate(data) {
      const errors = {};
      if (data.name.length < 2) errors.name = 'Please enter your name.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.email = 'Please enter a valid email address.';
      if (data.phone && !/^\+?[0-9\s\-()]{7,20}$/.test(data.phone)) errors.phone = 'Please enter a valid phone number.';
      if (data.message.length < 10) errors.message = 'Please write at least a short sentence (10 characters).';
      return errors;
    }

    function show(msg, type, links) {
      status.hidden = false;
      status.className = 'form__status' + (type ? ' is-' + type : '');
      status.setAttribute('role', type === 'error' ? 'alert' : 'status');
      status.textContent = msg;
      (links || []).forEach(function (l) {
        status.appendChild(document.createTextNode(' '));
        const a = document.createElement('a');
        a.href = l.href;
        if (l.external) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
        a.textContent = l.label;
        status.appendChild(a);
      });
    }

    ['name', 'email', 'phone', 'message'].forEach(function (n) {
      $('[name="' + n + '"]', form).addEventListener('input', function () { setError(n, ''); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const fd = new FormData(form);
      if (clean(fd.get('website'), 50)) { return; } /* honeypot: silently ignore bots */

      const svc = findService(fd.get('service'));
      const data = {
        name: clean(fd.get('name'), 80),
        email: clean(fd.get('email'), 120),
        phone: clean(fd.get('phone'), 24),
        service: svc ? svc.title : (fd.get('service') === 'not-sure' ? 'Not sure yet' : ''),
        message: clean(fd.get('message'), 1500)
      };

      const errors = validate(data);
      ['name', 'email', 'phone', 'message'].forEach(function (n) { setError(n, errors[n] || ''); });
      if (Object.keys(errors).length) {
        show('Please fix the highlighted fields and try again.', 'error');
        const first = $('.is-invalid .field__input', form);
        if (first) first.focus();
        return;
      }

      const wait = CONFIG.cooldownMs - (Date.now() - state.lastSubmit);
      if (wait > 0) { show('Please wait ' + Math.ceil(wait / 1000) + ' seconds before sending another message.', 'error'); return; }
      state.lastSubmit = Date.now();

      if (CONFIG.formEndpoint) {
        show('Sending your message...', '');
        fetch(CONFIG.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data)
        }).then(function (res) {
          if (!res.ok) throw new Error('Request failed');
          form.reset();
          show('Thank you. Your message has been sent and we will get back to you.', 'success');
        }).catch(function () {
          state.lastSubmit = 0;
          show('Sorry, your message could not be sent. Please try again or message us on WhatsApp.', 'error');
        });
        return;
      }

      const lines = ['Hello Apex Bee, my name is ' + data.name + '.'];
      if (data.service) lines.push('Service: ' + data.service);
      lines.push('Email: ' + data.email);
      if (data.phone) lines.push('Phone: ' + data.phone);
      lines.push('', data.message);
      const text = lines.join('\n');
      const waUrl = wa(CONFIG.whatsapp[0].number, text);
      const mailUrl = mailto('Project enquiry from ' + data.name, text);
      const w = window.open(waUrl, '_blank', 'noopener');
      show(w ? 'WhatsApp opened with your message ready. Press send there to reach us, or' : 'Your message is ready. Send it with', 'success',
        w ? [{ href: mailUrl, label: 'send it by email instead.' }]
          : [{ href: waUrl, label: 'WhatsApp', external: true }, { href: mailUrl, label: 'or email.' }]);
    });
  }

  /* ----------------------------------------------------------------- SPLASH */
  function runSplash() {
    const splash = $('#splash');
    if (!splash) { document.body.classList.remove('is-loading'); return; }
    const started = performance.now();
    const MIN = reduceMotion.matches ? 0 : 700;
    let done = false;

    function hide() {
      if (done) return;
      done = true;
      splash.classList.add('is-hidden');
      document.body.classList.remove('is-loading');
      setTimeout(function () { if (splash.parentNode) splash.parentNode.removeChild(splash); }, reduceMotion.matches ? 0 : 700);
    }

    const ready = new Promise(function (resolveReady) {
      if (document.readyState === 'complete') resolveReady();
      else window.addEventListener('load', resolveReady, { once: true });
    });
    const fonts = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();

    Promise.all([ready, fonts]).then(function () {
      const left = Math.max(0, MIN - (performance.now() - started));
      setTimeout(hide, left);
    });
    setTimeout(hide, 4000); /* failsafe */
  }

  /* ------------------------------------------------------------------- INIT */
  function init() {
    const root = $('#root');
    root.innerHTML = buildShell();
    document.body.classList.add('has-rail');
    bindShell();
    route();
    window.addEventListener('hashchange', route);
    requestAnimationFrame(updateMore);
    runSplash();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
