from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline

# -----------------------------
# Exercise 5: Q/A Pipeline
# -----------------------------

def load_lm(model_id="gpt2"):
    """Load tokenizer + causal LM."""
    tokenizer = AutoTokenizer.from_pretrained(model_id)
    model = AutoModelForCausalLM.from_pretrained(model_id)
    return tokenizer, model


def build_pipeline(tokenizer, model):
    """Create text generation pipeline."""
    return pipeline(
        "text-generation",
        model=model,
        tokenizer=tokenizer,
        max_new_tokens=512,
        device_map="auto"
    )


def build_prompt(context_docs, question):
    """Construct prompt template for RAG."""
    context = " ".join([f"{doc}" for doc in context_docs])
    return f"Relevant context: {context}\n\nThe user's question: {question}"


def generate_answer(pipe, prompt):
    """Generate answer using LLM pipeline."""
    response = pipe(prompt)
    return response[0]["generated_text"]
