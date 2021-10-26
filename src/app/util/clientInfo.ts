/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

export enum PlatformType {
  iOS = 'ios',
  Android = 'android',
  WindowsPhone = 'windows-phone',
  Desktop = 'desktop'
}

export enum BrowserType {
  /**
   * Chrome.
   */
  Chrome = 'chrome',

  /**
   * Edge.
   */
  Edge = 'edge',

  /**
   * Edge based on chromium.
   */
  EdgeChromium = 'edge-chromium',

  /**
   * Firefox.
   */
  Firefox = 'firefox',

  /**
   * IE 10 or lower.
   */
  IE = 'ie',

  /**
   * IE 11.
   */
  IE11 = 'ie11',

  /**
   * Opera.
   */
  Opera = 'opeara',

  /**
   * Safari.
   */
  Safari = 'safari',

  /**
   * Unknown browser.
   */
  Unknown = 'unknown-browser'
}

/**
 * Client Info service.
 * https://developers.whatismybrowser.com/useragents
 */
export default class ClientInfo {

  static get platform(): PlatformType {
    if (/windows phone/i.test(navigator.platform) || /windows phone/i.test(navigator.userAgent)) {
       return PlatformType.WindowsPhone;
    }

    if (/android/i.test(navigator.platform) || /android/i.test(navigator.userAgent)) {
      return PlatformType.Android;
    }

    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream) {
      return PlatformType.iOS;
    }

    return PlatformType.Desktop;
  }

  static get browser(): BrowserType {
    if (this.isIE10orLower()) {
      return BrowserType.IE;
    }

    if (this.isIE11()) {
      return BrowserType.IE11;
    }

    if (this.isEdge()) {
      return BrowserType.Edge;
    }

    if (this.isChrome()) {
      return BrowserType.Chrome;
    }

    if (this.isEdgeCromium()) {
      return BrowserType.EdgeChromium;
    }

    if (this.isFirefox()) {
      return BrowserType.Firefox;
    }

    if (this.isOpera()) {
      return BrowserType.Opera;
    }

    if (this.isSafari()) {
      return BrowserType.Safari;
    }

    return BrowserType.Unknown;
  }

  static isChrome(): boolean {
    return (/Chrome/i.test(navigator.userAgent) && /Google Inc/i.test(navigator.vendor))
      // Opera also has Chrome and Goolge Inc
      && !/Opera|opr\/\d+\./i.test(navigator.userAgent)
      // Edg Chromium
      && !/Edg\/\d+/i.test(navigator.userAgent);
  }

  static isFirefox(): boolean {
    return /Firefox\/\d+\./i.test(navigator.userAgent);
  }

  static isIE10orLower(): boolean {
    return /MSIE (7|8|9|10)/i.test(navigator.userAgent);
  }

  static isIE11(): boolean {
    return /rv:11.0/i.test(navigator.userAgent);
  }

  static isEdgeCromium(): boolean {
    return /Chrome/i.test(navigator.userAgent) && /Edg\/\d+/i.test(navigator.userAgent);
  }

  static isEdge(): boolean {
    return /Edge\/\d+\./i.test(navigator.userAgent);
  }

  static isIEOrEdge(): boolean {
    return this.isIE10orLower() || this.isIE11() || this.isEdge();
  }

  static isOpera(): boolean {
    return /(Opera|opr)\/\d+\./i.test(navigator.userAgent);
  }

  static isSafari(): boolean {
    return /Safari\/\d+\./i.test(navigator.userAgent) && !/Chrome/i.test(navigator.userAgent);
  }
}
