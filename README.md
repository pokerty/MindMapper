# MindMapper 🧠✨

MindMapper is a web application designed to help you organize your goals, manage tasks effectively using the Eisenhower Matrix, and practice mindfulness exercises. Stay focused, prioritize efficiently, and cultivate mental clarity.

![MindMapper Tasks Overview Demo](./assets/mindmapper-demo.png)
*(Replace the path above with the actual path or URL to your demo image)*

## Features

*   **Goal Management:** Define main goals with descriptions and tags.
*   **Task Prioritization:** Add tasks (steps) to each goal and assign them a priority (Urgent/Important).
*   **Tasks Overview (Eisenhower Matrix):** Visualize all your tasks categorized into four quadrants based on urgency and importance:
    *   Urgent & Important (Do Now)
    *   Not Urgent but Important (Schedule)
    *   Urgent but Not Important (Delegate)
    *   Not Urgent & Not Important (Delete)
*   **Mindfulness Exercises:** Access simple exercises (like Box Breathing) with timers to help you recenter.
*   **Dark Mode:** Toggle between light and dark themes for comfortable viewing.
*   **Persistence:** Uses Supabase for backend data storage and `localStorage` for client-side caching.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm (usually comes with Node.js)
*   A Supabase account and project (free tier available) - [supabase.com](https://supabase.com/)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Supabase:**
    *   Create a project on Supabase.
    *   In the Table Editor, create two tables:
        *   `goals` (Columns: `id` (uuid, pk), `title` (text), `description` (text), `status` (text), `tags` (text), `created_at` (timestamptz))
        *   `steps` (Columns: `id` (uuid, pk), `goal_id` (uuid, fk->goals.id), `title` (text), `status` (text), `priority` (text), `created_at` (timestamptz))
        *   *Note: Adapt column types/defaults as needed based on the final implementation.*
    *   Enable Row Level Security (RLS) for both tables and set up appropriate policies (start permissive for local dev if needed).

4.  **Configure Environment Variables:**
    *   Create a file named `.env` in the root of the project directory.
    *   Add your Supabase project URL and anon key:
        ```dotenv
        VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
        VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_PUBLIC_KEY
        ```
    *   Replace the placeholders with your actual Supabase credentials (found in Project Settings > API).

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application should now be running, typically at `http://localhost:5173`.

## Usage

*   Navigate between Goals, Tasks, Mindfulness, and Progress using the top navigation bar.
*   Add new goals using the '+' button on the Goals page.
*   Click on a goal to view its details and add/manage tasks (steps).
*   Assign priorities to tasks within the goal detail view.
*   View all tasks categorized by priority on the Tasks overview page.
*   Start mindfulness exercise timers from the Mindfulness page.
*   Use the sun/moon icon in the header to toggle dark mode.

## Deployment

This application is ready to be deployed on platforms like Vercel or Netlify.

1.  Push your code to a Git repository (GitHub, GitLab, Bitbucket).
2.  Import the repository into your chosen platform (Vercel/Netlify).
3.  Configure the build command (`npm run build`) and output directory (`dist`).
4.  **Crucially**, add the `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` environment variables in the deployment platform's settings.
5.  Deploy! 