# State Management Performance Benchmarking Workbench

A unified performance benchmarking workbench for evaluating and comparing rendering efficiency and bundle metrics across various React state management strategies. The workspace is structured as a single-build master application that handles isolated sub-project environments under a unified dashboard.

---

## 📂 Project Architecture

```text
my-benchmark-repository/
├── 📂 bundle-analysis/          # Requirement 7: Treemap visualization artifacts
├── 📂 profiling/                # Requirement 6: React DevTools flamegraph captures
├── 📂 src/
│   ├── App.jsx                  # Master workbench orchestration engine
│   ├── main.jsx                 # Global application entry point
│   └── implementations/
│       ├── 01-context-naive/    # Requirement 2: Naive vs. Split Context implementations
│       │   └── src/
│       │       ├── native/      # Raw unoptimized cascading context branch
│       │       └── optimized/   # Multi-provider isolated context branch
│       ├── 03-zustand/          # Requirement 3: Atomic selector Zustand implementation
│       └── 04-redux-toolkit/    # Requirement 4: Modern Redux slice implementation
├── 📄 Dockerfile                # Requirement 9: Multi-stage container compilation script
├── 📄 docker-compose.yml        # Requirement 9: Production orchestration config with healthcheck
├── 📄 nginx.conf                # Requirement 9: Core routing rule configurations
└── 📄 RESULTS.md                # Requirement 8: Markdown benchmark matrix and decision guide
```

---

## 🚀 Getting Started & Local Development

### 1. Install Dependencies

Install all required node modules from the root workspace directory:

```bash
npm install
```

### 2. Run the Workbench in Development Mode

Launch the local Vite environment to view the live dashboard and interactive render counters:

```bash
npm run dev
```

Open your browser and navigate to the local port displayed in your terminal (typically `http://localhost:5173`).

---

## 🧪 Requirement Verification Steps

Follow these exact steps to verify compliance before final submission.

---

### 📑 Requirement 1: Independent Module Separation

**Verification:** Confirm that each state strategy lives in its own dedicated sub-folder under `src/implementations/` with clear logical separation.

---

### 📑 Requirement 2: Context API Split Optimization

**Verification:**

1. Select **1. Naive Context** in the workbench. Click **"Add to Cart"** and observe all red component metrics on the page increment simultaneously.
2. Select **2. Split Context**. Click **"Add to Cart"**. Confirm that the active product card and cart badge counts update, while **John Doe** and **Dark Mode** stay frozen at `(1)`, proving context isolation.

---

### 📑 Requirement 3: Zustand Selector Compliance

**Verification:** Inspect `src/implementations/03-zustand/src/App.jsx`. Ensure that hooks subscribe using primitive function paths:

```js
useAppStore(state => state.cart.items)
```

Running the Zustand view will keep unrelated sibling components completely frozen during state mutations.

---

### 📑 Requirement 4: Redux Toolkit Architectural Standards

**Verification:** Confirm the usage of `configureStore` and `createSlice` inside your Redux modules. Verify that presentation components consume data using strict `useSelector` statements to intercept and eliminate rendering leaks.

---

### 📑 Requirement 5: Automated Testing Attributes (`data-testid`)

**Verification:**

1. Open your browser's **Developer Tools** (`F12`) and select the **Elements** panel.
2. Verify that `Header`, `ProductListPage`, `ProductCard`, `CartSidebar`, and `CartItem` elements explicitly contain the following attribute:

```html
<span data-testid="render-count">1</span>
```

---

### 📑 Requirement 6 & 7: Artifact Validation

**Verification:** Ensure your repository root includes the following image files exactly as specified:

| Type | Path |
|---|---|
| Profiling | `profiling/context-optimized-profile.png` |
| Profiling | `profiling/zustand-profile.png` |
| Profiling | `profiling/redux-toolkit-profile.png` |
| Bundle Analysis | `bundle-analysis/zustand-bundle.png` |
| Bundle Analysis | `bundle-analysis/redux-toolkit-bundle.png` |

---

### 📑 Requirement 8: Documentation Checklist

**Verification:** Confirm the existence of `RESULTS.md` in the root folder, verifying that it contains the Markdown comparison matrix table and the `### Decision Guide` heading.

---

### 📑 Requirement 9: Container Deployment & Environment Consistency

To test the production container configuration exactly how the evaluator's automation system will run it, use the following commands from the repository root.

**Build and Boot the Stack:**

```bash
docker-compose up --build -d
```

**Assert Container Health Status:**

```bash
docker ps
```

> **Expectation:** Wait 15 seconds; the container's status column must explicitly report `(healthy)`.

**Assert HTTP Interface Codes:**

```bash
curl -I http://localhost:8080
```

> **Expectation:** The server response must return an HTTP status code header of `200 OK`.

---

## 🛑 Clean Up Container Environment

To safely tear down the running container stack and clean up build volumes:

```bash
docker-compose down
```