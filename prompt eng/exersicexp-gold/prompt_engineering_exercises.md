# Prompt Engineering Exercises - Gold Level Solutions

## Exercise 1: Debug a Faulty Chain-of-Thought

### Problem Analysis
**Original Prompt:**
```
A shop sells pencils at $0.75 each. If Alice buys 6 pencils and pays with a $5 bill, how much change does she get? Let's solve this step-by-step.
6 pencils × $0.75 = $4.75
$5.00 - $4.75 = $0.50
The change is $0.50.
```

### Identified Mistake
The calculation `6 × $0.75 = $4.75` is **incorrect**. The actual result should be `6 × $0.75 = $4.50`.

### Corrected Chain-of-Thought Prompt

```
A shop sells pencils at $0.75 each. If Alice buys 6 pencils and pays with a $5 bill, how much change does she get? Let's solve this step-by-step.

Step 1: Calculate the total cost of pencils
- Number of pencils: 6
- Price per pencil: $0.75
- Total cost = 6 × $0.75 = $4.50

Step 2: Calculate the change
- Amount paid: $5.00
- Total cost: $4.50
- Change = $5.00 - $4.50 = $0.50

The change Alice receives is $0.50.
```

### Correct Answer
**$0.50** (The final answer was coincidentally correct despite the calculation error, but the reasoning path was flawed)

---

## Exercise 2: Choose the Right Prompt Pattern

### Selected Pattern: **Few-Shot Prompting**

### Justification
For a customer support chatbot categorizing messages, **Few-Shot Prompting** is the optimal choice because:

1. **Handles Ambiguity**: Customer messages often contain ambiguous language. Few-shot examples help the model understand edge cases and context.
2. **Consistency**: Providing labeled examples ensures consistent categorization across similar queries.
3. **Generalization**: The model can learn patterns from examples and apply them to new, unseen messages.
4. **No Fine-tuning Required**: Few-shot works well without requiring model retraining or extensive datasets.

### Complete Prompt Example

```
You are a customer support assistant. Your task is to categorize incoming customer messages into one of the following categories:
- Billing Issue
- Technical Support
- Account Access
- Other

Here are some examples:

Example 1:
Message: "I was charged twice for my subscription this month. Can you help me get a refund?"
Category: Billing Issue

Example 2:
Message: "The app keeps crashing when I try to upload photos. What should I do?"
Category: Technical Support

Example 3:
Message: "I forgot my password and can't log in to my account."
Category: Account Access

Example 4:
Message: "Do you have any job openings in your company?"
Category: Other

Now categorize the following message:

Message: "My credit card was declined but I still see a pending charge."
Category:
```

**Expected Output**: Billing Issue

---

## Exercise 3: Use AlignedCoT to Compare Reasoning Paths

### AlignedCoT Prompt

```
Problem: A gardener has 3 types of flower pots:
- Small pots cost $2 each
- Medium pots cost $4 each
- Large pots cost $6 each

She buys 2 small, 3 medium, and 1 large pot. What is the total cost?

Please solve this problem using TWO different reasoning approaches, then compare them to ensure consistency.

---

Reasoning Path 1: Item-by-Item Calculation
Step 1: Calculate cost of small pots
- 2 small pots × $2 = $4

Step 2: Calculate cost of medium pots
- 3 medium pots × $4 = $12

Step 3: Calculate cost of large pots
- 1 large pot × $6 = $6

Step 4: Sum all costs
- Total = $4 + $12 + $6 = $22

---

Reasoning Path 2: Category-First Approach
Step 1: List all purchases with prices
- Small: 2 pots at $2 each
- Medium: 3 pots at $4 each
- Large: 1 pot at $6 each

Step 2: Calculate total by grouping
- Small total: 2 × $2 = $4
- Medium total: 3 × $4 = $12
- Large total: 1 × $6 = $6

Step 3: Add all groups
- Grand total = $4 + $12 + $6 = $22

---

Comparison and Verification:
Both reasoning paths arrive at the same answer: $22

Path 1 uses sequential calculation (small → medium → large → sum)
Path 2 uses categorical grouping before summation

Since both methods produce identical results ($22), we can be confident this is the correct answer.

Final Answer: $22
```

---

## Exercise 4: Design a Multi-Step Document Pipeline

### Pipeline Architecture

```
Stage 1: Domain Identification
    ↓
Stage 2: Contribution Extraction
    ↓
Stage 3: Follow-up Question Generation
```

