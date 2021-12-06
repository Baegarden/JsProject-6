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

function makeLeagueSchedule(index){
    const content = document.getElementsByClassName('leagueContent');
    const leagueScheduleDiv = document.createElement('div');
    leagueScheduleDiv.className = 'leagueSchedule'
    const leagueSchedule = document.createElement('table');
    const newCaption = document.createElement('caption');
    const newColgroup = document.createElement('colgroup');
    const newThead = document.createElement('thead');
    const newTbody = document.createElement('tbody');
    newTbody.className = 'leagueScheduleTbody';
    makeColgroup(newColgroup, [100, 60, 240, 40, 240]);
    makeThead(newThead, ['날짜', '시간', '', '경기', '']);

    leagueSchedule.append(newCaption, newColgroup, newThead, newTbody);
    leagueScheduleDiv.appendChild(leagueSchedule);
    content[index].appendChild(leagueScheduleDiv);
}

function makeLeagueTable(index){
    const content = document.getElementsByClassName('leagueContent');
    const leagueTableDiv = document.createElement('div');
    leagueTableDiv.className = 'leagueTable'
    const leagueTable = document.createElement('table');
    const newCaption = document.createElement('caption');
    const newColgroup = document.createElement('colgroup');
    const newThead = document.createElement('thead');
    const newTbody = document.createElement('tbody');
    newTbody.className = 'leagueTableTbody';
    makeColgroup(newColgroup, [40, 250, 50, 40, 40, 40, 40]);
    makeThead(newThead, ['순위', '팀', '경기수', '승', '무',' 패', '승점']);

    leagueTable.append(newCaption, newColgroup, newThead, newTbody);
    leagueTableDiv.appendChild(leagueTable);
    content[index].appendChild(leagueTableDiv);
} 

function makeInfoFrame(league){
    const leagueDiv = document.createElement('div');
    leagueDiv.id = league.name;
    leagueDiv.style.height = '680px';
    if(league.radio === 'checked'){
        leagueDiv.style.display = 'block';
    }else{
        leagueDiv.style.display = 'none';
    }
    const leagueTitleDiv = document.createElement('div');
    leagueTitleDiv.className = 'leagueTitle';
    const leagueContentDiv = document.createElement('div');
    leagueContentDiv.className = 'leagueContent';
    leagueDiv.appendChild(leagueTitleDiv);
    leagueDiv.appendChild(leagueContentDiv);
    document.body.appendChild(leagueDiv);
}

function changeLeague(event){
    for(const league of leagues){
        tmp = document.getElementById(`${league.name}`)
        if(event.target.value === league.name){
            tmp.style.height = '680px';
            tmp.style.display = 'block';
        }else{
            tmp.style.height = '680px';
            tmp.style.display = 'none';
        }
    }
}

function makeSelectFrame() {
    let index = 0;
    const selectLeague = document.createElement('div');
    selectLeague.id = 'selectLeague'
    const selectForm = document.createElement('form');
    for(const league of leagues){
        const tmplabel = document.createElement('label');
        tmplabel.className = 'box-radio-input';
        const tmpinput = document.createElement('input');
        tmpinput.type = 'radio';
        tmpinput.name = 'selectButton'
        tmpinput.value = league.name;
        if(index === 0)
            tmpinput.checked = 'checked'
        tmpinput.onclick = changeLeague;
        const tmpspan = document.createElement('span');
        tmpspan.innerText = `${league.korName}`;
        tmplabel.appendChild(tmpinput);
        tmplabel.appendChild(tmpspan);
        selectForm.appendChild(tmplabel);
        index += 1
    }
    selectLeague.appendChild(selectForm);
    document.body.appendChild(selectLeague);
}

function init(){
    makeSelectFrame(leagues);
    let index = 0;
    for(const league of leagues){
        makeInfoFrame(league);
        makeLeagueTable(index);
        makeLeagueSchedule(index);
        index++;
    }
}

init();