![Preview](assets/banner2crop.png)

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Open Source Only](https://img.shields.io/badge/Open%20Source-100%25-brightgreen)]()
[![Maintenance](https://img.shields.io/badge/Maintained-Active-success)]()
[![Open Science](https://img.shields.io/badge/Open%20Science-Compliant-green)]()
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.18681868.svg)](https://doi.org/10.5281/zenodo.18681868)


This directory represents an evidence synthesis ecosystem mapped in the associated [systematic mapping study](https://osf.io/preprints/metaarxiv/7uskw_v1). In addition to purpose-built evidence synthesis platforms, this directory includes general-purpose computational libraries and infrastructure utilities used by developers to build and automate custom evidence synthesis workflows.

---

##  Overview

This resource is intended for:
 
* Systematic review researchers and students
* Meta-analysis practitioners
* Medical, public health, and environmental researchers
* Librarians and information specialists
* Methodologists and evidence synthesis teams
* Open science advocates
* Research software developers and data scientists 
 
The directory includes **290** verified open-source, non-proprietary tools and software packages available **up to early 2026**, covering all stages of the evidence synthesis pipeline.

---

## ❓ What is Evidence Synthesis?

Evidence synthesis is the systematic process of identifying, evaluating, and integrating all available evidence relevant to a research question to inform scientific conclusions, policy, and practice.

Core components include:

* Systematic searching 
* Screening and study selection
* Critical appraisal
* Data extraction
* Risk of Bias assessment
* Quantitative or qualitative synthesis

The goal is to produce **transparent, reproducible, and generalizable findings**.

---

## 📖 Scope of the Directory

The directory covers the full workflow:

* Search strategy development
* Citation chasing and retrieval
* Reference management and deduplication
* AI-assisted screening and prioritization 
* Data extraction and PDF processing
* Risk of Bias assessment and visualization
* Statistical analysis and meta-analysis 
* Evidence mapping and bibliometrics
* Automation, scripting, and machine learning
* Qualitative synthesis tools


---


## 🌍 Why This Matters (Impact)

Evidence synthesis underpins evidence-based medicine, public health, environmental science, and policy decision-making. However, the current software ecosystem presents several challenges:

* Many widely used tools are **proprietary or closed-source**
* Existing directories often mix software with checklists, guidance documents, or non-software resources
* **Source code availability and licensing are unclear or inconsistent**
* Limited transparency restricts reproducibility and independent verification
* Researchers and developers struggle to identify reusable open implementations

This project addresses these gaps by providing:

* A **strict open-source-only directory**
* Verification of public repositories and licenses
* A **software-focused resource** (no mixed content)
* A discovery platform for **reusable research software**
* Support for **Open Science and FAIR principles**
* A foundation for developing interoperable and transparent evidence synthesis tools

In contrast to existing resources such as the *Systematic Review Toolbox (SR Toolbox)*, which includes proprietary and mixed-content entries and has limited transparency regarding source code and updates, this repository is designed specifically to support **reproducibility, transparency, and research software reuse**.


---


## 🔓 Directory Policy (Strict Inclusion Criteria)

Only tools meeting **all** criteria are included:

### 1. Open Source License

Released under a recognized license (MIT, GPL, Apache, etc.)

### 2. Public Code Repository

Source code must be publicly available (GitHub, GitLab, Bitbucket, SourceForge)

### 3. Non-Proprietary

* No closed-source components
* No mandatory commercial dependencies
* No institutional license requirements

### 4. Reusable & Extensible ♻️

Documentation must allow reuse, modification, and community development.

### 5. Research-Relevant

Relevant to evidence synthesis, systematic reviews, meta-analysis, or closely related workflows (including general-purpose libraries used for ES automation).

**Excluded examples:**
EndNote, Covidence, DistillerSR, NVivo, Rayyan, Stata, SAS, and similar proprietary or freemium tools.

Software or tools whose source code is hosted exclusively on university or institutional websites are excluded due to concerns regarding limited accessibility, long-term stability, and the lack of sustained public availability.

---

###  External API Dependency Policy

Some open-source tools interact with external databases, platforms, or APIs (e.g., literature databases or screening systems). These tools are eligible for inclusion if the **software itself is fully open source, has a public code repository, and can be reused or extended**.

Tools that rely on external APIs are acceptable if:

* The software uses an **OSI-approved open-source license**.
* The **full source code is publicly available** (e.g., GitHub, GitLab).
* The tool’s **core functionality is transparent and reusable**.
* The external service is used **only for data access or integration**, not hidden proprietary logic.

Such tools are documented in the directory as **open-source integrations with external research infrastructure**.


---

## 🧩 Why Open Source?

This project prioritizes open-source tools to ensure:

* **Transparency** – inspect underlying algorithms
* **Reproducibility** – avoid black-box systems
* **Sustainability** – independence from commercial vendors
* **Innovation** – fork, modify, and build upon tools 🚀
* **Equity** – global access without paywalls

---

##  Technical Design Philosophy

The website is intentionally implemented using **HTML**.

This ensures:

* No framework or dependency lock-in
* Long-term stability and preservation
* Easy editing using any text editor
* Contributions from users with **little or no coding experience**

This design prioritizes accessibility, sustainability, and long-term community maintenance.

---

## ✨ Novelty and Rationale

Existing directories such as the **Systematic Review Toolbox (SR Toolbox)** have several limitations:

* Inclusion of proprietary and commercial tools
* Mixing of software with checklists and guidance documents
* Source code availability often unclear
* Licensing not systematically verified
* Limited update transparency
* Underlying platform source code not publicly available

Initially, the author attempted to update newly identified tools within existing platforms. However, the absence of publicly accessible source code limited transparency, extensibility, and community contribution.

### What makes this project different?

* Strict **open-source-only policy**
* Verified public repositories and licenses
* Software-only focus
* Pure HTML for easy maintenance
* Designed to support **research software discovery and reuse**
* Enables developers to inspect, extend, and build upon existing implementations

This makes the project uniquely aligned with **Open Science and research software sustainability principles**.

---

## 🛠️ For Research Software Developers

This repository helps developers:
 
* Discover fully open implementations
* Inspect real-world evidence synthesis codebases
* Reuse and extend existing tools (e.g., NLP libraries, PDF parsers, ML frameworks)
* Develop interoperable and transparent research software aligned with Open Science principles

---

## ✨  Interface

![Interface1](screenshots/1.png)


![Interface2](screenshots/2.png)


![Interface3](screenshots/3.png)

---

## ⭐ Contributions

This directory aims to be a comprehensive community resource.

[![Contributors](https://contrib.rocks/image?repo=evidencesynthesis-tools/evidencesynthesis-tools.github.io)](https://github.com/evidencesynthesis-tools/evidencesynthesis-tools.github.io/graphs/contributors)

### Submit a tool via:

* Pull Request (preferred) [evidencesynthesis-tools.github.io/pulls](https://github.com/evidencesynthesis-tools/evidencesynthesis-tools.github.io/pulls)
* GitHub Issue [evidencesynthesis-tools.github.io/issues](https://github.com/evidencesynthesis-tools/evidencesynthesis-tools.github.io/issues)
* GitHub Discussions [evidencesynthesis-tools/discussions](https://github.com/orgs/evidencesynthesis-tools/discussions)
* Email to the maintainer [V.S.](mailto:pteroisvolitans12@gmail.com)

### Requirements

* Open-source license
* Public repository
* No closed-source components
* No paid or institutional restrictions
* Relevant to evidence synthesis
* Adequate documentation

**Not accepted**

* Free but closed-source tools
* Freemium software
* Commercial or license-restricted platforms


---

## Acknowledgements

This project was conducted independently by the author.

Artificial intelligence tools were used to support aspects of interface refinement and presentation. Specifically, **GLM-4.5V-Flash (open access)** was utilized to improve layout structure and enhance visual clarity. All conceptual development, inclusion criteria, verification of repositories and licenses, tool selection, curation decisions, and overall project design were performed **manually** solely by the author. *Please check out for more info:* [https://doi.org/10.5281/zenodo.18692063](https://doi.org/10.5281/zenodo.18692063), [evidencesynthesis-tools/backwork](https://github.com/evidencesynthesis-tools/backwork), [https://doi.org/10.31222/osf.io/7uskw_v1](https://doi.org/10.31222/osf.io/7uskw_v1).

The initial systematic search for eligible tools and software was conducted in **October 2025**, followed by continued independent searches and verification to ensure coverage of tools available up to **February 2026**.

The author welcomes future contributors and collaborators to support the long-term maintenance and development of this directory. In the absence of external contributions, the author intends to perform an updated search for newly eligible tools **at least once annually** to maintain accuracy, completeness, and relevance.

---

## ⭐ Citation

If you use this directory or related tools, please cite:

> Sahu, V. (2026). *Evidence Synthesis Tools: A curated directory of strictly open-source software / tools for Evidence Synthesis.* (Version 4.0). Zenodo.
[https://doi.org/10.5281/zenodo.18681868](https://doi.org/10.5281/zenodo.18681868) 

*Individual tools retain their original citations.*

---

##  License

<a href="https://opensource.org/licenses/Apache-2.0">
  <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Apache_Feather_Logo.svg" alt="Apache 2.0 License" height="120">
</a>

© 2026 Vihaan Sahu - Open Source

---


![Preview2](assets/banner1.png)

*Built for the research community to advance open, transparent, and reproducible evidence synthesis 🌐*
