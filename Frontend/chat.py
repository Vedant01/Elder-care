from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
from langchain.memory import CassandraChatMessageHistory, ConversationBufferMemory
from langchain.llms import OpenAI
from langchain import LLMChain, PromptTemplate
import json

cloud_config= {
  'secure_connect_bundle': 'secure-connect-elder-care.zip'
}

with open("elder-token.json") as f:
    secrets = json.load(f)

CLIENT_ID = secrets["clientId"]
CLIENT_SECRET = secrets["secret"]
ASTRA_DB_KEYSPACE = "default_keyspace"
OPENAI_API_KEY = "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"

auth_provider = PlainTextAuthProvider(CLIENT_ID, CLIENT_SECRET)
cluster = Cluster(cloud=cloud_config, auth_provider=auth_provider)
session = cluster.connect()

message_history = CassandraChatMessageHistory(
    session_id="anything",
    session=session,
    keyspace=ASTRA_DB_KEYSPACE,
    ttl_seconds=3600
)

message_history.clear()

cass_buff_memory = ConversationBufferMemory(
    memory_key="chat_history",
    chat_memory=message_history
)

template = """
You are now a helper for the elderly. A old person seeks to schedule their medicines and answer basic questions that they might have.
Your goal is to interact with them and treat them with respect and patience while answering any questions they may have.

Some actions to follow:
1) If they ask you to schedule something at a given time, reply with an appropriate message saying Reminder is Set.
2) Automatically translate what they are saying in their language, and reply back in their language. 
3) If they ask you to connect to an app and any similar action, tell the feature to do so will be out soon.
4) Save contact information of the people they mention to save.
5) Play word games, crack jokes and interact with them like a junior mate.

Here is the chat history, use this to understand what to say next: {chat_history}
dont use this but - Human: {human_input}
AI:"""

prompt = PromptTemplate(
    input_variables=["chat_history", "human_input"],
    template=template
)

llm = OpenAI(openai_api_key=OPENAI_API_KEY)
llm_chain = LLMChain(
    llm=llm,
    prompt=prompt,
    memory=cass_buff_memory
)

choice = "start"

while True:
    response = llm_chain.predict(human_input=choice)
    print(response.strip())

    if "The End." in response:
        break

    choice = input("Your reply: ")