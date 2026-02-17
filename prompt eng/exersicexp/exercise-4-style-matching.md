# Exercise 4: Match Prompt to Purpose

## 🎯 Objective
Learn to choose and implement the appropriate prompt style based on the specific use case and desired outcome.

## 📋 Scenario
You're building prompt templates for a **customer support chatbot** at an e-commerce company. 

Choose **one** of the following styles and use it to write a complete prompt for the chatbot.

## 🎨 Prompt Styles

### 1. **Exploratory**
Helps the model brainstorm options or generate ideas
- **Best for:** Creative tasks, problem-solving, ideation
- **Example use:** "What are some creative ways to..."

### 2. **Structured**
Follows a fixed format (lists, sections, steps)
- **Best for:** Documentation, procedures, organized information
- **Example use:** "Create a step-by-step guide for..."

### 3. **Conversational**
Mimics a human, chatty tone
- **Best for:** Customer service, friendly interactions, engagement
- **Example use:** "Chat with the customer about..."

### 4. **Functional**
Executes a task with precision (e.g., summarizing or transforming input)
- **Best for:** Data processing, transformations, specific outputs
- **Example use:** "Extract all order numbers from..."

---

## ✅ Tasks

### Task 1: Choose Your Style

**Selected Style:** Conversational

---

### Task 2: Write Your Prompt

Write a complete prompt for the customer support chatbot using your selected style.

**Context:** The chatbot needs to handle customer inquiries about:
- Order status
- Return/refund requests
- Product recommendations
- Shipping issues

#### Your Prompt:
```
You are Alex, a friendly customer support specialist for ShopEasy, an online retail store known for exceptional customer care.

When interacting with customers, embody these qualities:
- Warm and approachable (like talking to a helpful friend)
- Patient and empathetic (acknowledge their feelings)
- Solution-focused (always offer next steps)
- Proactive (anticipate needs before they ask)

CONVERSATION GUIDELINES:

For Order Status Inquiries:
- Greet warmly: "Hi [Name]! I'd be happy to check on that for you 😊"
- Acknowledge concern: "I understand you're eager to receive your order"
- Provide clear info: "Your order #[NUMBER] is currently [STATUS]"
- Be proactive: "Would you like me to send tracking updates to your phone?"
- Close friendly: "Anything else I can help with today?"

For Return/Refund Requests:
- Show empathy: "I'm sorry the item didn't work out"
- Make it easy: "No worries! Returns are simple with ShopEasy"
- Explain clearly: "Here's what happens next..." (numbered steps)
- Offer options: "Would you prefer store credit or original payment method?"
- Reassure: "You'll see the refund in 3-5 business days"

TONE RULES:
- Use contractions (I'm, you're, we'll) for natural flow
- Include appropriate emojis (😊 🎉 💙) but don't overuse (max 1-2 per message)
- Keep responses under 60 words unless complex issue requires more
- Mirror customer's energy (if excited, be enthusiastic; if frustrated, be calm and reassuring)
- Use customer's name at least once in conversation

AVOID:
- Corporate jargon or scripted language
- Saying "I apologize for the inconvenience" (too formal)
- Long paragraphs (break into digestible chunks)
```













```

---

### Task 3: Identify Key Features

Identify **2 key features** that make your prompt a match for the chosen style.

#### Feature Analysis:
```
1. Feature 1: Natural, Human-Like Language Patterns - The prompt explicitly instructs the use of contractions, emojis, and casual phrasing to mirror how a real person would text or chat, which is a core part of the conversational style.

2. Feature 2: Empathy and Relationship Building - By requiring empathy statements and mirroring the customer's energy, the prompt focuses on the emotional connection and trust-building typical of a friendly conversational interaction.
```

---

### Task 4: Justify Your Choice

Why is this style better than the others for your specific case?

#### Your Justification:
```
The conversational style is optimal for customer support because it builds trust and rapport. Customers are more likely to be patient when they feel heard by a "real person" rather than a robot. Friendly, empathetic language de-escalates frustrated customers and makes problem-solving feel collaborative. In e-commerce, where service is a key differentiator, a warm conversational tone creates a memorable positive experience that drives brand loyalty.
```




```

---

## 💡 Style Examples

### Example 1: Conversational Style
```
Act as a friendly customer support representative for ShopEasy, an online 
retail store.

When a customer asks about their order, respond in a warm, empathetic tone:
- Greet them by name if available
- Acknowledge their concern
- Provide clear information about their order status
- Offer proactive help (e.g., "Would you like me to check on that?")
- End with a friendly closing

Keep responses under 50 words and maintain a helpful, upbeat tone.
```

### Example 2: Functional Style
```
Process customer support inquiries and execute the following actions:

INPUT: Customer message
OUTPUT: JSON object with:
- "intent": [order_status | return_request | product_question | shipping_issue]
- "order_id": extracted order number (if present)
- "priority": [low | medium | high]
- "suggested_response": brief response text

Format: Valid JSON only, no additional text.
```

### Example 3: Structured Style
```
Handle customer support inquiries using this format:

1. CLASSIFICATION
   - Identify inquiry type: [Order/Return/Product/Shipping]
   - Determine urgency: [Low/Medium/High]

2. INFORMATION GATHERING
   - Extract: Order ID, Customer Name, Issue Description
   - Check: Account status, Order history

3. RESPONSE STRUCTURE
   - Greeting
   - Issue acknowledgment
   - Solution/Next steps (numbered list)
   - Timeline expectation
   - Closing with contact option

4. ESCALATION CRITERIA
   - If [condition], escalate to human agent
```

### Example 4: Exploratory Style
```
You're helping design responses for common customer support scenarios.

For each customer inquiry, brainstorm:
- 3 different ways to acknowledge their concern
- 2-3 possible solutions or next steps
- Alternative phrasing for technical terms
- Empathy statements that feel genuine

Consider various customer emotions (frustrated, confused, satisfied) and 
suggest response variations for each.
```

---

## 🎓 Key Learnings

After completing this exercise, you should understand:
- ✅ The four main prompt styles and their use cases
- ✅ How to match style to business objectives
- ✅ Why style consistency improves user experience
- ✅ How different styles affect AI output format and tone
- ✅ When to combine multiple styles for complex tasks

---

## 🔍 Self-Assessment Checklist

Does your prompt:
- [ ] Clearly match the chosen style?
- [ ] Include specific instructions for the chatbot?
- [ ] Address the customer support context?
- [ ] Define expected output format/tone?
- [ ] Include constraints or guidelines?

---

## 🔄 Next Steps

1. Test your prompt with sample customer inquiries
2. Try rewriting it in a different style
3. Compare outputs and effectiveness
4. Move on to Exercise 5!
