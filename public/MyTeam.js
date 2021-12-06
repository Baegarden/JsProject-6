let isFirst = 1;

const USER_LS1 = "myTeam1";
const USER_LS2 = "myTeam2";
const league1 = document.getElementById("myTeam1_League")
const league2 = document.getElementById("myTeam2_League")
const submitBtn = document.getElementById("submitBtn")
const changeBtn = document.getElementById("changeBtn")

league1.onchange = ()=>{
    const team = document.getElementById("myTeam1_Team");
    const mainOption = league1.options[league1.selectedIndex].value;

    const subOptions = {
        pl:['아스널', '아스톤빌라', '첼시', '에버턴', '리즈', '리버풀', '레스터', '맨시티', '맨유', 
        '뉴캐슬', '사우샘프턴', '토트넘', '왓포드', '웨스트햄', '울버햄튼', '브랜트포드', '노리치', '번리', '팰리스', '브라이튼'],
        bundes:['바이에른 뮌헨', '도르트문트', '뮌헨글라드바흐', '프라이부르크', '퀼른', '레버쿠젠','보훔', '슈투트가르트',
         '퓌르트', '빌레펠트', '헤르타 BSC', '마인츠', '볼프스부르크', '프랑크푸르트', '베를린', '호펜하임', '아우크스부르크', '라이프치히'],
        laliga:['바르셀로나', '레알 마드리드', '아틀레티코 마드리드', '레알 소시에다드', '세비야', '레알 베티스', '바예카노', '오사수나',
        '아틀레틱', '발렌시아', '에스파뇰', '비야레알', '마요르카', '알라베스', '셀타 비고', '카디스', '그라나다', '엘체', '레반테', '헤타페'],
        serie:['인터밀란', 'AC밀란', '유벤투스', '아탈란타', '나폴리', '라치오', 'AS로마', '피오렌티나', '볼로냐', '베로나', '엠폴리', 
        '토리노', '사수올로', '우디네세', '베네치아', '스페지아', '제노아', '삼프도리아', '살레르니타나', '칼리아리'],
        reague1:['파리생제르맹', 'AS모나코', '랑스', '보르도', '마르세유', '니스', '스타드 렌', '몽펠리에', '리옹', '스트라스부르', '앙제',
        '낭트', '생테티엔', '릴', '로리앙', '트루아', '클레르몽', '랭스', '브레스투아', 'FC메스'],
    };

    let subOtion;
    switch(mainOption){
        case '프리미어리그':
            subOtion = subOptions.pl;
            break;
        case '분데스리가':
            subOtion = subOptions.bundes;
            break;
        case '라리가':
            subOtion = subOptions.laliga;
            break;
        case '세리에A':
            subOtion = subOptions.serie;
            break;
        case '리그앙':
            subOtion = subOptions.reague1;
            break;
    };

    team.options.length = 0;
    const defaultTeamOption = document.createElement('option');
    defaultTeamOption.innerText = '팀 선택';
    defaultTeamOption.selected = 'selected';
    defaultTeamOption.hidden = 'hidden';
    team.append(defaultTeamOption);

    for(let i = 0; i < subOtion.length; i++){
        const teamOption = document.createElement('option');    
        teamOption.innerText = subOtion[i]
        team.append(teamOption);
    }
}

league2.onchange = ()=>{
    const team = document.getElementById("myTeam2_Team");
    const mainOption = league2.options[league2.selectedIndex].value;

    const subOptions = {
        k1:['전북 현대', '울산 현대', '대구FC', '제주 유나이티드', '수원FC', '수원 삼성', '포항 스틸러스', '인천 유나이티드',
         'FC서울', '성남FC', '강원FC', '광주FC'],
        k2:['김천 상무', '대전 하나 시티즌', 'FC안양', '전남 드래곤즈', '부산 아이파크', '경남FC', '안산 그리너스', '충남 아산FC', '서울 이랜드', '부천FC'],
    };
    
    let subOtion;
    switch(mainOption){
        case 'K리그1':
            subOtion = subOptions.k1;
            break;
        case 'K리그2':
            subOtion = subOptions.k2;
            break;
    };

    team.options.length = 0;
    const defaultTeamOption = document.createElement('option');
    defaultTeamOption.innerText = '팀 선택';
    defaultTeamOption.selected = 'selected';
    defaultTeamOption.hidden = 'hidden';
    team.append(defaultTeamOption);

    for(let i = 0; i < subOtion.length; i++){
        const teamOption = document.createElement('option');    
        teamOption.innerText = subOtion[i]
        team.append(teamOption);
    }
}

