function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}


const ul = document.getElementById('players');
const url = 'http://localhost:3000/players';
fetch(url)
.then((resp) => resp.json())
.then(function(data) {
    
  let players = data;
  return players.map(function(player) {
    let li = createNode('li'),
        span = createNode('span');
    span.innerHTML = `${player.name} ${player.points}`;
    append(li, span);
    append(ul, li);
  })
})
.catch(function(error) {
  console.log(error);
});   

function postPlayer(name, points){

    const urlpost =  "http://localhost:3000/addPlayer";
    let data =  { name: name, points: points }
    // Create our request constructor with all the parameters we need
    var request = new Request(urlpost, {
        method: 'POST', 
        body:  JSON.stringify(data),
        headers: {
            "Content-Type": "application/json" 
        }

    });

    fetch(request)
   .then(res => res.json())
.then(res => {
 
})
.catch(err => {
    console.log(err)
  })
    
    
}

