# Prompt Engineering Exercises - Answer Key 🔑

This document provides concise answers for all 6 exercises. For detailed explanations, see `prompt_engineering_exercises.md`.

---

## Exercise 1: Debug a Faulty Chain-of-Thought

### ❌ Error Found:
Line: `6 pencils × $0.75 = $4.75`  
**Mistake**: 6 × 0.75 = 4.50, NOT 4.75

### ✅ Corrected Answer:
```
Step 1: Calculate total cost
6 pencils × $0.75 = $4.50

Step 2: Calculate change
$5.00 - $4.50 = $0.50

Answer: $0.50
```

---

## Exercise 2: Choose the Right Prompt Pattern

### ✅ Selected Pattern: **Few-Shot Prompting**

### Justification:
- Handles ambiguous customer messages
- Ensures consistent categorization
- Good generalization without fine-tuning
- Works with limited examples

### Example:
```
[Examples of: Billing Issue, Technical Support, Account Access, Other]

Message: "My credit card was declined but I still see a pending charge."
Category: Billing Issue
```

---

## Exercise 3: Use AlignedCoT to Compare Reasoning Paths

### ✅ Problem: Calculate total cost of flower pots

**Path 1 (Sequential):**
- Small: 2 × $2 = $4
- Medium: 3 × $4 = $12
- Large: 1 × $6 = $6
- Total: $4 + $12 + $6 = **$22**

**Path 2 (Grouped):**
- List all: 2 small ($2), 3 medium ($4), 1 large ($6)
- Calculate: $4 + $12 + $6 = **$22**

**Comparison:** Both paths agree → **Answer: $22**

---

## Exercise 4: Design a Multi-Step Document Pipeline

### ✅ Three-Stage Pipeline:

**Stage 1: Domain Identification**
- Input: Abstract
- Output: Domain, Confidence, Keywords
- Conditional: If confidence low → flag for review

**Stage 2: Contribution Extraction**
- Input: Abstract + Domain (from Stage 1)
- Output: List of main contributions
- Conditional: If no contributions → skip Stage 3

**Stage 3: Follow-up Question Generation**
- Input: Domain + Contributions (from Stages 1 & 2)
- Output: Research question + Rationale

---

## Exercise 5: Role Prompting to Reduce Bias

### ❌ Basic Prompt:
```
Skills: Good with people, helpful, detail-oriented, healthcare interest
Suggest 3 careers.
```
**Problem:** May produce stereotypical suggestions

### ✅ Role-Based Prompt:
```
You are an unbiased career counselor. Avoid stereotypes.

Provide 3 DIVERSE careers that:
- Match skills/interests
- Include non-traditional options
- Avoid gender bias
- Explain alignment
```

### Improvements:
1. Explicit bias awareness
2. Diversity requirement
3. Skill-based focus
4. Transparency (explanations)
5. Professional role framing

---

## Exercise 6: Build a Conversational Agent with Context Memory

### ✅ Chosen Technique: **Structured History with Summarization**

### Context Structure:
```json
{
  "user_profile": {
    "name": "Sarah",
    "preferences": {"sleep_goal": "8 hours", "diet": "vegetarian"},
    "challenges": ["difficulty falling asleep", "inconsistent meals"]
  },
  "conversation_history": [
    {
      "date": "2026-01-10",
      "topic": "sleep",
      "advice": ["10:30 PM bedtime", "avoid screens", "chamomile tea"]
    },
    {
      "date": "2026-01-13",
      "topic": "diet",
      "advice": ["batch cooking", "meal prep Sundays"]
    }
  ]
}
```

### Personalized Response Features:
- ✅ Uses user's name (Sarah)
- ✅ References previous advice (10:30 PM bedtime, chamomile tea)
- ✅ Connects to profile (vegetarian diet, exercise goals)
- ✅ Acknowledges progress (5-6 hours → 7 hours)
- ✅ Builds on past conversations (meal prep suggestion)

---

## 📊 Summary Table

| Exercise | Technique | Key Output |
|----------|-----------|------------|
| 1 | Chain-of-Thought Debugging | Corrected calculation: $4.50 |
| 2 | Few-Shot Prompting | Customer message categorization |
| 3 | AlignedCoT | Two paths → $22 (verified) |
| 4 | Prompt Chaining | 3-stage research pipeline |
| 5 | Role Prompting | Bias-reduced career suggestions |
| 6 | Structured Memory | Personalized health coaching |

---

## 🎯 Grading Rubric

### Exercise 1 (10 points)
- ✅ Identified error (3 pts)
- ✅ Corrected calculation (4 pts)
- ✅ Proper CoT structure (3 pts)

### Exercise 2 (15 points)
- ✅ Pattern selection (5 pts)
- ✅ Justification (5 pts)
- ✅ Complete prompt example (5 pts)

### Exercise 3 (15 points)
- ✅ Two distinct paths (6 pts)
- ✅ Comparison step (4 pts)
- ✅ Correct answer (5 pts)

### Exercise 4 (20 points)
- ✅ Three-stage breakdown (6 pts)
- ✅ Prompt templates (9 pts)
- ✅ Conditional logic (5 pts)

### Exercise 5 (20 points)
- ✅ Basic vs. role prompts (8 pts)
- ✅ Bias reduction explanation (7 pts)
- ✅ Fairness improvements (5 pts)

### Exercise 6 (20 points)
- ✅ Memory technique selection (5 pts)
- ✅ Context structure (7 pts)
- ✅ Personalized prompt (8 pts)

**Total: 100 points**

---

## ✨ Bonus Points

- **Code Implementation** (+5): Executable Python/Colab version
- **Real LLM Testing** (+5): Tested with actual API
- **Additional Examples** (+5): Extra test cases
- **Visual Diagrams** (+5): Pipeline/architecture diagrams

---

**All exercises completed! 🎉**

*For detailed explanations, see `prompt_engineering_exercises.md`*  
*For quick reference, see `QUICK_REFERENCE.md`*  
*For executable code, see `prompt_engineering_colab.py`*
