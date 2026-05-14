# ⚡ News Feature - Quick Reference Card

## 🚀 Quick Start (5 Minutes)

```bash
# 1. Run database migration
cd server
npx prisma migrate dev --name add-blog-posts

# 2. Restart backend (in server directory)
npm run dev

# 3. Restart frontend (in root directory, new terminal)
npm run dev

# 4. Visit the news page
# http://localhost:5173/news
```

## 📍 Navigation Map

| Page | URL | Purpose |
|------|-----|---------|
| News Hub | `/news` | Browse all blog posts |
| Homepage | `/` | View featured blog posts |
| Dashboard | `/dashboard` | Manage your posts |

## 🎯 Feature Quick Links

| Feature | Location | Access |
|---------|----------|--------|
| Create Post | `/news` → "Share Your Post" | Logged-in users only |
| View Posts | `/news` | Everyone |
| Search Posts | `/news` → Search bar | Everyone |
| Filter Posts | `/news` → Category buttons | Everyone |
| Newsletter | `/news` → Newsletter section | Everyone |
| Social Media | `/news` → Modal | Everyone |

## 💻 Component Usage

### Import in Your App
```typescript
import { NewsPage } from './components/NewsPage';
import { BlogPostCard } from './components/BlogPostCard';
import { NewsletterForm } from './components/NewsletterForm';
```

### Add to Routes
```typescript
{ path: "news", Component: NewsPage }
```

## 🔌 API Quick Reference

### Fetch All Posts
```typescript
const response = await api.get('/blog/posts?page=1&limit=6');
// Returns: { posts: [...], pagination: {...} }
```

### Get Single Post
```typescript
const post = await api.get('/blog/posts/1');
```

### Create Post (Auth Required)
```typescript
const post = await api.post('/blog/posts', {
  title: 'My Post',
  excerpt: 'Brief summary',
  content: 'Full content...',
  category: 'AI/ML'
});
```

### Update Post (Auth Required)
```typescript
const post = await api.put('/blog/posts/1', {
  title: 'Updated Title',
  content: 'Updated content...'
});
```

### Delete Post (Auth Required)
```typescript
await api.delete('/blog/posts/1');
```

### Newsletter Signup
```typescript
const response = await api.post('/blog/subscribe', {
  email: 'user@example.com'
});
```

## 🎨 Color Reference

| Color | Tailwind | Use Case |
|-------|----------|----------|
| Primary | `from-primary to-accent` | Buttons, badges, links |
| Dark BG | `bg-[#030213]` | Main background |
| Card BG | `bg-[#0a0a1a]` | Card backgrounds |
| White/5 | `bg-white/5` | Subtle backgrounds |
| Border | `border-white/10` | Subtle borders |

## ⌨️ Keyboard Shortcuts (Future)

| Shortcut | Action |
|----------|--------|
| `/` | Search posts (future) |
| `n` | New post (future) |
| `?` | Help (future) |

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Posts not showing | Verify migration ran: `npx prisma migrate status` |
| 401 errors | Make sure you're logged in and token exists |
| Styles look broken | Clear cache: `Ctrl+Shift+Delete` |
| Forms won't submit | Check form validation (look at error message) |
| Database errors | Restart server and run migration again |

## 📋 Validation Rules

| Field | Min | Max | Required |
|-------|-----|-----|----------|
| Title | 10 | 100 | Yes |
| Excerpt | 20 | 200 | Yes |
| Content | 100 | 5000 | Yes |
| Email | - | 254 | Yes |

## 🔐 Authentication

### Check if User is Logged In
```typescript
const { isLoggedIn } = useApp();

if (isLoggedIn) {
  // Show create post button
}
```

### Get Current User
```typescript
const { user } = useApp();
console.log(user.id, user.name, user.email);
```

### Logout
```typescript
localStorage.removeItem('authToken');
window.location.reload();
```

## 📊 State Variables

```typescript
// In NewsPage
const [posts, setPosts] = useState<BlogPost[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [showSubmissionForm, setShowSubmissionForm] = useState(false);
const [searchQuery, setSearchQuery] = useState('');
const [selectedCategory, setSelectedCategory] = useState(null);
```

## 🔄 Common Operations

### Refresh Posts List
```typescript
const fetchPosts = async () => {
  const response = await api.get(`/blog/posts?page=${currentPage}&limit=6`);
  setPosts(response.posts);
  setTotalPages(response.pagination.pages);
};
```

### Submit New Post
```typescript
const handleSubmit = async (formData) => {
  await api.post('/blog/posts', formData);
  setShowSubmissionForm(false);
  fetchPosts(); // Refresh list
};
```

### Search and Filter
```typescript
// Filter posts by search query and category
const filteredPosts = posts.filter(post =>
  post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
  (!selectedCategory || post.category === selectedCategory)
);
```

## 📱 Responsive Breakpoints

```css
/* Mobile: < 768px (1 column) */
grid-cols-1

/* Tablet: 768px - 1024px (2 columns) */
md:grid-cols-2

/* Desktop: > 1024px (3 columns) */
lg:grid-cols-3
```

## 🎬 Animation Classes

```typescript
// Card entrance
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}

// Card hover
whileHover={{ y: -4 }}

// Button interaction
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
```

## 📚 File Locations

```
src/app/components/
  ├── NewsPage.tsx                 (Main page)
  ├── BlogPostCard.tsx             (Post display)
  ├── BlogSubmissionForm.tsx       (Create form)
  ├── SocialMediaModal.tsx         (Social invite)
  └── NewsletterForm.tsx           (Email signup)

server/routes/
  └── blog.js                      (API endpoints)

server/prisma/
  └── schema.prisma                (Database schema)
```

## 🔗 Related Documentation

| Document | Purpose |
|----------|---------|
| `NEWS_FEATURE_SETUP.md` | Detailed setup guide |
| `BLOG_FEATURE_SUMMARY.md` | Feature overview |
| `DESIGN_SYSTEM.md` | Component designs & colors |
| `DATA_FLOW.md` | Architecture & data flow |

## 🎓 Learning Path

1. Read: `NEWS_FEATURE_SETUP.md` - Understand the setup
2. Run: Database migration
3. Test: Create a blog post
4. Read: `DESIGN_SYSTEM.md` - Understand the design
5. Explore: Component files to understand code
6. Customize: Modify styles and functionality

## 💡 Pro Tips

- ✅ Clear browser cache if styles don't update
- ✅ Check browser console (F12) for JavaScript errors
- ✅ Check server logs for API errors
- ✅ Use Postman/Insomnia to test API endpoints
- ✅ Read Prisma docs for database modifications
- ✅ Check network tab (F12) to see API responses

## 🚀 Performance Tips

- Posts are paginated (6 per page) for better performance
- Category filtering reduces data transfer
- Search is client-side filtered (could be improved with server-side search)
- Consider adding caching for production
- Consider adding CDN for image serving

## 📞 Support Resources

- **Prisma Docs**: https://www.prisma.io/docs/
- **React Router**: https://reactrouter.com/
- **Tailwind CSS**: https://tailwindcss.com/
- **Framer Motion**: https://www.framer.com/motion/
- **Express.js**: https://expressjs.com/

---

**Print this card for quick reference! 🎯**
