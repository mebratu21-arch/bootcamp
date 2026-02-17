# Exercise 3: Add Context, Get Better Results

## 🎯 Objective
Learn to identify missing context types and enhance prompts with comprehensive contextual information.

## 📋 Scenario
An intern is preparing a **3-minute summary** for a monthly finance update presentation. They give the AI this prompt:

> **"Summarize this report."**

The AI gives a generic summary without any useful financial figures or structure.

## ✅ Tasks

### Task 1: Fill in the Context Analysis Table

Identify missing context and what should be added:

| Context Type | Is it Missing? (Yes/No) | What Should Be Added? |
|--------------|-------------------------|------------------------|
| **Role** | Yes | "Act as a financial analyst preparing executive briefings" |
| **Audience** | Yes | "For C-level executives making Q1 budget decisions" |
| **Purpose** | Yes | "To inform strategic investment priorities and identify risks" |
| **Input Source** | Yes | "Based on the attached Q4 2025 monthly finance report" |
| **Format/Style** | Yes | "3 concise slides with bullet points, data visualizations suggested" |
| **Constraints** | Yes | "3-minute presentation time, must include YoY comparisons and specific dollar amounts" |

---

### Task 2: Rewrite with Enhanced Context

Rewrite the intern's prompt to include **at least 4 context types**, such as:

- "Act as a financial analyst…"
- "This summary is for a non-technical executive team…"
- "Limit to 3 key takeaways, each with supporting data…"

#### Your Enhanced Prompt:
```
Act as a senior financial analyst with expertise in executive reporting and data storytelling.

Summarize the attached Q4 2025 monthly finance report for our C-level executive team who will use this to make Q1 2026 budget allocation and investment decisions.

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

## 💡 Context Types Reference

### 1. **Role Context**
Who is creating this content?
- Example: "Act as a financial analyst with 10 years of experience"

### 2. **Audience Context**
Who will consume this content?
- Example: "For C-level executives with limited technical background"

### 3. **Purpose Context**
Why is this content being created?
- Example: "To inform quarterly investment decisions"

### 4. **Input Source Context**
What data/information is being used?
- Example: "Based on the Q4 2025 financial report attached"

### 5. **Format/Style Context**
How should the output be structured?
- Example: "As a 3-slide PowerPoint summary with bullet points"

### 6. **Constraints Context**
What limitations or requirements exist?
- Example: "Maximum 3 minutes speaking time, include specific revenue figures"

---

## 📊 Sample Finance Report (for testing)

```
Q4 2025 Financial Report - TechCorp Inc.

Revenue: $45.2M (↑ 18% YoY)
Operating Expenses: $32.1M (↑ 12% YoY)
Net Profit: $13.1M (↑ 35% YoY)
Cash Reserves: $87.5M

Key Highlights:
- Enterprise sales grew 42% quarter-over-quarter
- Customer acquisition cost decreased by 15%
- Churn rate improved to 2.3% (from 3.1%)
- New product line contributed $8.2M in revenue
- R&D investment increased to $6.5M

Challenges:
- Supply chain delays affected 12% of orders
- Hiring targets missed by 20% in engineering
- Marketing ROI declined in digital channels
```

---

## 🎓 Key Learnings

After completing this exercise, you should understand:
- ✅ The six critical types of context in prompt engineering
- ✅ How missing context leads to generic, unusable outputs
- ✅ Why audience awareness changes content structure and complexity
- ✅ How constraints ensure actionable, focused results
- ✅ The relationship between context richness and output quality

---

## ✨ Before & After Comparison

### ❌ Vague Prompt
```
"Summarize this report."
```

**Result:** Generic summary, no structure, missing key figures, wrong tone

### ✅ Context-Rich Prompt
```
Act as a financial analyst preparing a board presentation.

Summarize the Q4 2025 financial report for C-level executives who need 
to make investment decisions. Focus on:
- Top 3 financial metrics with YoY comparison
- 2 major wins and 1 critical challenge
- 1 actionable recommendation

Format: 3 bullet points, each under 20 words, suitable for a slide deck.
Include specific numbers and percentages.
```

**Result:** Structured, actionable, executive-ready summary with data

---

## 🔄 Next Steps

1. Test both prompts with the sample report
2. Compare output quality and usefulness
3. Experiment with different context combinations
4. Move on to Exercise 4!
