# RARE Responsibility Matrix

> **Defining who does what in CC_GodMode orchestration**

---

## RARE Definitions

| Role | Symbol | Description |
|------|--------|-------------|
| **Responsible** | **R** | Does the work. The agent that executes the task and produces the output. |
| **Accountable** | **A** | Owns the outcome. Makes final decisions and ensures quality. Only ONE per activity. |
| **Recommends** | **Re** | Provides input and expertise. Consulted for recommendations but doesn't execute. |
| **Executes** | **E** | Follows instructions. Performs specific sub-tasks as directed by Responsible agent. |

### Key Principles

1. **One Accountable per Activity** - Always exactly one A per row
2. **Responsible Does the Work** - R produces the deliverable
3. **Recommends Advises** - Re provides expertise without execution
4. **Executes Follows** - E performs directed sub-tasks
5. **Orchestrator Coordinates** - Never executes, only orchestrates

---

## Agent Responsibility Matrix

### Core Development Activities

| Activity | Orchestrator | @architect | @api-guardian | @builder | @validator | @tester | @scribe | @github-manager |
|----------|--------------|------------|---------------|----------|------------|---------|---------|-----------------|
| **System Design** | A | R | Re | - | - | - | - | - |
| **API Design** | A | R | Re | - | - | - | - | - |
| **API Impact Analysis** | A | Re | R | - | - | - | - | - |
| **Consumer Discovery** | A | - | R | - | - | - | - | - |
| **Code Implementation** | A | Re | - | R | - | - | - | - |
| **Type Definitions** | A | Re | Re | R | - | - | - | - |
| **Unit Testing** | A | - | - | R | E | - | - | - |
| **Code Quality Check** | A | - | - | - | R | - | - | - |
| **Security Scan** | A | - | - | - | R | - | - | - |
| **E2E Testing** | A | - | - | - | - | R | - | - |
| **Visual Regression** | A | - | - | - | - | R | - | - |
| **Accessibility Audit** | A | - | - | - | - | R | - | - |
| **Performance Testing** | A | - | - | - | - | R | - | - |
| **Documentation** | A | Re | - | - | - | - | R | - |
| **CHANGELOG Update** | A | - | - | - | - | - | R | - |
| **VERSION Update** | A | - | - | - | - | - | R | - |
| **PR Creation** | A | - | - | - | - | - | - | R |
| **Issue Processing** | A | - | - | - | - | - | - | R |
| **Release Management** | A | - | - | - | - | - | Re | R |

### Legend

- **R** = Responsible (does the work)
- **A** = Accountable (owns outcome, makes decisions)
- **Re** = Recommends (provides expertise/input)
- **E** = Executes (performs sub-tasks as directed)
- **-** = Not involved

---

## Decision Type Assignments

### Architecture Decisions

| Decision Type | Primary Owner | Consulted | Informed |
|--------------|---------------|-----------|----------|
| Module structure | @architect | Orchestrator | @builder |
| API contracts | @architect | @api-guardian | @builder, @scribe |
| Technology choices | @architect | Orchestrator | All agents |
| Breaking changes | @architect | @api-guardian | All agents |
| Performance architecture | @architect | @tester | @builder |

### Implementation Decisions

| Decision Type | Primary Owner | Consulted | Informed |
|--------------|---------------|-----------|----------|
| Code patterns | @builder | @architect | @validator |
| Test strategy | @builder | @validator, @tester | - |
| Refactoring approach | @builder | @architect | @validator |
| Error handling | @builder | @architect | @validator |

### Quality Decisions

| Decision Type | Primary Owner | Consulted | Informed |
|--------------|---------------|-----------|----------|
| Code quality standards | @validator | @architect | @builder |
| Test coverage requirements | @validator | @tester | @builder |
| Security policies | @validator | Orchestrator | All agents |
| Accessibility standards | @tester | @architect | @builder |
| Performance thresholds | @tester | @architect | @builder |

### Documentation Decisions

| Decision Type | Primary Owner | Consulted | Informed |
|--------------|---------------|-----------|----------|
| Doc structure | @scribe | @architect | All agents |
| API documentation | @scribe | @api-guardian | @builder |
| CHANGELOG format | @scribe | Orchestrator | All agents |
| Version naming | @scribe | Orchestrator | All agents |

### Release Decisions

| Decision Type | Primary Owner | Consulted | Informed |
|--------------|---------------|-----------|----------|
| Release timing | @github-manager | Orchestrator | All agents |
| PR strategy | @github-manager | Orchestrator | @scribe |
| Issue triage | @github-manager | Orchestrator | Relevant agents |
| CI/CD configuration | @github-manager | @builder | All agents |

---

## Orchestrator Responsibilities

