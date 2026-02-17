"""
Prompt Engineering Exercises - Gold Level
Interactive Python Implementation

This file contains executable examples for all 6 exercises.
You can run this in Google Colab or Jupyter Notebook.

To use with an LLM API (OpenAI, Anthropic, etc.), uncomment and configure the API section.
"""

# ============================================================================
# SETUP (Uncomment if using with actual LLM API)
# ============================================================================

# import openai
# import os
# from typing import List, Dict

# # Set your API key
# openai.api_key = os.getenv("OPENAI_API_KEY")  # or set directly

# def call_llm(prompt: str, model: str = "gpt-4") -> str:
#     """Helper function to call LLM API"""
#     response = openai.ChatCompletion.create(
#         model=model,
#         messages=[{"role": "user", "content": prompt}],
#         temperature=0.7
#     )
#     return response.choices[0].message.content


# ============================================================================
# EXERCISE 1: Debug a Faulty Chain-of-Thought
# ============================================================================

print("=" * 80)
print("EXERCISE 1: Debug a Faulty Chain-of-Thought")
print("=" * 80)

original_prompt = """
A shop sells pencils at $0.75 each. If Alice buys 6 pencils and pays with a $5 bill, 
how much change does she get? Let's solve this step-by-step.
6 pencils × $0.75 = $4.75
$5.00 - $4.75 = $0.50
The change is $0.50.
"""

print("\n📌 ORIGINAL PROMPT (WITH ERROR):")
print(original_prompt)

print("\n🔍 IDENTIFIED MISTAKE:")
print("The calculation '6 × $0.75 = $4.75' is INCORRECT.")
print("Correct calculation: 6 × $0.75 = $4.50")

corrected_prompt = """
A shop sells pencils at $0.75 each. If Alice buys 6 pencils and pays with a $5 bill, 
how much change does she get? Let's solve this step-by-step.

Step 1: Calculate the total cost of pencils
- Number of pencils: 6
- Price per pencil: $0.75
- Total cost = 6 × $0.75 = $4.50

Step 2: Calculate the change
- Amount paid: $5.00
- Total cost: $4.50
- Change = $5.00 - $4.50 = $0.50

The change Alice receives is $0.50.
"""

print("\n✅ CORRECTED CHAIN-OF-THOUGHT PROMPT:")
print(corrected_prompt)

# Verify the calculation
total_cost = 6 * 0.75
change = 5.00 - total_cost
print(f"\n🧮 VERIFICATION:")
print(f"Total cost: ${total_cost:.2f}")
print(f"Change: ${change:.2f}")


# ============================================================================
# EXERCISE 2: Choose the Right Prompt Pattern
# ============================================================================

print("\n\n" + "=" * 80)
print("EXERCISE 2: Choose the Right Prompt Pattern")
print("=" * 80)

print("\n📋 SCENARIO: Customer Support Chatbot Message Categorization")
print("Categories: Billing Issue, Technical Support, Account Access, Other")

print("\n🎯 SELECTED PATTERN: Few-Shot Prompting")
print("\nJUSTIFICATION:")
print("- Handles ambiguity in customer messages")
print("- Ensures consistent categorization")
print("- Good generalization without fine-tuning")
print("- Works well with limited examples")

few_shot_prompt = """
You are a customer support assistant. Your task is to categorize incoming customer messages 
into one of the following categories:
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
"""

print("\n✅ FEW-SHOT PROMPT TEMPLATE:")
print(few_shot_prompt)

# Test messages
test_messages = [
    "My credit card was declined but I still see a pending charge.",
    "The video player won't load on my device.",
    "I can't reset my two-factor authentication.",
    "What are your business hours?"
]

print("\n🧪 TEST MESSAGES:")
for i, msg in enumerate(test_messages, 1):
    print(f"{i}. {msg}")
    # Expected categories: Billing Issue, Technical Support, Account Access, Other


# ============================================================================
# EXERCISE 3: Use AlignedCoT to Compare Reasoning Paths
# ============================================================================

print("\n\n" + "=" * 80)
print("EXERCISE 3: Use AlignedCoT to Compare Reasoning Paths")
print("=" * 80)

