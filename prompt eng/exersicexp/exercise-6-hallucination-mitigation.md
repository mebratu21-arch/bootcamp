# Exercise 6: Hallucination Spotting and Mitigation

## 🎯 Objective
Learn to identify AI hallucinations and implement strategies to prevent them through careful prompt engineering.

## 📋 Scenario
You're preparing a summary of a peer-reviewed article on **climate change and marine biodiversity**. ChatGPT inserts this claim:

> **"Over 50% of marine species are projected to go extinct by 2050."**

❌ **This claim does NOT appear in the original article.**

This is a **hallucination** – the AI generated false information that sounds plausible but isn't supported by the source material.

---

## ✅ Tasks

### Task 1: Write a Hallucination-Prevention Prompt

Write a precise prompt instructing the model to **avoid hallucinations** and use **only the provided text**.

#### Your Prompt:
```
Summarize the provided peer-reviewed article on climate change and marine biodiversity. Use ONLY information explicitly stated in the article. Do not add external knowledge, statistics, or general facts. Do not infer or extrapolate beyond what is written. If the article doesn't provide specific information, state: "This information is not available in the article."
```

---

### Task 2: Add Verification Language

Rewrite the prompt using **verification language**, such as:

- "Only include claims explicitly stated in the article."
- "If uncertain, state that the information is not available."
- "Do not infer or extrapolate beyond what is written."
- "Cite specific sections when making claims."

#### Your Verification-Enhanced Prompt:
```
Act as a scientific research analyst preparing an accurate summary of peer-reviewed literature. Summarize the provided article with zero tolerance for hallucinations.

STRICT SOURCE-GROUNDING RULES:
1. ONLY INCLUDE EXPLICITLY STATED INFORMATION: Every claim must appear in the source text.
2. EXACT NUMBERS ONLY: Use precise figures (e.g., "23%" not "about 25%").
3. ACKNOWLEDGE UNCERTAINTY: If not addressed, state: "Not covered in this study."
4. CITE SPECIFIC SECTIONS: Reference where each claim appears: (Abstract), (Key Findings), etc.
5. RESPECT SCOPE LIMITATIONS: If study examined "1,200 species," don't say "marine species" (too broad).

Before submitting, verify EACH claim matches the source exactly.
```













```

---

### Task 3: List Mitigation Strategies

List **2 mitigation strategies** you used to reduce hallucination risk.

#### Your Strategies:
```
1. Strategy 1: Explicit Source-Grounding with Citation Requirements - Requiring the model to cite specific sections (like "Abstract" or "Key Findings") forces it to verify that the information actually exists in the source text before including it.

2. Strategy 2: Uncertainty Acknowledgment Protocol - By explicitly instructing the model to state when information is unavailable rather than guessing, it prevents the AI from filling gaps with plausible-sounding but fabricated information.
```

---

### Task 4: High-Risk Domains

Name **2 professional domains** where hallucinations are especially risky, and explain why.

| Domain | Why Hallucinations Are Risky |
|--------|------------------------------|
| 1. Healthcare/Medical | Fabricated medical advice or incorrect dosages could directly harm patients or delay proper care. Example: AI inventing drug interactions that don't exist. |
| 2. Legal | False legal precedents or misinterpreted statutes could lead to wrongful legal advice or failed cases. Courts require precise citations; fake ones lead to malpractice. |

---

## 💡 Hallucination Mitigation Techniques

### 1. **Explicit Source Constraints**
```
"Base your summary ONLY on information explicitly stated in the provided 
article. Do not add external knowledge or assumptions."
```

### 2. **Uncertainty Acknowledgment**
```
"If the article does not provide specific information, state: 
'This information is not available in the source material.'"
```

### 3. **Citation Requirements**
```
"For each claim, cite the specific paragraph or section from the article 
where the information appears."
```

### 4. **Negative Instructions**
```
"Do NOT:
- Add statistics not present in the article
- Infer conclusions beyond what is stated
- Use external knowledge or general facts
- Make predictions not explicitly mentioned"
```

### 5. **Verification Steps**
```
"Before including any claim:
1. Verify it appears in the source text
2. Check you're not paraphrasing too liberally
3. Confirm numbers and dates are exact matches"
```

### 6. **Conservative Phrasing**
```
"Use phrases like 'according to the article' or 'the study states' 
to ground claims in the source."
```

---

## 📄 Sample Article (for testing)

```
Climate Change Impacts on Marine Biodiversity
Dr. Sarah Chen et al., 2025

