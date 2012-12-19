function MainController($scope, $http, $filter){

  $http.get('data/formats.json').success(function(data){
    $scope.formats = data
    $scope.selectedFormat = $scope.formats[0]
  })

  $scope.tagText = function(text, tag){
    return '<' + tag + '>' + text + '</' + tag + '>'
  }

  $scope.citations = []
  $scope.showEdit = false

  $scope.addCitation = function(selectedFormat){

    var newCitation = {}  

    angular.copy(selectedFormat, newCitation)
    this.citations.push(newCitation)
    this.editCitation(newCitation)
  }

  $scope.editCitation = function(citation){
    $scope.selectedCitation = citation
    $scope.showEdit = true
  }

  $scope.compileCitation = function(citation){
    var compiled = ""

    function fieldValue(field){
      var value = field.value || field.name
      if (field.style) value = $scope.tagText(value, field.style)
      return value
    }

    if (citation.isSameAuthor) {
      // repeated works by the same author have '---' instead of the author repeatedly displayed.
      compiled += '---'
    } else if (citation.authors.length > 3){
      //author count greater than 4 results in first author listed, then et al
      compiled += ' ' + citation.authors[0].lastName + ', ' + citation.authors[0].firstName + ', et al'
    } else {
      //list out all authors
      angular.forEach(citation.authors, function(author, index){
        if (index == 0){
          compiled += ' ' + author.lastName + ', ' + author.firstName
        } else {
          compiled += (index != citation.authors.length-1) ? ',' : ', and'
          compiled += ' ' + author.firstName + ' ' + author.lastName
        }
      })
    }

    if (citation.authors.length > 0) compiled += '.'

    angular.forEach(citation.fields, function(field){
      //list out remaining fields
      compiled += ' ' + fieldValue(field) + field.delimiter
    })
    return compiled
  }

  $scope.sortCitations = function(){
    this.citations = $filter('orderBy')(this.citations, function(citation){
      return (citation.authors.length > 0) ? citation.authors[0].lastName : citation.fields[0].value
    })
  }

  $scope.$watch('showEdit', function(newValue, oldValue){
    //Sort citations triggered when user finishes edit
    var finishedEdit = !newValue && oldValue
    if (finishedEdit) $scope.sortCitations()
  }, true)

  $scope.removeCitation = function(index){
    this.citations.splice(index, 1)
  }

  $scope.addAuthor = function(authors){
    var newAuthor = {
      "firstName": "First Name",
      "lastName" : "Last Name"
    }
    authors.push(newAuthor)
  }

  $scope.removeAuthor = function(authors){
    authors.pop()
  }


}