submitBtn.onclick = ()=>{
    const team1 = document.getElementById('myTeam1_Team');
    const team2 = document.getElementById('myTeam2_Team');
    const selectdTeam1 = team1.options[team1.selectedIndex].value;
    const selectdTeam2 = team2.options[team2.selectedIndex].value;

    if(selectdTeam1 === '팀 선택' || selectdTeam2 === '팀 선택'){
        alert("팀을 모두 선택해주세요");
    } else {
        makeMyTeam(selectdTeam1, selectdTeam2);
    }   
}

changeBtn.onclick = ()=>{
    const selectMyteam = document.getElementById('selectMyteam')
    const myTeamInfo = document.getElementById('myTeamInfo')
    selectMyteam.setAttribute('style', 'display: block');
    myTeamInfo.setAttribute('style', 'display: none');
    const myTeam1 = document.getElementById('myTeam1')
    const myTeam2 = document.getElementById('myTeam2')
    myTeam1.remove();
    myTeam2.remove();
}

function addMyTeamRanking(res, id, teamId, isSecond) {
    for (const item of res.groups[0].ranking){
        if(item.team.idInternal == teamId){
            const teamInfo = document.getElementsByClassName('myTeam_Info');
            const newDiv = document.createElement('div');
            newDiv.className = 'myTeam_Info_ranking';
            let leagueName = '';
            for(const league of leagues){
                if(league.id === id){
                    leagueName = league.korName;
                    break
                }
            }
            newDiv.innerText = `${leagueName} ${item.index}위`;
            teamInfo[isSecond].appendChild(newDiv)
            break;
        }
    }
}

function getMyTeamRanking(id, s, teamId, isSecond){
    fetch(`https://feedmonster.onefootball.com/feeds/il/en/competitions/${id}/${s}/standings.json`
    ).then(function(response){
        return response.json();
    })
    .then(function(json){
        addMyTeamRanking(json, id, teamId, isSecond);
    })
}

function getMyTeamInfo(id, s, teamId, isSecond, teamName){
    const teamInfo = document.getElementsByClassName('myTeam_Info');
    const newImg = document.createElement('img');
    newImg.className = 'emblem'
    const newImgSrc = `https://images.onefootball.com/icons/teams/56/${teamId}.png`;
    newImg.setAttribute('src', newImgSrc);
    teamInfo[isSecond].appendChild(newImg) //

    const newSpan = document.createElement('span');
    newSpan.className = "myTeam_Info_name"
    newSpan.innerText = teamName;
    teamInfo[isSecond].appendChild(newSpan); //

    getMyTeamRanking(id, s, teamId, isSecond);
}

function addMyTeamSchedule(match, round, date, isSecond) {
    const teamSchedule = document.getElementsByClassName('myTeam_Schedule');
    const nextMatchdiv = document.createElement('div');
    nextMatchdiv.className = 'nextMatch';
    nextMatchdiv.innerText = '- NEXT MATCH -';

    const dateDiv = document.createElement('div'); 
    const newDate = new Date(date);
    dateDiv.className = 'date';
    dateDiv.innerText = `${newDate.getMonth()+1}.${newDate.getDate()} ${getDayOfTheWeek(newDate.getDay())} ${getKoreaTime(newDate.getHours(), newDate.getMinutes())}`;;

    const matchDiv = document.createElement('div');
    const homeTeamName = document.createElement('span');
    homeTeamName.innerText = getKoreaName(match.team_home.id);
    homeTeamName.className = 'home';
    const homeTeamImg = document.createElement('img');
    const homeTeamImgSrc = `https://images.onefootball.com/icons/teams/56/${match.team_home.id}.png`;
    homeTeamImg.className = 'emblem';
    homeTeamImg.setAttribute('src', homeTeamImgSrc); 
    const AwayTeamName = document.createElement('span');
    AwayTeamName.innerText = getKoreaName(match.team_away.id);
    AwayTeamName.className = 'away';
    const awayTeamImg = document.createElement('img');
    const awayTeamImgSrc = `https://images.onefootball.com/icons/teams/56/${match.team_away.id}.png`;
    awayTeamImg.className = 'emblem';
    awayTeamImg.setAttribute('src', awayTeamImgSrc);
    const vsSpan = document.createElement('span');
    if(match.period === 'PreMatch')
        vsSpan.innerText = 'vs'; 
    else
        vsSpan.innerText = `${match.score_home} : ${match.score_away}`;
    matchDiv.append(homeTeamName, homeTeamImg, vsSpan, awayTeamImg, AwayTeamName);

    const roundDiv = document.createElement('div');
    roundDiv.className = 'round';
    roundDiv.innerText = round;

    teamSchedule[isSecond].append(nextMatchdiv, dateDiv, matchDiv, roundDiv);
}

