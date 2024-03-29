# Import necessary libraries
from dotenv import load_dotenv
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_openai import ChatOpenAI
from langchain.chains import ConversationalRetrievalChain
from langchain.chains.conversation.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate
from flask import Flask, request, jsonify
from flask_cors import CORS

# Load environment variables
load_dotenv()

# Initialize OpenAI embeddings
embeddings = OpenAIEmbeddings()

# Load FAISS index for retrieval
db_openAI = FAISS.load_local("openAI_index", embeddings, allow_dangerous_deserialization=True)
retriever = db_openAI.as_retriever(search_kwargs={'k':2})

# Initialize OpenAI Chat model
llm = ChatOpenAI(temperature=0, model="gpt-3.5-turbo-0125")

# Define prompt template for conversation
prompt_template = """

Your role now is to a help assistant that excel in providing career advice and course related issue with the provided context.
You are to use question provided by the user and the chat history to come up with the best possible answer. 

You must show empathy in your response to the user circumstance in your reply.

You might face with different kind of questions, and some may not be direct and needed referrences from the chat history. You need
to pay attention to the question asked and answer directly to what is being queried in a friendly manner.

Additionally, if asked with course related questions, you are only to used the provided context and nothing else.
Ensures that the final output best answers the user query.

**Note** always check the chat history to ensure a question is a follow up question or not before analyzing the query. If it is a follow up, you need 
to use the chat history.

**Note** In your output, you are NOT to show your thinking process.

[When asked with non-course related questions] 
[Step 1]: What is the user input? Is it a greeting? Is it a question. Analyze and break down into task(s) that need to be addressed.
[Step 2]: If it is a career advice question, provide some guidance with your own knowledge. Be supportive at all times.
[Step 3]: Answer the tasks that are broken down to the best of your ability with your given role as possible. If it is a "what can you do" question, reply what you can do in a natural manner in Singlish. If it is a greeting, just greet back politely.
[Step 4]: Output the result.

[When asked with course related questions]
[Step 1]: Analyze if there is any background provided by the users or if there is any constraints.
[Step 2]: Analyze the question being asked are task provided to you.
[Step 3]: Using the provided context, take a look at the course_content and course_title. You are to search for courses that are related to the user query/task.
[Step 4]: Filter out information with the constraints extracted from step 1.
[Step 5]: Compare the remaining courses that you have. You are to carefully look at the course_content that best answers the user query.
[Step 6]: Obtain information of the chosen course(s) from Step 5. These information include the course_title, full_fees, duration, url and your rationale for selecting the course(s) in step 5.
[Step 7]: Output the result with the required information from step 6 in natural language Singlish when possible. Ensure your tone is friendly to the user. Most importantly, ensure that the information extracted from step 6 is from the context provided.
[Step 8]: End with factors of consideration on choosing the course for a 40 year old by considering background provided if any.

{context}
"question":{question}
"chat_history":{chat_history}
"""

# Define PromptTemplate
prompt = PromptTemplate(
    input_variables=["context","question","chat_history"],
    template=prompt_template,
)

# Initialize ConversationBufferMemory
memory = ConversationBufferMemory(
    memory_key="chat_history",
    input_key="question",
    return_messages=True
)

# Initialize ConversationalRetrievalChain
qa_with_source = ConversationalRetrievalChain.from_llm(
   llm=llm, retriever=retriever, memory=memory,
   return_source_documents=False,
   combine_docs_chain_kwargs={'prompt': prompt}
)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Define route for processing messages
@app.route('/', methods=['POST'])
def process_message():
    message = request.get_json().get('message')
    print(message)
    retrieved = qa_with_source({"question":message, "chat_history":memory.chat_memory})
    result = retrieved.get('answer')
    return jsonify(result)

# Run the app
app.run(use_reloader = False, debug = True)