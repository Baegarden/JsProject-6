const leagues = [
    {
        name:'Premier League',
        korName:'프리미어리그',
        id:9, 
        s:39301,
        radio:'checked'
    },
    {
        name:'LaLiga',
        korName:'라리가', 
        id:10, 
        s:39319,
        radio:'unchecked'
    },
    {
        name:'Bundesliga',
        korName:'분데스리가', 
        id:1, 
        s:39285,
        radio:'unchecked'
    },
    {
        name:'Serie A',
        korName:'세리에 A', 
        id:13, 
        s:39325,
        radio:'unchecked'
    },
    {
        name:'Ligue 1 Uber Eats',
        korName:'리그앙', 
        id:23, 
        s:39245,
        radio:'unchecked'
    },
    {
        name:'K League 1',
        korName:'K리그1', 
        id:130, 
        s:39182,
        radio:'unchecked'
    },
    {
        name:'K League 2',
        korName:'K리그 2', 
        id:2736, 
        s:39203,
        radio:'unchecked'
    }
];

const koreanLeaguer = [
    {
        202:'손흥민',
        leagueName:'Premier League',
        id:9, 
        s:39301,
        teamId:202
    },
    {
        203:'황희찬',
        leagueName:'Premier League',
        id:9, 
        s:39301,
        teamId:203
    },
    {
        163:'이재성',
        leagueName:'Bundesliga',
        id:1, 
        s:39285,
        teamId:163
    },
    {
        159:'정우영',
        leagueName:'Bundesliga',
        id:1, 
        s:39285,
        teamId:159
    },
    {
        220:'이강인',
        leagueName:'LaLiga ',
        id:10, 
        s:39319,
        teamId:220
    },
    {
        148:'김민재',
        leagueName:'Super Lig',
        id:8, 
        s:39311,
        teamId:148
    }, 
    {
        8:'황의조',
        leagueName:'Ligue 1 Uber Eats',
        id:23, 
        s:39245,
        teamId:8
    },
    {
        27:'황인범',
        leagueName:'Russian Premier League',
        id:14, 
        s:39268,
        teamId:27
    }  
]

const leagueImage = {
    '9':'https://www.thesportsdb.com/images/media/league/badge/pdd43f1610891709.png',     // Premier League
    '1':'https://www.thesportsdb.com/images/media/league/badge/0j55yv1534764799.png',     // Bundesliga
    '13':'https://www.thesportsdb.com/images/media/league/badge/fy79v91625170070.png',    // Serie A
    '10':'https://www.thesportsdb.com/images/media/league/badge/7onmyv1534768460.png',    // LaLiga    
    '23':'https://www.thesportsdb.com/images/media/league/badge/2yo0vn1592927519.png',    // Ligue 1 Uber Eats
    '130':'https://www.kleague.com/assets/images/logo/emblem.png',   // K League 1
    '2736':'https://www.kleague.com/assets/images/logo/emblem.png'   // K League 2
}

const tableRule = {
    9:[4, 6, 18],     // Premier League
    1:[4, 7, 17],     // Bundesliga
    13:[4, 7, 18],    // Serie A
    10:[4, 7, 18],    // LaLiga    
    23:[3, 4, 19],    // Ligue 1 Uber Eats
    130:[3, 0, 11],   // K League 1
    2736:[1, 4, 18]   // K League 2
}

function getDayOfTheWeek(day){
    if (day == 0)
        return "(일)";
    else if(day == 1)
        return "(월)";
    else if(day == 2)
        return "(화)";
    else if(day == 3)
        return "(수)"; 
    else if(day == 4)
        return "(목)";
    else if(day == 5)
        return "(금)";
    else 
        return "(토)";
}

function getKoreaTime(hour, minutes) {
    koreaHour = '';
    koreaMinute = '';
    if (hour < 10)
        koreaHour = `0${hour}`;
    else
        koreaHour = hour;   
    if (minutes < 10)
        koreaMinute = `0${minutes}`;
    else
        koreaMinute = minutes;
    
    return `${koreaHour}:${koreaMinute}`;
}

function getKoreaName(id) {
    for(const team in info){
        if(info[team][2] === id)
            return team;
    }
}

