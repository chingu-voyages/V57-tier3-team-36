import { db } from '@/db';
import { user, repo, userRepo } from '@/db/schema';
import { v4 as uuidv4 } from 'uuid';
import { eq } from 'drizzle-orm';

// Popular public GitHub repos to seed
const PUBLIC_REPOS = [
  { id: '1863771', name: 'vercel/next.js' },
  { id: '10270250', name: 'facebook/react' },
  { id: '54346799', name: 'microsoft/vscode' },
];

async function seedRepos() {
  try {
    console.log('🌱 Starting repo seeding...');

    // 1. Get all users from the database
    const users = await db.select().from(user);
    console.log(`📊 Found ${users.length} users`);

    if (users.length === 0) {
      console.log('⚠️  No users found. Please create users first.');
      return;
    }

    // 2. Create repo records (if they don't exist)
    const createdRepos = [];
    for (const publicRepo of PUBLIC_REPOS) {
      const [newRepo] = await db
        .insert(repo)
        .values({
          id: uuidv4(),
          githubRepoId: publicRepo.id,
        })
        .onConflictDoNothing()
        .returning();

      if (newRepo) {
        console.log(`✅ Created repo: ${publicRepo.name}`);
        createdRepos.push(newRepo);
      } else {
        // Repo already exists, fetch it
        const [existingRepo] = await db
          .select()
          .from(repo)
          .where(eq(repo.githubRepoId, publicRepo.id));
        createdRepos.push(existingRepo);
        console.log(`ℹ️  Repo already exists: ${publicRepo.name}`);
      }
    }

    // 3. Create UserRepo records for each user
    let totalCreated = 0;
    for (const currentUser of users) {
      for (const currentRepo of createdRepos) {
        const [newUserRepo] = await db
          .insert(userRepo)
          .values({
            id: uuidv4(),
            userId: currentUser.id,
            repoId: currentRepo.id,
          })
          .onConflictDoNothing()
          .returning();

        if (newUserRepo) {
          totalCreated++;
        }
      }
      console.log(`✅ Linked 3 repos to user: ${currentUser.email}`);
    }

    console.log(`\n🎉 Seeding complete!`);
    console.log(`   - ${users.length} users`);
    console.log(`   - ${createdRepos.length} repos`);
    console.log(`   - ${totalCreated} user-repo relationships created`);
  } catch (error) {
    console.error('❌ Error seeding repos:', error);
    throw error;
  }
}

// Run the seed function
seedRepos()
  .then(() => {
    console.log('✅ Done!');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  });
