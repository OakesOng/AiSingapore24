# National AI Student Challenge 2024 - LearnAI

## Old Bird: Your Personalized Course Navigator
## Project Overview
**Old Bird**, a conversational chatbot, revolutionizes SkillsFuture exploration. Using large language model (LLMs), it empowers lifelong learning for all Singaporeans, regardless of their starting points. Explore its impact and features as it propels Singapore toward an advanced economy and an inclusive society. Notably, the recent $4,000 top-up in SkillsFuture Credit for Singaporeans aged 40 and above further amplifies Old Bird’s mission, recommending the most suitable options based on individual circumstances, goals, and aspirations. 

## Problem Statement
The SkillFuture portal is a treasure trove of learning opportunities, but its sheer volume can overwhelm users. Navigating through countless courses to find the perfect fit based on individual circumstances, goals, and aspirations is a daunting task. Enter Old Bird—your personalized course companion.

## Key Features
1. **Conversational Interface** <br>
✔️ Old Bird engages users in natural language conversations. No more rigid search queries or checkboxes.
<br> &emsp;&nbsp; Simply chat with
 him, express your needs, and receive tailored recommendations.<br>
✔️ Old Bird’s supportive personality and empathetic approach create a user-friendly experience.

3. **Powered by Retrieved Augmented Generation (RAG) Technology** <br> 
✔️ Old Bird understands context, nuances, and user preferences. It retrieves relevant courses, considering factors
<br> &emsp;&nbsp; like career stage, interests, and time availability.<br>
✔️ Old Bird automatically provides direct course links to MySkillsFuture Portal for users’ convenience.

5. **Personalized Recommendations**<br>
✔️ Old Bird doesn’t stop at generic suggestions. It crafts bespoke course recommendations based on your
 <br> &emsp;&nbsp;  unique profile. Whether you’re a fresh graduate, a mid-career switcher, or an aspiring entrepreneur, Old Bird
 <br> &emsp;&nbsp;  has you covered.

## Running Locally 💻

### Prerequisites
- Python 3.8 or higher
- Git

### Installation
Clone the repository :

`https://github.com/OakesOng/AiSingapore24`


Create a virtual environment :
```bash
python -m venv .venv
.\.venv\Scripts\activate
```
Install the required dependencies in the virtual environment :

`pip install -r requirements.txt`

Enter your OpenAI API Key into a .env file:
<img width="900" alt=".env file" src="https://github.com/OakesOng/AiSingapore24/blob/main/env.png">


Launch the chat service locally :

```bash
streamlit run app.py
```

#### That's it! The service is now up and running locally. 🤗

## Example ScreenShot
<img width="1470" alt="Screenshot 2023-12-09 at 1 19 28 AM" src="https://github.com/devapraveenk/FAQ_Chatbot_using_LangChain_V1/assets/115524697/f499c8f5-9a0d-4b3d-8165-37e6d4da48e7">


## Note❗️❗️❗️
Make sure the CSV file have two columns only for better results 
### Example
<img width="1390" alt="Screenshot 2023-12-09 at 1 32 58 AM" src="https://github.com/devapraveenk/FAQ_Chatbot_using_LangChain_V1/assets/115524697/d4ae4ffc-0818-4263-a8cc-a502d102c859">
