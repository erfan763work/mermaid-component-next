const simulateDelay = () =>
  new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200));

export const fetchFlowcharts = async () => {
  await simulateDelay();
  return [
    {
      id: 'flow-1',
      title: 'Yes/No Decision',
      description: 'Basic decision flowchart',
      code: `flowchart TD
    Start --> Decision{Yes or No?}
    Decision -->|Yes| DoSomething
    Decision -->|No| DoSomethingElse`,
    },
    {
      id: 'flow-2',
      title: 'Linear Process',
      description: 'Simple step-by-step flow',
      code: `flowchart LR
    Step1 --> Step2 --> Step3 --> End`,
    },
    {
      id: 'flow-3',
      title: 'Basic Loop',
      description: 'Flowchart with a repeating step',
      code: `flowchart TD
    Start --> Process
    Process --> Condition{Complete?}
    Condition -->|No| Process
    Condition -->|Yes| End`,
    },
  ];
};

export const fetchSequenceDiagrams = async () => {
  await simulateDelay();
  return [
    {
      id: 'seq-1',
      title: 'User Authentication',
      description: 'Sequence diagram for user authentication',
      code: `sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    
    User->>Frontend: Enters credentials
    Frontend->>Backend: POST /login
    Backend->>Database: Query user
    Database-->>Backend: User data
    Backend-->>Frontend: JWT token
    Frontend-->>User: Show dashboard`,
    },
    {
      id: 'seq-2',
      title: 'API Request Flow',
      description: 'Sequence diagram showing API request flow',
      code: `sequenceDiagram
    participant Client
    participant API
    participant AuthService
    participant Database
    
    Client->>API: GET /protected-resource
    API->>AuthService: Validate token
    AuthService-->>API: Token valid
    API->>Database: Query data
    Database-->>API: Return data
    API-->>Client: Return response`,
    },
  ];
};

export const fetchClassDiagrams = async () => {
  await simulateDelay();
  return [
    {
      id: 'class-1',
      title: 'E-commerce System',
      description: 'Basic class diagram for e-commerce',
      code: `classDiagram
    class User {
      +String id
      +String name
      +String email
      +String password
      +List~Order~ orders
      +login()
      +logout()
    }
    
    class Product {
      +String id
      +String name
      +Float price
      +Int stock
    }
    
    class Order {
      +String id
      +User user
      +List~Product~ items
      +Float total
      +Date orderDate
      +processOrder()
    }
    
    User "1" *-- "0..*" Order
    Order "1" *-- "1..*" Product`,
    },
    {
      id: 'class-2',
      title: 'Social Media',
      description: 'Class diagram for social media platform',
      code: `classDiagram
    class User {
      +String username
      +String email
      +String passwordHash
      +List~Post~ posts
      +List~User~ friends
      +createPost()
      +addFriend()
    }
    
    class Post {
      +String content
      +User author
      +List~Comment~ comments
      +List~User~ likes
      +addComment()
      +addLike()
    }
    
    class Comment {
      +String content
      +User author
    }
    
    User "1" *-- "0..*" Post
    Post "1" *-- "0..*" Comment`,
    },
  ];
};

export const fetchGanttCharts = async () => {
  await simulateDelay();
  return [
    {
      id: 'gantt-1',
      title: 'Project Timeline',
      description: 'Basic project timeline with milestones',
      code: `gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    section Phase 1
    Research       :done,    des1, 2023-01-01, 2023-01-14
    Requirements   :active,  des2, 2023-01-15, 2023-01-28
    section Phase 2
    Design         :         des3, after des2, 20d
    Implementation :         des4, after des3, 45d
    section Phase 3
    Testing        :         des5, after des4, 30d
    Deployment     :         des6, after des5, 15d`,
    },
    {
      id: 'gantt-2',
      title: 'Sprint Planning',
      description: 'Two-week sprint planning',
      code: `gantt
    title Sprint 23
    dateFormat  YYYY-MM-DD
    axisFormat %d %b
    
    section Backend
    API Development     :active, api1, 2023-05-01, 7d
    Database Migration  :         api2, after api1, 3d
    
    section Frontend
    UI Components      :active, ui1, 2023-05-01, 5d
    Integration        :         ui2, after ui1, 5d
    
    section Testing
    Unit Tests         :         test1, after api1, 5d
    E2E Tests          :         test2, after ui2, 3d`,
    },
  ];
};

export const fetchPieCharts = async () => {
  await simulateDelay();
  return [
    {
      id: 'pie-1',
      title: 'Market Share',
      description: 'Market share distribution',
      code: `pie title Market Share
    "Apple" : 45
    "Samsung" : 30
    "Huawei" : 15
    "Other" : 10`,
    },
    {
      id: 'pie-2',
      title: 'Expense Breakdown',
      description: 'Monthly expense distribution',
      code: `pie title Monthly Expenses
    "Rent" : 35
    "Food" : 25
    "Transport" : 15
    "Entertainment" : 15
    "Savings" : 10`,
    },
  ];
};

