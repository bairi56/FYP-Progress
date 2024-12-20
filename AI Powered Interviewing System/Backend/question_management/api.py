# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# from .question_generator import load_saved_model_and_tokenizer, get_related_questions

# # Load model and tokenizer
# model, tokenizer = load_saved_model_and_tokenizer()

# # Initialize FastAPI app
# app = FastAPI()

# # Define request schema
# class QuestionRequest(BaseModel):
#     job: str
#     experience: str

# # Define API endpoint
# @app.post("/generate-questions/")
# async def generate_questions(request: QuestionRequest):
#     try:
#         questions = get_related_questions(request.job, request.experience, model, tokenizer)
#         return {"questions": questions.split("\n")}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
