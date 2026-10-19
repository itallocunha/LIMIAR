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

- The system shell lives in src/system; src/games/registry.ts supplies typed content packages and src/investigation renders them without case-specific imports, so adding a case changes only its package and registry entry.
- Each game package owns its manifest, copy, scoped theme, content and separate solution; keep narrative and translated labels outside investigation components to preserve reusable modules.
- Identification is a fictional local agent name, not account authentication; persist only on this device as required by the static prototype.
- Store shared preferences under limiar:settings and per-case progress under limiar:game:<id>:progress with guarded storage access, so clearing cases preserves identity and preferences.
