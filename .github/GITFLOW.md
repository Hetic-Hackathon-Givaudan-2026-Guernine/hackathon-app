# GitFlow Workflow

This project follows a simplified GitFlow workflow optimized for a 2-week hackathon sprint.

## Branch Strategy

| Branch      | Purpose                         | Created from            | Merged to            |
| ----------- | ------------------------------- | ----------------------- | -------------------- |
| `main`      | Demonstrable state (deployable) | `develop` or `hotfix/*` | N/A                  |
| `develop`   | Integration branch (default)    | Feature branches        | `main`               |
| `feature/*` | Individual tasks (1-2 days max) | `develop`               | `develop` (via PR)   |
| `hotfix/*`  | Urgent fixes to `main`          | `main`                  | `main` and `develop` |

## Getting Started

### Create a Feature Branch

```bash
git switch develop
git pull
git switch -c feature/your-feature-name
```

### Push and Create a Pull Request

```bash
git add .
git commit -m "Descriptive message"
git push -u origin feature/your-feature-name
```

GitHub will display a link to create a pull request. Click it or use the GitHub UI.

### Merge to Develop

1. At least 1 team member reviews and approves
2. Squash and merge (1 feature = 1 commit on `develop`)
3. Delete the feature branch

### Prepare for Demo/Release

```bash
git switch develop
git pull
git switch main
git pull
git merge develop --no-ff
git push
```

## Branch Protection Rules

The following rules are enforced on `main` and `develop`:

- ✅ Require pull request before merging (no direct pushes)
- ✅ Require 1 approval from team member
- ✅ Dismiss stale approvals when new commits are pushed
- ✅ Block force pushes (history cannot be rewritten)
- ✅ Prevent deletion of branches

Even administrators must go through pull requests.

## Code Owners

The following files require approval from a tech-lead before merging:

- `/.devcontainer/` - Development environment
- `/.github/` - Repository configuration
- `/compose.yaml` - Docker composition
- `/eslint.config.mjs` - Linting configuration
- `/package.json` - Dependencies

Adding dependencies is a team decision—always go through a PR.

## Testing Before Merge

All PRs must include:

- ✅ Testing within the dev container
- ✅ Understanding and review of AI-generated code
- ✅ Clear explanation of "What and Why?"
- ✅ Clear testing instructions for reviewers

## Verification

To verify branch protection is working:

```bash
git switch develop
git commit --allow-empty -m "Test"
git push
# Expected: error: GH013: Repository rule violations found
# Message: Changes must be made through a pull request

git reset HEAD~1  # Undo the test commit
```

## Common Commands

```bash
# Start new feature
git switch -c feature/feature-name

# Update feature with latest from develop
git fetch origin
git rebase origin/develop

# Clean up local branches
git branch -d feature/completed-feature

# List branches
git branch -a
```

## When to Use Each Branch Type

- **feature/** - New functionality, improvements, bug fixes (most common)
- **hotfix/** - Critical production issues requiring immediate fix
- **main** - Only for releases and stable, demonstrable features
- **develop** - Integration point; always working state

---

For more details, see [CONTRIBUTING.md](./CONTRIBUTING.md)
