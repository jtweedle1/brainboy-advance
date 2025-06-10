# Brainboy Advance

Brainboy Advance is a retro, text-based learning RPG that generates custom, interactive learning paths based on any topic a user wants to explore. Styled after a classic Game Boy game, it transforms education into a pixelated adventure with XP, quests, and hints from the "oracle". This project was inspired by my desire to learn in creative, gamified ways.

## Prospective Features

- Username-based signup/login with email and password
- AI-generated questlines based on user prompts
- Text-based RPG rooms with story, tasks, and rewards
- Multiple task types: multiple-choice, fill-in-the-blank, text inputs
- Ask The Oracle: get LLM-powered help when you’re stuck
- XP and leveling system to gamify progress
- User progress tracking and path saving
- Game Boy-inspired UI with pixel fonts and 4-color palette

## Tech Stack

### Frontend
- **React + Vite** – Because it's fast, easy, and modern
- **Tailwind CSS** – Pixelated UI from utility functions
- **Framer Motion** – Page/element transitions (like level-up FX)
- **Howler.js** – Retro sound effects (stretch)

### Backend & Auth
- **Supabase** – Auth (email/password), database, row-level security
- **Supabase Edge Functions** – Securely handles OpenAI requests

### AI
- **OpenAI API** – Questline generation and Oracle hinting

## How It Works

1. User signs up with a username, email, and password.
2. On login, they provide their username and password.
3. User enters a prompt like:
   > “I want to learn Python basics.”
4. App sends this prompt to OpenAI via a Supabase function, which returns a questline:
   ```json
   [
     {
       "title": "The Variable Vault",
       "scenario": "You find glowing orbs labeled x = 5 and y = 'hello'...",
       "task_type": "multiple_choice",
       "prompt": "Which are valid Python assignments?",
       "options": ["x = 5", "5 = x", "print = 'hi'", "y = 'hello'"],
       "answer": [0, 3],
       "xp": 50
     }
   ]
   ```
5. Users complete each room in sequence to progress.
6. Correct answers award XP and unlock the next room.
7. If stuck, users can **Ask the Oracle**, which sends the task to GPT for an explanation.
8. Progress, XP, and paths are saved in Supabase per user.
