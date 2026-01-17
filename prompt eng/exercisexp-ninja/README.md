# LLM-Powered Document Assistant

## 🎯 Project Overview

This project implements an advanced LLM-powered Document Assistant that demonstrates sophisticated prompt engineering techniques. The assistant can:

- **Summarize** complex legal documents using Few-Shot and Chain-of-Thought prompting
- **Answer questions** in a role-based manner (as a contract lawyer)
- **Maintain context** across multiple conversation turns
- **Self-critique** and improve its own responses

## 📋 Exercises Completed

### Step 1: Initial Summary Prompt ✅
**Technique:** Few-Shot + Chain-of-Thought

The summary prompt uses:
- **Few-shot learning** with 2 complete examples showing the reasoning process
- **Chain-of-Thought** prompting to break down analysis into steps
- **Structured output** format for consistency

**Key Features:**
- Demonstrates step-by-step reasoning before providing summary
- Extracts: parties, responsibilities, payment terms, termination, liability, and other terms
- Uses consistent formatting across examples

### Step 2: Role-Based Follow-Up Q&A ✅
**Technique:** Role-Based + Narrative-of-Thought

The Q&A prompt implements:
- **Role-based prompting** (experienced contract lawyer persona)
- **Narrative-of-Thought** reasoning (conversational, step-by-step explanation)
- **Instance-Adaptive CoT** (adapts complexity to question)

**Key Features:**
- 15-year experienced lawyer persona with specialization
- 5-step approach for answering questions
- Plain English explanations with legal accuracy
- Practical, actionable advice

### Step 3: Memory Integration ✅
**Technique:** Context Chaining with Structured History

The memory system includes:
- **ConversationMemory class** for managing conversation state
- **Prior message passing** with recent conversation history
- **Key facts extraction** for important points
- **Context window management** (keeps last 10 exchanges)

**Key Features:**
- Stores document summary, Q&A history, and key facts
- Generates context-aware prompts for follow-up questions
- Truncates old history to manage token limits
- References previous discussion in new answers

### Step 4: Mitigation & Refinement ✅
**Technique:** Self-Reflection + Multi-Agent Critique

Two critique approaches:

**4A: Self-Reflection Prompt**
- Accuracy check (fact verification)
- Completeness check (coverage assessment)
- Clarity check (understandability)
- Risk assessment (appropriate caution)
- Improved answer generation

**4B: Multi-Agent Critique**
- Contract Lawyer (risk focus)
- Business Consultant (practical focus)
- Compliance Officer (regulatory focus)
- Plain Language Specialist (communication focus)
- Synthesized answer with confidence score

## 🚀 Usage

### Basic Usage

```python
from document_assistant import DocumentAssistant, SERVICE_AGREEMENT_DOCUMENT

# Initialize assistant
assistant = DocumentAssistant(SERVICE_AGREEMENT_DOCUMENT)

# Get summary prompt
summary_prompt = assistant.summarize_document()
# Send to LLM API and get response

# Ask questions
question_prompt = assistant.ask_question("What are the payment terms?")
# Send to LLM API and get response

# Critique an answer
critique_prompt = assistant.critique_answer(
    question="What are the payment terms?",
    answer="The client pays $12,000 monthly...",
    multi_agent=True
)
# Send to LLM API for critique
```

### Run Demonstration

```bash
python document_assistant.py
```

This will print all four prompt examples to the console.

## 📦 Installation

```bash
# Install required packages
pip install openai python-dotenv

# Create .env file with your API key
echo "OPENAI_API_KEY=your-key-here" > .env
```

## 🔧 Integration with LLM API

To use with OpenAI API, uncomment the client code at the top of `document_assistant.py`:

```python
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
```

Then modify the methods to actually call the API:

```python
def summarize_document(self) -> str:
    prompt = get_step1_summary_prompt(self.document)
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7
    )
    return response.choices[0].message.content
```

## 📚 Document Used

The project uses a Service Agreement excerpt between:
- **Provider:** BrightLine Technologies Ltd.
- **Client:** NovaWare Systems Inc.

**Key Terms:**
- Monthly fee: $12,000
- Duration: 12 months (March 1, 2025 - March 1, 2026)
- Termination: 30 days written notice
- Liability cap: 3 months of fees
- Governing law: California

## 🎓 Prompt Engineering Techniques Demonstrated

1. **Few-Shot Learning** - Providing examples to guide the model
2. **Chain-of-Thought (CoT)** - Step-by-step reasoning
3. **Role-Based Prompting** - Assigning specific personas
4. **Narrative-of-Thought** - Conversational, engaging explanations
5. **Instance-Adaptive CoT** - Adjusting complexity to the task
6. **Context Chaining** - Maintaining conversation state
7. **Self-Reflection** - Critiquing own outputs
8. **Multi-Agent Critique** - Multiple perspectives for validation

## 📁 Project Structure

```
exercisexp-ninja/
├── document_assistant.py    # Main implementation
├── README.md                 # This file
├── requirements.txt          # Python dependencies
├── .env.example             # Environment variables template
└── examples/                # Example outputs
    ├── step1_summary.txt
    ├── step2_qa.txt
    ├── step3_memory.txt
    └── step4_critique.txt
```

## 🧪 Testing

The demonstration function shows all prompts in action:

```python
demonstrate_all_steps()
```

This outputs:
- Step 1 summary prompt with examples
- Step 2 lawyer Q&A prompt
- Step 3 memory-enhanced prompt with conversation history
- Step 4A self-reflection prompt
- Step 4B multi-agent critique prompt

## 💡 Key Insights

### Why Few-Shot Works
Providing examples helps the model understand:
- The expected output format
- The level of detail required
- The reasoning process to follow

### Why Role-Based Prompting Works
Assigning a specific role:
- Activates relevant knowledge in the model
- Sets appropriate tone and style
- Provides context for decision-making

### Why Memory Matters
Context chaining enables:
- Coherent multi-turn conversations
- Reference to previous discussions
- Progressive refinement of understanding

### Why Self-Reflection Helps
Critique mechanisms:
- Catch errors and omissions
- Improve clarity and completeness
- Validate accuracy against source material

## 🔮 Future Enhancements

- [ ] Vector database integration for larger documents
- [ ] Semantic search for relevant clauses
- [ ] Comparison of multiple contracts
- [ ] Risk scoring and visualization
- [ ] Export to structured formats (JSON, PDF)
- [ ] Multi-language support

## 📝 License

MIT License - Feel free to use for educational purposes

## 👥 Author

Created for Prompt Engineering Exercises - Document Assistant Challenge
