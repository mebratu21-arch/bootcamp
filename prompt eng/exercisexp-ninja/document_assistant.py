"""
LLM-Powered Document Assistant
Prompt Engineering Exercises - Complete Implementation

This module demonstrates advanced prompt engineering techniques:
1. Few-shot and Chain-of-Thought summarization
2. Role-based Q&A with Narrative-of-Thought
3. Memory integration with context chaining
4. Self-reflection and critique mechanisms
"""

import os
from typing import List, Dict, Optional
from datetime import datetime

# Note: Install required packages: pip install openai python-dotenv
# from openai import OpenAI
# from dotenv import load_dotenv

# load_dotenv()
# client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


# ============================================================================
# DOCUMENT DATA
# ============================================================================

SERVICE_AGREEMENT_DOCUMENT = """
Service Agreement – Excerpt

This Service Agreement ("Agreement") is made effective as of March 1, 2025, by and between BrightLine Technologies Ltd., hereinafter referred to as "Provider", and NovaWare Systems Inc., hereinafter referred to as "Client".

Scope of Work: Provider shall deliver cloud infrastructure management services, including monitoring, incident response, and monthly reporting, as described in Exhibit A.

Payment Terms: Client agrees to pay a fixed monthly fee of $12,000, payable within 30 days of receipt of invoice. Late payments will incur a 2% penalty per month.

Term and Termination: This Agreement shall commence on March 1, 2025, and remain in effect for 12 months. Either party may terminate with 30 days' written notice.

Confidentiality: Both parties agree to protect the confidentiality of proprietary or sensitive information shared during the course of the engagement.

Limitation of Liability: Provider's total liability shall not exceed the fees paid by Client in the 3 months prior to a claim. Provider is not liable for indirect or consequential damages.

Governing Law: This Agreement shall be governed by the laws of the State of California.
"""


# ============================================================================
# STEP 1: INITIAL SUMMARY PROMPT (Few-Shot + Chain-of-Thought)
# ============================================================================

def get_step1_summary_prompt(document: str) -> str:
    """
    Creates a Few-Shot + Chain-of-Thought prompt for document summarization.
    
    This prompt demonstrates:
    - Few-shot learning with examples
    - Chain-of-Thought reasoning
    - Structured output format
    """
    
    prompt = f"""You are an expert legal document analyst. Your task is to summarize contracts in a clear, structured format.

I'll show you how to approach this step-by-step:

EXAMPLE 1:
Document: "Employment Agreement between ABC Corp and John Doe. Salary: $80,000/year. Start date: Jan 1, 2024. Either party may terminate with 2 weeks notice."

Reasoning Process:
1. Identify parties: ABC Corp (employer) and John Doe (employee)
2. Extract key terms: Salary ($80,000/year), start date (Jan 1, 2024)
3. Note termination clause: 2 weeks notice required
4. Check for other important clauses: None mentioned

Summary:
**Parties:**
- Employer: ABC Corp
- Employee: John Doe

**Key Responsibilities:**
- Employee to provide services as per role
- Employer to pay salary

**Payment Terms:**
- Annual salary: $80,000

**Termination:**
- Either party: 2 weeks written notice

**Other Important Terms:**
- Start date: January 1, 2024

---

EXAMPLE 2:
Document: "Service Contract. Provider: TechCo. Client: RetailMart. Monthly fee: $5,000. 6-month term. Liability capped at $15,000."

Reasoning Process:
1. Identify parties: TechCo (provider) and RetailMart (client)
2. Extract payment terms: $5,000 monthly
3. Note contract duration: 6 months
4. Identify liability limits: Capped at $15,000
5. Check termination terms: Not explicitly stated

Summary:
**Parties:**
- Provider: TechCo
- Client: RetailMart

**Key Responsibilities:**
- Provider to deliver services
- Client to pay monthly fee

**Payment Terms:**
- Monthly fee: $5,000

**Termination:**
- Not specified (6-month term)

**Liability Limitations:**
- Maximum liability: $15,000

---

Now, please analyze this document using the same step-by-step reasoning process:

DOCUMENT TO ANALYZE:
{document}

Please provide:
1. Your reasoning process (step-by-step analysis)
2. A structured summary following the format above

Include these sections:
- Parties (with their roles)
- Key Responsibilities of each party
- Payment Terms (amount, timing, penalties)
- Termination Clauses (notice period, conditions)
- Liability Limitations (caps, exclusions)
- Other Important Terms (confidentiality, governing law, etc.)
"""
    
    return prompt


