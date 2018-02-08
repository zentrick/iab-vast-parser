/**
 * Base class for VAST {@link Extension} as well as {@link CreativeExtension}.
 *
 * @class AbstractExtension
 * @abstract
 * @protected
 * @author Tim De Pauw <tim.depauw@zentrick.com>
 * @copyright © 2018 Zentrick nv
 */
export class AbstractExtension {
  // Attribute(s).

  /**
   * The MIME type of any code that might be included in the extension.
   *
   * @type {?string}
   */
  get type () {
    return this._type
  }

  set type (value) {
    this._type = value
  }

  // Content.

  /**
   * The Custom XML object.
   *
   * Bounded: 1
   *
   * @type {String}
   */
  get xmlElement () {
    return this._xml
  }

  set xmlElement (value) {
    this._xml = value
  }
}
