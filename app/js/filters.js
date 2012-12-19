angular.module('filters',[])
.filter('groupSameAuthors', function(){
  return function(citations){
    var filteredCitations = []
    var currentAuthors = []
    angular.forEach(citations, function(citation){
      var filteredCitation = {}
      angular.copy(citation, filteredCitation)
      if (angular.equals(currentAuthors,citation.authors) && citation.authors.length > 0){
        filteredCitation.isSameAuthor = true
      } else {
        currentAuthors = citation.authors
      }
      filteredCitations.push(filteredCitation)
    })
    return filteredCitations
  }
})