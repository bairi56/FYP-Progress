# import os
# from transformers import AutoTokenizer, AutoModelForCausalLM

# # Load saved model and tokenizer
# def load_saved_model_and_tokenizer(save_directory="D:/LLMs/question_gen_model"):
#     model = AutoModelForCausalLM.from_pretrained(save_directory)
#     tokenizer = AutoTokenizer.from_pretrained(save_directory)
#     return model, tokenizer

# # Prompt generation function
# def make_prompt(job, experience, description_file="D:/LLMs/ml_description.txt"):
#     if experience.lower() not in ["intermediate", "basic", "expert"]:
#         raise ValueError("Invalid experience level. Choose from: intermediate, basic, expert.")
#     if not os.path.exists(description_file):
#         raise FileNotFoundError(f"Description file '{description_file}' not found.")
#     with open(description_file, 'r') as file:
#         description = file.read()
#     prompt_template = f"""
#     Based on the following description, ask scenario-based {experience} level {job} job interview questions. 
#     Each question should have a different taste and be scenario-based. Do not include answers.
#     Description:
#     "{description}"
#     Scenario-based Questions:
#     """
#     return prompt_template

# # Question generator function
# def generator(prompt, model, tokenizer):
#     inputs = tokenizer(prompt, return_tensors="pt")
#     outputs = model.generate(
#         **inputs,
#         max_new_tokens=100,
#         temperature=0.7,
#         top_p=0.8,
#         top_k=50,
#         num_return_sequences=1,
#         do_sample=True
#     )
#     questions = tokenizer.decode(outputs[0], skip_special_tokens=True)
#     questions_only = questions[len(prompt):].strip()
#     questions_list = questions_only.splitlines()
#     if questions_list and not questions_list[-1].strip().endswith("?"):
#         questions_list.pop()
#     return "\n".join(questions_list)

# # Main function to get related questions
# def get_related_questions(job, experience, model, tokenizer):
#     prompt = make_prompt(job, experience)
#     return generator(prompt, model, tokenizer)
