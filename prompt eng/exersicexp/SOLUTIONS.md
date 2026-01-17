# Expert Solutions: Prompt Engineering Exercises

> **Note:** These are expert-level solutions demonstrating best practices. Your solutions may vary, and that's perfectly fine! Use these as learning references.

---

## Exercise 1: Rewrite and Optimize a Vague Prompt

### Original Vague Prompt
> "Write something about productivity tips."

### Task 1: Three Critical Issues

**1. Missing Brand Context**
- No mention of FlowNest or its unique value proposition
- Fails to differentiate from generic productivity content
- Doesn't establish brand voice or positioning

**2. No Audience Targeting**
- Unclear who the content is for (students, professionals, entrepreneurs?)
- No consideration of LinkedIn's professional audience
- Missing pain points or user needs

**3. Lack of Platform-Specific Requirements**
- No engagement hooks (questions, CTAs)
- Missing format constraints (LinkedIn post length, hashtags)
- No consideration of LinkedIn algorithm preferences (native content, engagement)

---

### Task 2: Rewritten Prompt Using Three Techniques

```
Act as a social media marketing specialist with expertise in B2C SaaS 
promotion and LinkedIn engagement strategies.

Create a LinkedIn post promoting FlowNest, our new focus app designed 
for remote professionals struggling with digital distractions.

Requirements:
1. Hook: Start with a relatable question or pain point about focus/productivity
2. Value Proposition: Highlight FlowNest's unique AI-powered distraction 
   blocking feature
3. Social Proof: Mention "Join 10,000+ professionals" (if applicable)
4. Call-to-Action: Include link to free trial with urgency ("Limited beta spots")

Format & Constraints:
- Length: 150-200 words (optimal for LinkedIn engagement)
- Tone: Professional yet conversational, empathetic to remote work challenges
- Structure: Hook (1-2 lines) + 3 bullet points + CTA
- Include: 3-5 relevant hashtags (#productivity #remotework #focusapp)
- Emoji usage: 2-3 strategic emojis for visual breaks

Avoid:
- Generic productivity advice without brand connection
- Overly salesy language
- Technical jargon
```

---

### Task 3: Reusable Template

```
Use this format whenever promoting productivity tools on social media:
[HOOK: Pain point/question] + [SOLUTION: Product feature] + 
[PROOF: User count/testimonial] + [CTA: Specific action with urgency]
```

---

## Exercise 2: Multi-Part Prompt for Quiz Generation

### Task 1: Complete Multi-Part Prompt

```
Act as a middle school science educator creating engaging educational 
materials for 7th-grade students (ages 11-13).

Based on the provided article about volcanic eruptions, create the following:

1. SUMMARY (2 bullet points):
   - Each bullet: one key concept in simple language
   - Maximum 15 words per bullet
   - Use vocabulary appropriate for 7th graders
   - Focus on the most important scientific concepts

2. QUIZ QUESTIONS (3 multiple-choice questions):
   For each question:
   - Write at age-appropriate reading level (Flesch-Kincaid Grade 7-8)
   - Include 1 correct answer and 2 plausible distractors
   - Distractors should test common misconceptions
   - Avoid trick questions or overly technical terms
   - Questions should test understanding, not just recall

3. TONE & LANGUAGE:
   - Friendly and encouraging (like a supportive teacher)
   - Use simple, clear vocabulary
   - Avoid scientific jargon or define it when used
   - Make it engaging and relatable to students' lives

4. OUTPUT FORMAT (Google Slides ready):
   - Use clear section headers: "Summary" and "Quiz"
   - Number all questions (1, 2, 3)
   - Label answers as A, B, C
   - Mark correct answers with ✓ in parentheses for teacher reference
   - Use bullet points for summary
   - Include a fun title like "Volcanic Eruptions: Quick Facts & Quiz!"

VERIFICATION:
- Count words in each bullet (max 15)
- Verify reading level is appropriate for 11-13 year olds
- Ensure all content comes from the provided article only
```

---

### Task 2: Three Key Improvements

**1. Specificity Prevents Generic Output**
- Vague: "Make a quiz for kids"
- Improved: Specifies exact number of questions (3), format (multiple-choice), 
  and structure (1 correct + 2 distractors)
- **Result:** Consistent, usable output every time

