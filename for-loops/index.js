    function addToList = function() {
    const myList = document.getElementById('my-list');
    
    for (let i = 0; i <= 5; i = i + 1) {
            elfCode.appendToList(myList, i);
        }   
    }
window.onload = () => {
    /*
    * listButton: variable
    *
    */
    const listButton = document.getElementById('run-for-loop');
/* gitWlementById: allow the js and by calling it by id
*/
    listButton.onclick = addToList;
}                    
