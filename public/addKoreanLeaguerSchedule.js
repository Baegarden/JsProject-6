let koreanMatchDay = []
let koreanMatchDayNum = {}
let firstKoreanMatchDate = []
let numPlayer = 0

function makeKoreanScheduleElement(id, element, mode) {
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

function makeKoreanSchedule(koreanMatch, idx){
    const newBody = document.getElementsByClassName('koreanScheduleTbody');
    const newTr = document.createElement('tr');
    newTr.id = `schedule${idx}`;
    newBody[0].appendChild(newTr);

    const playerName = koreanMatch.player;
    const homeTeamName = koreanMatch.homeTeam;
    const homeTeamImg = koreanMatch.homeTeamImg;
    const AwayTeamName = koreanMatch.awayTeam;
    const AwayTeamImg = koreanMatch.awayTeamImg;
    const dateDay = koreanMatch.dateDay;
    const dateTime = koreanMatch.dateTime;
    const priod = koreanMatch.period;
    const score = koreanMatch.score;

    let flag = 1
    for(const matchDay of firstKoreanMatchDate){
        if(matchDay === koreanMatch.dateDay){
            flag = 0
            break
        }        
    }
    makeKoreanScheduleElement(newTr.id, playerName, 0);    // 선수이름
    makeKoreanScheduleElement(newTr.id, [homeTeamImg, homeTeamName], 2);    // 홈 팀
    if(priod === 'PreMatch')
        makeKoreanScheduleElement(newTr.id, 'vs', 0);   //경기 상태
    else
        makeKoreanScheduleElement(newTr.id, score, 0);  
    makeKoreanScheduleElement(newTr.id, [AwayTeamImg, AwayTeamName], 3);    // 어웨이 팀
    if(flag === 1){
        makeKoreanScheduleElement(newTr.id, [dateDay, koreanMatchDayNum[dateDay]], 1);   // 경기 날짜      
        firstKoreanMatchDate.push(dateDay);
    }
    makeKoreanScheduleElement(newTr.id, dateTime, 0);    // 경기 시간
}

function countMatchDay(arr){
    for(tmp of arr){
        let flag = 0
        for(j in koreanMatchDayNum){
            if(tmp.dateDay === j){
                koreanMatchDayNum[tmp.dateDay] += 1
                flag = 1
                break
            }
        }
        if(flag === 0)
            koreanMatchDayNum[tmp.dateDay] = 1
    }
}

function getKoreanSchedule(json, teamId){
    let flag = 0
    for (const item of json.kickoffs){
        for(const match of item.groups[0].matches){
            if (match.team_home.id === teamId || match.team_away.id === teamId){
                const date = new Date(item.kickoff);
                let playerName = ''
                for(player of koreanLeaguer){
                    if(player.teamId === teamId){
                        playerName = player[teamId];
                    }
                }
                const matchInfo = {
                    player:playerName,
                    month:date.getMonth()+1,
                    day:date.getDate(),
                    hour:date.getHours(),
                    minute:date.getMinutes(),
                    dateDay:`${date.getMonth()+1}.${date.getDate()} ${getDayOfTheWeek(date.getDay())}`,
                    dateTime:getKoreaTime(date.getHours(), date.getMinutes()),
                    homeTeam:match.team_home.name,
                    homeTeamImg:`https://images.onefootball.com/icons/teams/56/${match.team_home.id}.png`,
                    awayTeam:match.team_away.name,
                    awayTeamImg:`https://images.onefootball.com/icons/teams/56/${match.team_away.id}.png`,
                    period:match.period,
                    score:`${match.score_home} : ${match.score_away}`
                };
                
                koreanMatchDay.push(matchInfo) 
                flag = 1
                break
            }
        }
        if(flag === 1)
            break
    }
    numPlayer += 1;
    if(numPlayer === 8){
        // 경기 날짜가 이른 순으로 정렬
        koreanMatchDay = koreanMatchDay.sort(function (a, b) {
            if (a.month > b.month) return 1;
            if (a.month < b.month) return -1;

            if (a.day > b.day) return 1;
            if (a.day < b.day) return -1;

            if (a.hour > b.hour) return 1;
            if (a.hour < b.hour) return -1;

            if (a.minute > b.minute) return 1;
            if (a.minute < b.minute) return -1;
        });
        // console.log(koreanMatchDay);
        countMatchDay(koreanMatchDay);
        let idx = 1
        for(koreanMatch of koreanMatchDay){
            makeKoreanSchedule(koreanMatch, idx);
            idx += 1
        }

    }
}

function getKoreanScheduleJson(res, teamId){
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
    .then(data=>getKoreanSchedule(JSON.parse(data), teamId)); 
}

function getKoreanMatchDay(id, s, teamId){
    fetch(`https://feedmonster.onefootball.com/feeds/il/en/competitions/${id}/${s}/matchdaysOverview.json`
    ).then(function(response){
        return response.json();
    })
    .then(function(json){
        for(const matchday of json.matchdays){
            const today = new Date();
            const firstmatchDate = new Date(matchday.kickoffFirst);
            const lastmatchDate = new Date(matchday.kickoffLast);
            const fmonth = firstmatchDate.getMonth()+1;
            const month = lastmatchDate.getMonth()+1;
            const day = lastmatchDate.getDate();
            if(Math.abs(month-fmonth) < 2 && month >= today.getMonth()+1 && day > today.getDate()){
                getKoreanScheduleJson(matchday.id, teamId);
                break;
            }
        }
    });
}

function init(){
    for(const player of koreanLeaguer){
        getKoreanMatchDay(player.id, player.s, player.teamId);
    } 
}

init();