**2. Age-Appropriate Constraints Ensure Usability**
- Vague: "for kids" (what age? reading level?)
- Improved: Specifies 7th grade, ages 11-13, Flesch-Kincaid Grade 7-8, 
  simple vocabulary
- **Result:** Content that's actually appropriate for the target audience

**3. Format Requirements Enable Direct Use**
- Vague: No output format specified
- Improved: Google Slides-ready format with headers, numbering, answer marking
- **Result:** Teacher can copy-paste directly into presentation without reformatting

---

## Exercise 3: Add Context, Get Better Results

### Task 1: Context Analysis Table

| Context Type | Is it Missing? | What Should Be Added? |
|--------------|----------------|------------------------|
| **Role** | Yes | "Act as a financial analyst preparing executive briefings" |
| **Audience** | Yes | "For C-level executives making Q1 budget decisions" |
| **Purpose** | Yes | "To inform strategic investment priorities and identify risks" |
| **Input Source** | Yes | "Based on the attached Q4 2025 monthly finance report" |
| **Format/Style** | Yes | "3 concise slides with bullet points, data visualizations suggested" |
| **Constraints** | Yes | "3-minute presentation time, must include YoY comparisons and specific dollar amounts" |

---

### Task 2: Enhanced Prompt

```
Act as a senior financial analyst with expertise in executive reporting 
and data storytelling.

Summarize the attached Q4 2025 monthly finance report for our C-level 
executive team who will use this to make Q1 2026 budget allocation and 
investment decisions.

CONTENT REQUIREMENTS:
1. Top 3 Financial Metrics:
   - Revenue, profit margin, and cash position
   - Include YoY percentage change for each
   - Highlight if metric exceeded/missed targets

2. Key Insights (2 wins, 1 critical challenge):
   - Wins: Significant positive developments with business impact
   - Challenge: Most urgent issue requiring executive attention/resources
   - Each with supporting data (specific numbers, not just percentages)

3. Strategic Recommendation:
   - One actionable next step based on the data
   - Include expected impact and resource requirements

FORMAT:
- Structure for 3 PowerPoint slides (one per section above)
- Each point: maximum 20 words
- Use bullet points, not paragraphs
- Include specific dollar amounts and percentages from report

TONE:
- Professional and concise
- Data-driven, not speculative
- Action-oriented

CONSTRAINTS:
- Total speaking time: 3 minutes
- Only use data explicitly stated in the report
- If data is missing, note "Data not available in report"

VERIFICATION:
- Ensure all numbers match the source report exactly
- Confirm each section fits on one slide
- Check that recommendation is supported by presented data
```

---

## Exercise 4: Match Prompt to Purpose

### Selected Style: **Conversational**

**Justification:** Customer support chatbots require human-like, empathetic interactions that build trust and resolve issues while maintaining brand voice.

---

### Task 2: Complete Prompt

```
You are Alex, a friendly customer support specialist for ShopEasy, 
an online retail store known for exceptional customer care.

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

For Product Recommendations:
- Ask questions: "What are you looking for? I'd love to help you find the perfect fit!"
- Listen actively: Reference what they mentioned
- Suggest 2-3 options: Brief description of each
- Explain why: "Based on what you said about [X], I think you'd love..."
- Encourage: "Let me know if you'd like more details on any of these!"

For Shipping Issues:
- Apologize sincerely: "I'm really sorry about the delay"
- Take ownership: "Let me make this right"
- Investigate: "I'm checking with our shipping team now..."
- Offer compensation when appropriate: "I'd like to offer [SOLUTION]"
- Follow up: "I'll personally monitor this and update you by [TIME]"

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
- Passing blame to other departments
- Ending without a question or clear next step

ESCALATION:
If customer is very upset or issue requires manager approval, say:
"I want to make sure you get the best solution. Let me connect you with 
my supervisor [Name] who can help with this right away."
```

---

### Task 3: Two Key Features

**1. Natural, Human-Like Language Patterns**
- Uses contractions, casual phrasing, and emojis
- Mirrors how a real person would text or chat
- Creates emotional connection through empathy statements

**2. Scenario-Based Response Templates**
- Provides specific conversation flows for each inquiry type
- Includes actual example phrases to use
- Maintains consistency while allowing flexibility

---

### Task 4: Justification

**Why Conversational Style is Optimal:**

The conversational style is superior for customer support because:

1. **Builds Trust & Rapport:** Customers are more likely to be patient and cooperative when they feel heard and understood by a "real person," not a robot.

2. **Reduces Friction:** Friendly, empathetic language de-escalates frustrated customers and makes problem-solving collaborative rather than adversarial.

3. **Increases Engagement:** Conversational prompts with questions keep customers engaged and encourage them to provide information needed for resolution.

4. **Brand Differentiation:** In e-commerce where service is a key differentiator, a warm conversational tone creates memorable positive experiences that drive loyalty.

**Why Other Styles Fall Short:**
- **Functional:** Too robotic, lacks empathy needed for customer service
- **Structured:** Too rigid, doesn't adapt to emotional nuances
- **Exploratory:** Too open-ended, customers want solutions not brainstorming

---

## Exercise 5: Prompt Refinement Challenge

### Task 1: Constraint-Enforcing Prompt

```
Write a product description for PulseOne Mini smartwatch for our email 
marketing campaign.

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

### Task 2: Example Output & Evaluation

**Generated Output:**
```
• All-day battery life keeps you powered through workouts and beyond
• Track steps, heart rate, and calories with advanced fitness monitoring
• Seamlessly connects to your phone via Bluetooth for calls and notifications
```

**Evaluation:**

| Constraint | Met? | Notes |
|------------|------|-------|
| Word count ≤ 50 words | ✅ | 29 words total |
| Bullet point format | ✅ | Exactly 3 bullets with • symbol |
| Friendly tone | ✅ | Conversational language, no jargon |
| Mentions battery life | ✅ | "All-day battery life" |
| Mentions fitness tracking | ✅ | "Track steps, heart rate, and calories" |
| Mentions Bluetooth | ✅ | "connects via Bluetooth" |

---

### Task 3: Refined Prompt (If Needed)

If the model exceeded word count or missed features, use this stronger version:

```
Create a 3-bullet product description for PulseOne Mini smartwatch.

NON-NEGOTIABLE REQUIREMENTS:

FORMAT:
• Use exactly 3 bullets (no more, no less)
• Use the • symbol to start each bullet
• Output ONLY the bullets (no headers, no extra text)

CONTENT (each bullet MUST mention one of these):
1. Battery life (use words like: "all-day," "long-lasting," "24-hour")
2. Fitness tracking (mention specific metrics: steps, heart rate, calories)
3. Bluetooth compatibility (mention: calls, notifications, or connectivity)

TONE:
• Friendly, not formal
• Simple words (avoid: "utilize," "facilitate," "optimal")
• Conversational (like talking to a friend)

LENGTH (ABSOLUTE MAXIMUM):
• 50 words total
• Count words in your response before submitting
• If count > 50, remove words until ≤ 50
• Bullet symbols (•) do NOT count as words

BEFORE RESPONDING:
1. Write the 3 bullets
2. Count total words
3. If > 50 words, revise
4. Verify all 3 features are mentioned
5. Check tone is friendly
6. Submit only if ALL requirements met

DO NOT include explanations, just the 3 bullets.
```

---

## Exercise 6: Hallucination Spotting and Mitigation

### Task 1: Hallucination-Prevention Prompt

```
Summarize the provided peer-reviewed article on climate change and 
marine biodiversity.

CRITICAL ACCURACY REQUIREMENTS:
- Use ONLY information explicitly stated in the article
- Do not add external knowledge, statistics, or general facts
- Do not infer or extrapolate beyond what is written
- If the article doesn't provide specific information, state: 
  "This information is not available in the article"

CONTENT GUIDELINES:
- Include only claims that appear verbatim or are directly paraphrased 
  from the source
- Use exact numbers, percentages, and dates from the article
- Do not round numbers or approximate figures
- Cite the specific section (Abstract, Key Findings, etc.) for each claim

FORMAT:
- 3-5 bullet points summarizing main findings
- Each bullet should reference where in the article the information appears
- Use conservative language: "The study found..." or "According to the article..."

VERIFICATION BEFORE RESPONDING:
□ Every statistic matches the source exactly
□ No external facts or general knowledge added
□ All claims can be traced to specific article sections
□ Limitations mentioned in article are acknowledged
```

---

### Task 2: Verification-Enhanced Prompt

```
Act as a scientific research analyst preparing an accurate summary of 
peer-reviewed literature.

