# Prompt Engineering Exercises - Gold Level 🏆

Welcome to the advanced prompt engineering exercises! This directory contains comprehensive solutions for all 6 exercises.

## 📁 Files Included

1. **`prompt_engineering_exercises.md`** - Detailed written solutions with explanations
2. **`prompt_engineering_colab.py`** - Executable Python script (works in Google Colab or Jupyter)
3. **`README.md`** - This file

## 🎯 Exercise Overview

### Exercise 1: Debug a Faulty Chain-of-Thought
- **Goal**: Identify and fix logical errors in CoT prompts
- **Skills**: Critical thinking, mathematical reasoning, prompt debugging

### Exercise 2: Choose the Right Prompt Pattern
- **Goal**: Select optimal prompting strategy for customer support chatbot
- **Skills**: Pattern recognition, use case analysis, few-shot prompting

### Exercise 3: Use AlignedCoT to Compare Reasoning Paths
- **Goal**: Reduce hallucination using multiple reasoning paths
- **Skills**: Aligned Chain-of-Thought, verification techniques

### Exercise 4: Design a Multi-Step Document Pipeline
- **Goal**: Build automated research paper processing pipeline
- **Skills**: Prompt chaining, conditional logic, context management

### Exercise 5: Role Prompting to Reduce Bias
- **Goal**: Create fair, inclusive career recommendations
- **Skills**: Bias awareness, role-based prompting, ethical AI

### Exercise 6: Build a Conversational Agent with Context Memory
- **Goal**: Implement memory in a virtual health coach
- **Skills**: Context management, structured history, personalization

## 🚀 How to Use

### Option 1: Read the Solutions
Open `prompt_engineering_exercises.md` to read the complete solutions with detailed explanations.

### Option 2: Run the Interactive Script

#### In Google Colab:
1. Upload `prompt_engineering_colab.py` to Google Colab
2. Run all cells to see the exercises in action
3. (Optional) Uncomment the API section to test with real LLM

#### Locally with Python:
```bash
python prompt_engineering_colab.py
```

#### In Jupyter Notebook:
1. Convert to notebook format:
```bash
pip install jupytext
jupytext --to notebook prompt_engineering_colab.py
```
2. Open the `.ipynb` file in Jupyter

### Option 3: Use with LLM API

To test prompts with a real LLM (OpenAI, Anthropic, etc.):

1. Open `prompt_engineering_colab.py`
2. Uncomment the API setup section at the top
3. Add your API key:
```python
openai.api_key = "your-api-key-here"
```
4. Use the `call_llm()` function to test prompts

## 📊 Exercise Solutions Summary

| Exercise | Pattern/Technique | Key Insight |
|----------|-------------------|-------------|
| 1 | Chain-of-Thought | Verify each calculation step |
| 2 | Few-Shot Prompting | Examples improve consistency |
| 3 | AlignedCoT | Multiple paths reduce errors |
| 4 | Prompt Chaining | Break complex tasks into stages |
| 5 | Role Prompting | Explicit roles reduce bias |
| 6 | Context Memory | Structure enables personalization |

## 🎓 Learning Outcomes

After completing these exercises, you will be able to:

✅ Debug and optimize chain-of-thought prompts  
✅ Select appropriate prompting patterns for different use cases  
✅ Implement multi-path reasoning for verification  
✅ Design complex multi-step LLM pipelines  
✅ Create bias-aware, inclusive prompts  
✅ Build conversational agents with memory  

## 💡 Best Practices Demonstrated

1. **Clarity**: Clear, structured prompts with explicit instructions
2. **Verification**: Multiple reasoning paths to catch errors
3. **Context**: Proper context management for coherent responses
4. **Fairness**: Bias-aware prompt design
5. **Scalability**: Production-ready patterns and architectures

## 🔧 Customization

Feel free to modify the prompts and test with:
- Different problem scenarios
- Various LLM models (GPT-4, Claude, Gemini, etc.)
- Your own use cases and domains

## 📚 Additional Resources

- [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [Anthropic Prompt Library](https://docs.anthropic.com/claude/prompt-library)
- [Google AI Prompt Design](https://ai.google.dev/docs/prompt_best_practices)

## ✨ Next Steps

1. Review each exercise solution carefully
2. Run the Python script to see outputs
3. Try modifying prompts for your own use cases
4. Test with different LLM models
5. Apply these patterns to real-world projects

---

**Happy Prompting! 🚀**

*Created for advanced prompt engineering practice*
