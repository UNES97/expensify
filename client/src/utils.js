import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export const showNotification = (message, method = 'error') => {
    const notyf = new Notyf({
        position: {x:'right',y:'top'},
        duration: 4000,
        dismissible: true
    });
    if (typeof notyf[method] === 'function') {
        notyf[method](message);
    } 
    else {
        notyf.error(message);
    }
};

export const parseJwt = (token) => {
    if(!token) return '';
    
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
};

export const getConnectedUser = () => {
    return parseJwt(JSON.parse(localStorage.getItem("userAuthenticated")));
};

export const getGreeting = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour >= 5 && currentHour < 12) {
        return "Good morning";
    } else if (currentHour >= 12 && currentHour < 18) {
        return "Good afternoon";
    } else {
        return "Good evening";
    }
}

export const generateProfileImage = (fullName) => {
    const firstCharacter = fullName.trim().charAt(0).toUpperCase();
    const canvas = document.createElement('canvas');
    const scale = window.devicePixelRatio || 1;
    canvas.width = 200 * scale; // Increase width and height for higher resolution
    canvas.height = 200 * scale;
    canvas.style.width = "200px"; // Actual size displayed on the page
    canvas.style.height = "200px";
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.arc(100 * scale, 100 * scale, 80 * scale, 0, 2 * Math.PI); // Adjust coordinates and radius
    
    ctx.fillStyle = getRandomLightColor();
    ctx.fill();
    
    ctx.font = 'bold 180px "Maersk-Bold", sans-serif'; // Increase font size
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(firstCharacter, 100 * scale, 100 * scale); // Adjust coordinates
    
    return canvas.toDataURL();
}
  
export const getRandomLightColor = () => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    
    const brightnessThreshold = 160;
    const r = parseInt(randomColor.substr(0, 2), 16);
    const g = parseInt(randomColor.substr(2, 2), 16);
    const b = parseInt(randomColor.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    if (brightness >= brightnessThreshold) {
        return '#' + randomColor;
    } else {
        return getRandomLightColor(); 
    }
}

export const getaccessToken = () => {
    return JSON.parse(localStorage.getItem("userAuthenticated"));
}

export const formatParams = (d) => {
    let p = new URLSearchParams();
    Object.keys(d).forEach(function(key){
        p.append(key, this[key]);
    }, d);
    return p
}