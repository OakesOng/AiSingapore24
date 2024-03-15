"""
Run this .py script to generate the embeddings.
Embeddings should be generated at the same level as this script with the name "openAI_index"
app.py will read the embeddings using FAISS.load_local("openAI_index", embeddings, allow_dangerous_deserialization=True)
"""
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings

splitter = RecursiveCharacterTextSplitter(
    chunk_size=2048,
    chunk_overlap=0
)
chunked_data = splitter.split_documents(data)

embeddings = OpenAIEmbeddings()

# load chunked data into the FAISS index
db_openAI = FAISS.from_documents(chunked_data,
                          embeddings)

db_openAI.save_local("openAI_index")
