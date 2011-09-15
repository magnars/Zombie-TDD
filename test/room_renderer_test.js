(function (Z) {
  "use strict";

  function findSingleElement(html, selector) {
    var elements = $(html).find(selector);
    assertEquals('jQuery found no elements: ' + selector + '\n' + html,
                 1, elements.length);
    return elements;
  }

  testCase('RoomRendererTest', sinon.testCase({
    "test should render barricade": function () {
      var html = Z.renderRooms({ barricade: 43 });
      
      assertEquals("Barricade: 43% integrity",
        findSingleElement(html, '.barricade').text());
    },
    
    "test should render barricade value for realz": function () {
      var html = Z.renderRooms({ barricade: 13 });
      
      assertEquals("Barricade: 13% integrity",
        findSingleElement(html, '.barricade').text());
    },
    
    "test should render bedroom" : function() {
      var html = Z.renderRooms({ sleepers: 3 });
      assertEquals("Some beds (3 guards)",
        findSingleElement(html, '.bed.room').text());
    },

    "test should render outside" : function() {
      var html = Z.renderRooms({ zombies: 30 });
      assertEquals("Outside (30 zombies)",
        findSingleElement(html, '.outside').text());
    },
    
    "test should render room without guards" : function() {
      var html = Z.renderRooms({ rooms: [ { name: 'Trapdoor' } ] });
      assertEquals("Trapdoor",
        findSingleElement(html, '.room:first').text());
    },
    
    "test should render room with guards" : function() {
      var html = Z.renderRooms({ rooms: [ { 
        name: 'Hiding spot',
        guards: 1
      } ] });
      assertEquals("Hiding spot (1 guard)",
        findSingleElement(html, '.room:first').text());
    },
    
    "test should render several rooms" : function() {
      var html = Z.renderRooms({ rooms: [ 
        { name: 'Trapdoor' },
        { name: 'Hiding spot' }
      ] });
      // Two rooms + bedroom
      assertEquals(2+1, $(html).find('.room').length);
    }
    
  }));
  
}(ZOMBIE));