aligned_cot_prompt = """
Problem: A gardener has 3 types of flower pots:
- Small pots cost $2 each
- Medium pots cost $4 each
- Large pots cost $6 each

She buys 2 small, 3 medium, and 1 large pot. What is the total cost?

Please solve this problem using TWO different reasoning approaches, then compare them 
to ensure consistency.

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

Since both methods produce identical results ($22), we can be confident this is the 
correct answer.

Final Answer: $22
"""

print("\n✅ ALIGNED COT PROMPT:")
print(aligned_cot_prompt)

# Verify both paths
print("\n🧮 VERIFICATION:")
path1_result = (2 * 2) + (3 * 4) + (1 * 6)
path2_result = 2*2 + 3*4 + 1*6
print(f"Path 1 Result: ${path1_result}")
print(f"Path 2 Result: ${path2_result}")
print(f"Results Match: {path1_result == path2_result}")


# ============================================================================
# EXERCISE 4: Design a Multi-Step Document Pipeline
# ============================================================================

print("\n\n" + "=" * 80)
print("EXERCISE 4: Design a Multi-Step Document Pipeline")
print("=" * 80)

print("\n📊 PIPELINE ARCHITECTURE:")
print("Stage 1: Domain Identification → Stage 2: Contribution Extraction → Stage 3: Follow-up Question")

# Stage 1: Domain Identification
stage1_prompt = """
You are an academic research classifier. Analyze the following research paper abstract 
and identify its primary domain.

Choose from: Biology, Physics, Computer Science, Chemistry, Mathematics, Psychology, 
Economics, or Other.

Abstract: {ABSTRACT_TEXT}

Output format:
Domain: [Domain Name]
Confidence: [High/Medium/Low]
Keywords: [3-5 key terms that informed your decision]
"""

print("\n✅ STAGE 1 PROMPT (Domain Identification):")
print(stage1_prompt)

# Stage 2: Contribution Extraction
stage2_prompt = """
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
"""

print("\n✅ STAGE 2 PROMPT (Contribution Extraction):")
print(stage2_prompt)

# Stage 3: Follow-up Question Generation
stage3_prompt = """
Based on the following research paper analysis, generate a compelling follow-up research 
question that could extend this work.

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
"""

print("\n✅ STAGE 3 PROMPT (Follow-up Question Generation):")
print(stage3_prompt)

print("\n🔄 CONDITIONAL LOGIC:")
print("- Stage 1: If confidence is 'Low', trigger secondary classification or flag for review")
print("- Stage 2: Domain from Stage 1 is passed as context")
print("- Stage 3: If no clear contributions in Stage 2, skip and flag for manual review")


# ============================================================================
# EXERCISE 5: Role Prompting to Reduce Bias
# ============================================================================

print("\n\n" + "=" * 80)
print("EXERCISE 5: Role Prompting to Reduce Bias")
print("=" * 80)

basic_prompt = """
A user has the following skills and interests:
- Good with people
- Enjoys helping others
- Detail-oriented
- Interested in healthcare

Suggest 3 career paths for this user.
"""

print("\n❌ VERSION 1: Basic Prompt (Potentially Biased):")
print(basic_prompt)
print("\n⚠️ PROBLEM: May lead to stereotypical suggestions based on implicit biases")

role_based_prompt = """
You are an unbiased career counselor committed to providing inclusive, stereotype-free 
recommendations. Your goal is to suggest career paths based solely on skills and interests, 
without making assumptions about gender, race, age, or background.

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
"""

print("\n✅ VERSION 2: Role-Based Prompt (Bias Reduction):")
print(role_based_prompt)

print("\n🎯 HOW ROLE PROMPTING IMPROVES FAIRNESS:")
improvements = [
    "Explicit bias awareness - directly instructs to avoid stereotypes",
    "Diversity requirement - asks for non-traditional options",
    "Skill-based focus - emphasizes matching skills over assumptions",
    "Transparency - requires explanations for auditability",
    "Professional role - sets expectations for fair treatment"
]
for i, improvement in enumerate(improvements, 1):
    print(f"{i}. {improvement}")