### Stage 1: Domain Identification Prompt

```
You are an academic research classifier. Analyze the following research paper abstract and identify its primary domain.

Choose from: Biology, Physics, Computer Science, Chemistry, Mathematics, Psychology, Economics, or Other.

Abstract: {ABSTRACT_TEXT}

Output format:
Domain: [Domain Name]
Confidence: [High/Medium/Low]
Keywords: [3-5 key terms that informed your decision]
```

**Conditional Logic**: If confidence is "Low", trigger a secondary classification prompt or flag for human review.

---

### Stage 2: Contribution Extraction Prompt

```
You are analyzing a research paper in the domain of {DOMAIN_FROM_STAGE_1}.

Extract the main contributions from the following abstract. Focus on:
- Novel methods or techniques introduced
- Key findings or results
- Theoretical advancements
- Practical applications

Abstract: {ABSTRACT_TEXT}

Output format:
Main Contributions:
1. [Contribution 1]
2. [Contribution 2]
3. [Contribution 3]
```

**Context Chaining**: The domain from Stage 1 is passed as context to help the model focus on domain-specific terminology.

---

### Stage 3: Follow-up Research Question Generation

```
Based on the following research paper analysis, generate a compelling follow-up research question that could extend this work.

Domain: {DOMAIN_FROM_STAGE_1}
Main Contributions:
{CONTRIBUTIONS_FROM_STAGE_2}

Your follow-up question should:
- Address a gap or limitation in the current research
- Be specific and actionable
- Be relevant to the {DOMAIN_FROM_STAGE_1} field

Output format:
Follow-up Research Question: [Your question here]
Rationale: [Brief explanation of why this question is valuable]
```

**Conditional Logic**: If no clear contributions were extracted in Stage 2, skip this stage and flag the paper for manual review.

---

## Exercise 5: Role Prompting to Reduce Bias

### Version 1: Basic Prompt (Potentially Biased)

```
A user has the following skills and interests:
- Good with people
- Enjoys helping others
- Detail-oriented
- Interested in healthcare

Suggest 3 career paths for this user.
```

**Problem**: This prompt may lead to stereotypical suggestions based on implicit biases (e.g., suggesting nursing primarily for women, or assuming gender from interests).

---

### Version 2: Role Prompt to Reduce Bias

```
You are an unbiased career counselor committed to providing inclusive, stereotype-free recommendations. Your goal is to suggest career paths based solely on skills and interests, without making assumptions about gender, race, age, or background.

A user has the following skills and interests:
- Good with people
- Enjoys helping others
- Detail-oriented
- Interested in healthcare

Provide 3 diverse career path recommendations that:
1. Match the stated skills and interests
2. Represent different levels of education/training
3. Include both traditional and non-traditional options
4. Avoid gender-stereotyped suggestions

For each career, explain how it aligns with the user's profile.

Format:
Career 1: [Title]
- Why it fits: [Explanation]

Career 2: [Title]
- Why it fits: [Explanation]

Career 3: [Title]
- Why it fits: [Explanation]
```

### How the Role Prompt Improves Fairness

1. **Explicit Bias Awareness**: Directly instructs the model to avoid stereotypes and assumptions
2. **Diversity Requirement**: Asks for "diverse" and "non-traditional" options, encouraging broader thinking
3. **Skill-Based Focus**: Emphasizes matching skills rather than making demographic assumptions
4. **Transparency**: Requires explanations, making the reasoning visible and auditable
5. **Professional Role**: Framing as an "unbiased career counselor" sets expectations for fair treatment

**Example Output Difference**:
- Basic prompt might suggest: Nurse, Social Worker, Medical Assistant (potentially stereotypical)
- Role prompt might suggest: Healthcare Administrator, Biomedical Engineer, Patient Advocate (more diverse range)

---

## Exercise 6: Build a Conversational Agent with Context Memory

### Chosen Memory Technique: **Structured History with Summarization**

This approach maintains a structured context of past interactions, summarizing older conversations to prevent token overflow while keeping recent exchanges detailed.

### Context Structure

