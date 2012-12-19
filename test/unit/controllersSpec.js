'use strict';

var testdata = [
  {
    "type":"Book",
    "authors":[
      {
        "firstName":"First Name",
        "lastName":"Last Name"
      }
    ],
    "fields":[
      {
        "name":"Title",
        "delimiter":".",
        "style":"em"
      },
      {
        "name":"Place of Publication",
        "delimiter":":"
      },
      {
        "name":"Publisher",
        "delimiter":","
      },
      {
        "name":"Year of Publication",
        "delimiter":"."
      },
      {
        "name":"Medium of Publication",
        "delimiter":"."
      }
    ]
  }
]

describe('Controllers', function(){

  describe('MainController', function(){
    var scope, ctrl, $httpBackend

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller){
      $httpBackend = _$httpBackend_
      $httpBackend.expectGET('data/formats.json')
        .respond(testdata)
      scope = $rootScope.$new()
      ctrl = $controller(MainController, {$scope: scope})
    }))

    it('should wrap element with div tags', function(){
      expect(scope.tagText('element', 'div')).toBe('<div>element</div>')
    })

  })


});