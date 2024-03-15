import os
from langchain_openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from flask import Flask, request, jsonify
from flask_cors import CORS

os.environ['OPENAI_API_KEY'] = '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'

embeddings = OpenAIEmbeddings()

db_openAI = FAISS.load_local("openAI_index", embeddings)

retriever = db_openAI.as_retriever(search_kwargs={'k':2})

llm = ChatOpenAI(temperature=0, model="gpt-3.5-turbo-0125")

prompt_template = """
### [INST]
You are restricted to retrieve relevant courses from the provided context.
Your role is a professional course consultant and career advisor.
Provide suitable skills future courses from the provided context.
Very important!. Always include the course ID. A correct course-id should start with "TGS-" follow by their a string of numbers. an example is "TGS-2023021532". You are not to output any course other than from the provided context. If no course code is given output "NIL"

Never reply with your own existing knowledge, always use the knowledge from the context
Do not come up with your own creation. Output the original courses.
Do not mention things that you are unsure or do not know, if encounter, politely apologize.

{context}
{question}
[/INST]
"""
prompt = PromptTemplate(
    input_variables=["context","question"],
    template=prompt_template,
)

qa_with_source = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=retriever,
    chain_type_kwargs={'prompt':prompt}
)

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def process_message():
    message = request.get_json().get('message')
    retrieved = qa_with_source(message)
    result = retrieved.get('result')
    print(retrieved)
    print(jsonify(result))
    
    return jsonify(result)

app.run(use_reloader = False, debug = True)