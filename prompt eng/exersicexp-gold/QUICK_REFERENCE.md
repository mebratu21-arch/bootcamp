# Prompt Engineering Exercises - Quick Reference Guide 📋

## 🎯 Exercise Cheat Sheet

### Exercise 1: Debug Chain-of-Thought ✏️

**Common Mistakes to Look For:**
- Arithmetic errors (6 × $0.75 = $4.50, NOT $4.75)
- Missing steps in reasoning
- Logical jumps without explanation
- Incorrect intermediate calculations

**Fix Strategy:**
1. Verify each calculation independently
2. Add explicit step labels
3. Show all intermediate values
4. Verify final answer

---

### Exercise 2: Prompt Pattern Selection 🎨

**Pattern Decision Matrix:**

| Use Case | Best Pattern | Why |
|----------|--------------|-----|
| Classification with examples | Few-Shot | Consistent categorization |
| Open-ended generation | Zero-Shot | Maximum creativity |
| Step-by-step reasoning | Chain-of-Thought | Transparent logic |
| Complex multi-step tasks | Instruction-Action-Prompt | Clear structure |
| Reducing errors | AlignedCoT | Multiple verification paths |

**For Customer Support Chatbot:**
- ✅ **Few-Shot** - Provides examples for consistent categorization
- ❌ Zero-Shot - Too ambiguous for edge cases
- ❌ Fine-tuning - Overkill for simple classification

---

### Exercise 3: AlignedCoT Template 🔄

```
Problem: [State the problem]

Reasoning Path 1: [Method Name]
[Step-by-step solution using first approach]

Reasoning Path 2: [Different Method Name]
[Step-by-step solution using second approach]

Comparison:
- Path 1 result: [Answer]
- Path 2 result: [Answer]
- Agreement: [Yes/No]

Final Answer: [Verified answer]
```

**Key Requirements:**
- At least 2 distinct reasoning paths
- Different structures/orders
- Explicit comparison step
- Select consistent answer

---

### Exercise 4: Multi-Step Pipeline Design 🔗

**Pipeline Structure:**
```
Input → Stage 1 → Stage 2 → Stage 3 → Output
         ↓         ↓         ↓
      Context   Context   Context
      Passing   Passing   Passing
```

**Conditional Logic Points:**
1. **After Stage 1**: If confidence < threshold → trigger review
2. **After Stage 2**: If no contributions found → skip Stage 3
3. **Between stages**: Pass relevant context forward

**Best Practices:**
- Each stage has single responsibility
- Clear input/output formats
- Explicit context chaining
- Error handling at each stage

---

### Exercise 5: Bias Reduction Checklist ✅

**Basic Prompt Issues:**
- ❌ No explicit fairness instructions
- ❌ May rely on stereotypes
- ❌ No diversity requirements
- ❌ Lacks transparency

**Role-Based Improvements:**
- ✅ Explicit role: "unbiased career counselor"
- ✅ Clear instructions: "avoid stereotypes"
- ✅ Diversity requirement: "traditional and non-traditional"
- ✅ Transparency: "explain how it aligns"
- ✅ Skill-focused: "based solely on skills and interests"

**Template:**
```
You are a [unbiased role] committed to [fairness goal].

[User information without demographic assumptions]

Provide recommendations that:
1. Match stated [skills/interests/criteria]
2. Represent diverse options
3. Avoid [specific biases to avoid]
4. Include explanations for transparency
```

---

### Exercise 6: Context Memory Strategies 🧠

**Memory Techniques Comparison:**

| Technique | Pros | Cons | Best For |
|-----------|------|------|----------|
| Full History | Complete context | Token overflow | Short conversations |
| Summarization | Scalable | Loses details | Long conversations |
| Structured History | Balanced | Requires structure | Production systems |
| Vector Store | Semantic search | Complex setup | Large knowledge bases |

**Structured History Template:**
```json
{
  "user_profile": {
    "name": "...",
    "preferences": {...},
    "goals": {...}
  },
  "conversation_history": [
    {
      "date": "...",
      "topic": "...",
      "summary": "...",
      "advice_given": [...]
    }
  ],
  "last_interaction": "..."
}
```

**Personalization Checklist:**
- ✅ Use user's name
- ✅ Reference previous advice
- ✅ Connect to user's goals
- ✅ Acknowledge progress
- ✅ Build on past conversations

---

## 🚀 Quick Start Commands

### Run All Exercises:
```bash
python prompt_engineering_colab.py
```

### Test Individual Exercise:
```python
# In Python/Colab
# Copy the specific exercise section and run it
```

### Use with LLM API:
```python
import openai
openai.api_key = "your-key"

response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[{"role": "user", "content": your_prompt}]
)
```

---

## 📊 Expected Outputs

### Exercise 1:
- ✅ Identified error: 6 × $0.75 = $4.50 (not $4.75)
- ✅ Correct answer: $0.50 change

### Exercise 2:
- ✅ Pattern: Few-Shot Prompting
- ✅ Example categories: Billing, Technical, Account, Other

### Exercise 3:
- ✅ Two reasoning paths
- ✅ Both arrive at $22
- ✅ Explicit comparison

### Exercise 4:
- ✅ Three-stage pipeline
- ✅ Context chaining between stages
- ✅ Conditional logic defined

### Exercise 5:
- ✅ Basic vs. role-based prompts
- ✅ Bias reduction strategies
- ✅ Diverse career suggestions

### Exercise 6:
- ✅ Structured context format
- ✅ Personalized response
- ✅ References to past conversations

---

## 💡 Pro Tips

1. **Always verify calculations** in CoT prompts
2. **Use examples** when consistency matters
3. **Multiple paths** reduce hallucination
4. **Break complex tasks** into stages
5. **Be explicit** about fairness requirements
6. **Structure context** for scalability

---

## 🎓 Key Takeaways

| Concept | Application |
|---------|-------------|
| Chain-of-Thought | Mathematical reasoning, step-by-step tasks |
| Few-Shot | Classification, consistent outputs |
| AlignedCoT | Verification, reducing errors |
| Prompt Chaining | Complex workflows, document processing |
| Role Prompting | Bias reduction, ethical AI |
| Context Memory | Conversational agents, personalization |

---

**Need Help?** Check the detailed solutions in `prompt_engineering_exercises.md`

**Want to Practice?** Run `prompt_engineering_colab.py` and modify the examples!
