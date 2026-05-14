# 🔄 News Feature - Data Flow & Architecture

## Database Schema Diagram

```
                           USERS TABLE
        ┌──────────────────────────────────────┐
        │ id (PK)                              │
        │ name                                 │
        │ email                                │
        │ password                             │
        │ role                                 │
        │ title                                │
        │ location                             │
        │ avatar                               │
        │ profileCompletion                    │
        │ skills (JSON)                        │
        │ resumeUploaded                       │
        │ courseProgress (JSON)                │
        │ testResults (JSON)                   │
        │ createdAt                            │
        │ updatedAt                            │
        └───────────────┬──────────────────────┘
                        │ (1) authorId (FK)
                        │
                        │ (Many)
                        ▼
       ┌──────────────────────────────────────┐
       │       BLOG_POSTS TABLE               │
       ├──────────────────────────────────────┤
       │ id (PK)         INTEGER              │
       │ title           STRING               │
       │ content         LONGTEXT             │
       │ excerpt         TEXT                 │
       │ authorId (FK)   INTEGER              │
       │ category        STRING               │
       │ slug            STRING (UNIQUE)      │
       │ featured        BOOLEAN (default:F)  │
       │ views           INTEGER (default:0)  │
       │ createdAt       DATETIME             │
       │ updatedAt       DATETIME             │
       └──────────────────────────────────────┘
```

## API Request/Response Flow

### GET /api/blog/posts (Get All Posts)

```
CLIENT                              SERVER
   │                                  │
   ├─ GET /api/blog/posts?page=1 ──> │
   │  (include auth token)            │
   │                                  │
   │  Middleware Check Token          │
   │         │                        │
   │         ├─ Valid: Continue       │
   │         └─ Invalid: Return 401   │
   │                                  │
   │                   Query Database │
   │                   SELECT * FROM  │
   │                   blogposts      │
   │                   ORDER BY       │
   │                   createdAt DESC │
   │                   LIMIT 6        │
   │                                  │
   │ <─ {                             │
   │     posts: [...],                │
   │     pagination: {...}            │
   │   }                              │
   │                                  │
```

### POST /api/blog/posts (Create Post)

```
CLIENT                              SERVER
   │                                  │
   ├─ POST /api/blog/posts ────────> │
   │  {                               │
   │    title: "...",                 │
   │    content: "...",               │
   │    excerpt: "...",               │
   │    category: "..."               │
   │  }                               │
   │                                  │
   │  Middleware:                     │
   │  1. Verify JWT Token             │
   │  2. Extract user ID              │
   │  3. Pass to controller           │
   │                                  │
   │  Controller:                     │
   │  1. Validate input fields        │
   │  2. Generate slug                │
   │  3. Check slug uniqueness        │
   │  4. Create record in DB          │
   │  5. Return created post          │
   │                                  │
   │ <─ {                             │
   │     id: 1,                       │
   │     title: "...",                │
   │     author: {...},               │
   │     createdAt: "..."             │
   │   }                              │
   │                                  │
```

## Frontend Data Flow (React)

### NewsPage Component Lifecycle

```
MOUNT
  │
  ├─ useState(posts, isLoading, currentPage, ...)
  │
  ├─ useEffect(() => {
  │    fetchPosts()  ───────────────> API GET /blog/posts
  │  }, [currentPage, searchQuery])         │
  │                                        │
  │                              <────────┘
  │
  ├─ Render Components:
  │  ├─ Header (with Share button)
  │  ├─ SocialMediaModal (initial render)
  │  ├─ Search & Filter Controls
  │  │  ├─ onChange ──> setSearchQuery
  │  │  │              setCurrentPage(1)
  │  │  │              fetchPosts()
  │  │  │
  │  │  └─ Trigger Re-render
  │  │
  │  ├─ BlogPostCard[] (from posts state)
  │  │
  │  ├─ Pagination Controls
  │  │  ├─ onClick ──> setCurrentPage(page)
  │  │  │              fetchPosts()
  │  │  │
  │  │  └─ Trigger Re-render
  │  │
  │  └─ NewsletterForm
  │     └─ onSubmit ──> api.post(/blog/subscribe)
  │
  └─ Animations (Framer Motion)
     ├─ Initial: opacity 0, scale 0.95
     └─ Animated: opacity 1, scale 1

BlogSubmissionForm Modal:
  │
  ├─ Show on "Share Your Post" click
  │
  ├─ Form Inputs:
  │  ├─ title (onChange: setFormData)
  │  ├─ excerpt (onChange: setFormData)
  │  ├─ content (onChange: setFormData)
  │  └─ category (onChange: setFormData)
  │
  ├─ Validation:
  │  ├─ Character count limits
  │  ├─ Required fields check
  │  └─ Display error messages
  │
  ├─ onSubmit:
  │  ├─ Validate data
  │  ├─ POST /api/blog/posts
  │  ├─ Show success message
  │  ├─ Close modal
  │  └─ Refresh posts list
  │
  └─ onClose:
     └─ Close modal without saving
```

## Authentication Flow

```
LOGIN
  │
  ├─ User submits credentials
  │  └─ POST /api/auth/login
  │
  └─ Server returns JWT token
     └─ Client stores in localStorage

AUTHENTICATED REQUEST
  │
  ├─ GET/POST/PUT/DELETE request
  │  ├─ Read token from localStorage
  │  └─ Add to Authorization header: "Bearer {token}"
  │
  └─ Server Middleware:
     ├─ Extract token from header
     ├─ Verify signature with JWT_SECRET
     ├─ Decode token → Get user ID
     ├─ Attach user to request object
     └─ Continue to route handler

PROTECTED ROUTE (POST /api/blog/posts)
  │
  ├─ Middleware checks:
  │  ├─ Token exists? → 401 if not
  │  ├─ Token valid? → 401 if expired
  │  └─ User ID extracted? → Continue
  │
  └─ Controller receives req.user = { id: 123 }
     └─ Creates blog post with authorId: 123
```

