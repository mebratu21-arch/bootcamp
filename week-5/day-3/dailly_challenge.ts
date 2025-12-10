// 1. Define the types
type User = {
  type: 'user';
  name: string;
  age: number;
};

type Product = {
  type: 'product';
  id: number;
  price: number;
};

type Order = {
  type: 'order';
  orderId: string;
  amount: number;
};

type MixedData = User | Product | Order;

// 2. Create type guard functions
function isUser(data: MixedData): data is User {
  return data.type === 'user' 
    && 'name' in data 
    && 'age' in data 
    && typeof data.name === 'string'
    && typeof data.age === 'number';
}

function isProduct(data: MixedData): data is Product {
  return data.type === 'product'
    && 'id' in data
    && 'price' in data
    && typeof data.id === 'number'
    && typeof data.price === 'number';
}

function isOrder(data: MixedData): data is Order {
  return data.type === 'order'
    && 'orderId' in data
    && 'amount' in data
    && typeof data.orderId === 'string'
    && typeof data.amount === 'number';
}

// 3. Main function to handle mixed data
function handleData(dataArray: MixedData[]): string[] {
  const results: string[] = [];

  for (const data of dataArray) {
    // Handle each type with specific operations
    if (isUser(data)) {
      // For User objects
      results.push(`Hello ${data.name}! You are ${data.age} years old.`);
    } else if (isProduct(data)) {
      // For Product objects
      results.push(`Product #${data.id} costs $${data.price.toFixed(2)}`);
    } else if (isOrder(data)) {
      // For Order objects
      results.push(`Order ${data.orderId} total: $${data.amount.toFixed(2)}`);
    } else {
      // Graceful error handling for unexpected cases
      const errorMessage = `Unexpected data type: ${JSON.stringify(data)}`;
      console.warn(errorMessage);
      results.push(errorMessage);
    }
  }

  return results;
}

// Alternative implementation using switch statement
function handleDataSwitch(dataArray: MixedData[]): string[] {
  return dataArray.map(data => {
    switch (data.type) {
      case 'user':
        return `Hello ${data.name}! You are ${data.age} years old.`;
      
      case 'product':
        return `Product #${data.id} costs $${data.price.toFixed(2)}`;
      
      case 'order':
        return `Order ${data.orderId} total: $${data.amount.toFixed(2)}`;
      
      default:
        // TypeScript will catch if we forget a case, but handle anyway
        const unknownData = data as never;
        return `Unexpected data type: ${JSON.stringify(unknownData)}`;
    }
  });
}

// 4. Usage example
const mixedData: MixedData[] = [
  { type: 'user', name: 'Alice', age: 30 },
  { type: 'product', id: 101, price: 29.99 },
  { type: 'order', orderId: 'ORD-12345', amount: 150.50 },
  { type: 'user', name: 'Bob', age: 25 },
  // Potentially invalid data that will be caught
  { type: 'product', id: 'invalid', price: 'invalid' } as any
];

// Process the data
const results = handleData(mixedData);
console.log(results);

// Optional: Helper function to validate data structure
function validateData(data: any): data is MixedData {
  if (!data || typeof data !== 'object') return false;
  
  switch (data.type) {
    case 'user':
      return typeof data.name === 'string' && typeof data.age === 'number';
    case 'product':
      return typeof data.id === 'number' && typeof data.price === 'number';
    case 'order':
      return typeof data.orderId === 'string' && typeof data.amount === 'number';
    default:
      return false;
  }
}

// Usage with validation
function handleDataWithValidation(dataArray: any[]): string[] {
  const results: string[] = [];
  
  for (const data of dataArray) {
    if (validateData(data)) {
      results.push(handleData([data])[0]);
    } else {
      results.push(`Invalid data structure: ${JSON.stringify(data)}`);
    }
  }
  
  return results;
}

// 5. Using discriminated unions for cleaner code
type DataHandlers = {
  [K in MixedData['type']]: (data: Extract<MixedData, { type: K }>) => string;
};

const handlers: DataHandlers = {
  user: (user) => `Hello ${user.name}! You are ${user.age} years old.`,
  product: (product) => `Product #${product.id} costs $${product.price.toFixed(2)}`,
  order: (order) => `Order ${order.orderId} total: $${order.amount.toFixed(2)}`
};

function handleDataDiscriminated(dataArray: MixedData[]): string[] {
  return dataArray.map(data => {
    const handler = handlers[data.type];
    return handler(data as any);
  });
}