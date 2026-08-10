let date = document.querySelector("#date");
let time = document.querySelector("#time");

function showTime() {
    let now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let per = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    time.innerHTML = `Time Now ${hours} : ${minutes} : ${seconds} ${per}`;

    let years = now.getFullYear();
    let months = now.getMonth() + 1;
    let day = now.getDate();
    months = months < 10 ? `0${months}` : months;
    day = day < 10 ? `0${day}` : day;

    date.innerHTML = `Date Now ${years} - ${months} - ${day}`;
}

window.onload = setInterval(showTime, 1000);
