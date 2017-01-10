/**
 * Easy to use XMLHttpRequest class using Javascript Promises
 *
 * @example
 * let request = new Request();
 * request.debug = true; // outputs more information to the console
 * request.get('https://reqres.in/api/users/2')
 *      .then(successHandler)
 *      .catch(errorHandler)
 *
 * request.post('https://reqres.in/api/users', {name: 'Léon'})
 *      .then(successHandler)
 *      .catch(errorHandler)
 *
 * @author Simon Vreux
 * @version 0.1
 *
 */

class Request {

    constructor () {
        this.debug = false;
        this.format = 'json';
    }

    /**
     * GET interface
     *
     * @param {String} url
     * @returns {Function}
     */
    get (url) {
        return this._call('GET', url);
    }

    /**
     * POST interface
     *
     * @param {String} url
     * @param {Object} data
     * @returns {Function}
     */
    post (url, data = null) {
        return this._call('POST', url, data);
    }

    /**
     * Call the correct XHR method, wrapped in a Promise
     *
     * @param {String} method
     * @param {String} url
     * @param {Object} data
     * @returns {Promise}
     */
    _call (method, url, data = null) {
        let _this = this;

        return new Promise ((resolve, reject) => {
            return _this._send(method, url, data, resolve, reject);
        });
    }

    /**
     * Create and send the XMLHttpRequest
     *
     * @param {String} method
     * @param {String} url
     * @param {Object} data
     * @param {Function} resolve
     * @param {Function} reject
     * @returns null
     */
    _send (method, url, data, resolve, reject) {
        let _this = this;
        let xhr = new XMLHttpRequest();

        xhr.open(method, url, true);

        // set header
        // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        // xhr.withCredentials = false;

        if (method === 'POST') xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        xhr.onload = () => {
            if (xhr.readyState === XMLHttpRequest.DONE ) {
                console.log('done');
                if (xhr.status === 200) {
                    _this._debug('✔ GET success', [method, url, xhr]);
                    resolve(_this._parseResponseData(xhr.response));
                } else if (xhr.status === 201) {
                    _this._debug('✔ POST success', [method, url, xhr]);
                    resolve(_this._parseResponseData(xhr.response));
                } else {
                    _this._debug('✘ ' + method + ' error', [method, url, xhr]);
                    reject(xhr);
                }
            }
        };

        xhr.send(_this._encodePostData(data));

        this._debug('⚫ ' + method + ' sent', [method, url, xhr]);
    }

    /**
     * URL encode data object
     *
     * @param {Mixed} data
     * @returns {String}
     */
    _encodePostData (data) {
        if (data && (typeof data === 'object')) {
            let encoded = [];
            for (let i in data) {
                if (data.hasOwnProperty(i)) {
                    encoded.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
                }
            }
            return encoded.join('&');
        }
        return data;
    }

    /**
     * Transform response data from JSON/XML to object
     * TODO: support XML
     *
     * @param {Object} responseData
     */
    _parseResponseData (responseData) {
        if (this.format === 'json') {
            return JSON.parse(responseData);
        }
        return responseData;
    }

    /**
     * Display debug information it this.debug is set to true
     *
     * @private
     */
    _debug () {
        this.debug && console.log.apply(console, arguments);
    }
}
