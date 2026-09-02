  // ================= GITHUB STATS + VISITORS =================
  // only other.html has these elements — guard so this doesn't throw
  // (and silently no-op the rest of this file) on every other page
  (function githubStatsWidget(){
  const GITHUB_USERNAME = 'saboorshawkat';
  const profileLink = document.getElementById('ghProfileLink');
  if(!profileLink) return;
  profileLink.href = 'https://github.com/' + GITHUB_USERNAME;
  (async function loadGithubStats(){
    const ghCard = document.getElementById('ghCard');
    try{
      const res = await fetch('https://api.github.com/users/' + GITHUB_USERNAME);
      if(!res.ok) throw new Error('not found');
      const data = await res.json();
      ghCard.innerHTML = `
        <div class="gh-stats-grid">
          <div class="gh-stat"><div class="gh-stat-num">${data.public_repos ?? '—'}</div><div class="gh-stat-label">repos</div></div>
          <div class="gh-stat"><div class="gh-stat-num">${data.followers ?? '—'}</div><div class="gh-stat-label">followers</div></div>
          <div class="gh-stat"><div class="gh-stat-num">${data.following ?? '—'}</div><div class="gh-stat-label">following</div></div>
        </div>`;
    }catch(e){
      ghCard.innerHTML = `<div class="gh-row">could not reach github.com/${GITHUB_USERNAME} — set GITHUB_USERNAME in the script to your real handle.</div>`;
    }
  })();

  (async function loadVisitorCount(){
    const el = document.getElementById('visitorCount');
    try{
      const res = await fetch('https://api.countapi.xyz/hit/schoolofsec-portfolio/visits');
      const data = await res.json();
      el.textContent = `visitor #${data.value} on this page`;
    }catch(e){
      el.textContent = 'visitor counter unavailable right now';
    }
  })();
  })(); // end githubStatsWidget
