const params = new URLSearchParams(location.search)
// ?sualdan sonraki hissenin tapir, sonra 
const displayOrder = params.get('displayOrder')
// onun deyerini '' kii goturur ve
let detailedProduct = data.find(last => last.displayOrder == displayOrder)
// onunla datadan match olan elemtni cixarir, netice olaraq biz hemen elelmntin icine daxil oluruq.

const details = document.getElementById('details')
