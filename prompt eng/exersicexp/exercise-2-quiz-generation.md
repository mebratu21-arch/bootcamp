# Exercise 2: Multi-Part Prompt for Quiz Generation

## 🎯 Objective
Learn to create comprehensive, multi-part prompts that generate structured educational content with specific requirements.

## 📋 Scenario
A 7th-grade science teacher uploads a short article on **volcanic eruptions**. You are tasked with writing a prompt for ChatGPT to create engaging educational content.

## ✅ Tasks

### Task 1: Write a Complete Multi-Part Prompt

Write a complete prompt that asks the model to:

1. ✅ Summarize the article in **2 simple bullet points**
2. ✅ Generate **3 age-appropriate multiple-choice questions**, each with:
   - 1 correct answer
   - 2 distractors (incorrect but plausible answers)
3. ✅ Include a **friendly tone** and **simple vocabulary** for 11–13-year-olds
4. ✅ Output everything in a **format suitable for Google Slides**

#### Your Complete Prompt:
```
Act as a middle school science educator creating engaging educational materials for 7th-grade students (ages 11-13).

Based on the provided article about volcanic eruptions, create the following:

1. SUMMARY (2 bullet points):
   - Each bullet: one key concept in simple language
   - Maximum 15 words per bullet
   - Use vocabulary appropriate for 7th graders
   - Focus on the most important scientific concepts

2. QUIZ QUESTIONS (3 multiple-choice questions):
   For each question:
   - Write at an age-appropriate reading level (Flesch-Kincaid Grade 7-8)
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













```

---

### Task 2: Compare with Vague Prompt

Here's the vague version:

> **"Make a quiz for kids about this article."**

Explain **three key ways** your version prevents irrelevant or low-quality output.

#### Your Comparison:
```
1. Improvement 1: Specificity Prevents Generic Output - By specifying the exact number of questions (3), format (multiple-choice), and structure (1 correct + 2 distractors), the prompt ensures consistent, usable output rather than a random number or type of questions.

2. Improvement 2: Age-Appropriate Constraints Ensure Usability - Defining the target as "7th grade, ages 11-13" and requesting "simple vocabulary" ensures the content is actually appropriate for the intended audience, unlike the vague "for kids" which could mean anything from toddlers to teens.

3. Improvement 3: Format Requirements Enable Direct Use - Specifying a "Google Slides-ready" format with headers, numbering, and marked answers allows the teacher to copy-paste the content directly into their presentation without needing time-consuming reformatting.
```

---

## 💡 Prompt Structure Template

Use this template to structure your multi-part prompt:

```
Act as a [ROLE] creating educational content for [AUDIENCE].

Based on the provided article about [TOPIC], please:

1. Summary:
   - [SPECIFIC REQUIREMENT]
   
2. Quiz Questions:
   - [NUMBER] questions
   - [DIFFICULTY LEVEL]
   - [FORMAT DETAILS]
   
3. Tone & Language:
   - [TONE REQUIREMENT]
   - [VOCABULARY LEVEL]
   
4. Output Format:
   - [FORMAT SPECIFICATION]
   
[ADDITIONAL CONSTRAINTS]
```

---

## 📊 Example Article (Sample)

```
Volcanic Eruptions: Nature's Explosive Power

Volcanoes are openings in Earth's crust where molten rock, called magma, 
escapes to the surface. When magma reaches the surface, it's called lava. 
Volcanic eruptions can be explosive or gentle, depending on the magma's 
composition. Thick, sticky magma creates explosive eruptions, while thin, 
runny magma flows more smoothly.

Eruptions can cause significant damage, including lava flows, ash clouds, 
and pyroclastic flows—fast-moving currents of hot gas and rock. However, 
volcanoes also create new land and enrich soil with nutrients, making 
areas around them very fertile.
```

---

## 🎓 Key Learnings

After completing this exercise, you should understand:
- ✅ How to break complex tasks into clear, numbered steps
- ✅ The importance of specifying audience and age-appropriateness
- ✅ How format requirements ensure usable output
- ✅ Why tone and vocabulary constraints matter for educational content
- ✅ How detailed prompts prevent ambiguity and low-quality results

---

## ✨ Bonus Challenge

Try your prompt with the sample article above and evaluate:
- Are the bullet points simple enough for 7th graders?
- Are the quiz questions age-appropriate?
- Is the output ready to paste into Google Slides?
- Does it maintain a friendly, engaging tone?

---

## 🔄 Next Steps

1. Test your prompt with the sample article
2. Refine based on output quality
3. Try with different articles to test reusability
4. Move on to Exercise 3!