const famousSaying = [
    '"힘이 드는가? 오늘 걷지 않으면, 내일은 뛰어야한다" - 카를로스 푸욜(Carles Puyol)',
    '"모든 단점은 장점이 될 수 있다" - 리오넬 메시(Lionel Messi)',
    '"무언가를 바꾸기 위해서는 나 자신부터 바뀌어야 한다" - 펩 과르디올라(Josep Guardiola)',
    '"강한자가 이기는 것이 아니라, 이기는자가 강한 것이다" - 프란츠 베켄바우어(Franz Beckenbauer)',
    '"미친 사람이 이성적인 사람보다 세상을 더 많이 변화 시킨다" - 에릭 칸토나(Eric Cantona)',
    '"나는 골을 막지 않는다. 팀의 패배를 막을 뿐이다" - 이케르 카시야스(Iker Casillas)',
    '"폼은 일시적이지만 클래스는 영원하다" - 빌 샹클리(Bill Shankly)',
    '"사각지대는 그 어떤 골키퍼도 막을 수 없다. 그러나 나는 막을 수 있다" - 레프 야신(Lev Yashin)',
    '"공은 바로 여기서 멈춘다" - 파비오 칸나바로(Fabio Cannavaro)',
    '"쓰러질 지언정 무릎 꿇지 않는다" - 박지성(Park ji sung)',
    '"포기하면 그 순간이 곧 시합 종료다" - 마크 오베르마스(Marc Overmars)',
    '"과거의 후회와 미래라는 희망속에 현재라는 기회가 존재한다" - 크리스티아누 호날두(Cristiano Ronaldo)',
    '"몸싸움이 두려웠다면 그 후에 판단력도 없다" - 라울 곤잘레스(Raul Gonzalez Blanco)',
    '"최고의 공격수는 최고의 수비수이다" - 호베르투 카를로스(Roberto Carlos)',
    '"땀에 젖은 유니폼, 그것이 내가 보여줄 수 있는 전부다" - 폴 스콜스(Paul Scholes)',
    '"나의 장점은 드리블도 스피드도 아닌 축구에 대한 열정이다" - 호나우두(Ronaldo)',
    '"난 이 세상에서 축구말고 재밌다고 느껴본 것이 없다" - 호나우지뉴(Ronaldinho)',
    '"한 번 실수하면 똑같은 실수는 반복하지 않는다" - 요한 크루이프(Johan Cruyff)',
    '"느리지만 꾸준히 천천히" - 안드레스 이니에스타(Andres Iniesta)',
]

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getFamousSaying() {  
    randNum = rand(0, famousSaying.length-1);
    console.log(randNum);
    document.getElementById('famousSaying').innerText = famousSaying[randNum];
}

