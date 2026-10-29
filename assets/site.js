/* jandarm.iradgov.org: site script. Header, footer, language and the data-driven parts. */
(function () {
  "use strict";
  var SITE = {"store": "jd_lang", "nav": [["home", "/"], ["service", "/service.html"], ["line", "/line.html"], ["roads", "/roads.html"], ["academy", "/academy.html"]], "navAlias": {}, "links": [["gov", "https://iradgov.org/"], ["eirad", "https://e-irad.org/"], ["bank", "https://bank.iradgov.org/"], ["arch", "https://archives.iradgov.org/"], ["post", "https://post.iradgov.org/"], ["elections", "https://elections.iradgov.org/"], ["court", "https://court.iradgov.org/"], ["stats", "https://stats.iradgov.org/"], ["mejlis", "https://mejlis.iradgov.org/"], ["gidromet", "https://gidromet.iradgov.org/"], ["customs", "https://customs.iradgov.org/"], ["railways", "https://railways.iradgov.org/"], ["avia", "https://avia.iradgov.org/"], ["loto", "https://loto.iradgov.org/"], ["tender", "https://tender.e-irad.org/"]], "mastBtn": "/line.html"};
  var EXTRA = function () {
    function mountains(d) {
      var el = $("#mtnNow"); if (!el) return;
      var P = [{"id": "karasuu", "e": 1390, "road": "open", "n": {"en": "Kara-Suu Canyon mouth", "ir": "Kara-Suu kapchıgayının oozu", "ru": "Устье каньона Кара-Суу"}, "r": {"en": "Sary-Bulak road", "ir": "Sarı-Bulak jolu", "ru": "Дорога на Сары-Булак"}}, {"id": "aksay", "e": 2000, "road": "open", "n": {"en": "Aksay post", "ir": "Aksay postu", "ru": "Пост Аксай"}, "r": {"en": "Line crossing", "ir": "Liniya ötkölü", "ru": "Пункт пропуска на линии"}}, {"id": "suusamyr", "e": 2660, "road": "season", "n": {"en": "Suusamyr crossing", "ir": "Suusamır ötkölü", "ru": "Пункт пропуска Суусамыр"}, "r": {"en": "Karakol road, line crossing", "ir": "Karakol jolu, liniya ötkölü", "ru": "Каракольская дорога, пункт пропуска"}}, {"id": "otmek", "e": 3175, "road": "open", "n": {"en": "Otmek tunnel", "ir": "Otmek tunneli", "ru": "Отмекский тоннель"}, "r": {"en": "State Route 1, portals", "ir": "1-mamlekettik jol, portaldar", "ru": "Трасса № 1, порталы"}}, {"id": "alabel", "e": 3184, "road": "open", "n": {"en": "Fergana Gateway (Ala-Bel)", "ir": "Fergana Darbazası (Ala-Bel)", "ru": "Ферганские ворота (Ала-Бель)"}, "r": {"en": "State Route 1, summit post", "ir": "1-mamlekettik jol, ashuudagı post", "ru": "Трасса № 1, пост на перевале"}}, {"id": "otmekpass", "e": 3330, "road": "summer", "n": {"en": "Otmek Pass, old road", "ir": "Otmek ashuusu, eski jol", "ru": "Перевал Отмек, старая дорога"}, "r": {"en": "Summer bypass", "ir": "Jaykı aylanma jol", "ru": "Летний объезд"}}];
      var base = d.weather.filter(function (w) { return w.id === "talas"; })[0]; if (!base) return;
      var winter = (function () { var m = +d.date.slice(5, 7), dd = +d.date.slice(8, 10); return m >= 11 || m <= 4 || (m === 10 && dd >= 25); })();
      function sgn(x) { x = Math.round(x); return (x > 0 ? "+" : x < 0 ? "−" : "") + Math.abs(x) + "°"; }
      function day(w, e) {
        var k = (e - 1270) * 0.0065, hi = w.high - k, lo = w.low - k, wet = (w.code || 0) >= 51 || (w.precip_mm || 0) > 0;
        var sky = !wet ? tri(w.label) : hi <= 1 ? t("mtSnow") : lo <= 0 ? t("mtMix") : t("mtRain");
        return { hi: hi, lo: lo, snow: wet && lo <= 0, heavy: wet && hi <= 1 && ((w.precip_mm || 0) >= 10 || (w.code || 0) >= 73), txt: sgn(hi) + " / " + sgn(lo) + " · " + sky };
      }
      el.innerHTML = '<div class="tbl-wrap"><table class="facts mtn"><thead><tr><th>' + esc(t("mtPlace")) + '</th><th class="num">' + esc(t("mtElev")) + "</th><th>" + esc(t("mtToday")) + "</th><th>" + esc(t("mtTom")) + "</th><th>" + esc(t("mtRoad")) + "</th></tr></thead><tbody>" +
        P.map(function (p) {
          var a = day(base, p.e), b = base.forecast && base.forecast[0] ? day(base.forecast[0], p.e) : null, st;
          if (p.road === "none") st = '<span class="muted">' + esc(t("mtNoRoad")) + "</span>";
          else if ((p.road === "summer" || p.road === "season") && winter) st = '<span class="st no">' + esc(t("mtSeason")) + "</span>";
          else if (a.heavy && p.e > 2500) st = '<span class="st no">' + esc(t("mtClosure")) + "</span>";
          else if ((a.snow || a.lo <= -2) && p.e > 1800) st = '<span class="st warn">' + esc(t("mtChains")) + "</span>";
          else st = '<span class="st ok">' + esc(t("mtOpen")) + "</span>";
          return "<tr><td><b>" + esc(tri(p.n)) + '</b><br><span class="small muted">' + esc(tri(p.r)) + '</span></td><td class="num nw">' + esc(t("mtM", { v: p.e.toLocaleString("en").replace(",", LANG === "en" ? "," : " ") })) +
            "</td><td data-l=\"" + esc(t("mtToday")) + "\">" + esc(a.txt) + "</td><td data-l=\"" + esc(t("mtTom")) + "\">" + (b ? esc(b.txt) : "") + "</td><td>" + st + "</td></tr>";
        }).join("") + "</tbody></table></div>";
    }
    var X = [{"n": {"en": "Qara-Chik Border Checkpoint", "ir": "Kara-Chik chek ara ötkööl punktu", "ru": "Пограничный пункт пропуска Кара-Чик"}, "r": {"en": "Kara-Buura valley, road to the Chatkal · western sector", "ir": "Kara-Buura öröönü, Chatkalga jol · batış sektor", "ru": "Долина Кара-Буура, дорога на Чаткал · западный сектор"}, "e": 1220, "o": 6, "c": 22, "k": "main", "season": false}, {"n": {"en": "Aksay post", "ir": "Aksay postu", "ru": "Пост Аксай"}, "r": {"en": "Line crossing", "ir": "Liniya ötkölü", "ru": "Пункт пропуска на линии"}, "e": 2000, "o": 8, "c": 18, "k": "line", "season": false}, {"n": {"en": "Toguz-Bulak, lower crossing", "ir": "Toguz-Bulak, tömönkü ötköl", "ru": "Тогуз-Булак, нижний пункт"}, "r": {"en": "Kök-Bel road, summer road", "ir": "Kök-Bel jolu, jaykı jol", "ru": "Дорога через Кок-Бель, летняя"}, "e": null, "o": 8, "c": 18, "k": "line", "season": true}, {"n": {"en": "Toguz-Bulak, north crossing", "ir": "Toguz-Bulak, tündük ötköl", "ru": "Тогуз-Булак, северный пункт"}, "r": {"en": "Kök-Bel road, summer road", "ir": "Kök-Bel jolu, jaykı jol", "ru": "Дорога через Кок-Бель, летняя"}, "e": null, "o": 8, "c": 18, "k": "line", "season": true}, {"n": {"en": "Kara-Bulak", "ir": "Kara-Bulak", "ru": "Кара-Булак"}, "r": {"en": "Kenkol Pass road · western sector", "ir": "Kenkol ashuusu jolu · batış sektor", "ru": "Дорога на перевал Кенкол · западный сектор"}, "e": 1260, "o": 8, "c": 20, "k": "line", "season": false}, {"n": {"en": "Suusamyr", "ir": "Suusamır", "ru": "Суусамыр"}, "r": {"en": "Karakol road, the highest crossing", "ir": "Karakol jolu, eñ biyik ötköl", "ru": "Каракольская дорога, самый высокий пункт"}, "e": 2660, "o": 8, "c": 17, "k": "line", "season": true}, {"n": {"en": "Mailuu-Suu road", "ir": "Mailuu-Suu jolu", "ru": "Дорога на Майлуу-Суу"}, "r": {"en": "Below Mailuu-Suu · southern sector", "ir": "Mailuu-Suunun tömönü · tüshtük sektor", "ru": "Ниже Майлуу-Суу · южный сектор"}, "e": 900, "o": 7, "c": 19, "k": "minor", "season": false}, {"n": {"en": "Arslanbob road", "ir": "Arslanbob jolu", "ru": "Дорога на Арсланбоб"}, "r": {"en": "Above Bazar-Korgon · southern sector", "ir": "Bazar-Korgondun üstü · tüshtük sektor", "ru": "Выше Базар-Коргона · южный сектор"}, "e": 1000, "o": 7, "c": 19, "k": "minor", "season": false}, {"n": {"en": "Kök-Kamar crossing", "ir": "Kök-Kamar ötkölü", "ru": "Пункт пропуска Кок-Камар"}, "r": {"en": "Kök-Kamar road above Kyzyl-Senir · southern sector", "ir": "Kızıl-Senirdin üstündögü Kök-Kamar jolu · tüshtük sektor", "ru": "Дорога на Кок-Камар выше Кызыл-Сенира · южный сектор"}, "e": null, "o": 8, "c": 17, "k": "minor", "season": false}], Y = [{"n": {"en": "Kara-Suu Canyon mouth", "ir": "Kara-Suu kapchıgayının oozu", "ru": "Устье каньона Кара-Суу"}, "r": {"en": "Sary-Bulak road", "ir": "Sarı-Bulak jolu", "ru": "Дорога на Сары-Булак"}, "e": 1390, "o": null, "c": null, "k": "post", "season": false}, {"n": {"en": "Otmek valley mouth", "ir": "Otmek öröönünün oozu", "ru": "Устье долины Отмек"}, "r": {"en": "State Route 1, km 64 · heavy-vehicle road-use charge", "ir": "1-mamlekettik jol, 64-km · oor unaa jol akısı", "ru": "Трасса № 1, 64-й км · сбор с большегрузов"}, "e": null, "o": null, "c": null, "k": "post", "season": false}, {"n": {"en": "Fergana Gateway (Ala-Bel summit)", "ir": "Fergana Darbazası (Ala-Bel ashuusu)", "ru": "Ферганские ворота (перевал Ала-Бель)"}, "r": {"en": "State Route 1, km 118 · bus passengers' ID check", "ir": "1-mamlekettik jol, 118-km · avtobus jürgünchülörünün kübölügün tekshirüü", "ru": "Трасса № 1, 118-й км · проверка документов у пассажиров автобусов"}, "e": 3184, "o": null, "c": null, "k": "post", "season": false}, {"n": {"en": "Naryn bridge", "ir": "Narın köpürösü", "ru": "Нарынский мост"}, "r": {"en": "Below the Toktogul dam", "ir": "Toktogul platinasının tömönü", "ru": "Ниже Токтогульской плотины"}, "e": null, "o": null, "c": null, "k": "post", "season": false}];
    var now = iradNow(), h = now.getHours() + now.getMinutes() / 60, mo = now.getMonth() + 1, dd = now.getDate();
    var winter = mo >= 11 || mo <= 4 || (mo === 10 && dd >= 25);
    function hm(v) { return pad(Math.floor(v)) + ":00"; }
    function dur(v) { var m = Math.round(v * 60), H = Math.floor(m / 60); m = m % 60; return H ? t("tnHM", { h: H, m: m }) : t("tnM", { m: m }); }
    function open(c) { return c.o == null || (!(c.season && winter) && h >= c.o && h < c.c); }
    function st(c) {
      if (c.season && winter) return '<span class="st no">' + esc(t("lnWinter")) + "</span>";
      if (c.o == null) return '<span class="st ok">' + esc(t("ln24")) + "</span>";
      return open(c) ? '<span class="st ok">' + esc(t("lnOpenTill", { t: hm(c.c) })) + "</span>" : '<span class="st no">' + esc(t("lnOpensAt", { t: hm(c.o) })) + "</span>";
    }
    function m(e) { return e ? esc(t("mtM", { v: e.toLocaleString("en").replace(",", LANG === "en" ? "," : " ") })) : "—"; }
    function rows(L) { return L.map(function (c) {
      return "<tr><td><b>" + esc(tri(c.n)) + '</b><br><span class="small muted">' + esc(tri(c.r)) + '</span></td><td class="num nw">' + m(c.e) + '</td><td class="nw">' + (c.o == null ? "24/7" : hm(c.o) + "–" + hm(c.c)) + "</td><td>" + st(c) + "</td></tr>";
    }).join(""); }
    var n = X.filter(open).length, clock = esc(t("lnClock", { t: pad(now.getHours()) + ":" + pad(now.getMinutes()) })), el;
    var head = "<thead><tr><th>" + esc(t("lnCross")) + '</th><th class="num">' + esc(t("lnHeight")) + "</th><th>" + esc(t("lnHours")) + "</th><th>" + esc(t("lnNow")) + "</th></tr></thead>";
    if ((el = $("#lineNow"))) el.innerHTML = '<p class="small"><span class="live">' + esc(t("lnLive")) + '</span> ' + clock + " · " + esc(t("lnSum", { o: n })) + "</p>" +
      '<div class="tbl-wrap"><table class="facts board">' + head + "<tbody>" + rows(X) + "</tbody></table></div>";
    if ((el = $("#postNow"))) el.innerHTML = '<div class="tbl-wrap"><table class="facts board">' + head + "<tbody>" + rows(Y) + "</tbody></table></div>";
    if ((el = $("#lineSum"))) el.innerHTML = '<span class="live">' + esc(t("lnLive")) + '</span> ' + esc(t("lnSum", { o: n }));
    if ((el = $("#tunnelNow"))) {
      var on = h >= 22 || h < 5, left = on ? (h >= 22 ? 29 - h : 5 - h) : 22 - h;
      el.innerHTML = '<div class="tunnel ' + (on ? "on" : "off") + '"><span class="live">' + esc(t("lnLive")) + '</span> <b>' + esc(t(on ? "tnOpen" : "tnClosed")) + "</b> " + esc(t(on ? "tnUntil" : "tnOpens", { h: dur(left) })) + '<br><span class="small muted">' + clock + "</span></div>";
    }
    if ($("#mtnNow")) todayData().then(mountains).catch(function () { failBox($("#mtnNow")); });
  };
  var I = window.SITE_I18N;
  var LANGS = ["en", "ir", "ru"];
  var PAGE = document.body.getAttribute("data-page") || "";
  var LANG = (function () {
    var q = (location.search.match(/[?&]lang=(en|ir|ru)\b/) || [])[1];
    if (q) { try { localStorage.setItem(SITE.store, q); } catch (e) {} return q; }
    try { var s = localStorage.getItem(SITE.store); if (LANGS.indexOf(s) >= 0) return s; } catch (e) {}
    return "en";
  })();
  var cache = {};

  /* ---------- helpers ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function fill(s, v) { return String(s).replace(/\{(\w+)\}/g, function (m, k) { return v && v[k] != null ? v[k] : m; }); }
  function t(k, v) { var d = I.ui[LANG] || {}; var s = d[k] != null ? d[k] : I.ui.en[k]; return s == null ? k : (v ? fill(s, v) : s); }
  function tri(o) { if (o == null) return ""; if (typeof o === "string") return o; return o[LANG] || o.en || ""; }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function iradNow() { var n = new Date(); return new Date(n.getTime() + n.getTimezoneOffset() * 60000 + 6 * 3600000); }
  function iradToday() { var d = iradNow(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function fmtDate(s) {
    var p = String(s).split("-"), M = t("months");
    if (p.length < 3) return t("monthsNom")[+p[1] - 1] + " " + p[0];
    if (LANG === "ir") return (+p[2]) + "-" + M[+p[1] - 1] + " " + p[0];
    return (+p[2]) + " " + M[+p[1] - 1] + " " + p[0];
  }
  function getJSON(url) {
    if (!cache[url]) cache[url] = fetch(url, { cache: "no-cache" }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); });
    return cache[url];
  }
  function sortByDate(a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; }
  /* today's numbers: the public file (iradone.com/data/today.json) nests its lists; flatten them once */
  function todayData() {
    return getJSON("https://iradone.com/data/today.json").then(function (d) {
      if (d.weather && d.weather.places) d.weather = d.weather.places;
      if (d.air && d.air.places) d.air = d.air.places;
      if (d.water && d.water.toktogul && !d.toktogul) d.toktogul = d.water.toktogul;
      if (d.rates && d.rates.official && d.rates.official.rows) d.rates.official = d.rates.official.rows;
      if (d.prices && !Array.isArray(d.prices)) {
        var a = [];
        ["food", "fuel", "transport", "rent"].forEach(function (g) {
          (d.prices[g] || []).forEach(function (p) { if (!p.group) p.group = p.id === "hay" ? "farm" : g; a.push(p); });
        });
        d.prices = a;
      }
      if (!d.computed) d.computed = d.updated;
      return d;
    });
  }
  function failBox(el) { if (el) el.innerHTML = '<p class="muted">' + esc(t("loadFail")) + "</p>"; }

  /* ---------- chrome ---------- */
  function navHTML() {
    return SITE.nav.map(function (n) {
      var cur = n[0] === PAGE || (SITE.navAlias[PAGE] === n[0]);
      return '<li><a href="' + n[1] + '"' + (cur ? ' aria-current="page"' : "") + ">" + esc(t("nav_" + n[0])) + "</a></li>";
    }).join("");
  }
  function chrome() {
    var top = $("#top"), bottom = $("#bottom");
    if (top) {
      top.innerHTML =
        '<a class="skip" href="#main">' + esc(t("skip")) + "</a>" +
        '<div class="util"><div class="wrap"><div class="left"><span>' + esc(t("utilGov")) + '</span><span class="clock" id="clock"></span></div>' +
        '<div class="right"><a class="gov-link" href="https://iradgov.org/">iradgov.org</a>' +
        '<div class="langs" role="group" aria-label="' + esc(t("langLabel")) + '">' +
        LANGS.map(function (l) { return '<button type="button" data-lang="' + l + '" aria-pressed="' + (l === LANG) + '" lang="' + I.htmlLang[l] + '">' + esc(I.langs[l]) + "</button>"; }).join("") +
        "</div></div></div></div>" +
        '<div class="mast"><div class="wrap"><a class="home-link" href="/"><img class="emb" src="/assets/state-emblem-160.png" alt="' + esc(t("embAlt")) + '" width="76" height="76">' +
        '<div class="ttl"><div class="k">' + esc(t("mastK")) + '</div><div class="n">' + esc(t("mastN")) + '</div><div class="s">' + esc(t("mastS")) + "</div></div></a>" +
        (SITE.mastBtn ? '<a class="eirad" href="' + SITE.mastBtn + '">' + t("mastBtn") + "</a>" : "") + "</div></div>" +
        '<nav class="nav" aria-label="' + esc(t("navLabel")) + '"><div class="wrap"><button class="burger" type="button" aria-expanded="false"><span class="bars"></span>' + esc(t("menu")) + '</button><ul class="menu">' + navHTML() +
        '</ul></div></nav><div class="orn" aria-hidden="true"></div>';
      $(".burger", top).addEventListener("click", function () {
        var nav = $(".nav", top), open = !nav.classList.contains("open");
        nav.classList.toggle("open", open); this.setAttribute("aria-expanded", open);
      });
      $$("[data-lang]", top).forEach(function (b) { b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); }); });
      tick();
    }
    if (bottom) {
      bottom.innerHTML =
        '<footer class="foot"><div class="wrap"><div class="cols">' +
        '<div><div class="femb"><img src="/assets/state-emblem-160.png" alt="" width="42" height="42"><strong style="color:#fff">' + esc(t("mastN")) + "</strong></div>" +
        '<address class="addrbox" style="font-style:normal">' + t("footAddr") + "</address></div>" +
        "<div><h4>" + esc(t("footSite")) + "</h4><ul>" +
        SITE.nav.map(function (n) { return '<li><a href="' + n[1] + '">' + esc(t("nav_" + n[0])) + "</a></li>"; }).join("") +
        "</ul></div>" +
        "<div><h4>" + esc(t("footGov")) + "</h4><ul>" +
        SITE.links.map(function (l) { return '<li><a href="' + l[1] + '">' + esc(t("link_" + l[0])) + "</a></li>"; }).join("") +
        "</ul></div></div>" +
        '<div class="fine"><span>' + esc(t("footCopy", { y: iradNow().getFullYear() })) + "</span><span>" + esc(t("footTime")) + "</span></div></div></footer>";
    }
  }
  var tickTimer;
  function tick() {
    var el = $("#clock"); if (!el) return;
    var d = iradNow();
    el.textContent = t("clock", { d: fmtDate(iradToday()), t: pad(d.getHours()) + ":" + pad(d.getMinutes()) });
    clearTimeout(tickTimer); tickTimer = setTimeout(tick, 30000);
  }

  /* ---------- static text ---------- */
  function staticText() {
    var P = (I.pages || {})[LANG] || {};
    $$("[data-i18n]").forEach(function (el) {
      if (!el.hasAttribute("data-en")) el.setAttribute("data-en", el.innerHTML);
      var k = el.getAttribute("data-i18n");
      el.innerHTML = LANG === "en" ? el.getAttribute("data-en") : (P[k] != null ? P[k] : el.getAttribute("data-en"));
    });
    var tk = document.body.getAttribute("data-title");
    var dt = (tk && P["title_" + tk] && LANG !== "en" ? P["title_" + tk] : (document.body.getAttribute("data-title-en") || document.title.split(" | ")[0]));
    document.title = dt === t("mastN") ? dt : dt + " | " + t("mastN");
    document.documentElement.lang = I.htmlLang[LANG];
  }
  function setLang(l) {
    LANG = l;
    try { localStorage.setItem(SITE.store, l); } catch (e) {}
    render();
  }

  /* ---------- data-driven parts ---------- */
  function countdowns() {
    $$("[data-countdown]").forEach(function (el) {
      var to = el.getAttribute("data-countdown").split("-"), now = iradNow();
      var days = Math.ceil((Date.UTC(+to[0], +to[1] - 1, +to[2]) - Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())) / 86400000);
      el.innerHTML = days > 0 ? '<b class="cd-n">' + days + "</b> " + esc(t("cdDays")) : esc(t("cdToday"));
    });
  }
  function dates() {
    $$("[data-date]").forEach(function (el) { el.textContent = fmtDate(el.getAttribute("data-date")); });
  }
  function notices() {
    var el = $("#notices"); if (!el) return;
    var n = +(el.getAttribute("data-n") || 99);
    getJSON("/data/notices.json").then(function (d) {
      var items = (d.notices || []).slice().sort(sortByDate).slice(0, n);
      el.innerHTML = items.map(function (x) {
        return '<div class="notice"><div class="meta">' + esc(fmtDate(x.date)) + (x.number ? " · " + esc(tri(x.number)) : "") + '</div><div class="t">' + esc(tri(x.title)) + "</div>" +
          (x.text ? "<p>" + tri(x.text) + "</p>" : "") + (x.signed ? '<p class="small muted">' + esc(tri(x.signed)) + "</p>" : "") + "</div>";
      }).join("");
    }).catch(function () { failBox(el); });
  }
  var regFilter = "all", regQuery = "";
  function register() {
    var el = $("#register"); if (!el) return;
    getJSON("/data/cases.json").then(function (d) {
      var cases = (d.cases || []).slice().sort(function (a, b) { return a.filed < b.filed ? 1 : -1; });
      var courts = ["all"].concat(d.courts.map(function (c) { return c.id; }));
      var cname = {}; d.courts.forEach(function (c) { cname[c.id] = tri(c.name); });
      var bar = $("#regFilter");
      if (bar) {
        bar.innerHTML = courts.map(function (c) { return '<button type="button" data-court="' + c + '" aria-pressed="' + (c === regFilter) + '">' + esc(c === "all" ? t("regAll") : cname[c]) + "</button>"; }).join("") +
          '<input type="search" id="regQ" placeholder="' + esc(t("regSearch")) + '" value="' + esc(regQuery) + '">';
        $$("button", bar).forEach(function (b) { b.addEventListener("click", function () { regFilter = b.getAttribute("data-court"); register(); }); });
        $("#regQ").addEventListener("input", function () { regQuery = this.value; draw(); });
      }
      function draw() {
        var q = regQuery.toLowerCase();
        var rows = cases.filter(function (c) {
          if (regFilter !== "all" && c.court !== regFilter) return false;
          if (!q) return true;
          return (c.no + " " + tri(c.title) + " " + tri(c.kind) + " " + tri(c.counsel || "")).toLowerCase().indexOf(q) >= 0;
        });
        el.innerHTML = rows.length ? '<div class="tbl-wrap"><table class="facts reg"><thead><tr><th>' + esc(t("regNo")) + "</th><th>" + esc(t("regCase")) + "</th><th>" + esc(t("regCourt")) + "</th><th>" + esc(t("regFiled")) + "</th><th>" + esc(t("regStatus")) + "</th></tr></thead><tbody>" +
          rows.map(function (c) {
            return '<tr><td class="nw">' + esc(c.no) + "</td><td><b>" + esc(tri(c.title)) + '</b><br><span class="small muted">' + esc(tri(c.kind)) + (c.counsel ? " · " + esc(tri(c.counsel)) : "") + (c.judge ? " · " + esc(tri(c.judge)) : "") + "</span></td><td>" + esc(cname[c.court]) +
              '</td><td class="nw">' + esc(fmtDate(c.filed)) + "</td><td>" + esc(tri(c.status)) + (c.next ? '<br><span class="small">' + esc(t("regNext")) + ": " + esc(fmtDate(c.next)) + "</span>" : "") + "</td></tr>";
          }).join("") + "</tbody></table></div>" : '<p class="muted">' + esc(t("regNone")) + "</p>";
        var upd = $("#regUpd"); if (upd) upd.textContent = t("regUpdated", { d: fmtDate(d.updated) });
      }
      draw();
    }).catch(function () { failBox(el); });
  }

  /* ---------- forms and online services; "In the news" ---------- */
  var SVC = {"home": [[{"en": "Application for a Qara-Chik line crossing pass", "ir": "Kara-Chik liniyasınan ötüü ötkörmösünö arız", "ru": "Заявление на пропуск через линию Кара-Чик"}, "https://e-irad.org/forms/RG-9.pdf", "RG-9 · PDF"], [{"en": "Check and pay traffic fines", "ir": "Jol ayıptarın tekshirüü jana tölöö", "ru": "Проверить и оплатить штрафы ГИБДД"}, "https://e-irad.org/fines/", "e-Irad"], [{"en": "Questionnaire of a candidate for the Talas Gendarmerie Academy", "ir": "Talas jandarmeriya akademiyasına talapkerdin anketası", "ru": "Анкета кандидата в Таласскую академию жандармерии"}, "https://e-irad.org/forms/RG-1.pdf", "RG-1 · PDF"]], "line": [[{"en": "Application for a Qara-Chik line crossing pass", "ir": "Kara-Chik liniyasınan ötüü ötkörmösünö arız", "ru": "Заявление на пропуск через линию Кара-Чик"}, "https://e-irad.org/forms/RG-9.pdf", "RG-9 · PDF"], [{"en": "Line crossing pass: status", "ir": "Liniyadan ötüü ötkörmösü: abalı", "ru": "Пропуск через линию: статус"}, "https://e-irad.org/service.html?id=crossing", "e-Irad"], [{"en": "Move sheep to summer pasture across the line", "ir": "Koylordu liniya arkıluu jayloogo aydoo", "ru": "Перегон овец на летние пастбища через линию"}, "https://e-irad.org/procedure.html?id=livestock-sheep", {"en": "step by step", "ir": "baskıchma-baskıch", "ru": "пошагово"}]], "roads": [[{"en": "Application for passage of dangerous goods through the Otmek tunnel", "ir": "Ötmök tunneli arkıluu kooptuu jük ötkörüü arızı", "ru": "Заявление на проезд с опасным грузом через тоннель Отмёк"}, "https://e-irad.org/forms/HPC-20.pdf", "HPC-20 · PDF"], [{"en": "Declaration for the annual road-use charge", "ir": "Jıldık jol akısı boyuncha deklaratsiya", "ru": "Декларация на уплату годового сбора за пользование дорогами"}, "https://e-irad.org/forms/DIC-5.pdf", "DIC-5 · PDF"], [{"en": "Check and pay traffic fines", "ir": "Jol ayıptarın tekshirüü jana tölöö", "ru": "Проверить и оплатить штрафы ГИБДД"}, "https://e-irad.org/fines/", "e-Irad"], [{"en": "Application to exchange a foreign driving licence", "ir": "Chet eldik aydoochuluk kuböölügün almashtıruu arızı", "ru": "Заявление об обмене иностранного водительского удостоверения"}, "https://e-irad.org/forms/HPC-12.pdf", "HPC-12 · PDF"], [{"en": "Carry diesel in transit", "ir": "Dizeldi tranzit menen tashuu", "ru": "Транзит дизельного топлива"}, "https://e-irad.org/procedure.html?id=transit-diesel", {"en": "step by step", "ir": "baskıchma-baskıch", "ru": "пошагово"}]], "academy": [[{"en": "Questionnaire of a candidate for the Talas Gendarmerie Academy", "ir": "Talas jandarmeriya akademiyasına talapkerdin anketası", "ru": "Анкета кандидата в Таласскую академию жандармерии"}, "https://e-irad.org/forms/RG-1.pdf", "RG-1 · PDF"], [{"en": "Request for a certificate of good conduct", "ir": "Jakshı jürüsh-turush tuuraluu malımatnama suroo", "ru": "Запрос справки о благонадёжности"}, "https://e-irad.org/forms/MIS-22.pdf", "MIS-22 · PDF"]], "service": [[{"en": "Request for a certificate of good conduct", "ir": "Jakshı jürüsh-turush tuuraluu malımatnama suroo", "ru": "Запрос справки о благонадёжности"}, "https://e-irad.org/forms/MIS-22.pdf", "MIS-22 · PDF"], [{"en": "Written appeal to a state body", "ir": "Mamlekettik organga jazuu jüzündögü kayrıluu", "ru": "Письменное обращение в государственный орган"}, "https://e-irad.org/forms/OG-1.pdf", "OG-1 · PDF"], [{"en": "Send an appeal online", "ir": "Onlayn kayrıluu jönötüü", "ru": "Отправить обращение онлайн"}, "https://e-irad.org/appeals/", "e-Irad"]]};
  var SVC_L = {"svcH": {"en": "Forms and online services", "ir": "Formalar jana onlayn kızmattar", "ru": "Бланки и онлайн-услуги"}, "svcAll": {"en": "All forms on e-Irad", "ir": "e-Iraddagı bardık formalar", "ru": "Все бланки на e-Irad"}, "newsH": {"en": "In the news", "ir": "Jañılıktarda", "ru": "В новостях"}}, NEWS_HOST = "jandarm.iradgov.org", newsP;
  function linkBoxes() {
    var wrap = $("main .wrap"); if (!wrap) return;
    $$("#svc-box, #news-box").forEach(function (b) { b.parentNode.removeChild(b); });
    var host = $("aside", wrap) || wrap, L = SVC[PAGE];
    if (L && L.length) {
      var box = document.createElement("div");
      box.id = "svc-box"; box.className = "card tone"; box.style.marginTop = "16px";
      box.innerHTML = "<h3>" + esc(tri(SVC_L.svcH)) + '</h3><ul style="margin:0;padding-left:18px">' + L.map(function (x) {
        return '<li style="margin:4px 0"><a href="' + x[1] + '">' + esc(tri(x[0])) + "</a>" + (x[2] ? ' <span class="small muted">' + esc(tri(x[2])) + "</span>" : "") + "</li>";
      }).join("") + '</ul><p class="small" style="margin-bottom:0"><a href="https://e-irad.org/forms.html">' + esc(tri(SVC_L.svcAll)) + "</a></p>";
      host.appendChild(box);
    }
    if (PAGE !== "home") return;
    newsP = newsP || Promise.all(["https://iradone.com/data/sitelinks.json", "https://talasherald.com/data/sitelinks.json"].map(function (u) {
      return fetch(u).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; });
    }));
    newsP.then(function (feeds) {
      var items = [];
      feeds.forEach(function (f) { if (f && f.sites && f.sites[NEWS_HOST]) f.sites[NEWS_HOST].forEach(function (s) { items.push({ title: s.title, url: s.url, date: s.date, outlet: f.outlet }); }); });
      if (!items.length || $("#news-box")) return;
      items.sort(sortByDate);
      var box = document.createElement("div");
      box.id = "news-box"; box.className = "card"; box.style.marginTop = "16px";
      box.innerHTML = "<h3>" + esc(tri(SVC_L.newsH)) + '</h3><ul style="margin:0;padding-left:18px">' + items.slice(0, 5).map(function (s) {
        return '<li style="margin:6px 0"><a href="' + esc(s.url) + '">' + esc(s.title) + '</a><br><span class="small muted">' + esc(s.outlet) + " · " + esc(fmtDate(s.date)) + "</span></li>";
      }).join("") + "</ul>";
      host.appendChild(box);
    });
  }

  function render() {
    chrome();
    staticText();
    dates();
    countdowns();
    notices();
    register();
    if (EXTRA) EXTRA();
    linkBoxes();
  }
  render();
})();

/* holiday, half-mast, pass and power notices shared by the state sites (iradgov.org/assets/irad-bar.js) */
(function () {
  var s = document.createElement("script");
  s.src = "https://iradgov.org/assets/irad-bar.js"; s.defer = true; s.setAttribute("data-kind", "gov");
  document.head.appendChild(s);
})();