function getMyTeamSchedule(json, round, teamId, isSecond){
    let flag = 0
    for (const item of json.kickoffs){
        for(const match of item.groups[0].matches){
            if (match.team_home.id === teamId || match.team_away.id === teamId){
                addMyTeamSchedule(match, round, item.kickoff, isSecond);
                flag = 1
                break
            }
        }
        if(flag === 1)
            break
    }
}

function getMyTeamScheduleJson(res, round, teamId, isSecond){
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
    .then(data=>getMyTeamSchedule(JSON.parse(data), round, teamId, isSecond)); 
}

function getMyTeamMatchDay(id, s, teamId, isSecond){
    fetch(`https://feedmonster.onefootball.com/feeds/il/en/competitions/${id}/${s}/matchdaysOverview.json`
    ).then(function(response){
        return response.json();
    })
    .then(function(json){
        let flag = 0; 
        for(const matchday of json.matchdays){
            const today = new Date();
            const firstmatchDate = new Date(matchday.kickoffFirst);
            const lastmatchDate = new Date(matchday.kickoffLast);
            const fmonth = firstmatchDate.getMonth()+1;
            const month = lastmatchDate.getMonth()+1;
            const day = lastmatchDate.getDate();
            if(Math.abs(month-fmonth) < 2 && month >= today.getMonth()+1 && day > today.getDate()){
                getMyTeamScheduleJson(matchday.id, matchday.name, teamId, isSecond);
                flag = 1;
                break;
            }
        }
        if(flag === 0){
            const teamSchedule = document.getElementsByClassName('myTeam_Schedule');
            const nextMatchdiv = document.createElement('div');
            nextMatchdiv.className = 'nextMatch';
            nextMatchdiv.innerText = '- NEXT MATCH -';

            const dateDiv = document.createElement('div'); 
            dateDiv.setAttribute("style", "height: 24px");
            dateDiv.className = 'date';

            const matchDiv = document.createElement('div');
            matchDiv.innerText = "No Schedule"
            teamSchedule[isSecond].append(nextMatchdiv, dateDiv, matchDiv);
        }
    });
}

function makeMyTeam(selectdTeam1, selectdTeam2) {
    localStorage.setItem(USER_LS1, selectdTeam1);
    localStorage.setItem(USER_LS2, selectdTeam2);
    
    const selectMyteam = document.getElementById('selectMyteam')
    const myTeamInfo = document.getElementById('myTeamInfo')
    selectMyteam.setAttribute('style', 'display: none');
    myTeamInfo.setAttribute('style', 'display: block');

    const myTeamInfoContent = document.getElementById('myTeamInfoContent');

    const myTeam1 = document.createElement('div');
    myTeam1.id = 'myTeam1'
    const myTeam1_Info = document.createElement('div');
    myTeam1_Info.className = 'myTeam_Info'
    const myTeam1_Schedule = document.createElement('div');
    myTeam1_Schedule.className = 'myTeam_Schedule'

    const myTeam2 = document.createElement('div');
    myTeam2.id = 'myTeam2'
    const myTeam2_Info = document.createElement('div');
    myTeam2_Info.className = 'myTeam_Info'
    const myTeam2_Schedule = document.createElement('div');
    myTeam2_Schedule.className = 'myTeam_Schedule'

    myTeam1.append(myTeam1_Info, myTeam1_Schedule);
    myTeam2.append(myTeam2_Info, myTeam2_Schedule);
    myTeamInfoContent.append(myTeam1, myTeam2);

    const info1 = info[`${selectdTeam1}`]
    const info2 = info[`${selectdTeam2}`]

    // MY TEAM - 해외리그
    getMyTeamInfo(info1[0], info1[1], info1[2], 0, selectdTeam1);
    getMyTeamMatchDay(info1[0], info1[1], info1[2], 0);

    // MY TEAM - 국내리그
    getMyTeamInfo(info2[0], info2[1], info2[2], 1, selectdTeam2);
    getMyTeamMatchDay(info2[0], info2[1], info2[2], 1);
}

function loadMyTeam() {
    const localData1 = localStorage.getItem(USER_LS1);
    const localData2 = localStorage.getItem(USER_LS2);
    if(localData1 !== null && localData2 !== null)
        makeMyTeam(localData1, localData2);
}

function init(){
    loadMyTeam();
    getFamousSaying();
}

init();