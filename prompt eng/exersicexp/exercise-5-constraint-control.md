# Exercise 5: Prompt Refinement Challenge – Control the Style, Structure, and Length

## 🎯 Objective
Master the art of enforcing strict constraints on AI outputs through precise prompt engineering.

## 📋 Scenario
You work for a wearable tech company launching a new smartwatch called **PulseOne Mini**. The marketing team is preparing content for an email campaign and wants you to use ChatGPT to write a product blurb with these **strict constraints**:

### Required Constraints:
- ✅ **Friendly tone**
- ✅ **Bullet point format**
- ✅ **Max 50 words total**
- ✅ **Must mention:**
  - Battery life
  - Fitness tracking
  - Bluetooth compatibility

---

## ✅ Tasks

### Task 1: Write a Constraint-Enforcing Prompt

Write a prompt that **strictly enforces** all the constraints above.

#### Your Prompt:
```
Write a product description for PulseOne Mini smartwatch for our email marketing campaign.

STRICT FORMAT REQUIREMENTS:
- Use EXACTLY 3 bullet points
- Start each bullet with the • symbol
- No additional text outside the bullets (no intro, no conclusion)

MANDATORY CONTENT (all 3 must be included):
• Bullet 1: Battery life feature
• Bullet 2: Fitness tracking feature  
• Bullet 3: Bluetooth compatibility feature

TONE REQUIREMENT:
- Friendly and conversational
- Avoid technical jargon
- Write as if recommending to a friend

LENGTH CONSTRAINT (CRITICAL):
- Maximum 50 words TOTAL across all 3 bullets
- Count every word before responding
- If over 50 words, revise until under limit
- Do not include the bullet symbols in word count

VERIFICATION CHECKLIST (complete before responding):
□ Exactly 3 bullets?
□ All 3 features mentioned?
□ Total word count ≤ 50?
□ Friendly tone throughout?
□ No technical jargon?

Provide ONLY the 3 bullets, nothing else.
```

---

### Task 2: Run and Evaluate

Test your prompt with ChatGPT and evaluate the output:

#### Output Evaluation:

**Generated Output:**
```
• Enjoy a massive 24-hour battery life that keeps up with your busiest days.
• Track your heart rate and steps easily with our built-in fitness monitoring.
• Stay connected to your friends and calls with seamless Bluetooth compatibility.
```

**Evaluation Checklist:**

| Constraint | Met? (✅/❌) | Notes |
|------------|-------------|-------|
| Word count ≤ 50 words | ✅ | 42 words total |
| Bullet point format | ✅ | Exactly 3 bullets with • symbol |
| Friendly tone | ✅ | Conversational and helpful |
| Mentions battery life | ✅ | "24-hour battery life" |
| Mentions fitness tracking | ✅ | "Track heart rate and steps" |
| Mentions Bluetooth | ✅ | "seamless Bluetooth compatibility" |

---

### Task 3: Refine If Needed

If the model didn't meet all constraints, revise your prompt with **stronger constraint language**.

Examples of stronger constraints:
- "Do not exceed 50 words."
- "List exactly 3 bullet points."
- "Each bullet must mention one of these features: [list]"
- "Count words before responding."

#### Your Revised Prompt (if needed):
```
[Write your refined prompt here]











```

---

## 💡 Constraint Enforcement Techniques

### 1. **Explicit Counting Instructions**
```
"Count the total words in your response. It must not exceed 50 words."
```

### 2. **Format Specification**
```
"Use exactly 3 bullet points. Start each with a dash (-) or bullet (•)."
```

### 3. **Feature Checklist**
```
"Your response MUST include all three features:
1. Battery life
2. Fitness tracking
3. Bluetooth compatibility

Verify each is mentioned before responding."
```

### 4. **Tone Enforcement**
```
"Use a friendly, conversational tone. Avoid technical jargon. 
Write as if talking to a friend."
```

### 5. **Negative Instructions**
```
"Do NOT:
- Exceed 50 words
- Use paragraphs (bullets only)
- Omit any required features
- Use formal or corporate language"
```

---

## 📝 Example Comparison

### ❌ Weak Constraint Prompt
```
"Write a short description of PulseOne Mini smartwatch. 
Mention battery, fitness, and Bluetooth. Use bullets and be friendly."
```

**Problem:** Vague length requirement, no verification steps

---

### ✅ Strong Constraint Prompt
```
Write a product description for PulseOne Mini smartwatch following these 
STRICT requirements:

FORMAT:
- Exactly 3 bullet points (use • symbol)
- No paragraphs or additional text

CONTENT (all required):
• Battery life feature
• Fitness tracking feature
• Bluetooth compatibility feature

TONE:
- Friendly and conversational
- Avoid technical jargon

LENGTH:
- Maximum 50 words total (count before responding)
- If over 50 words, revise to meet limit

Verify all requirements before providing your response.
```

---

## 🎓 Key Learnings

After completing this exercise, you should understand:
- ✅ How to write enforceable constraints
- ✅ The difference between weak and strong constraint language
- ✅ Why verification instructions improve compliance
- ✅ How to use negative instructions effectively
- ✅ Techniques for controlling length, format, and tone simultaneously

---

## ✨ Advanced Challenge

Try adding these additional constraints to your prompt:
- Include a call-to-action (CTA)
- Use alliteration in at least one bullet
- Mention a price point under $200
- Keep each bullet under 15 words

Can you maintain all original constraints while adding these?

---

## 🔍 Common Pitfalls

### Pitfall 1: Vague Length Requirements
❌ "Keep it short"
✅ "Maximum 50 words. Count before responding."

### Pitfall 2: Implied Format
❌ "Use bullets"
✅ "Format as exactly 3 bullet points using • symbol"

### Pitfall 3: Optional-Sounding Requirements
❌ "Try to mention battery life"
✅ "MUST mention battery life"

### Pitfall 4: No Verification
❌ Just listing requirements
✅ "Verify all requirements are met before responding"

---

## 🔄 Next Steps

1. Test your prompt multiple times
2. Track compliance rate across tests
3. Refine constraint language based on results
4. Move on to Exercise 6!
