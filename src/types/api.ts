// Add these types to the existing types/api.ts file

export interface ApiDesignData {
  guidelines: {
    name: string;
    description: string;
    status: 'passed' | 'failed';
  }[];
  breakingChanges: {
    type: string;
    description: string;
    impact: number;
  }[];
}

export interface TestSuite {
  id: string;
  name: string;
  description: string;
  stats: {
    passed: number;
    failed: number;
    total: number;
  };
  tests: {
    id: string;
    name: string;
    status: 'passed' | 'failed' | 'pending';
    duration: number;
    error?: string;
  }[];
}