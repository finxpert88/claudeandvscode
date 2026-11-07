# Putting ClaudeAndVSCode.com on GitHub

A step-by-step guide for saving this website to GitHub and keeping it updated.
Keep this file. You'll come back to Part 4 ("Everyday updates") the most.

---

## Contents

1. [The basics in 60 seconds](#1-the-basics-in-60-seconds)
2. [One-time setup on your computer](#2-one-time-setup-on-your-computer)
3. [First push: putting the site on GitHub](#3-first-push-putting-the-site-on-github)
4. [Everyday updates (the part you'll use most)](#4-everyday-updates-the-part-youll-use-most)
5. [Getting the site onto another computer](#5-getting-the-site-onto-another-computer)
6. [Doing it from inside VS Code (no typing)](#6-doing-it-from-inside-vs-code-no-typing)
7. [Optional: making the site live on the internet](#7-optional-making-the-site-live-on-the-internet)
8. [Troubleshooting](#8-troubleshooting)
9. [Cheat sheet](#9-cheat-sheet)

---

## 1. The basics in 60 seconds

| Word | What it means |
|---|---|
| **Git** | A program on your computer that takes "snapshots" of your project so you can always go back. |
| **GitHub** | A website that stores a copy of your Git project online: a backup you can share. |
| **Repository (repo)** | A project folder that Git is tracking. Your site folder is a repo, and so is its copy on GitHub. |
| **Commit** | One saved snapshot, with a short message saying what changed. |
| **Push** | Upload your new commits from your computer to GitHub. |
| **Pull** | Download new commits from GitHub to your computer. |
| **Branch** | A line of history. You'll mostly use one called `main`. |
| **Remote / origin** | The nickname Git uses for "the copy on GitHub". |

The everyday rhythm is: **edit files → commit → push**.

---

## 2. One-time setup on your computer

> ✅ **Already done on this computer** (checked 7 Nov 2026): Git and the GitHub CLI are installed, Git knows your
> name and email, and the GitHub CLI is signed in as **finxpert88**. Skip to [Part 3](#3-first-push-putting-the-site-on-github)
> unless you're setting up a new computer.

All commands below are typed into a terminal. In VS Code, open one with **Terminal → New Terminal** (or <kbd>Ctrl</kbd>+<kbd>`</kbd>).

### 2.1 Install Git

1. Download from **https://git-scm.com/download/win** and run the installer.
2. Accept the default options (just keep clicking **Next**).
3. Close and reopen VS Code, then check it worked:

   ```powershell
   git --version
   ```

   You should see something like `git version 2.x.x`.

### 2.2 Tell Git who you are

This name and email are stamped on every commit. Use the email address linked to your GitHub account.

```powershell
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
```

Check them with:

```powershell
git config --global user.name
git config --global user.email
```

> 💡 If you want to keep your personal email private, GitHub gives you a hidden one. Find it at
> **GitHub → Settings → Emails** (it looks like `12345+username@users.noreply.github.com`).

### 2.3 Install the GitHub CLI and sign in

The GitHub CLI (`gh`) handles signing in for you and can create repos without visiting the website.

1. Install it:

   ```powershell
   winget install --id GitHub.cli
   ```

2. Close and reopen VS Code, then sign in:

   ```powershell
   gh auth login
   ```

3. Answer the prompts like this:
   - **Where do you use GitHub?** → `GitHub.com`
   - **Preferred protocol?** → `HTTPS`
   - **Authenticate Git with your GitHub credentials?** → `Yes`
   - **How would you like to authenticate?** → `Login with a web browser`
4. It shows a one-time code. Press <kbd>Enter</kbd>, paste the code into the browser page that opens, and approve.
5. Check it worked:

   ```powershell
   gh auth status
   ```

   You should see `✓ Logged in to github.com account <your-username>`.

> ⚠️ **Signed in to the wrong account?** Run `gh auth logout`, then `gh auth login` again with the right one.

---

## 3. First push: putting the site on GitHub

You only do this part **once** per project.

### 3.1 Open the project folder

```powershell
cd C:\myFirstClaudeWebsite
```

### 3.2 Check what will (and won't) be uploaded

The project has a file called `.gitignore` that tells Git which files to **never** upload:

```
node_modules     ← installed packages (huge, and re-creatable with npm install)
dist             ← build output (re-creatable with npm run build)
.env             ← secrets / API keys
.tmp             ← temporary files
credentials.json, token.json  ← Google login files
```

> 🔒 **Never commit passwords or API keys.** Keep them in `.env`, which is ignored.

### 3.3 Turn the folder into a Git repo and make the first commit

> ✅ **Already done** for this project. Skip to 3.4. These commands are here for future projects.

```powershell
git init -b main
git add .
git commit -m "First version of ClaudeAndVSCode.com"
```

- `git init` starts tracking the folder.
- `git add .` picks up every file (except ignored ones). The `.` means "everything here".
- `git commit` saves the snapshot with your message.

### 3.4 Create the repo on GitHub and push

> ✅ **Already done** for this project. Your site lives at
> **https://github.com/finxpert88/claudeandvscode** (private). From now on, just use [Part 4](#4-everyday-updates-the-part-youll-use-most).

Choose **one** of these two ways.

#### Option A: GitHub CLI (fastest, one command)

```powershell
gh repo create claudeandvscode --private --source . --remote origin --push
```

- `claudeandvscode`: the repo's name on GitHub (change it if you like).
- `--private`: only you can see it. Use `--public` if you want anyone to see the code.
- `--source .`: use the current folder.
- `--push`: upload straight away.

Done! Open it in your browser with:

```powershell
gh repo view --web
```

#### Option B: GitHub website + two commands

1. Go to **https://github.com/new**.
2. **Repository name:** `claudeandvscode`
3. Choose **Private** or **Public**.
4. ⚠️ **Leave everything else unticked**: no README, no .gitignore, no licence. (The project already has files;
   adding these creates a conflict on the first push.)
5. Click **Create repository**.
6. GitHub shows a page of commands. Use these (replace `YOUR-USERNAME`):

   ```powershell
   git remote add origin https://github.com/YOUR-USERNAME/claudeandvscode.git
   git push -u origin main
   ```

   `-u` makes `main` remember GitHub, so next time you just type `git push`.

### 3.5 Check it worked

Refresh your repo page on GitHub. You should see your folders (`src`, `public`, …) and files such as
`package.json`. You should **not** see `node_modules`.

---

## 4. Everyday updates (the part you'll use most)

Every time you've changed the site and want to save it to GitHub:

```powershell
cd C:\myFirstClaudeWebsite
git status
git add .
git commit -m "Describe what you changed"
git push
```

| Step | What it does |
|---|---|
| `git status` | Shows what's changed. Red = not yet added, green = ready to commit. |
| `git add .` | Gets all changes ready for the snapshot. |
| `git commit -m "..."` | Saves the snapshot locally. |
| `git push` | Uploads it to GitHub. |

### Writing good commit messages

Short, present tense, saying *what* changed:

- ✅ `Add pricing section to home page`
- ✅ `Fix typo in setup guide`
- ✅ `Change background video to blue waves`
- ❌ `stuff`, `update`, `asdf`

### Useful extras

```powershell
git log --oneline        # list of past commits (press q to exit)
git diff                 # see exact line changes not yet added
git restore <file>       # throw away unsaved changes to a file (careful: can't be undone)
git pull                 # get changes made elsewhere (e.g. edited on github.com or another PC)
```

> 💡 **Edited a file directly on github.com?** Run `git pull` on your computer before making more changes,
> or your next `git push` will be rejected.

---

## 5. Getting the site onto another computer

1. Do [Part 2](#2-one-time-setup-on-your-computer) on the new computer (install Git, Node.js and the GitHub CLI, and sign in).
2. Download ("clone") the repo:

   ```powershell
   cd C:\
   gh repo clone YOUR-USERNAME/claudeandvscode
   cd claudeandvscode
   ```

3. Install the packages (because `node_modules` isn't on GitHub) and run the site:

   ```powershell
   npm install
   npm run dev
   ```

4. Open **http://localhost:5173**.

> Node.js is needed for `npm`. Install it with `winget install OpenJS.NodeJS.LTS` if it's missing.

---

## 6. Doing it from inside VS Code (no typing)

VS Code has Git built in, so you can do everyday updates with clicks:

1. Click the **Source Control** icon in the left sidebar (the branching-lines icon), or press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>G</kbd>.
2. Changed files are listed under **Changes**. Click a file to see what changed.
3. Hover over **Changes** and click **+** to stage everything (same as `git add .`).
4. Type a message in the box at the top (same as the `-m "..."` part).
5. Click **Commit**.
6. Click **Sync Changes** (or the ↑ arrow in the bottom-left status bar) to push.

> If VS Code asks *"Would you like to automatically stage all your changes and commit them directly?"*, choosing
> **Yes** is fine. It just skips step 3.

You can also just ask Claude in VS Code: *"commit and push my changes"*.

---

## 7. Optional: making the site live on the internet

GitHub **stores** your code. To let people **visit** the site, connect the repo to a hosting service. These are
free for small sites and redeploy automatically every time you `git push`:

| Service | Steps |
|---|---|
| **Vercel** (recommended) | Sign in at vercel.com with GitHub → **Add New Project** → pick `claudeandvscode` → **Deploy**. Vercel detects Vite automatically. |
| **Netlify** | Sign in at netlify.com with GitHub → **Add new site → Import from Git** → pick the repo. Build command `npm run build`, publish folder `dist`. |
| **Cloudflare Pages** | dash.cloudflare.com → **Workers & Pages → Create → Pages → Connect to Git**. Framework preset: **Vite**. |

**Using your own domain (claudeandvscode.com):** each service has a **Domains** setting. Add your domain there,
then copy the DNS records it shows into your domain registrar's DNS settings.

> ⚠️ **Page refresh shows 404 on /about or /contact?** That's because the site is a "single-page app". Vercel and
> Cloudflare usually handle this automatically. On Netlify, add a file `public/_redirects` containing
> `/*  /index.html  200`, then commit and push. Or ask Claude to set it up for your chosen host.

---

## 8. Troubleshooting

| Message / problem | What it means & how to fix |
|---|---|
| `git : The term 'git' is not recognized` | Git isn't installed, or VS Code was open during install. Install it (2.1), then **fully close and reopen VS Code**. |
| `npm : The term 'npm' is not recognized` | Same, but for Node.js. Install it, then reopen VS Code. |
| `Author identity unknown` | Do step 2.2 (set your name and email). |
| `fatal: not a git repository` | You're in the wrong folder. Run `cd C:\myFirstClaudeWebsite`. |
| `remote origin already exists` | The link to GitHub is already set. Check it with `git remote -v`. To change it: `git remote set-url origin https://github.com/YOUR-USERNAME/REPO.git` |
| `! [rejected] main -> main (fetch first)` or `Updates were rejected` | GitHub has commits you don't have (for example, you edited on the website, or ticked "Add README" when creating the repo). Run `git pull --rebase`, then `git push`. |
| `Permission denied` / `403` / `Authentication failed` | Not signed in, or signed in as someone else. Run `gh auth status`; if needed, `gh auth login` again. |
| `error: src refspec main does not match any` | You haven't made a commit yet. Do `git add .` then `git commit -m "First commit"` first. |
| Pushed `node_modules` by mistake | Make sure `.gitignore` contains `node_modules`, then run `git rm -r --cached node_modules`, commit, and push. |
| Committed a password or API key | **Change the password/key immediately** (deleting the commit isn't enough once it's pushed), then remove it from the code and move it into `.env`. |
| Stuck in a strange screen after `git log` or a commit | You're in a text viewer/editor. Press <kbd>q</kbd> to leave `git log`. In the Vim editor, type `:wq` and press <kbd>Enter</kbd>. |

---

## 9. Cheat sheet

```powershell
# --- Everyday ---
git status                       # what's changed?
git add .                        # stage everything
git commit -m "What I changed"   # snapshot
git push                         # upload to GitHub
git pull                         # download changes from GitHub

# --- Looking around ---
git log --oneline                # history (q to quit)
git diff                         # unstaged line-by-line changes
git remote -v                    # which GitHub repo am I linked to?
gh repo view --web               # open the repo in your browser

# --- Running the site ---
npm install                      # after cloning, or when packages change
npm run dev                      # start local preview at http://localhost:5173
npm run build                    # production build into /dist
```

---

*Last updated: 7 November 2026*
