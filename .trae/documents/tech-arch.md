## 1. 架构设计

```mermaid
graph TB
    subgraph "前端层"
        A["React 18 + TypeScript"]
        B["React Router DOM 路由"]
        C["Tailwind CSS 样式"]
        D["Zustand 状态管理"]
        E["Lucide React 图标"]
    end
    subgraph "数据层"
        F["Mock 数据（localStorage 持久化）"]
    end
    A --> B
    A --> C
    A --> D
    D --> F
    A --> E
```

## 2. 技术描述

- **前端框架**：React@18 + TypeScript + Vite
- **初始化工具**：vite-init（react-ts 模板）
- **路由管理**：react-router-dom
- **状态管理**：zustand
- **样式方案**：Tailwind CSS 3
- **图标库**：lucide-react
- **数据持久化**：localStorage + Mock 数据
- **后端**：无（纯前端演示，数据存储在浏览器本地）

## 3. 路由定义

| 路由 | 用途 |
|-----|------|
| `/` | 书籍广场页（首页） |
| `/book/:id` | 书籍详情页 |
| `/publish` | 发布书籍页 |

## 4. 数据模型

### 4.1 数据模型定义

```mermaid
erDiagram
    BOOK {
        string id PK
        string title
        string isbn
        number price
        string condition
        string description
        string coverImage
        string sellerMessage
        string contact
        string contactType
        string createdAt
    }
```

### 4.2 TypeScript 类型定义

```typescript
interface Book {
  id: string;
  title: string;
  isbn: string;
  price: number;
  condition: '全新' | '九成新' | '八成新' | '七成新' | '六成新及以下';
  description: string;
  coverImage: string;
  sellerMessage: string;
  contact: string;
  contactType: 'QQ' | '微信' | '电话';
  createdAt: string;
}

interface BookStore {
  books: Book[];
  searchKeyword: string;
  addBook: (book: Omit<Book, 'id' | 'createdAt'>) => void;
  getBookById: (id: string) => Book | undefined;
  setSearchKeyword: (keyword: string) => void;
  filteredBooks: Book[];
}
```
