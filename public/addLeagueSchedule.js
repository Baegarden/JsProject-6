let i = 1;
let matchDate = {};
let firstMatchDate = [];
let numMatch = 0;

function searchMatchDay(item) {
    for(const match of item.groups[0].matches){
        const date = new Date(item.kickoff);
        const dateDay = `${date.getMonth()+1}.${date.getDate()} ${getDayOfTheWeek(date.getDay())}`;
        
        let flag = 0
        for(const matchDay in matchDate){
            if(matchDay === dateDay){
                matchDate[dateDay] += 1;
                flag = 1
                break
            }         
        }
        if(flag === 0)
            matchDate[dateDay] = 1
    }
}

function makeScheduleElement(id, element, mode) {
    const newTd = document.createElement('td');
    const newDiv = document.createElement('div');
    newDiv.className = 'inner'

    if(mode === 0){
        const newSpan = document.createElement('span');
        newSpan.innerText = element;
        newDiv.appendChild(newSpan);
    } else if(mode === 1){
        newTd.className = 'matchDate';
        newTd.setAttribute('rowspan', element[1]);
        const newSpan = document.createElement('span');
        newSpan.innerText = element[0];
        newDiv.appendChild(newSpan);
    } else if(mode === 2){
        const newSpan = document.createElement('span');
        newSpan.innerText = element[1];
        newDiv.appendChild(newSpan);
        
        newTd.className = 'homeTeam';
        const newImg = document.createElement('img');
        newImg.className = 'emblem'
        newImg.setAttribute('src', element[0]);
        newDiv.appendChild(newImg);
    } else if(mode === 3){
        newTd.className = 'awayTeam';
        const newImg = document.createElement('img');
        newImg.className = 'emblem'
        newImg.setAttribute('src', element[0]);
        newDiv.appendChild(newImg);

        const newSpan = document.createElement('span');
        newSpan.innerText = element[1];
        newDiv.appendChild(newSpan);
    }

    newTd.appendChild(newDiv);
    const newTr = document.getElementById(id);
    newTr.appendChild(newTd);
}

function makeSchedule(item, idx) {
    for(const match of item.groups[0].matches){
        const homeTeamName = match.team_home.name;
        const homeTeamImg = `https://images.onefootball.com/icons/teams/56/${match.team_home.id}.png`;
        const AwayTeamName = match.team_away.name;
        const AwayTeamImg = `https://images.onefootball.com/icons/teams/56/${match.team_away.id}.png`;
        const date = new Date(item.kickoff);
        const dateDay = `${date.getMonth()+1}.${date.getDate()} ${getDayOfTheWeek(date.getDay())}`;
        const dateTime = getKoreaTime(date.getHours(), date.getMinutes());
        
        const newBody = document.getElementsByClassName('leagueScheduleTbody');
        const newTr = document.createElement('tr');
        newTr.id = `schedule${idx+1} ${i}`;
        newBody[idx].appendChild(newTr);
        
        let flag = 1
        for(const matchDay of firstMatchDate){
            if(matchDay === dateDay){
                flag = 0
                break
            }        
        }
        if(flag === 1){
            makeScheduleElement(newTr.id, [dateDay, matchDate[dateDay]], 1);        
            firstMatchDate.push(dateDay);
        }
        makeScheduleElement(newTr.id, dateTime, 0);
        makeScheduleElement(newTr.id, [homeTeamImg, homeTeamName], 2);
        if(match.period === 'PreMatch')
            makeScheduleElement(newTr.id, 'vs', 0);      
        else
            makeScheduleElement(newTr.id, `${match.score_home} : ${match.score_away}`, 0);
        makeScheduleElement(newTr.id, [AwayTeamImg, AwayTeamName], 3);
        
        if(i === numMatch){
            i = 1;
            matchDate = {};
            firstMatchDate = [];
            numMatch = 0;
        }
        else
            i += 1;
    }
}

function getSchedule(res, idx){
    for (const item of res.kickoffs){
        searchMatchDay(item);
    }
    for (const num in matchDate){
        numMatch += matchDate[num];
    }
    for (const item of res.kickoffs){
        makeSchedule(item, idx);
    }
}

function getScheduleJson(res, idx){
    const matchid = res;
    fetch("https://check-my-football.herokuapp.com/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data:matchid			
        })
    }).then(res=>res.json())
    .then(data=>getSchedule(JSON.parse(data), idx)); 
}

function getMatchDay(id, s, idx){
    fetch(`https://feedmonster.onefootball.com/feeds/il/en/competitions/${id}/${s}/matchdaysOverview.json`
    ).then(function(response){
        return response.json();
    })
    .then(function(json){
        let flag = 0 
        for(const matchday of json.matchdays){
            const today = new Date();
            const firstmatchDate = new Date(matchday.kickoffFirst);
            const lastmatchDate = new Date(matchday.kickoffLast);
            const fmonth = firstmatchDate.getMonth()+1;
            const month = lastmatchDate.getMonth()+1;
            const day = lastmatchDate.getDate();
            if(Math.abs(month-fmonth) < 2 && month >= today.getMonth()+1 && day > today.getDate()){
                getScheduleJson(matchday.id, idx);
                flag = 1;
                break;
            }   
        }
        if(flag === 0){
            const newBody = document.getElementsByClassName('leagueSchedule');
            const newDiv = document.createElement('div');
            newDiv.setAttribute("style", "text-align: center");
            newDiv.innerText = "No Schedule";
            newBody[idx].appendChild(newDiv);
        }
    });
}

function init(){
    let index = 0;
    for(const league of leagues){
        getMatchDay(league.id, league.s, index);
        index++;
    }
}

init();