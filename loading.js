const progressFill = document.getElementById("progressFill");

const softwareName = localStorage.getItem("softwareName");
const softwareType = localStorage.getItem("softwareType");

// 🚀 Start process
window.onload = async () => {
    try {
        // Step 1
        updateProgress(20);
        console.log("Initializing...");

        // Step 2
        await delay(800);
        updateProgress(40);
        console.log("Connecting to DB...");

        // Step 3 → Backend call
        await delay(800);
        updateProgress(60);
        console.log("Checking database / AI...");

const response = await fetch("https://software-genome-backend.onrender.com/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                softwareName,
                softwareType
            })
        });

        if (!response.ok) {
            throw new Error("Server error");
        }

        const data = await response.json();

        // Save result for next page
        localStorage.setItem("analysisResult", JSON.stringify(data));

        // Step 4
        updateProgress(85);
        console.log("Processing result...");

        await delay(800);

        // Final
        updateProgress(100);
        console.log("Done");

        setTimeout(() => {
            window.location.href = "index.html";
        }, 700);

    } catch (error) {
        console.error(error);
        alert("❌ Error connecting to server");
    }
};

// 📊 Progress updater
function updateProgress(value) {
    progressFill.style.width = value + "%";
}

// ⏳ Delay helper
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}