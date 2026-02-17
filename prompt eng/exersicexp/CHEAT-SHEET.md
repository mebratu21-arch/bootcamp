# Quick Reference: Prompt Engineering Cheat Sheet

## 🎯 The 4 Cs of Great Prompts

1. **Clear** - Specific objectives and instructions
2. **Contextual** - Role, audience, purpose
3. **Constrained** - Format, length, tone requirements
4. **Checkable** - Verification and validation steps

---

## 🛠️ Essential Components

### Basic Structure
```
[ROLE] + [TASK] + [CONTEXT] + [FORMAT] + [CONSTRAINTS]
```

### Example
```
Act as a marketing copywriter (ROLE)
creating an email campaign (TASK)
for a product launch targeting millennials (CONTEXT)
in bullet point format (FORMAT)
with max 100 words, friendly tone (CONSTRAINTS)
```

---

## 📝 Quick Templates

### 1. Summarization
```
Summarize [SOURCE] for [AUDIENCE] focusing on [KEY POINTS].
Format: [FORMAT] | Length: [MAX WORDS] | Tone: [TONE]
```

### 2. Content Creation
```
Create [CONTENT TYPE] about [TOPIC] for [PLATFORM].
Include: [ELEMENTS] | Avoid: [EXCLUSIONS] | Style: [STYLE]
```

### 3. Data Extraction
```
Extract [FIELDS] from [SOURCE].
Output: [FORMAT] | Validate: [RULES]
```

### 4. Analysis
```
Analyze [SUBJECT] considering [FACTORS].
Provide: [DELIVERABLES] | Format: [STRUCTURE]
```

---

## ⚡ Power Words

### Action Verbs
- Create, Generate, Write, Design
- Summarize, Extract, Transform
- Analyze, Evaluate, Compare
- List, Categorize, Organize

### Constraint Words
- Exactly, Maximum, Minimum
- Must, Required, Mandatory
- Only, Exclusively, Solely
- Do not, Avoid, Exclude

### Verification Words
- Verify, Confirm, Check
- Ensure, Validate, Review
- Based on, According to
- Explicitly, Specifically

---

## 🎨 Style Keywords

### Tone
- Professional, Casual, Friendly
- Formal, Conversational, Technical
- Empathetic, Enthusiastic, Neutral

### Format
- Bullet points, Numbered list, Table
- Paragraph, JSON, CSV
- Sections, Headers, Steps

### Length
- Brief, Concise, Detailed
- X words, X characters, X sentences
- Short, Medium, Long

---

## ⚠️ Hallucination Prevention

### Do's ✅
- "Based ONLY on the provided text"
- "If uncertain, state information is unavailable"
- "Cite specific sections"
- "Use exact numbers from source"

### Don'ts ❌
- Avoid: "Tell me about..."
- Avoid: "What do you know about..."
- Avoid: Allowing inference beyond source
- Avoid: Accepting unsourced claims

---

## 🔍 Quality Checks

Before submitting, ask:
- [ ] Is my objective clear?
- [ ] Have I provided enough context?
- [ ] Are my constraints specific?
- [ ] Can the output be verified?
- [ ] Have I prevented hallucinations?

---

## 💡 Common Fixes

| Problem | Solution |
|---------|----------|
| Output too long | Add: "Maximum X words" |
| Wrong format | Specify: "Format as [TYPE]" |
| Wrong tone | Add: "Tone: [TONE]" |
| Generic content | Add role, audience, context |
| Hallucinations | Add: "Based ONLY on provided text" |
| Missing elements | List: "Must include: [LIST]" |

---

## 🚀 Pro Tips

1. **Start with role** - Sets perspective and expertise
2. **Number your requirements** - Ensures nothing is missed
3. **Use examples** - Shows exactly what you want
4. **Add verification** - "Check that..." or "Ensure..."
5. **Iterate** - Refine based on outputs

---

## 📊 Constraint Examples

### Length
- "Exactly 3 bullet points"
- "Maximum 50 words total"
- "Between 200-250 words"

### Format
- "Output as valid JSON"
- "Use markdown headers"
- "Table with 3 columns"

### Content
- "Must mention: [A, B, C]"
- "Do not include: [X, Y, Z]"
- "Focus on: [TOPIC]"

### Tone
- "Friendly but professional"
- "Technical for developers"
- "Simple for beginners"

---

**Keep this handy while crafting prompts!** 🎯