Abstract:
Rising ocean temperatures and acidification pose significant threats to 
marine ecosystems. Our study examined 1,200 marine species across 15 
ocean regions from 2020-2024.

Key Findings:
- 23% of studied coral species showed signs of bleaching stress
- Fish migration patterns shifted an average of 45km poleward
- Phytoplankton populations declined by 8% in tropical regions
- Ocean acidification increased by 0.02 pH units annually

The study suggests that without intervention, vulnerable species may 
face population declines of 15-30% by 2040. However, conservation 
efforts in protected marine areas showed promising results, with 
biodiversity remaining stable in 67% of monitored zones.

Limitations:
This study focused on surface-dwelling species and did not examine 
deep-sea ecosystems. Long-term projections beyond 2040 require 
additional research.
```

---

## 🎓 Example Hallucinations to Avoid

Based on the sample article, here are **hallucinations** to watch for:

❌ "50% of marine species will go extinct by 2050"
- **Why:** Article mentions 15-30% population decline by 2040, not extinction

❌ "All coral reefs are experiencing bleaching"
- **Why:** Article says 23% of studied species, not all reefs

❌ "Deep-sea species are also affected"
- **Why:** Article explicitly states deep-sea ecosystems weren't examined

❌ "The study covered all ocean regions"
- **Why:** Article specifies 15 regions, not all

❌ "Climate change is the only threat to marine life"
- **Why:** Article doesn't make this claim

---

## 🔍 Hallucination Detection Checklist

When reviewing AI output, check:

- [ ] Are all statistics present in the source?
- [ ] Are percentages and numbers exact matches?
- [ ] Are timeframes accurately represented?
- [ ] Are scope limitations respected (e.g., "studied species" vs "all species")?
- [ ] Are causal claims supported by the text?
- [ ] Are predictions within stated boundaries?
- [ ] Is technical terminology used correctly?

---

## 🎓 Key Learnings

After completing this exercise, you should understand:
- ✅ What hallucinations are and why they occur
- ✅ How to write prompts that minimize hallucination risk
- ✅ The importance of source-grounding in factual tasks
- ✅ Why verification language improves accuracy
- ✅ Which domains require extra caution
- ✅ How to detect hallucinations in AI outputs

---

## ⚠️ High-Risk Domains for Hallucinations

### 1. **Healthcare/Medical**
- **Risk:** Incorrect medical advice can harm patients
- **Example:** AI suggesting treatments not supported by research

### 2. **Legal**
- **Risk:** False legal precedents or misinterpreted laws
- **Example:** Citing non-existent court cases

### 3. **Financial**
- **Risk:** Incorrect investment advice or market data
- **Example:** Fabricated stock performance statistics

### 4. **Scientific Research**
- **Risk:** Misrepresenting study findings or methodology
- **Example:** Claiming causation when study shows correlation

### 5. **News/Journalism**
- **Risk:** Spreading misinformation or fake events
- **Example:** Inventing quotes or fabricating sources

### 6. **Academic**
- **Risk:** Fake citations or misattributed research
- **Example:** Creating non-existent papers or authors

---

## ✨ Advanced Challenge

Test your hallucination-prevention prompt with the sample article and check:

1. Does it accurately represent the 23% coral bleaching figure?
2. Does it avoid claiming extinction when the article mentions population decline?
3. Does it acknowledge the study's limitations?
4. Does it avoid making claims about deep-sea species?
5. Does it use conservative language like "according to the study"?

---

## 🔄 Completion

Congratulations! You've completed all 6 Prompt Engineering Exercises!

### Next Steps:
1. Review your answers across all exercises
2. Test your prompts with real AI models
3. Create a personal prompt template library
4. Apply these techniques to your projects
5. Share your learnings with others!

---

## 📚 Additional Resources

- **Prompt Engineering Guide:** Best practices and advanced techniques
- **Hallucination Research:** Latest studies on AI accuracy
- **Industry Case Studies:** Real-world applications
- **Community Forums:** Share and learn from others

**Happy Prompting! 🚀**