# ============================================================================
# EXERCISE 6: Build a Conversational Agent with Context Memory
# ============================================================================

print("\n\n" + "=" * 80)
print("EXERCISE 6: Build a Conversational Agent with Context Memory")
print("=" * 80)

print("\n🧠 CHOSEN MEMORY TECHNIQUE: Structured History with Summarization")
print("\nBENEFITS:")
print("- Maintains detailed recent context")
print("- Summarizes older conversations to prevent token overflow")
print("- Enables personalized, coherent responses")

# Context structure
context_structure = {
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
            "summary": "User reported sleeping only 5-6 hours. Recommended sleep hygiene practices.",
            "advice_given": [
                "Set consistent bedtime at 10:30 PM",
                "Avoid screens 1 hour before bed",
                "Try chamomile tea"
            ]
        },
        {
            "date": "2026-01-13",
            "topic": "diet",
            "summary": "User struggling with meal planning. Suggested batch cooking.",
            "advice_given": [
                "Prepare 3 vegetarian meals on Sunday",
                "Keep healthy snacks accessible"
            ]
        }
    ],
    "last_interaction": "2026-01-13"
}

print("\n📋 CONTEXT STRUCTURE:")
import json
print(json.dumps(context_structure, indent=2))

conversational_prompt = """
You are a virtual health coach having an ongoing conversation with Sarah. Use the context 
below to provide personalized, coherent advice that builds on previous interactions.

--- USER PROFILE ---
Name: Sarah
Sleep Goal: 8 hours per night
Diet: Vegetarian
Exercise Goal: 3 times per week
Current Challenges: Difficulty falling asleep, inconsistent meal timing

--- PREVIOUS CONVERSATIONS ---
[2026-01-10] Sleep Habits Discussion:
- Sarah reported sleeping only 5-6 hours
- You recommended: consistent bedtime at 10:30 PM, avoiding screens before bed, 
  trying chamomile tea

[2026-01-13] Diet Discussion:
- Sarah struggling with meal planning
- You suggested: batch cooking on Sundays, preparing 3 vegetarian meals, 
  keeping healthy snacks accessible

--- CURRENT CONVERSATION ---
Sarah: "Hi! I've been following your sleep advice and I'm now getting 7 hours consistently. 
But I'm still feeling tired during the day."

Your response should:
1. Acknowledge her progress on sleep improvement
2. Reference the specific advice you gave previously
3. Explore potential reasons for daytime fatigue (considering her vegetarian diet and 
   exercise habits)
4. Provide actionable next steps that connect to her overall health goals

Response:
"""

print("\n✅ CONVERSATIONAL PROMPT WITH CONTEXT MEMORY:")
print(conversational_prompt)

print("\n🎯 WHY THIS MEMORY APPROACH WORKS:")
memory_benefits = [
    "Continuity - References specific previous advice",
    "Personalization - Uses user's name and profile details",
    "Context Awareness - Connects current issue to health journey",
    "Progressive Coaching - Builds on previous conversations",
    "Scalability - Structured format for database/vector store"
]
for i, benefit in enumerate(memory_benefits, 1):
    print(f"{i}. {benefit}")


# ============================================================================
# SUMMARY
# ============================================================================

print("\n\n" + "=" * 80)
print("SUMMARY")
print("=" * 80)

summary = """
These 6 exercises demonstrate advanced prompt engineering techniques:

✅ Exercise 1: Debugging logical errors in chain-of-thought reasoning
✅ Exercise 2: Selecting appropriate prompting patterns for real-world use cases
✅ Exercise 3: Using AlignedCoT to verify reasoning consistency
✅ Exercise 4: Designing multi-stage pipelines with conditional logic
✅ Exercise 5: Applying role prompting to reduce bias
✅ Exercise 6: Implementing context memory for conversational agents

Each solution emphasizes:
- Clarity and structure
- Practical applicability
- Production-ready patterns
- Bias awareness and fairness
- Scalability and maintainability
"""

print(summary)

print("\n" + "=" * 80)
print("🎓 All exercises completed successfully!")
print("=" * 80)
