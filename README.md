# Software Engineering II — Travel Management

Academic group project for **Software Engineering II** at UNIOESTE.

## Sprint 0: Preparation and examples

Sprint 0 is dedicated to preparing the collaborative environment and demonstrating the tools and practices that will support the project. The Product Owner will define the product requirements during Sprint 1.

For that reason, the documents and application in this repository are **examples for preparation**. They illustrate a simple travel-related flow and the intended technical architecture, but they are not the final specification of the Travel Management System.

| Sprint 0 deliverable | Current purpose |
|---|---|
| GitHub repository | Single private workspace for group code, documentation, and contribution history. |
| Vision document | Example of a vision-document structure, to be refined after Product Owner elicitation. |
| Use case | Example of a travel-related use case, also subject to revision after elicitation. |
| Architecture example | Small application demonstrating the planned development environment and layers. |
| Kanban | Single Jira board used to track work, responsibilities, and Sprint 0 progress. |

## Intended architecture example

The Sprint 0 application will demonstrate the collaboration between a React frontend, a Java backend, and Docker. PostgreSQL may be included as the persistence layer when the group validates this with the Product Owner and the instructor.

The example is intentionally limited. Its role is to demonstrate an environment that the group can understand, run locally, and evolve after the real requirements are known.

## Planned repository structure

```text
.
├── docs/
│   └── sprint-0/
├── example-app/
│   ├── frontend/
│   └── backend/
├── README.md
└── .gitignore
```

Folders will be added only when they contain reviewed material. No generated dependencies, credentials, environment files, or internal company material may be committed.

## Collaboration

The repository is private and is the group’s single source of truth. Each member works through short, descriptive commits and keeps the Jira board updated with the actual state of their work.

The Jira project link and the group roster will be added after the new workspace is created and members are invited.
