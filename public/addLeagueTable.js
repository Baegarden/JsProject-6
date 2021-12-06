function makeTableElement(leagueId, trId, element, mode) {
    const newTd = document.createElement('td');
    const newDiv = document.createElement('div');
    newDiv.className = 'inner'
    
    if (mode === 0){    
        const newSpan = document.createElement('span');
        newSpan.innerText = element;
        newDiv.appendChild(newSpan);
    } else if (mode === 1){
        const newStrong = document.createElement('strong');
        newStrong.innerText = element;
        newDiv.appendChild(newStrong);
        if (element <= tableRule[`${leagueId}`][0]){
            const newSpan = document.createElement('span');
            newSpan.className = 'state_1'
            newDiv.appendChild(newSpan);
        } else if(element <= tableRule[`${leagueId}`][1]){
            const newSpan = document.createElement('span');
            newSpan.className = 'state_2'
            newDiv.appendChild(newSpan);
        } else if(element >= tableRule[`${leagueId}`][2]){
            const newSpan = document.createElement('span');
            newSpan.className = 'state_3'
            newDiv.appendChild(newSpan);
        }  
    } else {
        newTd.className = 'teamName'
        const newImg = document.createElement('img');
        newImg.className = 'emblem'
        newImg.setAttribute('src', element[0]);
        newDiv.appendChild(newImg);

        const newSpan = document.createElement('span');
        newSpan.innerText = element[1];
        newDiv.appendChild(newSpan);
    }
    newTd.appendChild(newDiv);
    const newTr = document.getElementById(trId);
    newTr.appendChild(newTd);
}

function makeTable(item, leagueId, idx) {
    const ranking = item.index;
    const img = `https://images.onefootball.com/icons/teams/56/${item.team.idInternal}.png`
    const name = item.team.name;
    const playedNum = item.team.teamstats.played;
    const winNum = item.team.teamstats.won;
    const drawNum = item.team.teamstats.drawn;
    const loseNum = item.team.teamstats.lost;
    const point = item.team.teamstats.points;

    const newBody = document.getElementsByClassName('leagueTableTbody');
    const newTr = document.createElement('tr');
    newTr.id = `table${idx+1} ${ranking}`;
    newBody[idx].appendChild(newTr);
    
    makeTableElement(leagueId, newTr.id, ranking, 1);
    makeTableElement(leagueId, newTr.id, [img, name], 2);
    makeTableElement(leagueId, newTr.id, playedNum, 0);
    makeTableElement(leagueId, newTr.id, winNum, 0);
    makeTableElement(leagueId, newTr.id, drawNum, 0);
    makeTableElement(leagueId, newTr.id, loseNum, 0);
    makeTableElement(leagueId, newTr.id, point, 0);
}

function getTable(res, id, idx) {
    for (const item of res.groups[0].ranking){
        makeTable(item, id, idx);
    }
}

function getTableJson(id, s, idx){
    fetch(`https://feedmonster.onefootball.com/feeds/il/en/competitions/${id}/${s}/standings.json`
    ).then(function(response){
        return response.json();
    })
    .then(function(json){
        getTable(json, id, idx);
    })
}

function makeTitleImage(id, idx) {
    const title = document.getElementsByClassName('leagueTitle');
    const leagueImg = document.createElement('img');
    leagueImg.setAttribute('src', leagueImage[`${id}`]);
    leagueImg.className = 'leagueImage';
    title[idx].appendChild(leagueImg);
}

function init(){
    let index = 0;
    for(const league of leagues){
        // makeTitleImage(league.id, index);
        getTableJson(league.id, league.s, index)
        index++;
    }
}

init();