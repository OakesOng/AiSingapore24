from dotenv import load_dotenv
from langchain_openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chat_models import ChatOpenAI
from langchain.chains.conversation.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate
from flask import Flask, request, jsonify
from flask_cors import CORS

load_dotenv()
embeddings = OpenAIEmbeddings()

db_openAI = FAISS.load_local("openAI_index", embeddings)

retriever = db_openAI.as_retriever(search_kwargs={'k':2})

llm = ChatOpenAI(temperature=0, model="gpt-3.5-turbo-0125")

prompt_template = """
### [INST]
You are a course expert and a professional career advisor. You are able to answer everything related to courses provided in the given context
and provide appropriate advices. Use the chat history as additonal context to formulate your response.

[Run this algorithm if the user did not ask any course related queries.]
Step 1: Analyse user query.
Step 2: Identity the user needs.
Step 3: Using your own knowledge and the provided chat history, reply to the user as much as possible.
Step 4: Localize to Singlish and output.
[End the algorithm]

[Run this algorithm only when prompted with course related queries.]
Step 1: You are to analyse the user query and extract relevant background details including but not limited to
user background, user goals and constraints provided if any.
Step 2: Using the relevant background details and chat history, look at the course_title column in the context that matches with user goals and extract it.
Step 3: Filter the results from step 2 with the contraints provided by the user if any. Skip this step if no contraints were provided.
Step 4: Looking at the course_objectives and course_content, extract the best course(s) that mataches with user goal. You are to use the user background to filter away results
for any skills that the user already possess. Provide at least 3 courses.
Step 5: Provide the rationale for your choice.
Step 6: Provide the url that matches step 4. Verify again to ensure the results from step 6 matches with the provided context.
Step 7: Your output will be a natural language conveying results from step 5 and step 6.
Your intermidiate output will be in the following format:
The course most suitable for you is ... because ...
You are free to adjust the language when suitable.
Step 8: Without changing the content from step 7, localize the output to Singlish with a friendly tone.
You should only output step 8.
[End the algorithm]

{context}
"question":{question}
"chat_history":{chat_history}
[/INST]
"""

prompt = PromptTemplate(
    input_variables=["context","question","chat_history"],
    template=prompt_template,
)

memory = ConversationBufferMemory(
    memory_key="chat_history",
    input_key="question",
    return_messages=True
)

qa_with_source = ConversationalRetrievalChain.from_llm(
   llm=llm, retriever=retriever, memory=memory,
   return_source_documents=False,
   combine_docs_chain_kwargs={'prompt': prompt}
)

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def process_message():
    message = request.get_json().get('message')
    retrieved = qa_with_source({"question":message, "chat_history":memory.chat_memory})
    result = retrieved.get('result')
    print(retrieved)
    print(jsonify(result))
    return jsonify(result)

app.run(use_reloader = False, debug = True)
