## 🔧 Prisma Setup & Commands

Follow these steps to set up Prisma in your project and manage your database schema efficiently.

---

### 📦 Install Dependencies

```bash
npm install prisma --save-dev         # Prisma CLI for development
npm install @prisma/client            # Prisma Client for queries
```

```bash
npx prisma init                       # Create schema, env, config
```

```bash
npx prisma generate                   # Generate Prisma client code
```

```bash
npx prisma migrate dev                # Create & apply dev migration
npx prisma migrate reset              # Reset DB and reapply migrations
```

```bash
npx prisma db push                    # Sync DB without migrations
```

```bash
npx prisma studio                     # Browse data in web UI
```

```bash
npx prisma reset                      # Drop and recreate the database
```

```bash
npx prisma validate                   # Check for schema errors
```

```bash
npx prisma introspect                 # Generate schema from existing DB
```

---

### Generate random hash for token

```bash
openssl rand -hex 32
```
