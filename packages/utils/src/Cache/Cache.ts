export interface CacheInterface {
  get(key: string): any;
  set(key: string, value: any): void;
  keys(): string[];
  has(key: string): boolean;
  delete(key: string): void;
  clear(): void;
}

class Cache implements CacheInterface {
  private cache: Map<string, any>;

  constructor() {
    this.cache = new Map();
  }

  get(key: string): any {
    return this.cache.get(key);
  }

  set(key: string, value: any) {
    this.cache.set(key, value);
  }

  keys() {
    return Array.from(this.cache.keys());
  }

  has(key: string) {
    return this.cache.has(key);
  }

  clear() {
    this.cache.clear();
  }

  delete(key: string) {
    this.cache.delete(key);
  }
}

export default Cache;
