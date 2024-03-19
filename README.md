# National AI Student Challenge 2024 - LearnAI

## Old Bird: Your Personalized Course Navigator
## Project Overview
**Old Bird**, a conversational chatbot, revolutionizes SkillsFuture exploration. Using large language model (LLMs), it empowers lifelong learning for all Singaporeans, regardless of their starting points. Explore its impact and features as it propels Singapore toward an advanced economy and an inclusive society. Notably, the recent $4,000 top-up in SkillsFuture Credit for Singaporeans aged 40 and above further amplifies Old Bird’s mission, recommending the most suitable options based on individual circumstances, goals, and aspirations. 

## Problem Statement
The SkillFuture portal is a treasure trove of learning opportunities, but its sheer volume can overwhelm users. Navigating through countless courses to find the perfect fit based on individual circumstances, goals, and aspirations is a daunting task. Enter Old Bird—your personalized course companion.

## Short Demo
![Demo](https://github.com/OakesOng/AiSingapore24/blob/main/Demo.gif)

## Video
[![Watch the video](https://github.com/OakesOng/AiSingapore24/blob/main/misc/Old%20Bird.png)](https://drive.google.com/file/d/1nNIqmzlKo7vBO9z4Q_hnPeflI6Qnnbl3/view)

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
- Python 3.12.2 or higher
- Node.js 20.11.1
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
<img width="900" height = "500" alt=".env file" src="https://github.com/OakesOng/AiSingapore24/blob/main/env.png">


Launch a terminal for frontend:

```bash
cd ai-singapore-frontend/
npm install
npm run dev
```

Launch another terminal for backend
```bash
cd ai-singapore-backend/
python app.py
```

#### That's it! The service is now up and running locally. 🤗

## Software Architecture
<img width="900" height = "600" alt="Software Architecture" src="https://github.com/OakesOng/AiSingapore24/blob/main/Software%20Achitechure.drawio.png">

## Performance
Our evaluation framework assesses the model across four binary metrics, utilizing a dataset of 30 test cases, is quantified as follows, with scores normalized to a 100-point scale:

- **Relevance**: 77% - Alignment of the model’s responses with user queries.
- **Accuracy**: 83% - Correctness of the information provided by the model.
- **Rationale**: 77% - Reasonableness of the model’s answers.
- **Satisfaction**: 53% - Overall user satisfaction with the model’s answers.

Data for our justification could be found in `misc/App Test Data.xlsx`

NOTE: Optimized with GPT-3.5-turbo for cost-efficiency and over 3000 courses sets the above result. Upgrades to GPT-4-turbo and dataset expansion promise marked performance gains.
