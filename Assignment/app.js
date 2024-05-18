const allPlayers = (playerName) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${playerName}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data.player);
            displayPlayers(data);

    })    
};

allPlayers('af');

const displayPlayers = (data) => {
    const playersContainer = document.getElementById("players-container")
    playersContainer.innerHTML = '';

    if(data.player){
        data.player.forEach(player => {
            const playerDiv = document.createElement('div');
            playerDiv.classList.add("col")
            playerDiv.innerHTML = `
                <div class="card bg-dark border border-info">
                    <img src="${player.strThumb}" class="card-img-top  alt="${player.strPlayer}" >
                    <div class="card-body">
                        
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <div>
                                <h3 class=" text-info">${player.strPlayer}</h3>
                            </div>    
                        </div>
                        
                        <h6 class="text-white ">Team: ${player.strTeam}</h6>
                        <p class="text-white m-0" >Nationality: ${player.strNationality}</p>
                        <p class="text-white m-0">Plays ${player.strSport} </p>
                        <p class="text-white m-0">Position ${player.strPosition
                        } </p>
                        
                        <div>
                                <a href=${player.strInstagram} target="_blank" class="text-info m-1"><i class="fa-brands fa-instagram fa-2x"></i></a>
                                <a href=${player.strTwitter}  target="_blank" class="text-info m-1"><i class="fa-brands fa-twitter fa-2x"></i></i></a>
                            </div>
                    </div>
                    <div class="card-footer d-flex align-items-center justify-content-between">
                        <button  onclick="singlePlayer('${player.idPlayer}')"  class="btn btn-info " data-bs-toggle="modal" data-bs-target="#exampleModal"> Details </button>
                        <button id="add-player-button-${player.idPlayer}" onclick="addSinglePlayer('${player.idPlayer}')"  class="btn btn-info " > Add To Team </button>
                    </div>
                </div>
               
            `;
            playersContainer.appendChild(playerDiv);


        })
    }
    else{
        playersContainer.innerHTML = `<h4 class="text-danger ">Sorry !!! No Players Found Of This Name.</h4> `;
    }
}


const handleSearch = (event) => {
    event.preventDefault(); 
    const playerName = document.getElementById('searchInput').value;
    if (playerName) {
        allPlayers(playerName);
    } else {
        document.getElementById('players-container').innerHTML = ''; 
    }
    document.getElementById('searchInput').value = '';
};

document.getElementById('searchForm').addEventListener('submit', handleSearch);


document.getElementById('searchInput').addEventListener('input', function(event) {
    const playerName = event.target.value;
    if (playerName) {
        allPlayers(playerName);
       
    } else {
        document.getElementById('players-container').innerHTML = ''; 
    }
});


const singlePlayer = (id) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
            .then(res=>res.json())
            .then(data=>{
                viewSingleProduct(data.players[0])
        })
}


const viewSingleProduct = (player) => {
    const title = document.getElementById("single-player-title")
    const body = document.getElementById("single-player-body")
    console.log(player.strPlayer)
    title.innerText = player.strPlayer

    body.innerHTML = `
    <div class="card " ">
        <div class="row bg-dark g-0">
            <div class="col-md-4 d-flex justify-content-center align-items-center">
                <img src=${player.strThumb} class="img-fluid rounded-start" alt="...">
            </div>
            
            <div class="col-md-8">
                <div class="card-body">
                    <p class="card-title text-info">Place of Birth: ${player.strBirthLocation} </p>
                    <p class="card-title text-info">Nationality: ${player.strNationality} </p>
                    <p class="card-title text-info">Play: ${player.strSport} </p>
                    <p class="card-title text-info">Position: ${player.strPosition} </p>
                    <p class="text-white">${player.strDescriptionEN.slice(0,100)}</p>
                    <p class="text-white"><small class="text-white">Gender: ${player.strGender} </small></p>
                </div>
            </div>
        </div>
    </div>
    `
}


const addSinglePlayer = (id) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
            .then(res=>res.json())
            .then(data=>{
                handleAddToTeam(data.players[0])
            })
}

let addedPlayers = []
document.getElementById("added-players-qunatity").innerText =0;

const handleAddToTeam = (player) =>{

    if( addedPlayers.length < 11 ){
        if (addedPlayers.some(p => p.idPlayer === player.idPlayer)) {
            alert('Already added');
        } else {
            addedPlayers.push(player);
            document.getElementById(`add-player-button-${player.idPlayer}`).disabled = true;
            document.getElementById(`add-player-button-${player.idPlayer}`).innerText = "Already Added";
            viewAddedPlayers();
        }
    }
    else{
        alert("Sorry You Can't Add More Than 11 Players !!!")
    }   
}

const viewAddedPlayers = () => {
    document.getElementById("added-players-qunatity").innerText = addedPlayers.length;

    const addedPlayersContainer = document.getElementById("added-players-container")
    addedPlayersContainer.innerHTML = '';

    if(addedPlayers){
        addedPlayers.forEach(player => {
            const playerDiv = document.createElement('div');
            playerDiv.classList.add("col")

            document.getElementById("added-players-container").classList.add("border", "border-info")

            playerDiv.innerHTML = `
                <div class="card bg-dark border border-info">
                    <img src="${player.strThumb}" class="card-img-top  alt="${player.strPlayer}" >
                    <div class="card-body">
                    
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <div>
                                <h3 class=" text-info">${player.strPlayer}</h3>
                            </div>
                        </div>

                        <h6 class="text-white ">Team: ${player.strTeam}</h6>
                        <p class="text-white m-0" >Nationality: ${player.strNationality}</p>
                        <p class="text-white m-0">Plays ${player.strSport} </p>
                        <p class="text-white m-0">Position ${player.strPosition
                        } </p>

                        <div>
                        <a href=${player.strInstagram} target="_blank" class="text-info m-1"><i class="fa-brands fa-instagram fa-2x"></i></a>
                        <a href=${player.strTwitter}  target="_blank" class="text-info m-1"><i class="fa-brands fa-twitter fa-2x"></i></i></a>
                    </div>  
                      
                    </div>
                    <div class="card-footer d-flex align-items-center justify-content-between">
                        <button  onclick="singlePlayer('${player.idPlayer}')"  class="btn btn-info " data-bs-toggle="modal" data-bs-target="#exampleModal"> Details </button>
                        <button  onclick="removeFormTeam('${player.idPlayer}')"  class="btn btn-danger " > Remove</button>
                    </div>
                </div>
               
            `;
            addedPlayersContainer.appendChild(playerDiv);
        })
    }
    else{
        addedPlayersContainer.innerHTML = `<h4 class="text-danger ">Sorry !!! No Players Found.</h4> `;
    }
}

const removeFormTeam = (playerID) => {
    addedPlayers = addedPlayers.filter(player => player.idPlayer != playerID);
    document.getElementById(`add-player-button-${playerID}`).disabled = false;
    document.getElementById(`add-player-button-${playerID}`).innerText = "Add To Team";
    viewAddedPlayers();


    
}