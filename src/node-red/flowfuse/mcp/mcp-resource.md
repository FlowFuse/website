---
eleventyNavigation:
  key: MCP Resource
  parent: MCP
meta:
  title: MCP Resource
  description: The MCP Resource node allows you to expose read-only data that AI assistants can access for context.
---

# {{ meta.title }}

The MCP Resource node allows you to expose read-only data that AI assistants can access for context. Resources are designed to provide information without performing actions or causing side effects. Resources allow servers to share data that provides context to language models, such as files, database schemas, or application-specific information

## Flow Requirements

MCP Resource nodes must be connected to a flow that ends with an **MCP Response** node to send the resource content back to the MCP client.

## Configuration

### Name
`string` - Optional

Optional display name for this node in the flow. This helps you identify the node in your Node-RED editor but is not visible to MCP clients.

### Server
`mcp-server` - Required

The MCP server configuration this resource will be registered with. Select from your configured MCP server instances.

### ID
`string` - Required

Unique identifier for the resource used by MCP clients to access this resource. Should be written in snake_case.

**Examples:**
- `user_database`
- `config_files`
- `api_documentation`
- `product_catalog`

### URI
`string` - Required

URI of the resource. This should be unique for each resource you expose. The URI follows a scheme-based format similar to file paths or URLs.

**Static Resource Examples:**
- `file://config.json`
- `db://schema/users`
- `local://documentation/api`
- `app://settings/theme`

**Dynamic Resource Template Examples:**
- `github://repos/{owner}/{repo}`
- `local://books/{genre}`
- `db://users/{user_id}/orders`
- `file://logs/{date}/{level}`

### Title
`string` - Required

Human-readable name shown to users in MCP clients. This is what users see when browsing available resources.

### MIME Type
`string` - Required

MIME type of the resource content. This tells the MCP client how to interpret the data you return.

**Common MIME Types:**
- `application/json` - JSON data
- `text/plain` - Plain text
- `text/markdown` - Markdown formatted text
- `text/html` - HTML content
- `application/xml` - XML data
- `text/csv` - CSV files
- `application/pdf` - PDF documents

### Description
`string` - Required

Detailed description of what this resource provides and when to use it.

## URI Types

### Static Resources

Static resources have a fixed URI and return the same data each time they're accessed. These are ideal for configuration files, schemas, documentation, and other unchanging reference materials.

**Example URI:** `file://path/to/config.json`

Your flow would always return the content of that specific file.

**Use Cases:**
- Application configuration files
- Database schemas
- API documentation
- System specifications
- Reference data

### Resource Templates

Resource templates have URIs with dynamic components based on user-defined input. Variables in the URI are enclosed in curly braces `{}`.

**Example URI:** `github://repos/{owner}/{repo}`

When an MCP client requests this resource with specific values (e.g., `github://repos/flowfuse/node-red`), the variables are passed to your flow in `msg.payload`, You can then use these variables to fetch and return the appropriate content.

**More Examples:**

**Single Variable:**
```
local://books/{genre}
→ msg.payload.genre = "science-fiction"
```

**Multiple Variables:**
```
db://users/{user_id}/orders/{order_id}
→ msg.payload.user_id = "12345"
→ msg.payload.order_id = "67890"
```

**Date-based Resources:**
```
file://logs/{date}/{level}
→ msg.payload.date = "2024-01-15"
→ msg.payload.level = "error"
```

## Output

### Static Resources

For static resources, your flow simply returns the content in `msg.payload`. The MCP Response node will send it to the client.

```javascript
msg.payload = {
  database: "users",
  tables: ["users", "profiles", "settings"]
};
```

### Dynamic Resource Templates

For resource templates, the input `msg.payload` contains the variables from the URI. You use these to fetch the appropriate content.

**Example:**

URI: `local://books/{genre}`

Input received:
```javascript
msg.payload = {
  genre: "horror"
}
```

Your flow processes this and returns:

```javascript
msg.payload = {
  genre: "horror",
  books: [
    { title: "Dracula", author: "Bram Stoker" },
    { title: "Frankenstein", author: "Mary Shelley" }
  ]
};
```

## Example Flow

