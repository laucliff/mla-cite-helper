'use strict';

describe('Controllers', function(){

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
      expect(scope.tagText('element', 'div')).toEqual('<div>element</div>')
    })

    it('should load source options', function(){
      $httpBackend.flush()
      expect(scope.formats).toEqual(testdata)
      expect(scope.selectedFormat).toEqual(testdata[0])
    })

    var citation = testdata[0]

    it('should assign element to selected, and raise showEdit flag', function(){
      scope.editCitation(citation)
      expect(scope.showEdit).toEqual(true)
      expect(scope.selectedCitation).toBe(citation)
    })

    it('should add given citation to citations', function(){
      expect(scope.citations).toEqual([])
      scope.addCitation(citation)
      expect(scope.citations).toEqual([citation])
      
      var testval = {a:1}

      scope.addCitation(testval)
      expect(scope.citations).toEqual([citation,testval])
    })

    it('should add an author', function(){
      expect(citation.authors.length).toEqual(1)
      scope.addAuthor(citation.authors)
      expect(citation.authors.length).toEqual(2)
    })

    it('should compile 1 author', function(){
      var citation ={
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
      expect(scope.compileCitation(citation)).toEqual("Last Name, First Name. <em>Title</em>. Place of Publication: Publisher, Year of Publication. Medium of Publication.")
    })

    it('should compile 2 author', function(){
      var citation =   {
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
      scope.addAuthor(citation.authors)
      var compiled = scope.compileCitation(citation)
      expect(compiled).toEqual("Last Name, First Name, and First Name Last Name. <em>Title</em>. Place of Publication: Publisher, Year of Publication. Medium of Publication.")
    })

    it('should compile >3 author', function(){
      for (var i = 0; i<3;i++){
        scope.addAuthor(citation.authors)
      }
      var compiled = scope.compileCitation(citation)
      expect(compiled).toEqual("Last Name, First Name, et al. <em>Title</em>. Place of Publication: Publisher, Year of Publication. Medium of Publication.")
    })

  })


});