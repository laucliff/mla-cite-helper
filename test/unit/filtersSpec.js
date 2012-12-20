'use strict';



/* jasmine specs for filters go here */

describe('filter', function() {    
  beforeEach(module('mla-cite-helper'))

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
  },  {
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
  }, {
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
  },  {
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

    
  it('should mark the same author', inject(function($filter){
    var testArray = $filter('groupSameAuthors')(testdata)
    expect(testArray[1].isSameAuthor).toEqual(true)
  }))
})

