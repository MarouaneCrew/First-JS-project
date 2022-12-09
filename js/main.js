let mainColor = localStorage.getItem("color-option");

if (mainColor !== null) {
    document.documentElement.style.setProperty("--main-color", mainColor);
    document.querySelectorAll(".spans span").forEach(ele => {
        ele.classList.remove("active");
        if (ele.dataset.color === mainColor) {
            ele.classList.add("active");
        };
    });
};


let gear = document.querySelector(".toggle-setting i");

let box = document.querySelector(".setting-box");

gear.onclick = function() {
    this.classList.toggle("fa-spin");
    box.classList.toggle("show");
};
document.addEventListener("click", (e) => {
    if (e.target !== box) {
        gear.classList.remove("fa-spin");
        box.classList.remove("show");
    };
});

box.onclick = function (e) {
    e.stopPropagation();
}; 

let span = document.querySelectorAll(".spans span");

span.forEach(sp => {
    sp.addEventListener("click", (e) => {
        span.forEach(sp => {
            sp.classList.remove("active");
        });
        e.target.classList.add("active");
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        localStorage.setItem("color-option", e.target.dataset.color);
    });
});

let bgOption = true;
let bgInterval;
let bgImage = localStorage.getItem("bgI");

if (bgImage !== null) {
    document.querySelectorAll(".bg-option li").forEach(li => {
        li.classList.remove("active");
    });
    if (bgImage === "true") {
        bgOption = true;
        document.querySelector(".yes").classList.add("active");
    } else {
        bgOption = false;
        document.querySelector(".no").classList.add("active");
    }
};

let li = document.querySelectorAll(".bg-option li");
li.forEach(l => {
    l.addEventListener("click", (e) => {
        li.forEach(l => {
            l.classList.remove("active");
        });
        e.target.classList.add("active");
        if (e.target.dataset.bg === "yes") {
            bgOption = true;
            randomizeImgs();
            localStorage.setItem("bgI", true)
        } else {
            bgOption = false;
            clearInterval(bgInterval);
            localStorage.setItem("bgI", false)
        };
    });
});

let bulletsLi = document.querySelectorAll(".bullet-option li");

let bulletsContainer =  document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullet-option");

if (bulletLocalItem !== null) {
    bulletsLi.forEach(li => {
        li.classList.remove("active");
    })
    if (bulletLocalItem === "true") {
        bulletsContainer.style.display = "block";
        document.querySelector(".bullet-option .yes").classList.add("active");
    } else {
        bulletsContainer.style.display = "none";
        document.querySelector(".bullet-option .no").classList.add("active");
    };
}; 

bulletsLi.forEach(li => {
    li.addEventListener("click", (e) => {
        if (e.target.dataset.bullet === "yes") {
            bulletsContainer.style.display = "block";
            localStorage.setItem("bullet-option", true);
        } else {
            bulletsContainer.style.display = "none";
            localStorage.setItem("bullet-option", false);
        }
        bulletsLi.forEach(lis => {
            lis.classList.remove("active");
        });
        e.target.classList.add("active");
    });
});



let imgs = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg","08.jpg",
"09.jpg", "010.jpg", "011.jpg", "012.jpg", "013.jpg", "014.jpg","015.jpg","016.jpg",
"017.jpg", "018.jpg", "019.jpg", "020.jpg", "021.jpg", "022.jpg", "023.jpg"];

let landing = document.querySelector(".landing-page");

function randomizeImgs() {
    if (bgOption === true) {
        bgInterval = setInterval(() => {
            let random = Math.floor(Math.random() * imgs.length);
            landing.style.backgroundImage = "url('pictures/"+imgs[random]+"')";
        },5000);
    };
};

randomizeImgs();

let skills = document.querySelector(".our-skills");

window.onscroll = function () {
    let top = skills.offsetTop;
    let height = skills.offsetHeight;
    let window = this.innerHeight;
    let scrollY = this.pageYOffset;
    if (scrollY < height) {
        let allSkill = document.querySelectorAll(".proportion span");
        allSkill.forEach(skills => {
            skills.style.width = 0;
        });
    };
    if (scrollY > (top + height - window)) {
        let allSkills = document.querySelectorAll(".proportion span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    };
};


let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
    img.addEventListener("click", () => {
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);
        
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";
        
        if (img.alt !== "") {
            let heading = document.createElement("h3");
            heading.textContent = img.alt;
            popupBox.appendChild(heading);
        }
        
        let popupImage = document.createElement("img");
        popupImage.src = img.src;
        document.body.appendChild(popupBox);
        popupBox.appendChild(popupImage);
        
        
        let closeButton = document.createElement("span");
        let closeButtonText = document.createTextNode("X");
        popupBox.appendChild(closeButton);
        closeButton.appendChild(closeButtonText);

        closeButton.onclick = function () {
            overlay.remove();
            popupBox.remove();
        };

        overlay.onclick = function () {
            this.remove();
            popupBox.remove();
        };

    });
});

let bullets = document.querySelectorAll(".nav-bullets .bullet");

bullets.forEach(bullet => {
    bullet.addEventListener("click", (e) => {
        document.querySelector(e.target.dataset.bull).scrollIntoView({
            behavior: "smooth"
        })
    })
})

document.querySelector(".setting-box .reset-option").onclick = function () {
    // localStorage.clear();
    localStorage.removeItem("color-option")
    localStorage.removeItem("bgI")
    localStorage.removeItem("bullet-option")
    window.location.reload();
}

let toggleMenu = document.querySelector(".toggle-menu");

let linkList = document.querySelector(".links-container .links li");

toggleMenu.onclick = function (e) {
    e.stopPropagation();
    linkList.parentElement.classList.toggle("show");
}

document.addEventListener("click",(e) => {
    if (e.target !== toggleMenu && e.target !== linkList) {
        linkList.parentElement.classList.remove("show");
    }
})
// console.log(document.querySelectorAll(".links-container .links"))