## Search & Filter Logic

```
INPUT: Search Query & Category Filter
  │
  ├─ Debounce input (300ms)
  │
  ├─ Reset pagination to page 1
  │
  ├─ Build query parameters:
  │  └─ /api/blog/posts?page=1&limit=6&category=AI/ML
  │
  ├─ Fetch from backend
  │
  ├─ Backend filtering:
  │  ├─ WHERE category = 'AI/ML'
  │  └─ ORDER BY createdAt DESC
  │
  ├─ Return filtered posts
  │
  └─ Frontend client-side search:
     └─ Filter by title/excerpt for additional UX
```

## Blog Post Creation Sequence

```
SEQUENCE: Create Blog Post

1. USER CLICKS "Share Your Post"
   │
   └─> Show BlogSubmissionForm modal

2. USER FILLS FORM
   │
   └─> Form state updates with onChange

3. USER CLICKS "PUBLISH POST"
   │
   ├─> Frontend validates:
   │   ├─ title.length >= 10
   │   ├─ excerpt.length >= 20
   │   └─ content.length >= 100
   │
   ├─> Show error if invalid
   │
   └─> POST /api/blog/posts
       │
       ├─> Backend receives:
       │   {
       │     title: "...",
       │     content: "...",
       │     excerpt: "...",
       │     category: "..."
       │   }
       │
       ├─> Middleware validates JWT
       │
       ├─> Controller:
       │   ├─ Generate slug: title.toLowerCase()
       │   ├─ Check slug uniqueness
       │   ├─ INSERT INTO blogposts
       │   │  VALUES (..., slug, authorId=userId, ...)
       │   └─ Return created post
       │
       ├─> Frontend receives:
       │   {
       │     id: 1,
       │     title: "...",
       │     author: {...},
       │     createdAt: "..."
       │   }
       │
       ├─> Show success message
       │
       ├─> Close modal
       │
       ├─> Reset pagination to page 1
       │
       └─> Refresh posts list (refetch)

4. NEW POST APPEARS ON PAGE
   │
   └─> Featured at top (reverse chronological)
```

## View Count Tracking

```
USER VISITS POST
  │
  └─ GET /api/blog/posts/:id
     │
     ├─ Return post data
     │
     └─ Trigger: UPDATE blogposts
        SET views = views + 1
        WHERE id = :id

DISPLAY ON UI
  │
  └─ Show views count:
     <Eye icon> {post.views} views
```

## State Management

```
NewsPage Component State:
├─ posts: BlogPost[]           (fetched posts)
├─ isLoading: boolean          (loading indicator)
├─ currentPage: number         (pagination)
├─ totalPages: number          (pagination)
├─ showSubmissionForm: boolean (modal visibility)
├─ showSocialModal: boolean    (modal visibility)
├─ searchQuery: string         (search input)
└─ selectedCategory: string    (filter)

BlogSubmissionForm State:
├─ formData: {
│  ├─ title: string
│  ├─ excerpt: string
│  ├─ content: string
│  └─ category: string
│  }
├─ isSubmitting: boolean       (button state)
└─ error: string               (error message)

NewsletterForm State:
├─ email: string               (input value)
├─ isSubmitting: boolean       (button state)
├─ status: 'idle'|'success'|'error'
└─ message: string             (feedback message)
```

## Error Handling

```
API ERROR
  │
  ├─ Try-catch block in frontend
  │
  ├─ Check error.status:
  │  ├─ 400: Bad request
  │  │  └─ Display validation error
  │  ├─ 401: Unauthorized
  │  │  └─ Redirect to login
  │  ├─ 403: Forbidden
  │  │  └─ Show permission error
  │  ├─ 404: Not found
  │  │  └─ Show "Post deleted" message
  │  └─ 500: Server error
  │     └─ Show generic error message
  │
  └─ Log to console for debugging
```

## Caching Strategy

```
CURRENT: No caching (real-time)
├─ Posts always fetched fresh from DB
└─ View counts always current

FUTURE OPTIMIZATION:
├─ Cache featured posts (5 min TTL)
├─ Cache post list (1 min TTL)
├─ Invalidate on new post creation
└─ Use Redis for distributed cache
```

## Security Flow

```
CREATE POST REQUEST
  │
  ├─ Client: Attach JWT to Authorization header
  │
  ├─ Server Middleware (verifyToken):
  │  ├─ Extract token from header
  │  ├─ Verify signature: jwt.verify(token, JWT_SECRET)
  │  ├─ Catch verification errors → 401
  │  └─ Attach decoded user to req.user
  │
  ├─ Controller receives authenticated request
  │
  ├─ Validation:
  │  ├─ Check all required fields present
  │  ├─ Check field lengths
  │  └─ Check SQL injection/XSS attempts
  │
  ├─ INSERT INTO database with:
  │  ├─ authorId: req.user.id (from token)
  │  └─ Other validated data
  │
  └─ Return success response

EDIT POST REQUEST
  │
  ├─ Authenticate (same as above)
  │
  ├─ Fetch post by ID
  │
  ├─ Check: post.authorId === req.user.id
  │  └─ If not: 403 Forbidden
  │
  └─ UPDATE database
```

---

**Data Architecture v1.0**
