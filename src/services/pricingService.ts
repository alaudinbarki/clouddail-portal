// import axiosInstance from '../utils/axios'; // TODO: Uncomment when implementing real API
import type {
    Plan,
    CostEntry,
    PricingStrategy,
    CreatePlanRequest,
    // PriceHistory, // TODO: Use when implementing price history feature
    ProfitAnalysis,
    // PromotionalOffer, // TODO: Use when implementing promotional offers feature
} from '../types/pricing';

// Mock data generators
const generateMockPlans = (): Plan[] => {
    const plans: Plan[] = [
        {
            id: 'plan-1',
            name: 'Basic 1GB',
            description: '1GB data for 30 days - Perfect for light users',
            dataLimit: 1024,
            validity: 30,
            regions: ['North America', 'Europe'],
            baseCost: 5,
            sellingPrice: 9.99,
            markup: 99.8,
            profit: 4.99,
            currency: 'USD',
            status: 'active',
            isPromotional: false,
            salesCount: 245,
            totalRevenue: 2447.55,
            createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            id: 'plan-2',
            name: 'Standard 5GB',
            description: '5GB data for 30 days - Most popular',
            dataLimit: 5120,
            validity: 30,
            regions: ['North America', 'Europe', 'Asia'],
            baseCost: 15,
            sellingPrice: 29.99,
            markup: 99.93,
            profit: 14.99,
            currency: 'USD',
            status: 'active',
            isPromotional: true,
            promotionalPrice: 24.99,
            promotionalDiscount: 16.67,
            promotionalStartDate: new Date().toISOString(),
            promotionalEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            salesCount: 512,
            totalRevenue: 15358.88,
            createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            id: 'plan-3',
            name: 'Premium 10GB',
            description: '10GB data for 30 days - For heavy users',
            dataLimit: 10240,
            validity: 30,
            regions: ['North America', 'Europe', 'Asia', 'Oceania'],
            baseCost: 25,
            sellingPrice: 49.99,
            markup: 99.96,
            profit: 24.99,
            currency: 'USD',
            status: 'active',
            isPromotional: false,
            salesCount: 189,
            totalRevenue: 9448.11,
            createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            id: 'plan-4',
            name: 'Unlimited',
            description: 'Unlimited data for 30 days - Best value',
            dataLimit: 51200,
            validity: 30,
            regions: ['North America'],
            baseCost: 40,
            sellingPrice: 79.99,
            markup: 99.95,
            profit: 39.99,
            currency: 'USD',
            status: 'active',
            isPromotional: false,
            salesCount: 87,
            totalRevenue: 6959.13,
            createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
        },
    ];
    return plans;
};

const MOCK_PLANS = generateMockPlans();

const MOCK_COSTS: CostEntry[] = [
    {
        id: 'cost-1',
        provider: 'twilio',
        providerName: 'Twilio',
        region: 'North America',
        dataUnit: 1024,
        cost: 5,
        currency: 'USD',
        effectiveDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        notes: 'Standard pricing',
    },
    {
        id: 'cost-2',
        provider: 'twilio',
        providerName: 'Twilio',
        region: 'Europe',
        dataUnit: 1024,
        cost: 6,
        currency: 'USD',
        effectiveDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        notes: 'Higher cost due to regulations',
    },
];

const MOCK_STRATEGY: PricingStrategy = {
    id: 'strategy-1',
    name: 'Default Strategy',
    description: 'Standard markup strategy with regional variations',
    defaultMarkup: 100,
    regionalMarkups: {
        'North America': 100,
        'Europe': 120,
        'Asia': 90,
        'Oceania': 110,
    },
    volumeDiscounts: [
        { minQuantity: 10, maxQuantity: 49, discountPercentage: 5 },
        { minQuantity: 50, maxQuantity: 99, discountPercentage: 10 },
        { minQuantity: 100, discountPercentage: 15 },
    ],
    isActive: true,
    createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
};

