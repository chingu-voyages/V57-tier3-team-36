// openprs-helpers.ts                                                           

export type Repo = {                                                            
  name: string;             
  pulls_url: string;  
};                                                                               

                   
export function pullsListUrlFromTemplate(template: string) {  
  return template.replace('{/number}', '') + '?state=open';  
}                                                                      


export async function getOpenPrCountFromGitHub(repo: Repo): Promise<number> {    

  const base = pullsListUrlFromTemplate(repo.pulls_url);                        

  const first = await fetch(base, {                    
    headers: { Accept: 'application/vnd.github+json' }, 
  });                                                                      

  if (!first.ok) {  
    console.warn(   
      `[OpenPRs] GitHub fetch failed for ${repo.name}: ${first.status} ${first.statusText}` 
    );         
    return 0;  
  }           
  
  const page1 = (await first.json()) as unknown;  
  const arr1 = Array.isArray(page1) ? page1 : []; 
  let total = arr1.length;                        
  

  const link = first.headers.get('link') ?? '';  
  const lastMatch = link.match(/[?&]page=(\d+)>;\s*rel="last"/);  
  if (!lastMatch) return total;                                  

  const lastPage = Number(lastMatch[1]); 
  

  for (let pageNum = 2; pageNum <= lastPage; pageNum++) { 
    const res = await fetch(`${base}&page=${pageNum}`, {  
      headers: { Accept: 'application/vnd.github+json' }, 
    });                                                    
    
    if (!res.ok) {    
      console.warn(   
         `[OpenPRs] Page ${pageNum} fetch failed for ${repo.name}: ${res.status} ${res.statusText}`
      );        
      continue; 
    }           

    const page = (await res.json()) as unknown;  
    const arr = Array.isArray(page) ? page : []; 
    total += arr.length;                         
  }                                        

  return total;  
}                


export async function totalOpenPrs( 
  repos: Repo[],                    
  repoName?: string                 
): Promise<number> {                

  const scoped = repoName                                                         
    ? repos.filter(repo => repo.name.toLowerCase() === repoName.toLowerCase())  
    : repos;                                                                      

  const counts = await Promise.all(scoped.map(r => getOpenPrCountFromGitHub(r))); 
  return counts.reduce((sum, n) => sum + (Number.isFinite(n) ? n : 0), 0);        
}                                                                            
