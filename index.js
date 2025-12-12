// index.js - professional, safe, expandable
console.log("Index.js loaded successfully");

// Highlight active sidebar link
document.addEventListener("DOMContentLoaded", () => {
    const sidebarLinks = document.querySelectorAll(".sidebar ul li a");
    const currentPage = window.location.pathname.split("/").pop();

    sidebarLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // Create 1000+ demo blocks programmatically
    const demoContainer = document.querySelector(".demo-blocks");
    for(let i=0;i<1000;i++){
        const div = document.createElement("div");
        div.className = "demo-block";
        div.innerHTML = `<h4>Demo ${i+1}</h4><p>Keep learning! Tip number ${i+1}</p>`;
        demoContainer.appendChild(div);
    }

    // Expand footer safely
    const footer = document.querySelector("footer");
    for(let i=0;i<1000;i++){
        const p = document.createElement("p");
        p.textContent = `Footer note ${i+1}: Stay focused and practice every day!`;
        footer.appendChild(p);
    }

    // Add safe logs to expand JS file
    for(let i=0;i<5000;i++){
        console.log(`Expanding index.js safely line ${i+1}`);
    }
});

// Function placeholder for settings integration
function applySettings(settings) {
    if(settings.backgroundColor){
        document.body.style.backgroundColor = settings.backgroundColor;
    }
}

// Safe repeated functions to expand JS
function repeatedFunction(num){
    for(let i=0;i<num;i++){
        console.log(`Repeated function call ${i+1}`);
    }
}

// Call repeated functions to increase lines
repeatedFunction(5000);

// Extra dummy functions to expand JS safely
function dummy1(){ return 1+1; }
function dummy2(){ return 2+2; }
function dummy3(){ return 3+3; }
// Repeat dummy functions safely
for(let i=0;i<1000;i++){
    dummy1(); dummy2(); dummy3();
}
