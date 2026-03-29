import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const businessInfo = `

General Business Information:
Website: www.yourbusiness.com

Return Policy:
Customers can return products within 30 days of purchase with the original receipt.
Items must be unused and in their original packaging.
Refunds will be processed to the original payment method.

Support Email: support@yourbusiness.com

Madrid Location:
Address: Calle Mayor 123, 28013 Madrid, Spain
Phone: +34 91 123 4567
Email: madrid@yourbusiness.com
Opening Hours:
Monday to Friday: 10:00 AM to 8:00 PM
Saturday: 10:00 AM to 6:00 PM
Sunday: Closed

New York Location:
Address: 456 Broadway, New York, NY 10012, USA
Phone: +1 212-123-4567
Email: newyork@yourbusiness.com
Opening Hours:
Monday to Friday: 9:00 AM to 7:00 PM
Saturday: 10:00 AM to 5:00 PM
Sunday: Closed

FAQs:
General:
What is your return policy?

You can return items within 30 days with the original receipt and packaging. Refunds are processed to the original payment method.
Do you ship internationally?

Yes, we ship to most countries. Shipping rates and delivery times vary by location.
How can I track my order?

You will receive a tracking number via email once your order is shipped.
Can I cancel or modify my order?

Orders can be modified or canceled within 24 hours. Please contact support@yourbusiness.com.
Madrid Location:
What are your opening hours in Madrid?

Monday to Friday: 10:00 AM to 8:00 PM
Saturday: 10:00 AM to 6:00 PM
Sunday: Closed
Is parking available at the Madrid store?

Yes, we offer parking nearby. Contact us for details.
How can I contact the Madrid store?

You can call us at +34 91 123 4567 or email madrid@yourbusiness.com.
New York Location:
What are your opening hours in New York?

Monday to Friday: 9:00 AM to 7:00 PM
Saturday: 10:00 AM to 5:00 PM
Sunday: Closed
Do you host events at the New York location?

Yes, we host regular workshops and community events. Check our website for updates.
How can I contact the New York store?

You can call us at +1 212-123-4567 or email newyork@yourbusiness.com.

Tone Instructions:
Conciseness: Respond in short, informative sentences.
Formality: Use polite language with slight formality (e.g., "Please let us know," "We are happy to assist").
Clarity: Avoid technical jargon unless necessary.
Consistency: Ensure responses are aligned in tone and style across all queries.
Example: "Thank you for reaching out! Please let us know if you need further assistance."

`;

const API_KEY = "AIzaSyBtUBmnQcPrxRBZDx_RhI5I_B8aKRG_r3Y";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: businessInfo
});

// Preloader Logic
window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
        // Keep visible for at least 5 seconds
        setTimeout(() => {
            preloader.style.opacity = "0";
            setTimeout(() => {
                preloader.style.display = "none";
            }, 500); // Wait for transition
        }, 5000); // 5 seconds minimum duration
    }
});

// Smooth Scrolling (Lenis) — synced with GSAP ScrollTrigger
import Lenis from "https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/+esm";

const lenis = new Lenis({
    duration: 1.2,        // slightly faster for less perceived lag
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: false,      // avoid hijacking touch on mobile
});

// Sync Lenis scroll position with GSAP ScrollTrigger on every frame
lenis.on("scroll", () => {
    if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.update();
    }
});

// Use GSAP ticker instead of raw rAF for tighter sync
if (typeof gsap !== "undefined") {
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0); // disable lag smoothing for consistent frames
} else {
    // Fallback if gsap not loaded yet
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}

// Chat Logic
let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
let messages = { history: [] }; // Reset for fresh session, historical context handled via chatHistory rendering but not passed to API for now (unless we reconstruct it)
// Note: Google Generative AI chat handles history internally via startChat, but implementation might differ from persistent storage.
// We will reconstruct history for the model if needed, but for now we restart chat session.
// Wait, the inline script was POSTing chat history to a backend. Here we use client-side SDK.
// We should adapt `messages` for SDK if we want persistence across reloads for the AI context.
// However, the SDK `startChat` takes `history`. We can map `chatHistory` to `messages.history`.

// Map localStorage history to Gemini SDK format
if (chatHistory.length > 0) {
    messages.history = chatHistory.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.text }]
    }));
}

const chatIcon = document.getElementById("chatIcon");
const chatModal = document.getElementById("chatModal"); // Ensure index.html uses chatModal
const closeChatBtn = document.getElementById("closeChatBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const chatBody = document.getElementById("chatBody");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

function renderChat() {
    if (!chatBody) return;
    chatBody.innerHTML = "";
    chatHistory.forEach((msg) => {
        const div = document.createElement("div");
        div.className = "message " + (msg.role === "user" ? "user-message" : "assistant-message");
        div.textContent = msg.text;
        chatBody.appendChild(div);
    });
    chatBody.scrollTop = chatBody.scrollHeight;
}

if (chatIcon) {
    chatIcon.addEventListener("click", () => {
        if (chatModal) {
            chatModal.style.display = "flex";
            renderChat();
        }
    });
}

if (closeChatBtn) {
    closeChatBtn.addEventListener("click", () => {
        if (chatModal) chatModal.style.display = "none";
    });
}

if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to clear the chat history?")) {
            chatHistory = [];
            localStorage.removeItem("chatHistory");
            messages.history = []; // Clear SDK history too
            renderChat();
        }
    });
}

async function sendMessage() {
    if (!chatInput) return;
    const userMessage = chatInput.value.trim();

    if (userMessage.length) {
        // Optimistic UI update
        chatInput.value = "";

        chatHistory.push({ role: "user", text: userMessage });
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
        renderChat();

        // Show loader
        const loaderDiv = document.createElement("div");
        loaderDiv.className = "loader";
        chatBody.appendChild(loaderDiv);
        chatBody.scrollTop = chatBody.scrollHeight;

        try {
            const chat = model.startChat({
                history: chatHistory.map(msg => ({
                    role: msg.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: msg.text }]
                })).slice(0, -1) // Exclude the just added message if we send it via sendMessage
            });

            // If we include history in startChat, we send the new message via sendMessage
            // But verify if history includes the new message or not.
            // SDK: startChat(history). sendMessage(msg) appends msg to history.
            // So we should NOT include the latest user message in history passed to startChat if we send it via sendMessage.
            // Which we do: slice(0, -1).

            // Actually, for simplicity, let's just use the maintained `messages` object or restart chat with full history minus last.

            let result = await chat.sendMessageStream(userMessage);

            loaderDiv.remove();

            let modelResponseText = "";
            const assistantDiv = document.createElement("div");
            assistantDiv.className = "message assistant-message";
            chatBody.appendChild(assistantDiv);

            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                modelResponseText += chunkText;
                assistantDiv.textContent = modelResponseText;
                chatBody.scrollTop = chatBody.scrollHeight;
            }

            chatHistory.push({ role: "assistant", text: modelResponseText });
            localStorage.setItem("chatHistory", JSON.stringify(chatHistory));

        } catch (error) {
            if (loaderDiv) loaderDiv.remove();
            console.error("Chat error:", error);
            const errorDiv = document.createElement("div");
            errorDiv.className = "message assistant-message error"; // custom styling for error?
            errorDiv.textContent = "Sorry, something went wrong. Please try again.";
            chatBody.appendChild(errorDiv);
        }
    }
}

if (sendBtn) {
    sendBtn.addEventListener("click", sendMessage);
}

if (chatInput) {
    chatInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
}