```json
{
  "user_profile": {
    "name": "Sarah",
    "preferences": {
      "sleep_goal": "8 hours per night",
      "diet_preference": "vegetarian",
      "exercise_frequency": "3 times per week"
    },
    "current_challenges": [
      "difficulty falling asleep",
      "inconsistent meal timing"
    ]
  },
  "conversation_history": [
    {
      "date": "2026-01-10",
      "topic": "sleep habits",
      "summary": "User reported sleeping only 5-6 hours. Recommended sleep hygiene practices and consistent bedtime routine.",
      "advice_given": ["Set consistent bedtime at 10:30 PM", "Avoid screens 1 hour before bed", "Try chamomile tea"]
    },
    {
      "date": "2026-01-13",
      "topic": "diet",
      "summary": "User struggling with meal planning. Suggested batch cooking and meal prep on Sundays.",
      "advice_given": ["Prepare 3 vegetarian meals on Sunday", "Keep healthy snacks accessible"]
    }
  ],
  "last_interaction": "2026-01-13"
}
```

### Personalized Prompt with Context Memory

```
You are a virtual health coach having an ongoing conversation with Sarah. Use the context below to provide personalized, coherent advice that builds on previous interactions.

--- USER PROFILE ---
Name: Sarah
Sleep Goal: 8 hours per night
Diet: Vegetarian
Exercise Goal: 3 times per week
Current Challenges: Difficulty falling asleep, inconsistent meal timing

--- PREVIOUS CONVERSATIONS ---
[2026-01-10] Sleep Habits Discussion:
- Sarah reported sleeping only 5-6 hours
- You recommended: consistent bedtime at 10:30 PM, avoiding screens before bed, trying chamomile tea

[2026-01-13] Diet Discussion:
- Sarah struggling with meal planning
- You suggested: batch cooking on Sundays, preparing 3 vegetarian meals, keeping healthy snacks accessible

--- CURRENT CONVERSATION ---
Sarah: "Hi! I've been following your sleep advice and I'm now getting 7 hours consistently. But I'm still feeling tired during the day."

Your response should:
1. Acknowledge her progress on sleep improvement
2. Reference the specific advice you gave previously
3. Explore potential reasons for daytime fatigue (considering her vegetarian diet and exercise habits)
4. Provide actionable next steps that connect to her overall health goals

Response:
```

### Expected Personalized Output

```
That's wonderful progress, Sarah! Going from 5-6 hours to 7 hours consistently is a significant improvement. I'm glad the consistent 10:30 PM bedtime and screen-free routine are working for you.

Since you're still experiencing daytime fatigue despite better sleep, let's explore a few possibilities:

1. **Sleep Quality vs. Quantity**: You're close to your 8-hour goal. Let's try pushing for that extra hour to see if it makes a difference. Have you been able to stick with the chamomile tea before bed?

2. **Nutrition Connection**: Given your vegetarian diet, let's check your iron and B12 levels. These are common deficiency areas that cause fatigue. Are you incorporating iron-rich foods like lentils, spinach, and fortified cereals? Pair them with vitamin C sources for better absorption.

3. **Meal Timing**: You mentioned inconsistent meal timing last week. Irregular eating can affect energy levels. How's the Sunday meal prep going? Consistent meal times can help stabilize your energy throughout the day.

4. **Exercise Factor**: You're aiming for 3 workouts per week. Are you currently meeting that goal? Sometimes fatigue can come from either too little or too intense exercise.

**Next Steps**:
- Try to extend sleep to 7.5-8 hours this week
- Track your energy levels and meal times for 3 days
- Consider adding an iron-rich breakfast (like oatmeal with berries and nuts)
- Let me know your current exercise routine so we can optimize timing

How does this sound? Which area would you like to focus on first?
```

### Why This Memory Approach Works

1. **Continuity**: References specific previous advice (10:30 PM bedtime, chamomile tea, Sunday meal prep)
2. **Personalization**: Uses Sarah's name and specific profile details (vegetarian diet, exercise goals)
3. **Context Awareness**: Connects current complaint (fatigue) to multiple aspects of her health journey
4. **Progressive Coaching**: Builds on previous conversations rather than starting from scratch
5. **Scalability**: Structured format allows easy updates and can be stored in a database or vector store

---

## Summary

These exercises demonstrate advanced prompt engineering techniques:
- **Exercise 1**: Debugging logical errors in chain-of-thought reasoning
- **Exercise 2**: Selecting appropriate prompting patterns for real-world use cases
- **Exercise 3**: Using AlignedCoT to verify reasoning consistency
- **Exercise 4**: Designing multi-stage pipelines with conditional logic
- **Exercise 5**: Applying role prompting to reduce bias
- **Exercise 6**: Implementing context memory for conversational agents

Each solution emphasizes clarity, structure, and practical applicability in production systems.