class PricingService {
    /**
     * Get all plans
     */
    async getPlans(): Promise<Plan[]> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<Plan[]>('/plans');
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(MOCK_PLANS);
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to fetch plans');
        }
    }

    /**
     * Get plan by ID
     */
    async getPlanById(id: string): Promise<Plan> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<Plan>(`/plans/${id}`);
            // return response.data;

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const plan = MOCK_PLANS.find((p) => p.id === id);
                    if (plan) {
                        resolve(plan);
                    } else {
                        reject(new Error('Plan not found'));
                    }
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to fetch plan');
        }
    }

    /**
     * Create new plan
     */
    async createPlan(data: CreatePlanRequest): Promise<Plan> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.post<Plan>('/plans', data);
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    const profit = (data.baseCost * data.markup) / 100;
                    const sellingPrice = data.baseCost + profit;

                    const newPlan: Plan = {
                        id: `plan-${MOCK_PLANS.length + 1}`,
                        ...data,
                        sellingPrice,
                        profit,
                        currency: data.currency || 'USD',
                        status: 'active',
                        isPromotional: false,
                        salesCount: 0,
                        totalRevenue: 0,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    };

                    MOCK_PLANS.push(newPlan);
                    resolve(newPlan);
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to create plan');
        }
    }

    /**
     * Update plan
     */
    async updatePlan(id: string, data: Partial<Plan>): Promise<Plan> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.patch<Plan>(`/plans/${id}`, data);
            // return response.data;

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const planIndex = MOCK_PLANS.findIndex((p) => p.id === id);
                    if (planIndex !== -1) {
                        MOCK_PLANS[planIndex] = {
                            ...MOCK_PLANS[planIndex],
                            ...data,
                            updatedAt: new Date().toISOString(),
                        };
                        resolve(MOCK_PLANS[planIndex]);
                    } else {
                        reject(new Error('Plan not found'));
                    }
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to update plan');
        }
    }

    /**
     * Delete plan
     */
    async deletePlan(id: string): Promise<void> {
        try {
            // TODO: Replace with actual API call
            // await axiosInstance.delete(`/plans/${id}`);

            return new Promise((resolve) => {
                setTimeout(() => {
                    const planIndex = MOCK_PLANS.findIndex((p) => p.id === id);
                    if (planIndex !== -1) {
                        MOCK_PLANS[planIndex].status = 'archived';
                    }
                    resolve();
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to delete plan');
        }
    }

    /**
     * Get cost entries
     */
    async getCosts(): Promise<CostEntry[]> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<CostEntry[]>('/costs');
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(MOCK_COSTS);
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to fetch costs');
        }
    }

    /**
     * Add cost entry
     */
    async addCost(data: Omit<CostEntry, 'id'>): Promise<CostEntry> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.post<CostEntry>('/costs', data);
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    const newCost: CostEntry = {
                        id: `cost-${MOCK_COSTS.length + 1}`,
                        ...data,
                    };
                    MOCK_COSTS.push(newCost);
                    resolve(newCost);
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to add cost');
        }
    }

    /**
     * Get pricing strategy
     */
    async getPricingStrategy(): Promise<PricingStrategy> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<PricingStrategy>('/pricing-strategy');
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(MOCK_STRATEGY);
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to fetch pricing strategy');
        }
    }

    /**
     * Update pricing strategy
     */
    async updatePricingStrategy(data: Partial<PricingStrategy>): Promise<PricingStrategy> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.patch<PricingStrategy>('/pricing-strategy', data);
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    Object.assign(MOCK_STRATEGY, data, { updatedAt: new Date().toISOString() });
                    resolve(MOCK_STRATEGY);
                }, 500);
            });
        } catch (error) {
            throw new Error('Failed to update pricing strategy');
        }
    }

    /**
     * Calculate profit
     */
    async calculateProfit(baseCost: number, markup: number): Promise<number> {
        return (baseCost * markup) / 100;
    }

    /**
     * Get profit analysis
     */
    async getProfitAnalysis(): Promise<ProfitAnalysis> {
        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.get<ProfitAnalysis>('/profit-analysis');
            // return response.data;

            return new Promise((resolve) => {
                setTimeout(() => {
                    const totalRevenue = MOCK_PLANS.reduce((sum, plan) => sum + plan.totalRevenue, 0);
                    const totalCost = MOCK_PLANS.reduce((sum, plan) => sum + plan.baseCost * plan.salesCount, 0);
                    const totalProfit = totalRevenue - totalCost;
                    const profitMargin = (totalProfit / totalRevenue) * 100;
                    const averageMarkup = MOCK_PLANS.reduce((sum, plan) => sum + plan.markup, 0) / MOCK_PLANS.length;

                    resolve({
                        totalRevenue,
                        totalCost,
                        totalProfit,
                        profitMargin,
                        averageMarkup,
                        topPerformingPlans: [...MOCK_PLANS].sort((a, b) => b.totalRevenue - a.totalRevenue).slice(0, 3),
                    });
                }, 300);
            });
        } catch (error) {
            throw new Error('Failed to fetch profit analysis');
        }
    }
}

export default new PricingService();
