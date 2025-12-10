// ============================================
// COMPLETE TYPESCRIPT EXERCISES IMPLEMENTATION
// ============================================

console.log("🚀 ADVANCED TYPESCRIPT EXERCISES\n");

// --------------------------------------------------
// Exercise 1: Container with Intersection Types
// --------------------------------------------------
console.log("📦 EXERCISE 1: Generic Container with Intersection Types");

// Create product type
interface Product extends Identifiable, Timestamped, Nameable {
    price: number;
    category: string;
    inStock: boolean;
}

// Create container for products
const productContainer = new Container<Product>();

// Add products
const laptop = productContainer.add({
    id: "prod-001",
    name: "Laptop",
    price: 999.99,
    category: "Electronics",
    inStock: true
});

const book = productContainer.add({
    id: "prod-002",
    name: "TypeScript Guide",
    price: 29.99,
    category: "Books",
    inStock: true
});

console.log("✅ Products added to container:");
console.log(`   • ${laptop.name} - $${laptop.price}`);
console.log(`   • ${book.name} - $${book.price}`);
console.log(`   • Total products: ${productContainer.count()}`);

// List expensive products
const expensiveProducts = productContainer.listWhere(p => p.price > 50);
console.log(`   • Expensive products: ${expensiveProducts.length} items`);

// Update a product
productContainer.update("prod-001", { price: 899.99 });
console.log(`   • Updated laptop price: $${productContainer.get("prod-001")?.price}`);

// --------------------------------------------------
// Exercise 2: Generic Response Interface
// --------------------------------------------------
console.log("\n📨 EXERCISE 2: Generic Response Interface & Type Casting");

// Define expected data types
interface UserData {
    id: number;
    name: string;
    email: string;
}

interface ProductData {
    id: string;
    title: string;
    price: number;
}

// Mock API responses
const mockUserResponse = {
    success: true,
    data: { id: 1, name: "John Doe", email: "john@example.com" },
    statusCode: 200,
    timestamp: "2024-01-15T10:30:00Z"
};

const mockProductResponse = {
    success: true,
    data: { id: "p1", title: "Smartphone", price: 699 },
    message: "Product retrieved successfully",
    statusCode: 200
};

// Parse responses
const userResponse = parseResponse<UserData>(mockUserResponse);
const productResponse = parseResponse<ProductData>(mockProductResponse);

console.log("✅ Parsed Responses:");
console.log(`   • User: ${userResponse.data.name} (${userResponse.data.email})`);
console.log(`   • Product: ${productResponse.data.title} - $${productResponse.data.price}`);

// Create a new response
const newResponse = createResponse<UserData>(
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    true,
    "User created successfully"
);
console.log(`   • Created response: ${newResponse.message}`);

// --------------------------------------------------
// Exercise 3: Generic Repository with Type Assertions
// --------------------------------------------------
console.log("\n🗄️ EXERCISE 3: Generic Repository with Type Assertions");

// Define repository item types
interface Customer extends RepositoryItem {
    id: number;
    name: string;
    email: string;
    tier: 'basic' | 'premium' | 'vip';
}

interface Order extends RepositoryItem {
    id: string;
    customerId: number;
    amount: number;
    status: 'pending' | 'completed' | 'cancelled';
}

// Create repositories
const customerRepo = new AdvancedRepository<Customer>();
const orderRepo = new Repository<Order>();

// Add customers
customerRepo.add({ id: 1, name: "Alice", email: "alice@example.com", tier: 'premium' });
customerRepo.add({ id: 2, name: "Bob", email: "bob@example.com", tier: 'basic' });
customerRepo.add({ name: "Charlie", email: "charlie@example.com", tier: 'vip' }); // Auto-generated ID

// Add orders
orderRepo.add({ id: "order-001", customerId: 1, amount: 150.50, status: 'completed' });
orderRepo.add({ id: "order-002", customerId: 2, amount: 75.25, status: 'pending' });

console.log("✅ Repository Operations:");
console.log(`   • Total customers: ${customerRepo.count()}`);
console.log(`   • Total orders: ${orderRepo.count()}`);

// Find premium customers
const premiumCustomers = customerRepo.find(c => c.tier === 'premium');
console.log(`   • Premium customers: ${premiumCustomers.length}`);

// Get specific customer with type assertion
const alice = customerRepo.getSafe(1);
console.log(`   • Customer #1: ${alice.name} (${alice.tier} tier)`);

// Pagination example
const paginated = customerRepo.paginate(1, 2);
console.log(`   • Page 1 customers: ${paginated.items.length} of ${paginated.total}`);

// --------------------------------------------------
// Integrated Example: Using All Three Exercises
// --------------------------------------------------
console.log("\n🔗 INTEGRATED EXAMPLE: E-commerce System");

class ECommerceSystem {
    private products = new Container<Product>();
    private customers = new AdvancedRepository<Customer>();
    private orders = new Repository<Order>();

    // Add product with response
    addProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Response<Product> {
        const product = this.products.add({
            ...productData,
            id: `prod-${Date.now()}`
        });
        
        return createResponse(product, true, "Product added successfully");
    }

    // Place order
    placeOrder(customerId: number, productId: string, quantity: number = 1): Response<Order> {
        const product = this.products.get(productId);
        if (!product) {
            return createResponse<Order>({} as Order, false, "Product not found");
        }

        const customer = this.customers.get(customerId);
        if (!customer) {
            return createResponse<Order>({} as Order, false, "Customer not found");
        }

        const order: Order = {
            id: `order-${Date.now()}`,
            customerId,
            amount: product.price * quantity,
            status: 'pending'
        };

        this.orders.add(order);
        return createResponse(order, true, "Order placed successfully");
    }

    // Get customer orders
    getCustomerOrders(customerId: number): Response<Order[]> {
        const orders = this.orders.find(o => o.customerId === customerId);
        return createResponse(orders, true, "Orders retrieved successfully");
    }
}

// Test the integrated system
console.log("✅ E-commerce System Test:");

const system = new ECommerceSystem();

// Add a product
const productResponse = system.addProduct({
    name: "Wireless Headphones",
    price: 129.99,
    category: "Electronics",
    inStock: true
});
console.log(`   • ${productResponse.message}: ${productResponse.data.name}`);

// Add a customer
system.customers.add({
    id: 100,
    name: "David Wilson",
    email: "david@example.com",
    tier: 'premium'
});

// Place an order
const orderResponse = system.placeOrder(100, productResponse.data.id);
console.log(`   • ${orderResponse.message}: $${orderResponse.data.amount}`);

console.log("\n🎉 ALL EXERCISES COMPLETED SUCCESSFULLY!");