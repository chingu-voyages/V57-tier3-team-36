# MergeForce

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Overview

**MergeForce** is a web application that helps development teams track the status of open and closed GitHub Pull Requests (PRs) across their repositories.  
It retrieves data from the GitHub REST API to display PR details, reviewers, and activity history in a clean, interactive dashboard.  
Optionally, users can interact with an AI assistant (powered by Google Gemini) to learn how to use the app or understand its features.

## Features

- 🏠 **Home Page:** Describes the app purpose and usage.
- 🔓 **Open PRs:** Displays all open PRs for a selected GitHub repo.
- ✅ **Closed PRs:** Displays all closed or merged PRs.
- 🔍 **Filtering:** Filter PRs by username or other criteria.
- ⚠️ **Error Handling:** Clear, user-friendly validation messages.
- 📱 **Responsive UI:** Works across desktop, tablet, and mobile devices.

## Tech Stack

- **Frontend:** Next.js, React, TypeScript
- **Styling:** CSS Modules, TailwindCSS, DaisyUI
- **Linting** Prettier
- **Database:** PostgreSQL via Neon
- **Authentication:** GitHub OAuth (Better Auth)
- **Deployment:** Vercel

## Local Development Setup

### Prerequisites

- Node.js installed
- A [Neon](https://neon.tech/) account (free)

### Setup Steps

#### 1. Install dependencies

```bash
npm install
```

#### 2. Create your database

1. Go to [Neon](https://neon.tech/) and create a new project
2. Copy the connection string (looks like `postgresql://user:pass@host/db?sslmode=require`)

#### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add these values:

**Database:**

```env
DATABASE_URL=your_neon_connection_string_here
```

**Authentication (generate your own):**

```bash
# Generate a random secret for local development
openssl rand -base64 32
```

```env
BETTER_AUTH_SECRET=your_generated_secret_here
```

**GitHub OAuth (ask a teammate):**

```env
GITHUB_CLIENT_ID=ask_a_teammate_for_this_value
GITHUB_CLIENT_SECRET=ask_a_teammate_for_this_value
```

⚠️ **Important:** Never commit `.env.local` or share these secrets publicly

#### 4. Run database migrations

```bash
npm run db:migrate
```

#### 5. Start the app

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) - you're ready to code! 🚀

### Other Commands

| Command                                     | Purpose                                            |
| ------------------------------------------- | -------------------------------------------------- |
| `npm run build`                             | Build for production                               |
| `npm run start`                             | Run production build                               |
| `npm run lint`                              | Check code quality                                 |
| `npm run setup`                             | Generate mock service worker (if not auto-created) |
| `npm run db:generate && npm run db:migrate` | Run after making updates to the schema             |

### Authentication Notes

This app uses GitHub OAuth for authentication. The GitHub App has access to endpoints documented [here](https://docs.github.com/en/rest/authentication/endpoints-available-for-github-app-user-access-tokens).

### API Mocking

Enable or disable the mock service worker API mocks using the `ENABLE_API_MOCKING` environment variable in `.env.local`.

### Tests

1. Create a `.env.test` file (similar to `.env.local`)
2. Populate it with these variables. You will need to contact a team mate to obtain the values

```env
DATABASE_URL=your_test_database_url_here
GITHUB_CLIENT_ID=your_test_github_client_id_here
GITHUB_CLIENT_SECRET=your_test_github_client_secret_here
BETTER_AUTH_SECRET=your_test_better_auth_secret_here
```

3. Run the tests with:

```bash
npm run test
```

### Component Organization

**We organize components using folders without index.ts files** (one folder per component, no barrel exports).

```
/components
  /Button
    - Button.tsx
  /DataTable
    - DataTable.tsx
    - DataTableRow.tsx
```

Import components like: `import { Button } from '@/components/Button/Button'`

**Why this approach:**

- Clear component boundaries and ownership
- No extra boilerplate files
- Teammate preferences (voted 3-1-1 in favor of this option)

## How to Use

1. Visit the deployed app at [your-vercel-url-here].
2. Sign In using GitHub
3. Hit "Select Repository" at the top right to add what repository you want to search up.
4. From there you can find the repository's:
   - Open PRs
   - Average Reviews per PR
   - Average Time to First Review
5. Search for a certain PR from the search bar atop.

## Acceptance Criteria

- Users can select a GitHub repository and view both open and closed PRs.
- Each PR shows: number, title (linked to GitHub), author, reviewers, creation date, and last action.
- The UI displays clear error messages for invalid input.
- The interface is responsive and visually distinct.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Team Documents

You may find these helpful as you work together to organize your project.

- [Team Project Ideas](./docs/team_project_ideas.md)
- [Team Decision Log](./docs/team_decision_log.md)

Meeting Agenda templates (located in the `/docs` directory in this repo):

- Meeting - Voyage Kickoff --> ./docs/meeting-voyage_kickoff.docx
- Meeting - App Vision & Feature Planning --> ./docs/meeting-vision_and_feature_planning.docx
- Meeting - Sprint Retrospective, Review, and Planning --> ./docs/meeting-sprint_retrospective_review_and_planning.docx
- Meeting - Sprint Open Topic Session --> ./docs/meeting-sprint_open_topic_session.docx

## Team Members

- Sattyik Kundu: [Github](https://github.com/SattyikKundu)
- David Eastmond: [GitHub](https://github.com/davideastmond) / [LinkedIn](https://www.linkedin.com/in/david-eastmond-2783ab18a/)
- Vincent Bui: [Github](https://github.com/VincentBui0) / [LinkedIn](https://www.linkedin.com/in/vincent-bui0/)
- Peter Tasca: [Github](https://github.com/tascapeter514) / [LinkedIn](https://www.linkedin.com/in/peter-tasca/)
- Kelly Ripple: [GitHub](https://github.com/kripple) / [LinkedIn](https://www.linkedin.com/in/kellymripple) / [Portfolio](https://kellyripple.com/)
- Hyun Woo Kim: [GitHub](https://github.com/hynwkm) / [LinkedIn](https://www.linkedin.com/in/hyunwoo-kim/)