The Orchestrator (CLAUDE.md) has unique responsibilities that span all workflows:

### Coordination Responsibilities

| Responsibility | Description |
|----------------|-------------|
| **Workflow Selection** | Analyze user request, choose appropriate workflow |
| **Agent Sequencing** | Determine agent order based on dependencies |
| **Version Management** | Set target version before work starts |
| **Report Folder Creation** | Create `reports/vX.X.X/` for each workflow |
| **Gate Enforcement** | Ensure quality gates pass before proceeding |
| **Conflict Resolution** | Merge feedback when multiple agents have concerns |
| **Meta-Decision Application** | Apply override rules for special cases |

### Escalation Responsibilities

| Situation | Orchestrator Action |
|-----------|---------------------|
| Security concern detected | Escalate to @validator, halt workflow |
| Breaking API change | Route through @api-guardian (mandatory) |
| Both quality gates fail | Merge feedback, return to @builder |
| MCP health check fails | Apply graceful degradation or halt |
| Ambiguous user request | Request clarification before proceeding |

### Accountability Matrix

| Area | Orchestrator Role |
|------|-------------------|
| Workflow correctness | **Accountable** |
| Agent output quality | Monitors, agents are Responsible |
| Documentation completeness | Monitors, @scribe is Responsible |
| Version consistency | **Accountable** |
| Push permission | **Accountable** (must ask user) |

---

## Parallel Quality Gates Diagram

```
                          @builder completes
                                  |
                                  v
              +-------------------+-------------------+
              |                                       |
              v                                       v
    +------------------+                   +------------------+
    |    @validator    |                   |     @tester      |
    |------------------|                   |------------------|
    | R: Code Quality  |                   | R: UX Quality    |
    | - TypeScript     |                   | - E2E Tests      |
    | - Unit Tests     |                   | - Visual Match   |
    | - Security       |                   | - A11y           |
    | - Consumers      |                   | - Performance    |
    +------------------+                   +------------------+
              |                                       |
              v                                       v
    +------------------+                   +------------------+
    | APPROVED/BLOCKED |                   | APPROVED/BLOCKED |
    +------------------+                   +------------------+
              |                                       |
              +-------------------+-------------------+
                                  |
                                  v
                    +---------------------------+
                    |      SYNC POINT           |
                    | Orchestrator coordinates  |
                    +---------------------------+
                                  |
              +-------------------+-------------------+
              |                   |                   |
              v                   v                   v
     Both APPROVED        One BLOCKED         Both BLOCKED
              |                   |                   |
              v                   v                   v
         @scribe           @builder              @builder
                       (single concern)      (merged feedback)
```

### Decision Matrix Detail

| @validator Result | @tester Result | Orchestrator Action | Responsibility |
|-------------------|----------------|---------------------|----------------|
| APPROVED | APPROVED | Proceed to @scribe | @scribe: R, Orchestrator: A |
| APPROVED | BLOCKED | Return to @builder with tester feedback | @builder: R, @tester: Re |
| BLOCKED | APPROVED | Return to @builder with validator feedback | @builder: R, @validator: Re |
| BLOCKED | BLOCKED | Merge feedback, return to @builder | @builder: R, Both: Re |

---

## Workflow-Specific RARE Assignments

### Feature Workflow

```
User Request
     |
     v
@architect (R: Design, A: Orchestrator)
     |
     v
@builder (R: Implementation, A: Orchestrator)
     |
     +---> @validator (R: Code Quality) ----+
     |                                       |
     +---> @tester (R: UX Quality) ---------+
                                             |
                                             v
                                    @scribe (R: Documentation)
```

### API Change Workflow

```
User Request
     |
     v
@architect (R: API Design, A: Orchestrator)
     |
     v
@api-guardian (R: Impact Analysis, A: Orchestrator)  <-- MANDATORY
     |
     v
@builder (R: Implementation, A: Orchestrator)
     |
     +---> @validator (R: Code Quality + Consumers) --+
     |                                                 |
     +---> @tester (R: UX Quality) -------------------+
                                                       |
                                                       v
                                              @scribe (R: Documentation)
```

### Bug Fix Workflow

```
User Request
     |
     v
@builder (R: Fix Implementation, A: Orchestrator)
     |
     +---> @validator (R: Regression Check) --+
     |                                         |
     +---> @tester (R: Fix Verification) -----+
                                               |
                                               v
                                           (Complete)
```

---

## Updating This Matrix

When to update:
- New agent added
- Agent responsibilities change
- New workflow introduced
- Decision type ownership changes

Update process:
1. Propose changes via @architect
2. Update this document
3. Update CLAUDE.md if workflow affected
4. Create ADR entry in DECISIONS.md

---

*Document Version: 1.0.0 (v5.8.0)*
