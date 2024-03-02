# import modules
from llama_index.llms.ollama import Ollama
from pathlib import Path
import qdrant_client
from llama_index.core import StorageContext, VectorStoreIndex, ServiceContext, download_loader
from llama_index.vector_stores.qdrant import QdrantVectorStore

print("hello world")