# ============================================================================
# STEP 2: ROLE-BASED FOLLOW-UP Q&A (Narrative-of-Thought)
# ============================================================================

def get_step2_lawyer_qa_prompt(document: str, summary: str, question: str) -> str:
    """
    Creates a role-based prompt where the AI acts as a contract lawyer.
    
    This prompt demonstrates:
    - Role-based prompting
    - Narrative-of-Thought reasoning
    - Instance-Adaptive CoT (adapts to question complexity)
    """
    
    prompt = f"""You are an experienced contract lawyer with 15 years of experience in commercial agreements. You specialize in explaining complex legal terms in plain English to business clients.

CONTEXT:
You have been asked to review and explain a Service Agreement between BrightLine Technologies Ltd. (Provider) and NovaWare Systems Inc. (Client).

DOCUMENT:
{document}

PREVIOUS SUMMARY:
{summary}

YOUR APPROACH:
When answering questions, you should:
1. Think through the legal implications step-by-step (show your reasoning)
2. Reference specific clauses from the document
3. Explain in plain English what this means for the client
4. Highlight any risks or important considerations
5. Provide practical advice when relevant

Use a narrative style - walk the client through your thought process as if you're having a conversation.

QUESTION FROM CLIENT:
"{question}"

Please provide a comprehensive answer following your approach above. Start by acknowledging the question, then walk through your analysis, and conclude with clear, actionable advice.
"""
    
    return prompt


# ============================================================================
# STEP 3: MEMORY INTEGRATION (Context Chaining)
# ============================================================================

class ConversationMemory:
    """
    Manages conversation history and context for multi-turn interactions.
    
    This demonstrates:
    - Prior message passing
    - Structured conversation history
    - Context window management
    """
    
    def __init__(self, document: str, max_history: int = 10):
        self.document = document
        self.max_history = max_history
        self.conversation_history: List[Dict[str, str]] = []
        self.document_summary: Optional[str] = None
        self.key_facts: List[str] = []
        
    def add_exchange(self, question: str, answer: str, key_fact: Optional[str] = None):
        """Add a Q&A exchange to memory."""
        self.conversation_history.append({
            "timestamp": datetime.now().isoformat(),
            "question": question,
            "answer": answer
        })
        
        if key_fact:
            self.key_facts.append(key_fact)
        
        # Keep only recent history
        if len(self.conversation_history) > self.max_history:
            self.conversation_history = self.conversation_history[-self.max_history:]
    
    def set_summary(self, summary: str):
        """Store the initial document summary."""
        self.document_summary = summary
    
    def get_context_prompt(self, new_question: str) -> str:
        """
        Generate a prompt with full context for the next question.
        
        This uses structured conversation history to maintain context.
        """
        
        # Build conversation history section
        history_text = ""
        if self.conversation_history:
            history_text = "\n\nPREVIOUS CONVERSATION:\n"
            for i, exchange in enumerate(self.conversation_history[-5:], 1):
                history_text += f"\nQ{i}: {exchange['question']}\n"
                history_text += f"A{i}: {exchange['answer'][:200]}...\n"  # Truncate for brevity
        
        # Build key facts section
        facts_text = ""
        if self.key_facts:
            facts_text = "\n\nKEY FACTS ESTABLISHED:\n"
            for fact in self.key_facts[-5:]:
                facts_text += f"- {fact}\n"
        
        prompt = f"""You are a contract lawyer continuing a conversation about a Service Agreement.

DOCUMENT SUMMARY:
{self.document_summary if self.document_summary else "Not yet summarized"}
{facts_text}
{history_text}

FULL DOCUMENT (for reference):
{self.document}

NEW QUESTION:
"{new_question}"

Based on our previous conversation and the document, please answer this question. Reference any relevant points from our earlier discussion.
"""
        
        return prompt


# ============================================================================
# STEP 4: MITIGATION & REFINEMENT (Self-Reflection)
# ============================================================================

