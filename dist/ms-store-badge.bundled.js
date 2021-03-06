var e,
  i,
  t,
  n,
  a,
  s = function (e, i, t, n, a) {
    if ("m" === n) throw new TypeError("Private method is not writable");
    if ("a" === n && !a)
      throw new TypeError("Private accessor was defined without a setter");
    if ("function" == typeof i ? e !== i || !a : !i.has(e))
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it"
      );
    return "a" === n ? a.call(e, t) : a ? (a.value = t) : i.set(e, t), t;
  },
  r = function (e, i, t, n) {
    if ("a" === t && !n)
      throw new TypeError("Private accessor was defined without a getter");
    if ("function" == typeof i ? e !== i || !n : !i.has(e))
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it"
      );
    return "m" === t ? n : "a" === t ? n.call(e) : n ? n.value : i.get(e);
  };
class o extends HTMLElement {
  constructor() {
    super(),
      (this.productId = ""),
      (this.cid = ""),
      (this.windowMode = "popup"),
      (this.theme = "dark"),
      (this.size = "large"),
      (this.language = ""),
      (this.animation = "off"),
      e.set(this, o.englishLanguage),
      i.set(this, "prod"),
      t.set(
        this,
        "dev" === r(this, i, "f")
          ? "iframe.html"
          : "https://get.microsoft.com/iframe.html"
      ),
      n.set(
        this,
        "dev" === r(this, i, "f")
          ? "/images"
          : "https://getbadgecdn.azureedge.net/images"
      ),
      a.set(this, { isWindows: !1, windowsVersion: null, isEdgeBrowser: !1 }),
      this.getPlatformDetails().then((e) => s(this, a, e, "f")),
      s(this, e, o.getSupportedLanguageFromCode(this.language), "f"),
      (this.language = r(this, e, "f").code);
    const h = this.attachShadow({ mode: "open" }),
      l = this.createStyle(),
      d = this.createHtml();
    h.appendChild(l), h.appendChild(d);
  }
  updateImageSrc() {
    var e;
    const i =
      null === (e = this.shadowRoot) || void 0 === e
        ? void 0
        : e.querySelector("img");
    i &&
      (i.setAttribute("src", this.getImageSource()),
      (i.className = this.getImageClass()));
  }
  connectedCallback() {}
  static get observedAttributes() {
    return [
      "productid",
      "cid",
      "windowmode",
      "theme",
      "size",
      "language",
      "animation",
    ];
  }
  attributeChangedCallback(i, t, n) {
    var a;
    "size" !== i || ("large" !== n && "small" !== n) || t === n
      ? "language" !== i || n === t || ("string" != typeof n && n)
        ? "productid" === i && n !== t && "string" == typeof n
          ? (this.productId = n)
          : "cid" === i && n !== t && "string" == typeof n
          ? (this.cid = n)
          : "windowmode" !== i || ("popup" !== n && "full" !== n) || t === n
          ? "theme" !== i ||
            ("dark" != n && "light" !== n && "auto" !== n) ||
            t === n
            ? "animation" !== i ||
              ("on" !== n && "off" !== n) ||
              t === n ||
              ((this.animation = n),
              null === (a = this.shadowRoot) ||
                void 0 === a ||
                a.appendChild(this.createStyle()))
            : ((this.theme = n), this.updateImageSrc())
          : ((this.windowMode = n), this.updateImageSrc())
        : (s(this, e, o.getSupportedLanguageFromCode(n), "f"),
          (this.language = r(this, e, "f").code),
          this.updateImageSrc())
      : ((this.size = n), this.updateImageSrc());
  }
  createStyle() {
    var e = "";
    e =
      "on" === this.animation
        ? "\n      :host {\n        display: inline-block;\n        cursor: pointer;\n        height: fit-content;\n      }\n\n      iframe {\n        border: none;\n        width: 0px;\n        height: 0px;\n      }\n\n      img {\n        width: auto;\n        border-radius: 8px;\n      }\n\n      img:hover {\n      transform: translate(0, -4px);\n        cursor: pointer;\n        box-shadow: 0 12px 40px 2px rgba(0, 0, 0, 0.05);\n        transition: 0.35s ease;\n      }\n      \n      img.small {\n        max-height: 52px;\n      }\n\n      img.large {\n        max-height: 104px;\n      }"
        : "\n      :host {\n        display: inline-block;\n        cursor: pointer;\n        height: fit-content;\n      }\n\n      iframe {\n        border: none;\n        width: 0px;\n        height: 0px;\n      }\n\n      img {\n        width: auto;\n        border-radius: 8px;\n      }\n\n      img.small {\n        max-height: 52px;\n      }\n\n      img.large {\n        max-height: 104px;\n      }";
    const i = document.createElement("style");
    return (i.textContent = e), i;
  }
  createHtml() {
    const e = document.createElement("div");
    return (
      e.appendChild(this.createImage()), e.appendChild(this.createIFrame()), e
    );
  }
  async getPlatformDetails() {
    const e = navigator;
    if (e.userAgentData && e.userAgentData.getHighEntropyValues)
      try {
        const i = await e.userAgentData.getHighEntropyValues([
            "platform",
            "platformVersion",
          ]),
          t = "Windows" === i.platform;
        return {
          isWindows: t,
          windowsVersion: t
            ? parseFloat((null == i ? void 0 : i.platformVersion) || "")
            : null,
          isEdgeBrowser: (e.userAgentData.brands || []).some(
            (e) => "Microsoft Edge" === e.brand
          ),
        };
      } catch (e) {}
    const i = new RegExp(/.?Windows NT (\d+\.?\d?\.?\d?\.?\d?)/gi).exec(
      navigator.userAgent
    );
    return i && i.length >= 2
      ? {
          isWindows: !0,
          windowsVersion: parseFloat(i[1]),
          isEdgeBrowser: !!navigator.userAgent.match("Edg/"),
        }
      : {
          isWindows: !1,
          windowsVersion: null,
          isEdgeBrowser: !!navigator.userAgent.match("Edg/"),
        };
  }
  static getSupportedLanguageFromCode(e) {
    if (!e) return o.getSupportedLanguageFromUserAgent();
    const i = o.supportedLanguages.find((i) => i.code === e.toLowerCase());
    return i || o.englishLanguage;
  }
  static getSupportedLanguageFromUserAgent() {
    const e = o.supportedLanguages.find((e) => e.name === navigator.language);
    if (e) return e;
    if (navigator.languages) {
      var i = navigator.languages
        .map((e) => o.supportedLanguages.find((i) => i.code === e))
        .find((e) => !!e);
      if (i) return i;
    }
    const t = navigator.language.indexOf("-");
    if (t > 0) {
      const e = navigator.language.substring(0, t),
        i = o.supportedLanguages.find((i) => i.name === e);
      if (i) return i;
    }
    return o.englishLanguage;
  }
  createIFrame() {
    const e = document.createElement("iframe");
    return (
      e.setAttribute("loading", "eager"),
      (e.title = "Microsoft Store App Badge"),
      (e.src = r(this, t, "f")),
      e
    );
  }
  createImage() {
    const e = document.createElement("img");
    return (
      e.setAttribute("part", "img"),
      (e.src = this.getImageSource()),
      (e.className = this.getImageClass()),
      (e.alt = "Microsoft Store app badge"),
      e.addEventListener("click", (e) => this.launchApp(e)),
      e
    );
  }
  getImageSource() {
    var i = null;
    if ("dark" === this.theme)
      i =
        "large" === this.size
          ? r(this, e, "f").imageLarge.fileName
          : r(this, e, "f").imageSmall.fileName;
    else if ("light" === this.theme)
      i =
        "large" === this.size
          ? r(this, e, "f").imageLargeLight.fileName
          : r(this, e, "f").imageSmallLight.fileName;
    else if ("auto" === this.theme) {
      i = window.matchMedia("(prefers-color-scheme:dark)").matches
        ? "large" === this.size
          ? r(this, e, "f").imageLargeLight.fileName
          : r(this, e, "f").imageSmallLight.fileName
        : "large" === this.size
        ? r(this, e, "f").imageLarge.fileName
        : r(this, e, "f").imageSmall.fileName;
    }
    return `${r(this, n, "f")}/${i}`;
  }
  getImageClass() {
    return "large" === this.size ? "large" : "small";
  }
  launchApp(e) {
    this.productId &&
      (r(this, a, "f").isWindows && r(this, a, "f").isEdgeBrowser
        ? this.launchStoreAppPdpViaWhitelistedDomain()
        : r(this, a, "f").isWindows
        ? this.launchStoreAppPdp()
        : this.launchStoreWebPdp(e));
  }
  launchStoreAppPdp() {
    const e =
      "ms-windows-store://pdp/?productid=" +
      this.productId +
      (this.cid ? "&cid=" + encodeURIComponent(this.cid) : "") +
      "&referrer=appbadge&source=" +
      encodeURIComponent(window.location.hostname.toLowerCase()) +
      ("popup" === this.windowMode ? "&mode=mini&pos=" : "&pos=") +
      Math.floor(window.screenLeft * window.devicePixelRatio) +
      "," +
      Math.floor(window.screenTop * window.devicePixelRatio) +
      "," +
      Math.floor(window.outerWidth * window.devicePixelRatio) +
      "," +
      Math.floor(window.outerHeight * window.devicePixelRatio);
    (location.href = e), console.log(e);
  }
  launchStoreAppPdpViaWhitelistedDomain() {
    var e, i;
    if ("full" === this.windowMode) this.launchStoreAppPdp();
    else {
      const t =
        null === (e = this.shadowRoot) || void 0 === e
          ? void 0
          : e.querySelector("iframe");
      if (t) {
        const e = { message: "launch", productId: this.productId };
        null === (i = t.contentWindow) || void 0 === i || i.postMessage(e, "*");
      }
    }
  }
  launchStoreWebPdp(e) {
    var i = "";
    (i = this.cid
      ? `https://apps.microsoft.com/store/detail/${
          this.productId
        }?cid=${encodeURIComponent(
          this.cid
        )}&referrer=appbadge&source=${encodeURIComponent(
          window.location.hostname.toLowerCase()
        )}`
      : `https://apps.microsoft.com/store/detail/${
          this.productId
        }?referrer=appbadge&source=${encodeURIComponent(
          window.location.hostname.toLowerCase()
        )}`),
      e.ctrlKey ? window.open(i, "_blank") : (window.location.href = i);
  }
  static createSupportedLanguages() {
    let e = new Map();
    e.set("Arabic", "ar"),
      e.set("Belarusian", "be"),
      e.set("Bengali", "bn"),
      e.set("Bosnian", "bs"),
      e.set("Bulgarian", "bg"),
      e.set("Chinese_Simplified", "zh-cn"),
      e.set("Chinese_Traditional", "zh-tw"),
      e.set("Croatian", "hr"),
      e.set("Czech", "cs"),
      e.set("Danish", "da"),
      e.set("Dutch", "nl"),
      e.set("English", "en"),
      e.set("Estonian", "et"),
      e.set("Filipino", "fil"),
      e.set("Finnish", "fi"),
      e.set("French", "fr"),
      e.set("German", "el"),
      e.set("Greek", "be"),
      e.set("Hebrew", "he"),
      e.set("Hindi", "hi"),
      e.set("Hungarian", "hu"),
      e.set("Indonesian", "id"),
      e.set("Italian", "it"),
      e.set("Japanese", "ja"),
      e.set("Korean", "ko"),
      e.set("Latvian", "lv"),
      e.set("Lithuanian", "lt"),
      e.set("Malay", "ms"),
      e.set("Norwegian", "no"),
      e.set("Polish", "pl"),
      e.set("Portuguese_Brazil", "pt-br"),
      e.set("Portuguese_Portugal", "pt"),
      e.set("Romanian", "ro"),
      e.set("Russian", "ru"),
      e.set("Serbian", "sr"),
      e.set("Slovak", "sk"),
      e.set("Slovenian", "sl"),
      e.set("Spanish", "es"),
      e.set("Swahili", "sw"),
      e.set("Thai", "th"),
      e.set("Turkish", "tr"),
      e.set("Ukranian", "uk"),
      e.set("Vietnamese", "vi");
    let i = [];
    for (let t of e.keys()) {
      let n = {
        name: t,
        imageSmall: { fileName: t.concat("_S.png") },
        imageLarge: { fileName: t.concat("_L.png") },
        imageSmallLight: { fileName: t.concat("_S.png") },
        imageLargeLight: { fileName: "English_LL.svg" },
        code: e.get(t) || "",
      };
      i.push(n);
    }
    return i;
  }
}
(e = new WeakMap()),
  (i = new WeakMap()),
  (t = new WeakMap()),
  (n = new WeakMap()),
  (a = new WeakMap()),
  (o.englishLanguage = {
    name: "English",
    code: "en",
    imageSmall: { fileName: "English_S.png" },
    imageSmallLight: { fileName: "English_L.png" },
    imageLarge: { fileName: "English_L.png" },
    imageLargeLight: { fileName: "English_LL.svg" },
  }),
  (o.supportedLanguages = o.createSupportedLanguages()),
  customElements.define("ms-store-badge", o);
