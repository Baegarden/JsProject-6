const underline = document.querySelector('#underline');
const item = document.querySelectorAll('nav a');
underline.style.left = item[0].offsetLeft+"px";
underline.style.width = item[0].offsetWidth+"px";

function select(event){
    underline.style.left = event.offsetLeft+"px";
    underline.style.width = event.offsetWidth+"px";
}

item.forEach(link =>{
    let location;
    link.addEventListener('click', (event)=>{
        select(event.target);
        if(link === item[0]){
            window.scrollTo({top:0, behavior:'smooth'});
        }else if(link === item[1]){
            location = document.getElementById("koreanLeaguerSchedule").offsetTop;
            window.scrollTo({top:location, behavior:'smooth'});
        }else{
            location = document.getElementById("selectLeague").offsetTop;
            window.scrollTo({top:location, behavior:'smooth'});
        }
    })
})

const location_1 = document.getElementById("selectMyteam").offsetTop;
const locationBottom_1 = location_1 + document.getElementById("selectMyteam").offsetHeight;
const location_2 = document.getElementById("koreanLeaguerSchedule").offsetTop;
const locationBottom_2 = location_2 + document.getElementById("koreanLeaguerSchedule").offsetHeight;
const location_3 = document.getElementById("Premier League").offsetTop;
const locationBottom_3 = location_3 + document.getElementById("Premier League").offsetHeight;

window.addEventListener('scroll', () => {
    let scrollLocation = document.documentElement.scrollTop; // 현재 스크롤바 위치
    if(scrollLocation < location_2){
        const div_1 = document.getElementById('nav_1');
        select(div_1)
    }else if(scrollLocation > location_2 && scrollLocation < location_3){
        const div_2 = document.getElementById('nav_2');
        select(div_2)
    }else{
        const div_3 = document.getElementById('nav_3');
        select(div_3)
    } 
})

// document.body.style.overflow = "hidden";
