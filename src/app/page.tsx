import { neon } from '@neondatabase/serverless'



export default async function Home() {

  async function create(formData: FormData) {
    "use server";
    if (!process.env.DEV_DATABASE_URL) throw new Error("Missing DB URL")
    const sql = neon(process.env.DEV_DATABASE_URL);
    await sql`CREATE TABLE IF NOT EXISTS comments (comment TEXT)`;
    const comment = formData.get("comment");
    await (sql.query as any)("INSERT INTO comments (comment) VALUES ($1)", [comment]);

    
  }
 
  return (
    <div >
      <main>
        <form action={create}>
          <input type="text" placeholder='write a comment' name='comment' />
          <button type='submit'>Submit</button>
        </form>
        
      
      </main>
      
    </div>
  );
}
