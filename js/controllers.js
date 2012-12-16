function MainController($scope, $element, $http){

  $http.get('data/formats.json').success(function(data){
    $scope.formats = data
    $scope.selectedFormat = $scope.formats[0]
  })

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
      return field.value || field.name
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