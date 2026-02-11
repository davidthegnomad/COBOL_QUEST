# 📜 COBOL Quest: The Silicon Sanctum

Welcome, Technomancer. You are about to embark on a journey through the **Ancient Mainframe**, a realm where code is cast like magic and logic is the ultimate weapon.

**COBOL Quest** is a gamified, RPG-style learning platform designed to teach the sacred syntax of COBOL (Common Business-Oriented Language) through an immersive, Dungeons & Dragons-inspired experience.

---

## 🏛️ The Experience

- **The Grimoire**: A professional-grade IDE (powered by Monaco) where you transcribe your spells.
- **The Mainframe Map**: An SVG-based circuit board visualization of your journey through the four divisions.
- **Technomancy Stats**: Visualize your progress with animated bars for **Logic**, **Memory**, and **Legacy**.
- **The Elder Technomancer**: A built-in mentor that provides flavorful, immersive feedback for your ritual fizzles (syntax errors).

### 🌌 The Core Pillars of High Technomancy
To ascend to the rank of **Eternal Architect**, you must master the five pillars:
1. **Integrity**: Mastering Commit and Rollback.
2. **Concurrency**: Commanding Enqueue and Dequeue.
3. **Error Handling**: Probing the SQLCODE or CICS conditions.
4. **Modularity**: Weaving sub-routines and Linkage sections.
5. **Geometry**: Adhering to the strict Area A/B alignment of the ancients.

---

## 🛠️ Tech Stack

- **Core**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database**: [Prisma](https://www.prisma.io/) with SQLite
- **Editor**: [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### 1. Clone the Realm
```bash
git clone https://github.com/your-username/cobol-quest.git
cd cobol-quest
```

### 2. Prepare the Essence
```bash
npm install
```

### 3. Scribe the Schema
Initialize the local SQLite database and seed initial quest data:
```bash
npx prisma db push
npx ts-node --compiler-options='{"module":"commonjs"}' scripts/seedQuests.ts
```

### 4. Ignite the Mainframe
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to begin your ritual.

---

## 🛡️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*"Adjust your ink, Adept. The Mainframe is patient, but the Elder Code is absolute."*
