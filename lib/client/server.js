var ZOMBIE = this.ZOMBIE || {};

(function (Z) {

  var urlPrefix = function () { return Z.urlPrefix || ""; };

  Z.server = {
    getCurrentBuildingProperties: function (callback) {
      jQuery.getJSON(urlPrefix() + "/current-building.json", callback);
    }
  };

}(ZOMBIE));
