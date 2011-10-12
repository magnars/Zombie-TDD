(function (Z) {
  "use strict";

  function assertRoomText(cssClass, text, html) {
    var expected = "<li class='" + cssClass + "'><p>" + text + "</p></li>";
    assert('expected ' + html + ' to contain ' + expected, 
      html.indexOf(expected) >= 0);
  }

  testCase('BuildingRendererTest', sinon.testCase({
    "test should render barricade": function () {
      var html = Z.renderBuilding({ barricade: 43 });
      
      assertRoomText('barricade', 'Barricade: 43% integrity', html);
    },
    
    "test should render barricade value for realz": function () {
      var html = Z.renderBuilding({ barricade: 13 });
      
      assertRoomText('barricade', "Barricade: 13% integrity", html);
    },
    
    "test should render bedroom": function () {
      var html = Z.renderBuilding({ sleepers: 3 });
      assertRoomText('bedroom', "Some beds (3 guards)", html);
    },

    "test should render outside": function () {
      var html = Z.renderBuilding({ zombies: 30 });
      assertRoomText('outside', "Outside (30 zombies)", html);
    },
    
    "test should render room without guards": function () {
      var html = Z.renderBuilding({ rooms: [ { name: 'Trapdoor' } ] });
      assertRoomText('room', "Trapdoor", html);
    },
    
    "test should render room with guards": function () {
      var html = Z.renderBuilding({ rooms: [ { 
        name: 'Hiding spot',
        guards: 1
      } ] });
      assertRoomText('room', "Hiding spot (1 guard)", html);
    },
    
    "test should render several rooms": function () {
      var html = Z.renderBuilding({ rooms: [ 
        { name: 'Trapdoor' },
        { name: 'Hiding spot' }
      ] });
      assertRoomText('room', "Trapdoor", html);
      assertRoomText('room', "Hiding spot", html);
    }
    
  }));
  
}(ZOMBIE));
