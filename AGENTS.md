<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- The system shell lives in src/system and the preserved legacy case stays isolated in src/game until the staged registry migration, so system changes cannot overwrite the demo.
- Identification is a fictional local agent name, not account authentication; persist only on this device as required by the static prototype.
- Store shared terminal preferences under limiar:settings and future per-case progress under limiar:game: so clearing cases preserves identity and preferences.
