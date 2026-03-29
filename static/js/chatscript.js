import { GoogleGenerativeAI } from "@google/generative-ai";

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


document.addEventListener('DOMContentLoaded', () => {
    // ———— 1) AJAX contact form ————
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      // If your backend expects JSON:
      const payload = Object.fromEntries(formData.entries());
  
      try {
        const res = await fetch(contactForm.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const result = await res.json(); // { status: 'success'|'error', message: '…' }
        Swal.fire({
          icon: result.status,
          title: result.status === 'success' ? 'Sent!' : 'Error',
          text: result.message,
        });
        if (result.status === 'success') contactForm.reset();
      } catch (err) {
        Swal.fire('Error', 'Could not send. Please try again later.', 'error');
      }
    });
  
  
    // ———— 2) AI Chat integration ————
    const chatWindow   = document.getElementById('chat-window');
    const textarea     = document.getElementById('uiverse_chat_bot');
    const sendBtn      = document.querySelector('.uiverse-chat-submit');
    let   chatHistory  = [];
  
    sendBtn.addEventListener('click', async () => {
      const userText = textarea.value.trim();
      if (!userText) return;
  
      // 1) Append user message
      appendMessage('You', userText, 'user');
  
      // 2) Send to /chat
      chatHistory.push({ role: 'user', text: userText });
      textarea.value = '';
  
      try {
        const resp = await fetch('/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_history: chatHistory }),
        });
        const aiText = await resp.text();
  
        // 3) Append AI message
        appendMessage('AI', aiText, 'model');
        chatHistory.push({ role: 'model', text: aiText });
      } catch (e) {
        appendMessage('AI', 'Error: failed to reach AI.', 'model');
      }
    });
  
    function appendMessage(who, text, cls) {
      const msg = document.createElement('div');
      msg.className = `chat-message ${cls}`;
      msg.style = `
        margin: 4px 0;
        padding: 6px 8px;
        border-radius: 4px;
        background: ${cls==='user' ? '#1a1a1a' : '#333'};
        color: #fff;
        font-size: 14px;
      `;
      msg.innerHTML = `<strong>${who}:</strong> ${text}`;
      chatWindow.appendChild(msg);
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  });
  