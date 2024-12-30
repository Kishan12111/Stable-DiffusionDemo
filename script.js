async function generateImage() {
    const prompt = document.getElementById("prompt").value;
    const outputDiv = document.getElementById("output");

    if (!prompt) {
        alert("Please enter a prompt!");
        return;
    }

    // Clear previous output
    outputDiv.innerHTML = "Generating image...";

    try {
        // Send the prompt to your API
        const response = await fetch("https://3585-34-91-72-246.ngrok-free.app/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error: ${response.status} - ${errorText}`);
        }

        // Parse and display the image
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        outputDiv.innerHTML = `<img src="${url}" alt="Generated Image" />`;

    } catch (error) {
        console.error(error);
        outputDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}