Summarize the provided article on climate change and marine biodiversity 
with ZERO tolerance for hallucinations or unsupported claims.

STRICT SOURCE-GROUNDING RULES:

1. ONLY INCLUDE EXPLICITLY STATED INFORMATION:
   - Every claim must appear in the source text
   - Do not paraphrase liberally or interpret creatively
   - If uncertain whether something was stated, omit it

2. EXACT NUMBERS ONLY:
   - Use precise figures from the article (e.g., "23%" not "about 25%")
   - Include timeframes exactly as stated (e.g., "2020-2024" not "recent years")
   - Do not convert units or round numbers

3. ACKNOWLEDGE UNCERTAINTY:
   - If the article doesn't address a topic, state: "Not covered in this study"
   - If data is limited, note: "The article acknowledges [limitation]"
   - Use phrases like "The study suggests" not "It is proven that"

4. CITE SPECIFIC SECTIONS:
   - Reference where each claim appears: (Abstract), (Key Findings), etc.
   - This forces verification that the claim exists in the source

5. RESPECT SCOPE LIMITATIONS:
   - If study examined "1,200 species," don't say "marine species" (too broad)
   - If study covered "15 ocean regions," don't say "oceans worldwide"
   - Note what was NOT studied (e.g., "Deep-sea ecosystems were not examined")

FORBIDDEN ACTIONS:
✗ Adding statistics not in the article
✗ Making predictions beyond stated timeframes
✗ Claiming causation if article only shows correlation
✗ Using superlatives not in the source ("all," "every," "never")
✗ Inferring conclusions the authors didn't explicitly draw

FORMAT:
- Summary: 3-4 bullet points with section citations
- Limitations: 1-2 bullets noting study scope/constraints
- Use language: "The article states..." "According to the research..."

VERIFICATION CHECKLIST:
Before submitting, verify EACH claim:
□ Appears in the source text?
□ Numbers are exact matches?
□ Scope is accurately represented?
□ No external knowledge added?
□ Limitations acknowledged?

If you cannot verify a claim against the source, DO NOT INCLUDE IT.
```

---

### Task 3: Two Mitigation Strategies

**1. Explicit Source-Grounding with Citation Requirements**
- Required citing specific sections for each claim
- Forces the model to verify information exists in source
- Prevents adding external knowledge or "common sense" facts

**2. Uncertainty Acknowledgment Protocol**
- Instructed to state when information is unavailable
- Used conservative language ("suggests" vs "proves")
- Acknowledged study limitations explicitly
- Prevents model from filling gaps with plausible-sounding fabrications

---

### Task 4: High-Risk Domains

| Domain | Why Hallucinations Are Risky |
|--------|------------------------------|
| **Healthcare/Medical** | Fabricated medical advice, incorrect dosages, or non-existent treatments could directly harm patients or delay proper care. Liability and ethical implications are severe. Example: AI inventing drug interactions that don't exist. |
| **Legal** | False legal precedents or misinterpreted statutes could lead to wrongful legal advice, failed cases, or malpractice. Courts require precise citations. Example: AI citing non-existent case law (as happened with lawyers using ChatGPT). |

**Other High-Risk Domains:**
- **Financial:** Fabricated market data could lead to catastrophic investment decisions
- **Journalism:** False information spreads misinformation and damages credibility
- **Academic Research:** Fake citations undermine scholarly integrity
- **Safety/Engineering:** Incorrect specifications could cause equipment failures or accidents

---

## 🎓 Key Takeaways Across All Exercises

### Universal Principles
1. **Specificity beats vagueness** - Every exercise showed dramatic improvement with precise requirements
2. **Context is king** - Role, audience, and purpose transform generic outputs into targeted solutions
3. **Constraints enable creativity** - Paradoxically, strict limits produce better, more usable results
4. **Verification prevents errors** - Asking the model to check its work reduces hallucinations
5. **Iteration is normal** - Even expert prompts often need refinement based on outputs

### Practical Applications
- **Marketing:** Use role + brand voice + platform constraints
- **Education:** Specify age, reading level, and learning objectives
- **Data Analysis:** Require source citations and exact figures
- **Customer Service:** Define tone, response patterns, and escalation criteria
- **Content Creation:** Set format, length, and quality checkpoints

---

**Congratulations on completing all exercises! You now have expert-level prompt engineering skills.** 🎉