def get_step4_self_reflection_prompt(original_question: str, original_answer: str) -> str:
    """
    Creates a self-reflection prompt to critique and improve answers.
    
    This demonstrates:
    - Self-reflection techniques
    - Answer validation
    - Quality improvement
    """
    
    prompt = f"""You are a senior legal reviewer tasked with quality-checking contract advice.

ORIGINAL QUESTION:
"{original_question}"

ANSWER PROVIDED:
{original_answer}

YOUR TASK:
Review this answer critically and provide:

1. **ACCURACY CHECK:**
   - Are all facts from the document cited correctly?
   - Are there any misinterpretations of legal terms?
   - Is anything stated that isn't supported by the document?

2. **COMPLETENESS CHECK:**
   - Are there important aspects of the question that weren't addressed?
   - Are there related clauses or implications that should be mentioned?
   - Is the advice sufficiently comprehensive?

3. **CLARITY CHECK:**
   - Is the explanation clear and easy to understand?
   - Are legal terms properly explained?
   - Could a non-lawyer understand this advice?

4. **RISK ASSESSMENT:**
   - Are potential risks or pitfalls highlighted?
   - Is the advice appropriately cautious?
   - Are there any disclaimers or caveats that should be added?

5. **IMPROVED ANSWER:**
   Based on your critique, provide a revised, improved version of the answer.

Please structure your response with each section clearly labeled.
"""
    
    return prompt


def get_step4_multi_agent_critique_prompt(original_question: str, original_answer: str, document: str) -> str:
    """
    Creates a multi-agent critique prompt with different perspectives.
    
    This demonstrates:
    - Multi-agent review
    - Different expert perspectives
    - Consensus building
    """
    
    prompt = f"""You are facilitating a multi-expert review panel to critique legal contract advice.

DOCUMENT EXCERPT:
{document}

QUESTION ASKED:
"{original_question}"

ANSWER PROVIDED:
{original_answer}

REVIEW PANEL:

**Expert 1 - Contract Lawyer (Risk Focus):**
Review the answer from a risk management perspective. What legal risks or liabilities might the client face? Are there any red flags or concerns not adequately addressed?

**Expert 2 - Business Consultant (Practical Focus):**
Review the answer from a business operations perspective. Is the advice practical? How would this impact day-to-day business operations? Are there business considerations missing?

**Expert 3 - Compliance Officer (Regulatory Focus):**
Review the answer from a compliance and regulatory perspective. Are there any compliance issues? Is the governing law consideration adequate? What about dispute resolution?

**Expert 4 - Plain Language Specialist (Communication Focus):**
Review the answer from a communication perspective. Is it clear? Would a non-expert understand? Are there simpler ways to explain complex terms?

Please provide:
1. Each expert's critique (2-3 sentences each)
2. Common concerns identified by multiple experts
3. A synthesized, improved answer incorporating all perspectives
4. A confidence score (1-10) for the final answer with justification
"""
    
    prompt


# ============================================================================
# EXAMPLE USAGE & DEMONSTRATION
# ============================================================================