const info = {
    // 프리미어리그
    '아스널':[9, 39301, 2],
    '아스톤빌라':[9, 39301, 199],
    '첼시':[9, 39301, 9],
    '에버턴':[9, 39301, 197],
    '리즈':[9, 39301, 571],
    '리버풀':[9, 39301, 18],
    '레스터':[9, 39301, 572],
    '맨시티':[9, 39301, 209],
    '맨유':[9, 39301, 21],
    '뉴캐슬':[9, 39301, 207],
    '사우샘프턴':[9, 39301, 615],
    '토트넘':[9, 39301, 202],
    '왓포드':[9, 39301, 580],
    '웨스트햄':[9, 39301, 198],
    '울버햄튼':[9, 39301, 203],
    '브랜트포드':[9, 39301, 671],
    '노리치':[9, 39301, 575],
    '번리':[9, 39301, 275],
    '팰리스':[9, 39301, 567],
    '브라이튼':[9, 39301, 670],
    // 분데스리가
    '바이에른 뮌헨':[1, 39285, 6],
    '도르트문트':[1, 39285, 155],
    '뮌헨글라드바흐':[1, 39285, 154],
    '프라이부르크':[1, 39285, 159],
    '퀼른':[1, 39285, 151],
    '레버쿠젠':[1, 39285, 162],
    '보훔':[1, 39285, 177],
    '슈투트가르트':[1, 39285, 31],
    '퓌르트':[1, 39285, 165],
    '빌레펠트':[1, 39285, 164],
    '헤르타 BSC':[1, 39285, 168],
    '마인츠':[1, 39285, 163],
    '볼프스부르크':[1, 39285, 32],
    '프랑크푸르트':[1, 39285, 156],
    '베를린':[1, 39285, 174],
    '호펜하임':[1, 39285, 158],
    '아우크스부르크':[1, 39285, 171],
    '라이프치히':[1, 39285, 885],
    // 라리가
    '바르셀로나':[10, 39319, 5],
    '레알 마드리드':[10, 39319, 26],
    '아틀레티코 마드리드':[10, 39319, 3],
    '레알 소시에다드':[10, 39319, 223],
    '세비야':[10, 39319, 28],
    '레알 베티스':[10, 39319, 691],
    '바예카노':[10, 39319, 690],
    '오사수나':[10, 39319, 221],
    '아틀레틱':[10, 39319, 213],
    '발렌시아':[10, 39319, 143],
    '에스파뇰':[10, 39319, 215],
    '비야레알':[10, 39319, 226],
    '마요르카':[10, 39319, 220],
    '알라베스':[10, 39319, 1254],
    '셀타 비고':[10, 39319, 680],
    '카디스':[10, 39319, 750],
    '그라나다':[10, 39319, 686],
    '엘체':[10, 39319, 682],
    '레반테':[10, 39319, 218],
    '헤타페':[10, 39319, 216],
    // 세리에A
    '인터밀란':[13, 39325, 16],
    'AC밀란':[13, 39325, 23],
    '유벤투스':[13, 39325, 17],
    '아탈란타':[13, 39325, 248],
    '나폴리':[13, 39325, 191],
    '라치오':[13, 39325, 139],
    'AS로마':[13, 39325, 145],
    '피오렌티나':[13, 39325, 15],
    '볼로냐':[13, 39325, 183],
    '베로나':[13, 39325, 409],
    '엠폴리':[13, 39325, 726],
    '토리노':[13, 39325, 722],
    '사수올로':[13, 39325, 724],
    '우디네세':[13, 39325, 195],
    '베네치아':[13, 39325, 1989],
    '스페지아':[13, 39325, 400],
    '제노아':[13, 39325, 189],
    '삼프도리아':[13, 39325, 194],
    '살레르니타나':[13, 39325, 411],
    '칼리아리':[13, 39325, 185],
    // 리그앙
    '파리생제르맹':[23, 39245, 263],
    'AS모나코':[23, 39245, 259],
    '랑스':[23, 39245, 256],
    '보르도':[23, 39245, 8],
    '마르세유':[23, 39245, 22],
    '니스':[23, 39245, 262],
    '스타드 렌':[23, 39245, 264],
    '몽펠리에':[23, 39245, 260],
    '리옹':[23, 39245, 19],
    '스트라스부르':[23, 39245, 756],
    '앙제':[23, 39245, 696],
    '낭트':[23, 39245, 708],
    '생테티엔':[23, 39245, 266],
    '릴':[23, 39245, 257],
    '로리앙':[23, 39245, 258],
    '트루아':[23, 39245, 700],
    '클레르몽':[23, 39245, 711],
    '랭스':[23, 39245, 703],
    '브레스투아':[23, 39245, 254],
    'FC메스':[23, 39245, 710],
    // K리그1
    '전북 현대':[130, 39182, 2631],
    '울산 현대':[130, 39182, 2646],
    '대구FC':[130, 39182, 2645],
    '제주 유나이티드':[130, 39182, 2628],
    '수원FC':[130, 39182, 2629],
    '수원 삼성':[130, 39182, 2637],
    '포항 스틸러스':[130, 39182, 2649],
    '인천 유나이티드':[130, 39182, 2641],
    'FC서울':[130, 39182, 2640],
    '성남FC':[130, 39182, 2644],
    '강원FC':[130, 39182, 2624],
    '광주FC':[130, 39182, 2634],
    // K리그2
    '김천 상무':[2736, 39203, 2636],
    '대전 하나 시티즌':[2736, 39203, 2650],
    'FC안양':[2736, 39203, 2648],
    '전남 드래곤즈':[2736, 39203, 2630],
    '부산 아이파크':[2736, 39203, 2642],
    '경남FC':[2736, 39203, 2633],
    '안산 그리너스':[2736, 39203, 9969],
    '충남 아산FC':[2736, 39203, 4985],
    '서울 이랜드':[2736, 39203, 4989],
    '부천FC':[2736, 39203, 2635]
}
