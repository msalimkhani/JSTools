(function (global, factory) {
    if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
        // CommonJS (Node.js classic)
        module.exports = factory();
    } else if (typeof define === "function" && define.amd) {
        // AMD (RequireJS)
        define([], factory);
    } else {
        // Browser global (classic JS)
        global.JSTools = factory();
    }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
    "use strict";

    /**
     * @type {Map<{Element: HTMLElement, PlaceHolder: Comment}>}
     * */
    const _elementStore = new Map();

    /**
     * Get The Random Id
     * */
    function randomIdGenerator() {
        return "_" + Math.random().toString(36).slice(2, 9);
    }

    /**
     * Add Item To Element Store(internal function)
     * @param {string} id The Key Of Element
     * @param {{Element: HTMLElement, PlaceHolder: Comment}} item The Item
     * */
    function addToElementStore(id, item) {
        if (_elementStore.has(id)) {
            _elementStore.delete(id);
        }
        _elementStore.set(id, item);
    }

    /**
     * Gets The Item From Element Store(internal function)
     * @param {string} id The Element Key Identifier
     * @returns {{Element: HTMLElement, PlaceHolder: Comment}}
     * */
    function getFromElementStore(id) {
        return _elementStore.get(id);
    }

    function removeFromElementStore(id) {
        _elementStore.delete(id);
    }

    /**
     * Hides(Removes) Element With Selector Given From DOM With the possibility of return to DOM
     * @param {string} selector
     * */
    function HideElementFromDom(selector) {
        const randomId = randomIdGenerator();

        const element = document.querySelector(selector);

        if (!element) {
            console.error("Element with Given Selector not found");
            return;
        }

        let placeHolder = document.createComment("");

        element.parentNode.replaceChild(placeHolder, element);

        addToElementStore(randomId, {
            PlaceHolder: placeHolder,
            Element: element,
        });

        return randomId;
    }

    /**
     * Shows(Revival) The Element To DOM Tree With key returned by HideElementFromDom function.
     * */
    function RevivalElementToDom(key) {
        const fromElementStore = getFromElementStore(key);

        if (!fromElementStore) {
            console.error("Element with Given Key not found in Element Store");
            return;
        }

        const elem = fromElementStore.Element;
        const placeHolder = fromElementStore.PlaceHolder;

        if (elem && placeHolder) {
            placeHolder.parentNode.replaceChild(elem, placeHolder);
        }

        removeFromElementStore(key);
    }

    return {HideElementFromDom, RevivalElementToDom};
});
