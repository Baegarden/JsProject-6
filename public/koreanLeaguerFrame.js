function makeThead(newThead, arr){
    const newTr = document.createElement('tr');
    for(let i of arr){
        const newTh = document.createElement('th');
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `${i}`
        newTh.appendChild(newDiv);
        newTr.appendChild(newTh);
    }
    newThead.appendChild(newTr);
}

function makeColgroup(newColgroup, arr){
    for(let i of arr){
        const newCol = document.createElement('col');
        newCol.setAttribute('width', i);
        newColgroup.appendChild(newCol);
    }
}
function makeTitle(leagueScheduleTitle) {
    leagueScheduleTitle.innerText = "코리안리거 경기일정";
}

function makeLeagueSchedule(){
    const leagueScheduleDiv = document.createElement('div');
    leagueScheduleDiv.id = 'koreanLeaguerSchedule';
    const leagueScheduleCotent = document.createElement('div');
    leagueScheduleCotent.className = 'koreanLeaguerScheduleContent';
    const leagueSchedule = document.createElement('table');
    const newColgroup = document.createElement('colgroup');
    const newThead = document.createElement('thead');
    const newTbody = document.createElement('tbody');
    newTbody.className = 'koreanScheduleTbody';
    makeColgroup(newColgroup, [200, 375, 80, 375, 125, 75]);
    makeThead(newThead, ['선수', '', '경기', '', '날짜', '시간']);

    leagueSchedule.append(newColgroup, newThead, newTbody);
    leagueScheduleCotent.appendChild(leagueSchedule);
    leagueScheduleDiv.appendChild(leagueScheduleCotent);
    document.body.appendChild(leagueScheduleDiv);
}

function init(){ 
    makeLeagueSchedule();
}

init();