export const fetchEntityRelationshipDiagrams = async () => {
  await simulateDelay();
  return [
    {
      id: 'er-1',
      title: 'Library System',
      description: 'ERD for library management system',
      code: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    CUSTOMER {
      string name
      string email
      string address
    }
    ORDER ||--|{ LINE-ITEM : contains
    ORDER {
      int orderNumber
      date orderDate
    }
    LINE-ITEM {
      int quantity
      decimal price
    }
    PRODUCT ||--o{ LINE-ITEM : includes
    PRODUCT {
      string sku
      string name
      decimal price
    }`,
    },
    {
      id: 'er-2',
      title: 'University Database',
      description: 'ERD for university database',
      code: `erDiagram
    STUDENT ||--o{ ENROLLMENT : enrolls
    STUDENT {
      string studentId
      string name
      date dob
    }
    ENROLLMENT ||--|{ COURSE : includes
    ENROLLMENT {
      string enrollmentId
      date enrollmentDate
    }
    COURSE {
      string courseId
      string title
      int credits
    }
    PROFESSOR ||--o{ COURSE : teaches
    PROFESSOR {
      string professorId
      string name
      string department
    }`,
    },
  ];
};

export const fetchStateDiagrams = async () => {
  await simulateDelay();
  return [
    {
      id: 'state-1',
      title: 'Traffic Light',
      description: 'State diagram for traffic light',
      code: `stateDiagram-v2
    [*] --> Red
    Red --> Green: Timer expires
    Green --> Yellow: Timer expires
    Yellow --> Red: Timer expires`,
    },
    {
      id: 'state-2',
      title: 'Online Order',
      description: 'State diagram for online order process',
      code: `stateDiagram-v2
    [*] --> Draft
    Draft --> Submitted: submit()
    Submitted --> Approved: approve()
    Submitted --> Rejected: reject()
    Approved --> Fulfilled: fulfill()
    Rejected --> [*]`,
    },
  ];
};

export const fetchMindmaps = async () => {
  await simulateDelay();
  return [
    {
      id: 'mind-1',
      title: 'Project Planning',
      description: 'Mindmap for project planning',
      code: `mindmap
  root((Project Plan))
    Research
      Market Analysis
      Competitor Study
    Development
      Frontend
        UI Components
        State Management
      Backend
        API Design
        Database
    Testing
      Unit Tests
      Integration Tests
      E2E Tests
    Deployment
      CI/CD Setup
      Cloud Infrastructure`,
    },
    {
      id: 'mind-2',
      title: 'Learning Path',
      description: 'Mindmap for web development learning path',
      code: `mindmap
  root((Web Development))
    Frontend
      HTML
      CSS
        Flexbox
        Grid
      JavaScript
        ES6+
        Frameworks
          React
          Vue
    Backend
      Node.js
      Databases
        SQL
        NoSQL
    DevOps
      Git
      Docker
      AWS`,
    },
  ];
};

export const fetchGitGraphs = async () => {
  await simulateDelay();
  return [
    {
      id: 'git-1',
      title: 'Feature Branch Workflow',
      description: 'Git graph showing feature branch workflow',
      code: `gitGraph
    commit
    branch feature/login
    checkout feature/login
    commit
    commit
    checkout main
    commit
    checkout feature/login
    commit
    checkout main
    merge feature/login
    branch feature/cart
    checkout feature/cart
    commit
    commit`,
    },
    {
      id: 'git-2',
      title: 'Release Process',
      description: 'Git graph showing release process',
      code: `gitGraph
    commit
    branch develop
    checkout develop
    commit
    commit
    branch release/v1.0
    checkout release/v1.0
    commit
    checkout main
    merge release/v1.0
    checkout develop
    merge release/v1.0`,
    },
  ];
};

export const fetchTimelines = async () => {
  await simulateDelay();
  return [
    {
      id: 'timeline-1',
      title: 'Web Development History',
      description: 'Timeline of web development milestones',
      code: `timeline
    title Web Development History
    1991 : HTTP 0.9
    1994 : Netscape Navigator
    1995 : JavaScript
    1996 : CSS
    2004 : Firefox
    2005 : AJAX
    2006 : jQuery
    2008 : Chrome
    2009 : Node.js
    2010 : AngularJS
    2013 : React
    2014 : Vue.js
    2015 : ES6`,
    },
    {
      id: 'timeline-2',
      title: 'Tech Company Foundings',
      description: 'Timeline of major tech company foundings',
      code: `timeline
    title Tech Company Foundings
    1975 : Microsoft
    1976 : Apple
    1977 : Oracle
    1984 : Cisco
    1994 : Amazon
    1998 : Google
    2004 : Facebook
    2006 : Twitter
    2008 : Airbnb
    2009 : Uber
    2010 : Instagram`,
    },
  ];
};

export const fetchAllDiagrams = async () => {
  const [
    flowcharts,
    sequenceDiagrams,
    classDiagrams,
    ganttCharts,
    pieCharts,
    erDiagrams,
    stateDiagrams,
    mindmaps,
    gitGraphs,
    timelines,
  ] = await Promise.all([
    fetchFlowcharts(),
    fetchSequenceDiagrams(),
    fetchClassDiagrams(),
    fetchGanttCharts(),
    fetchPieCharts(),
    fetchEntityRelationshipDiagrams(),
    fetchStateDiagrams(),
    fetchMindmaps(),
    fetchGitGraphs(),
    fetchTimelines(),
  ]);

  return {
    flowcharts,
    sequenceDiagrams,
    classDiagrams,
    ganttCharts,
    pieCharts,
    erDiagrams,
    stateDiagrams,
    mindmaps,
    gitGraphs,
    timelines,
  };
};