def demonstrate_all_steps():
    """
    Demonstrates all four steps of the document assistant.
    """
    
    print("=" * 80)
    print("LLM-POWERED DOCUMENT ASSISTANT - DEMONSTRATION")
    print("=" * 80)
    
    # STEP 1: Initial Summary
    print("\n\n📋 STEP 1: INITIAL SUMMARY PROMPT")
    print("-" * 80)
    step1_prompt = get_step1_summary_prompt(SERVICE_AGREEMENT_DOCUMENT)
    print(step1_prompt)
    print("\n[In practice, you would send this to an LLM API and receive a summary]")
    
    # Mock summary for demonstration
    mock_summary = """
**Parties:**
- Provider: BrightLine Technologies Ltd.
- Client: NovaWare Systems Inc.

**Key Responsibilities:**
- Provider: Deliver cloud infrastructure management services (monitoring, incident response, monthly reporting)
- Client: Pay monthly fees on time

**Payment Terms:**
- Monthly fee: $12,000
- Payment due: Within 30 days of invoice
- Late payment penalty: 2% per month

**Termination:**
- Contract duration: 12 months (starting March 1, 2025)
- Either party may terminate with 30 days written notice

**Liability Limitations:**
- Provider's total liability capped at fees paid in prior 3 months
- No liability for indirect or consequential damages

**Other Important Terms:**
- Confidentiality obligations for both parties
- Governed by California state law
"""
    
    # STEP 2: Role-Based Q&A
    print("\n\n💬 STEP 2: ROLE-BASED FOLLOW-UP Q&A")
    print("-" * 80)
    sample_question = "Can you explain the limitation of liability clause?"
    step2_prompt = get_step2_lawyer_qa_prompt(
        SERVICE_AGREEMENT_DOCUMENT,
        mock_summary,
        sample_question
    )
    print(step2_prompt)
    print("\n[In practice, you would send this to an LLM API for a lawyer-style response]")
    
    # STEP 3: Memory Integration
    print("\n\n🔁 STEP 3: MEMORY INTEGRATION")
    print("-" * 80)
    memory = ConversationMemory(SERVICE_AGREEMENT_DOCUMENT)
    memory.set_summary(mock_summary)
    
    # Simulate conversation
    memory.add_exchange(
        "Can you explain the limitation of liability clause?",
        "The limitation of liability clause caps Provider's liability at fees paid in the prior 3 months...",
        "Liability capped at 3 months of fees (max $36,000)"
    )
    
    memory.add_exchange(
        "What happens if we pay late?",
        "Late payments incur a 2% penalty per month...",
        "Late payment penalty: 2% per month"
    )
    
    # New question with context
    new_question = "Based on what we discussed about liability, what's our maximum exposure?"
    step3_prompt = memory.get_context_prompt(new_question)
    print(step3_prompt)
    print("\n[This prompt includes conversation history for context-aware responses]")
    
    # STEP 4: Self-Reflection & Critique
    print("\n\n🔍 STEP 4: MITIGATION & REFINEMENT")
    print("-" * 80)
    
    mock_answer = """
The limitation of liability clause means that BrightLine Technologies can only be held responsible 
for damages up to the amount you paid them in the last 3 months. So if something goes wrong, 
the maximum you could recover is $36,000 (3 months × $12,000). They also aren't responsible 
for indirect damages like lost profits or business interruption.
"""
    
    print("4A: SELF-REFLECTION PROMPT")
    print("-" * 40)
    step4a_prompt = get_step4_self_reflection_prompt(sample_question, mock_answer)
    print(step4a_prompt)
    
    print("\n\n4B: MULTI-AGENT CRITIQUE PROMPT")
    print("-" * 40)
    step4b_prompt = get_step4_multi_agent_critique_prompt(
        sample_question,
        mock_answer,
        SERVICE_AGREEMENT_DOCUMENT
    )
    print(step4b_prompt)
    
    print("\n\n" + "=" * 80)
    print("DEMONSTRATION COMPLETE")
    print("=" * 80)
    print("\nTo use with a real LLM:")
    print("1. Install: pip install openai python-dotenv")
    print("2. Set OPENAI_API_KEY in .env file")
    print("3. Uncomment the OpenAI client code at the top")
    print("4. Call client.chat.completions.create() with these prompts")


# ============================================================================
# INTERACTIVE ASSISTANT CLASS
# ============================================================================

class DocumentAssistant:
    """
    Complete document assistant with all features integrated.
    """
    
    def __init__(self, document: str):
        self.document = document
        self.memory = ConversationMemory(document)
        self.summary = None
        
    def summarize_document(self) -> str:
        """Generate initial summary using Step 1 prompt."""
        prompt = get_step1_summary_prompt(self.document)
        # In practice: response = client.chat.completions.create(...)
        # For now, return the prompt
        return prompt
    
    def ask_question(self, question: str, use_memory: bool = True) -> str:
        """Ask a question using Step 2 (with optional Step 3 memory)."""
        if use_memory and self.memory.conversation_history:
            prompt = self.memory.get_context_prompt(question)
        else:
            prompt = get_step2_lawyer_qa_prompt(
                self.document,
                self.summary or "Not yet summarized",
                question
            )
        
        # In practice: response = client.chat.completions.create(...)
        return prompt
    
    def critique_answer(self, question: str, answer: str, multi_agent: bool = False) -> str:
        """Critique an answer using Step 4 prompts."""
        if multi_agent:
            prompt = get_step4_multi_agent_critique_prompt(question, answer, self.document)
        else:
            prompt = get_step4_self_reflection_prompt(question, answer)
        
        # In practice: response = client.chat.completions.create(...)
        return prompt


if __name__ == "__main__":
    demonstrate_all_steps()
