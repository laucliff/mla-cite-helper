function MainController($scope, $element, $http){

  $http.get('data/formats.json').success(function(data){
    $scope.formats = data
    $scope.selectedFormat = $scope.formats[0]
  })

  $scope.tagText = function(text, tag){
    return '<' + tag + '>' + text + '</' + tag + '>'
  }

  $scope.citations = []

  $scope.addCitation = function(selectedFormat){

    var newCitation = {}  

    angular.copy(selectedFormat, newCitation)
    this.citations.push(newCitation)
    this.editCitation(newCitation)

  }

  $scope.editCitation = function(citation){
    $scope.selectedCitation = citation
    $scope.showModal = true
  }

  $scope.compileCitation = function(citation){
    var compiled = ""

    var fieldValue = function(field){
      var value = field.value || field.name
      if (field.style) value = $scope.tagText(value, field.style)
      return value
    }

    angular.forEach(citation.fields, function(field){
      compiled = compiled + ' ' + fieldValue(field) + field.delimiter
    })
    return compiled
  }

  $scope.removeCitation = function(index){
    this.citations.splice(index, 1)
  }

}