{% renderFlow %}
[{"id":"00744c2e2a560c36","type":"group","z":"e1ceeedf31ce1ebd","name":"MCP Resources","style":{"label":true},"nodes":["555a96b221f8e2bf","bb258a21622c01b9","066f6c58bc45d617","70e0b93eb88d63d6","5651b0896965ae6a","6bcaef4ed1ab82ae","3d6e0d7e21b44845","350db73b93a26f8d","fac46d1d55d9ca22","84ebc9b12d948173","9d4edda03c19b553","d3aa7bfa90c9e24e","d6f015cb6debe35b"],"x":274,"y":1739,"w":1002,"h":282},{"id":"555a96b221f8e2bf","type":"mcp-resource","z":"e1ceeedf31ce1ebd","g":"00744c2e2a560c36","name":"","server":"28907ed9ddcdd4b9","resourceUri":"local://books/{genre}","resourceId":"my_books","title":"Books Array","description":"JSON Array of books filtered by genre.","mimeType":"application/json","x":400,"y":1920,"wires":[["70e0b93eb88d63d6"]]},{"id":"bb258a21622c01b9","type":"mcp-response","z":"e1ceeedf31ce1ebd","g":"00744c2e2a560c36","name":"","x":1130,"y":1900,"wires":[]},{"id":"066f6c58bc45d617","type":"json","z":"e1ceeedf31ce1ebd","g":"00744c2e2a560c36","name":"To JSON","property":"payload","action":"str","pretty":false,"x":870,"y":1920,"wires":[["350db73b93a26f8d"]]},{"id":"70e0b93eb88d63d6","type":"template","z":"e1ceeedf31ce1ebd","g":"00744c2e2a560c36","name":"library","field":"library","fieldType":"msg","format":"json","syntax":"mustache","template":"[\n    {\n        \"author\": \"Harper Lee\",\n        \"title\": \"To Kill a Mockingbird\",\n        \"genre\": \"Fiction\",\n        \"year\": 1960\n    },\n    {\n        \"author\": \"J.K. Rowling\",\n        \"title\": \"Harry Potter and the Sorcerer's Stone\",\n        \"genre\": \"Fantasy\",\n        \"year\": 1997\n    },\n    {\n        \"author\": \"George Orwell\",\n        \"title\": \"1984\",\n        \"genre\": \"Dystopian\",\n        \"year\": 1949\n    },\n    {\n        \"author\": \"Jane Austen\",\n        \"title\": \"Pride and Prejudice\",\n        \"genre\": \"Romance\",\n        \"year\": 1813\n    },\n    {\n        \"author\": \"F. Scott Fitzgerald\",\n        \"title\": \"The Great Gatsby\",\n        \"genre\": \"Classic\",\n        \"year\": 1925\n    },\n    {\n        \"author\": \"Toni Morrison\",\n        \"title\": \"Beloved\",\n        \"genre\": \"Historical Fiction\",\n        \"year\": 1987\n    },\n    {\n        \"author\": \"Stephen King\",\n        \"title\": \"The Shining\",\n        \"genre\": \"Horror\",\n        \"year\": 1977\n    },\n    {\n        \"author\": \"Agatha Christie\",\n        \"title\": \"Murder on the Orient Express\",\n        \"genre\": \"Mystery\",\n        \"year\": 1934\n    },\n    {\n        \"author\": \"Gabriel Garcia Marquez\",\n        \"title\": \"One Hundred Years of Solitude\",\n        \"genre\": \"Magical Realism\",\n        \"year\": 1967\n    },\n    {\n        \"author\": \"Mark Twain\",\n        \"title\": \"Adventures of Huckleberry Finn\",\n        \"genre\": \"Adventure\",\n        \"year\": 1884\n    },\n    {\n        \"author\": \"J.R.R. Tolkien\",\n        \"title\": \"The Lord of the Rings\",\n        \"genre\": \"Fantasy\",\n        \"year\": 1954\n    },\n    {\n        \"author\": \"Ernest Hemingway\",\n        \"title\": \"The Old Man and the Sea\",\n        \"genre\": \"Literary Fiction\",\n        \"year\": 1952\n    },\n    {\n        \"author\": \"Charlotte Bronte\",\n        \"title\": \"Jane Eyre\",\n        \"genre\": \"Gothic\",\n        \"year\": 1847\n    },\n    {\n        \"author\": \"Leo Tolstoy\",\n        \"title\": \"War and Peace\",\n        \"genre\": \"Historical Fiction\",\n        \"year\": 1869\n    },\n    {\n        \"author\": \"Emily Bronte\",\n        \"title\": \"Wuthering Heights\",\n        \"genre\": \"Gothic Romance\",\n        \"year\": 1847\n    },\n    {\n        \"author\": \"Ray Bradbury\",\n        \"title\": \"Fahrenheit 451\",\n        \"genre\": \"Science Fiction\",\n        \"year\": 1953\n    },\n    {\n        \"author\": \"Arthur Conan Doyle\",\n        \"title\": \"The Adventures of Sherlock Holmes\",\n        \"genre\": \"Mystery\",\n        \"year\": 1892\n    },\n    {\n        \"author\": \"Margaret Atwood\",\n        \"title\": \"The Handmaid's Tale\",\n        \"genre\": \"Dystopian\",\n        \"year\": 1985\n    },\n    {\n        \"author\": \"Herman Melville\",\n        \"title\": \"Moby Dick\",\n        \"genre\": \"Adventure\",\n        \"year\": 1851\n    },\n    {\n        \"author\": \"Kazuo Ishiguro\",\n        \"title\": \"Never Let Me Go\",\n        \"genre\": \"Science Fiction\",\n        \"year\": 2005\n    }\n]","output":"json","x":580,"y":1920,"wires":[["5651b0896965ae6a"]]},{"id":"5651b0896965ae6a","type":"function","z":"e1ceeedf31ce1ebd","g":"00744c2e2a560c36","name":"filter","func":"const books = msg.library\nconst genre = msg.payload.genre\n\nif (!Array.isArray(books)) {\n    throw new Error('Payload is not an array of books')\n}\n\nif (typeof genre !== 'string') {\n    throw new Error('Genre must be a string')\n}\n\nfunction looseCompareGenre(genre, search) {\n    return genre.toLowerCase().includes(search.toLowerCase())\n}\nconst filteredBooks = books.filter(book => looseCompareGenre(book.genre, genre))\n\nmsg.payload = filteredBooks\nreturn msg;","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":720,"y":1920,"wires":[["066f6c58bc45d617"]]},{"id":"6bcaef4ed1ab82ae","type":"catch","z":"e1ceeedf31ce1ebd","g":"00744c2e2a560c36","name":"","scope":"group","uncaught":false,"x":860,"y":1980,"wires":[["350db73b93a26f8d"]]},{"id":"3d6e0d7e21b44845","type":"mcp-resource","z":"e1ceeedf31ce1ebd","g":"00744c2e2a560c36","name":"","server":"28907ed9ddcdd4b9","resourceUri":"db://recipes","resourceId":"recipes","title":"Recipes Array","description":"JSON Array of all recipes","mimeType":"application/json","x":380,"y":1820,"wires":[["84ebc9b12d948173"]]},{"id":"350db73b93a26f8d","type":"junction","z":"e1ceeedf31ce1ebd","g":"00744c2e2a560c36","x":1010,"y":1880,"wires":[["bb258a21622c01b9","fac46d1d55d9ca22"]]},{"id":"fac46d1d55d9ca22","type":"debug","z":"e1ceeedf31ce1ebd","g":"00744c2e2a560c36","name":"resource response","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":1140,"y":1860,"wires":[]},{"id":"84ebc9b12d948173","type":"template","z":"e1ceeedf31ce1ebd","g":"00744c2e2a560c36","name":"db query for recipes","field":"payload","fieldType":"msg","format":"json","syntax":"mustache","template":"{\n  \"recipes\": [\n    {\n      \"name\": \"Spaghetti Aglio e Olio\",\n      \"ingredients\": [\n        \"Spaghetti\",\n        \"Garlic\",\n        \"Olive Oil\",\n        \"Red Pepper Flakes\",\n        \"Parsley\"\n      ],\n      \"method\": \"Cook spaghetti, sauté garlic in olive oil, add red pepper flakes, toss with cooked spaghetti, garnish with parsley.\",\n      \"wine_paring\": \"Pinot Grigio\"\n    },\n    {\n      \"name\": \"Chicken Alfredo Pasta\",\n      \"ingredients\": [\n        \"Chicken Breast\",\n        \"Fettuccine Pasta\",\n        \"Heavy Cream\",\n        \"Parmesan Cheese\",\n        \"Garlic\",\n        \"Butter\"\n      ],\n      \"method\": \"Cook chicken, cook pasta, make alfredo sauce with cream, parmesan, garlic, and butter, combine all.\",\n      \"wine_paring\": \"Chardonnay\"\n    },\n    {\n      \"name\": \"Caprese Salad\",\n      \"ingredients\": [\n        \"Tomatoes\",\n        \"Fresh Mozzarella\",\n        \"Basil\",\n        \"Olive Oil\",\n        \"Balsamic Vinegar\",\n        \"Salt\",\n        \"Pepper\"\n      ],\n      \"method\": \"Slice tomatoes and mozzarella, layer with basil, drizzle with olive oil and balsamic vinegar, season with salt and pepper.\",\n      \"wine_paring\": \"Chianti\"\n    },\n    {\n      \"name\": \"Beef Tacos\",\n      \"ingredients\": [\n        \"Ground Beef\",\n        \"Taco Seasoning\",\n        \"Tortillas\",\n        \"Lettuce\",\n        \"Tomatoes\",\n        \"Cheese\",\n        \"Sour Cream\"\n      ],\n      \"method\": \"Cook beef with taco seasoning, assemble tacos with beef, lettuce, tomatoes, cheese, and sour cream.\",\n      \"wine_paring\": null\n    },\n    {\n      \"name\": \"Vegetable Stir Fry\",\n      \"ingredients\": [\n        \"Mixed Vegetables\",\n        \"Soy Sauce\",\n        \"Garlic\",\n        \"Ginger\",\n        \"Sesame Oil\",\n        \"Rice\"\n      ],\n      \"method\": \"Stir fry vegetables with soy sauce, garlic, and ginger, finish with sesame oil, serve over rice.\",\n      \"wine_paring\": \"Riesling\"\n    },\n    {\n      \"name\": \"Margherita Pizza\",\n      \"ingredients\": [\n        \"Pizza Dough\",\n        \"Tomato Sauce\",\n        \"Fresh Mozzarella\",\n        \"Basil\",\n        \"Olive Oil\"\n      ],\n      \"method\": \"Top pizza dough with sauce, mozzarella, and basil, drizzle with olive oil, bake until crust is golden.\",\n      \"wine_paring\": \"Merlot\"\n    },\n    {\n      \"name\": \"Grilled Salmon\",\n      \"ingredients\": [\n        \"Salmon Fillet\",\n        \"Lemon\",\n        \"Garlic\",\n        \"Dill\",\n        \"Olive Oil\"\n      ],\n      \"method\": \"Marinate salmon with lemon, garlic, dill, and olive oil, grill until cooked through.\",\n      \"wine_paring\": \"Sauvignon Blanc\"\n    },\n    {\n      \"name\": \"Pasta Primavera\",\n      \"ingredients\": [\n        \"Pasta\",\n        \"Assorted Vegetables\",\n        \"Cream Sauce\",\n        \"Garlic\",\n        \"Parmesan Cheese\"\n      ],\n      \"method\": \"Cook pasta, sauté vegetables, add cream sauce, garlic, and parmesan, toss with cooked pasta.\",\n      \"wine_paring\": \"Chardonnay\"\n    },\n    {\n      \"name\": \"Chicken Caesar Salad\",\n      \"ingredients\": [\n        \"Chicken Breast\",\n        \"Romaine Lettuce\",\n        \"Caesar Dressing\",\n        \"Croutons\",\n        \"Parmesan Cheese\"\n      ],\n      \"method\": \"Grill chicken, chop lettuce, toss with dressing, croutons, and parmesan, top with grilled chicken.\",\n      \"wine_paring\": \"Sauvignon Blanc\"\n    },\n    {\n      \"name\": \"Chocolate Chip Cookies\",\n      \"ingredients\": [\n        \"Flour\",\n        \"Butter\",\n        \"Sugar\",\n        \"Eggs\",\n        \"Chocolate Chips\",\n        \"Vanilla Extract\",\n        \"Baking Soda\"\n      ],\n      \"method\": \"Cream butter and sugar, add eggs and vanilla, mix in dry ingredients and chocolate chips, bake until golden.\",\n      \"wine_paring\": null\n    }\n  ]\n}","output":"str","x":630,"y":1820,"wires":[["d6f015cb6debe35b"]]},{"id":"9d4edda03c19b553","type":"comment","z":"e1ceeedf31ce1ebd","g":"00744c2e2a560c36","name":"Status Resource Example","info":"","x":420,"y":1780,"wires":[]},{"id":"d3aa7bfa90c9e24e","type":"comment","z":"e1ceeedf31ce1ebd","g":"00744c2e2a560c36","name":"Dynamic Resource Example","info":"","x":430,"y":1880,"wires":[]},{"id":"d6f015cb6debe35b","type":"junction","z":"e1ceeedf31ce1ebd","g":"00744c2e2a560c36","x":930,"y":1820,"wires":[["350db73b93a26f8d"]]},{"id":"28907ed9ddcdd4b9","type":"mcp-server","name":"My Node-RED MCP Server","protocol":"http","path":"/mcp"},{"id":"3d12514448ee3580","type":"global-config","env":[],"modules":{"@flowfuse-nodes/nr-mcp-server-nodes":"0.1.1"}}]
{% endrenderFlow %}