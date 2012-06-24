var testHelper = {};

var ZOMBIE = { urlPrefix: "app" };

(function (Z) {
  "use strict";

  var head = document.getElementsByTagName("head")[0] || document.documentElement;

  var loadScript = function (src, callback) {
    var script = document.createElement("script");

    var done = false;
    script.onload = script.onreadystatechange = function () {
      script.loaded = true;
      if (!done && (!this.readyState ||
                    this.readyState === "loaded" ||
                    this.readyState === "complete")) {
        done = true;
        script.onload = script.onreadystatechange = null;
        callback();
      }
    };

    script.loaded = false;
    script.src = src;

    head.insertBefore(script, head.firstChild);
    setTimeout(function () {
      if (!script.loaded) {
        throw new Error("SCRIPT NOT LOADED: " + script.src);
      }
    }, 300);
  };

  var loadScriptsSerially = function (sources, callback) {
    if (sources.length === 0) { return callback(); }
    loadScript(sources[0], function () {
      loadScriptsSerially(sources.slice(1), callback);
    });
  };

  var loadScriptsIn = function (html, callback) {
    var matches = html.match(/script src="[^"]+/g);
    matches = matches.map(function (s) { return Z.urlPrefix + s.substring(12); });
    loadScriptsSerially(matches, callback);
  };

  testHelper.loadPage = function (url, callback) {
    jQuery.get(Z.urlPrefix + url, function (html) {
      document.body.innerHTML = html;
      loadScriptsIn(html, function () {
        Z.pageInitialized.then(callback);
      });
    });
  };

  testHelper.getPageContents = function (url, callback) {
    jQuery.get(Z.urlPrefix + url, callback);
  };

}(ZOMBIE));