![Preview](assets/banner2crop.png)

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Open Source Only](https://img.shields.io/badge/Open%20Source-100%25-brightgreen)]()
[![Maintenance](https://img.shields.io/badge/Maintained-Active-success)]()
[![Open Science](https://img.shields.io/badge/Open%20Science-Compliant-green)]()
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.18681868.svg)](https://doi.org/10.5281/zenodo.18681868)

This directory represents an evidence synthesis ecosystem mapped in the associated [systematic mapping study](https://osf.io/preprints/metaarxiv/7uskw_v1). It covers purpose-built evidence synthesis platforms plus general-purpose computational libraries and infrastructure utilities used to build and automate custom evidence synthesis workflows. It includes **291** verified open-source, non-proprietary tools available **up to early 2026**, spanning all stages of the pipeline. It is intended for systematic review researchers and students, meta-analysis practitioners, medical/public health/environmental researchers, librarians, methodologists, open science advocates, and research software developers.

## ❓ What is Evidence Synthesis?

The systematic process of identifying, evaluating, and integrating all available evidence relevant to a research question to inform science, policy, and practice - aiming for **transparent, reproducible, and generalizable findings**. Core components: systematic searching, screening and study selection, critical appraisal, data extraction, risk of bias assessment, and quantitative or qualitative synthesis.

## 📖 Scope

The directory covers the full workflow: search strategy development, citation chasing and retrieval, reference management and deduplication, AI-assisted screening and prioritization, data extraction and PDF processing, risk of bias assessment and visualization, statistical analysis and meta-analysis, evidence mapping and bibliometrics, automation/scripting/machine learning, and qualitative synthesis.

## 🌍 Why This Matters

Evidence synthesis underpins evidence-based medicine, public health, environmental science, and policy - but many widely used tools are proprietary, existing directories mix software with checklists and guidance documents, licensing is often unclear, and limited transparency restricts reproducibility. This project fills those gaps with a **strictly open-source-only, software-focused directory** with verified repositories and licenses - a discovery platform for reusable research software supporting Open Science and FAIR principles, and a foundation for interoperable, transparent tools.

## 🔓 Inclusion Criteria (strict)

Only tools meeting **all** criteria are included:

1. **Open source license** - recognized license (MIT, GPL, Apache, etc.)
2. **Public code repository** - GitHub, GitLab, Bitbucket, or SourceForge
3. **Non-proprietary** - no closed-source components, mandatory commercial dependencies, or institutional license requirements
4. **Reusable & extensible** - documentation must allow reuse, modification, and community development
5. **Research-relevant** - related to evidence synthesis, systematic reviews, meta-analysis, or closely related workflows (including general-purpose libraries used for ES automation)

**Excluded:** EndNote, Covidence, DistillerSR, NVivo, Rayyan, Stata, SAS, and similar proprietary/freemium tools; also tools whose code is hosted exclusively on university/institutional websites (accessibility and long-term stability concerns).

**External API policy:** open-source tools that interact with external databases, platforms, or APIs (e.g., literature databases or screening systems) are eligible if the software itself is fully open source with a public repository, its core functionality is transparent and reusable, and the external service is used only for data access or integration - not hidden proprietary logic. These are documented as **open-source integrations with external research infrastructure**.

## 🧩 Why Open Source?

* **Transparency** - inspect underlying algorithms
* **Reproducibility** - avoid black-box systems
* **Sustainability** - independence from commercial vendors
* **Innovation** - fork, modify, and build 🚀
* **Equity** - global access without paywalls

## ✨ Novelty and Rationale

Unlike existing directories such as the **Systematic Review Toolbox (SR Toolbox)** - which includes proprietary and mixed content, has unclear source code availability and licensing, limited update transparency, and no public source for its own platform - this project applies a strict open-source-only policy with verified repositories and licenses, a software-only focus, and pure HTML for easy maintenance. The author initially tried to contribute new tools to existing platforms, but their closed source prevented transparency, extensibility, and community contribution. The result enables developers to inspect, extend, and build upon real-world evidence synthesis implementations - discovering fully open codebases and reusing components like NLP libraries, PDF parsers, and ML frameworks - aligned with Open Science and research software sustainability principles.

##  Technical Design

The website is intentionally plain **HTML**: no framework or dependency lock-in, long-term stability and preservation, easy editing in any text editor, and contributions possible with little or no coding experience.

## ✨ Interface

![Interface1](screenshots/1.png)

![Interface2](screenshots/2.png)

![Interface3](screenshots/3.png)

## ⭐ Contributions

[![Contributors](https://contrib.rocks/image?repo=evidencesynthesis-tools/evidencesynthesis-tools.github.io)](https://github.com/evidencesynthesis-tools/evidencesynthesis-tools.github.io/graphs/contributors)

Submit a tool via [Pull Request](https://github.com/evidencesynthesis-tools/evidencesynthesis-tools.github.io/pulls) (preferred), [Issue](https://github.com/evidencesynthesis-tools/evidencesynthesis-tools.github.io/issues), [Discussions](https://github.com/orgs/evidencesynthesis-tools/discussions), or [email the maintainer](mailto:pteroisvolitans12@gmail.com) (V.S.).

**Adding a tool (counts update automatically):** all tool numbers - section counts, the directory-wide total, and the header badge - are computed from the tool cards in `index.html` on page load. Copy an existing `.tool-card` block into the appropriate section (`#section-core`, `#section-methodologists`, or `#section-developers`); no manual counting required.

**Requirements:** open-source license, public repository, no closed-source components, no paid or institutional restrictions, relevance to evidence synthesis, adequate documentation. **Not accepted:** free but closed-source tools, freemium software, commercial or license-restricted platforms.

## Acknowledgements

This project was conducted independently by the author. AI tools supported interface refinement and presentation only - **GLM-4.5V-Flash (open access)** improved layout structure and visual clarity. All conceptual development, inclusion criteria, repository/license verification, tool selection, curation, and project design were performed **manually** by the author. More info: [https://doi.org/10.5281/zenodo.18692063](https://doi.org/10.5281/zenodo.18692063), [evidencesynthesis-tools/backwork](https://github.com/evidencesynthesis-tools/backwork), [https://doi.org/10.31222/osf.io/7uskw_v1](https://doi.org/10.31222/osf.io/7uskw_v1).

The initial systematic search was conducted in **October 2025**, with continued searches and verification covering tools available up to **February 2026**. The directory is complete up to early 2026, as defined by the associated mapping study; all searches and verification were performed manually by the author. Maintenance beyond 2026 is at the author's discretion - the directory will be expanded **only if there is a genuine, demonstrated need** (sustained community use, active contributors, or clear demand). Contributors and collaborators are welcome to support long-term maintenance.

## ⭐ Citation

> Sahu, V. (2026). *Evidence Synthesis Tools: A curated directory of strictly open-source software / tools for Evidence Synthesis.* (Version 4.0). Zenodo.
> [https://doi.org/10.5281/zenodo.18681868](https://doi.org/10.5281/zenodo.18681868)

*Individual tools retain their original citations.*

##  License

<a href="https://opensource.org/licenses/Apache-2.0">
  <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Apache_Feather_Logo.svg" alt="Apache 2.0 License" height="120">
</a>

© 2026 Vihaan Sahu - Open Source

---

![Preview2](assets/banner1.png)

*Built for the research community to advance open, transparent, and reproducible evidence synthesis 🌐*
