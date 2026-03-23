// 🎥 VIDEO STATE (PERSISTENT LOOP)
let videoIndex = parseInt(localStorage.getItem("videoIndex")) || 0;

// 🎞️ ALL 3 VIDEOS
const videos = [
    "./videos/Futuristic_Bi_Cinematic_1.mp4",
    "./videos/Futuristic_Bi_Cinematic_2.mp4",
    "./videos/Futuristic_Bi_Cinematic_3.mp4",
    "./videos/Futuristic_Bi_Cinematic_4.mp4",
    "./videos/Futuristic_Bi_Cinematic_5.mp4"
];


// 🔐 GOOGLE LOGIN HANDLER
function handleCredentialResponse(response) {
    const data = parseJwt(response.credential);

    // 💾 SAVE USER
    localStorage.setItem("user", JSON.stringify(data));

    showUser(data.name);
}


// 👤 SHOW USER UI
function showUser(name) {
    document.getElementById("username").textContent = name;

    document.getElementById("login-section").style.display = "none";
    document.getElementById("user-section").style.display = "block";
    document.getElementById("search-section").style.display = "flex";
}


// 🔓 Decode JWT
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(atob(base64));
    } catch (err) {
        console.error("JWT parse error:", err);
        return {};
    }
}


// 🚀 MAIN LOGIC
document.addEventListener("DOMContentLoaded", () => {

    const analyzeBtn = document.getElementById("analyzeBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    // ✅ APPLY VIDEO ON LOAD (IMPORTANT)
    const videoElement = document.getElementById("bg-video");
    const videoSource = videoElement.querySelector("source");

    videoSource.src = videos[videoIndex];
    videoElement.load();

    // ✅ AUTO LOGIN
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
        const user = JSON.parse(storedUser);
        showUser(user.name);
    }

    // ✅ LOAD RESULT FROM LOADING PAGE
    const storedResult = localStorage.getItem("analysisResult");

    if (storedResult) {
        const parsed = JSON.parse(storedResult);

        const resultBox = document.getElementById("result-box");
        resultBox.classList.remove("hidden");

        document.getElementById("error-msg").classList.add("hidden");

        if (parsed.error || !parsed.data) {
            document.getElementById("error-msg").classList.remove("hidden");
        } else {

            const d = parsed.data;

            set("software_name", d.software_name);
            set("developer_organization", d.developer_organization);
            setLink("official_website", d.official_website);
            set("software_category", d.software_category);
            set("license_name", d.license_name);
            set("license_type", d.license_type);
            set("primary_language", d.primary_language);
            set("platform", d.platform);
            set("capability", d.capability);
            set("similar_software", d.similar_software);
            set("current_status", d.current_status);
            set("popularity", d.popularity);
            set("innovation", d.innovation);
            set("overall_score", d.overall_score);
            setLink("images", d.images);
        }

        // 🧹 CLEAR AFTER USE
        localStorage.removeItem("analysisResult");
    }

    // ✅ SEARCH BUTTON → LOADING PAGE
    analyzeBtn.addEventListener("click", () => {

        const name = document.getElementById("softwareInput").value.trim();
        const type = document.getElementById("softwareType").value;

        if (!name) {
            alert("Please enter a software name");
            return;
        }

        // 💾 SAVE INPUT
        localStorage.setItem("softwareName", name);
        localStorage.setItem("softwareType", type);

        // 🎥 SWITCH VIDEO (LOOP)
        videoIndex = (videoIndex + 1) % videos.length;
        localStorage.setItem("videoIndex", videoIndex);

        // 🔄 REDIRECT TO LOADING
        window.location.href = "loading.html";
    });


    // 🚪 LOGOUT BUTTON
    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("user");
        localStorage.removeItem("analysisResult");
        localStorage.removeItem("softwareName");
        localStorage.removeItem("softwareType");
        localStorage.removeItem("videoIndex");

        location.reload();
    });

});


// ✅ TEXT SETTER
function set(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerText = value || "N/A";
}


// 🔗 LINK SETTER
function setLink(id, value) {
    const el = document.getElementById(id);

    if (!el) return;

    if (!value) {
        el.innerText = "N/A";
        return;
    }

    el.innerHTML = `<a href="${value}" target="_blank">${value}</a>`;
}