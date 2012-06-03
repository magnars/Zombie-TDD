if (typeof require === "function" && typeof module !== "undefined") {
  var buster = require("buster");
  var ZOMBIE = { eventHub: require("../../lib/shared/event-hub") };
}

(function (Z) {
  "use strict";

  buster.testCase('Event Hub', {
    "single event": {
      setUp: function () {
        this.sub = { callback: this.spy() };
        this.faye = { subscribe: this.stub().returns(this.sub) };
        this.hub = Z.eventHub.create(this.faye);
      },

      "delegate subscribe to faye client": function () {
        var callback = this.spy();

        this.hub.on("create", callback);

        assert.calledOnceWith(this.faye.subscribe, "/create", callback);
      },

      "resolve promise when subscription is success": function () {
        var listener = this.spy();
        this.hub.on("create", this.spy()).then(listener);

        refute.called(listener);

        this.sub.callback.invokeCallback();

        assert.called(listener);
      }
    },

    "multiple events": {
      setUp: function () {
        this.sub1 = { callback: this.spy() };
        this.sub2 = { callback: this.spy() };
        this.faye = { subscribe: this.stub() };
        this.faye.subscribe.withArgs("/event1").returns(this.sub1);
        this.faye.subscribe.withArgs("/event2").returns(this.sub2);
        this.hub = Z.eventHub.create(this.faye);
      },

      "delegate subscribes to faye client": function () {
        var callback = this.spy();

        this.hub.on({
          "event1": callback,
          "event2": callback
        });

        assert.calledWith(this.faye.subscribe, "/event1", callback);
        assert.calledWith(this.faye.subscribe, "/event2", callback);
      },

      "resolve promise when all subscriptions are successful": function () {
        var listener = this.spy();
        this.hub.on({
          "event1": this.spy(),
          "event2": this.spy()
        }).then(listener);

        refute.called(listener);

        this.sub1.callback.invokeCallback();

        refute.called(listener);

        this.sub2.callback.invokeCallback();

        assert.called(listener);
      }
    }
  });
}(ZOMBIE));