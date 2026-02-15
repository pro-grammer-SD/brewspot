export interface Coffee {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: "Hot" | "Iced" | "Seasonal";
    calories: number;
    prepTime: string;
    rating: number;
    reviews: number;
    bestSeller?: boolean;
}

export const coffees: Coffee[] = [
    {
        id: "v-latte",
        name: "Vanilla Oat Latte",
        description: "Smooth espresso poured over creamy oat milk with a hint of Madagascar vanilla bean.",
        price: 5.50,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRwUp1bZeQWuSg4ln0nq0S623y9Y8xYpAPfaw50BYZ15XeK_cXlDzsvL38tMGkWRcxAeZLrs04VBupsnj9ozbmB2LNxTJxiE3A_DhEPu77ONs26wvPaMTAoHHY03r32zFXjkeXLzdRxJsBfwTGkRu3ZCt1rkylIZf3MeSa-NgJYMc7ett806KH3fMxx1tYiBUWXBelPfT_q-_xK6R1bNF4D8blyv7mcHD5Y_WGQvS5d95b4MRBgQyfJApjtDRsZz7_fORLS4XYkTY",
        category: "Hot",
        calories: 190,
        prepTime: "5-7 min",
        rating: 4.8,
        reviews: 120,
        bestSeller: true,
    },
    {
        id: "e-cold-brew",
        name: "Ethiopian Cold Brew",
        description: "Slow-steeped for 18 hours, featuring floral notes and a bright citrus finish.",
        price: 4.75,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAucRc0a4LjrNIuI3t59AhL68rOdtEq2oi6HVkT_6179a2L8g932-8lkZTgzWEDd7HvCfRwRu4HKBtjIQIGFtgDkkGVihX4rY-oYC2D5wfMCyNsl37qV2hNkyH-aQelhtZhkgA93UR2nq_mCx3b8xb30GjMOG7wIAfV5q_g8GaZOTjx0TsCXZOtM871cY0As1nLeJKDp0rTRAhKg8v31dhCP8_bX3NM9pR5_OsIg6Ix6RUUoyBJ6q4X0MQCh4sZHPhja0_TEDG25-A",
        category: "Iced",
        calories: 5,
        prepTime: "2-3 min",
        rating: 5.0,
        reviews: 85,
    },
    {
        id: "c-macchiato",
        name: "Caramel Macchiato",
        description: "Freshly steamed milk marked with espresso, vanilla, and real caramel drizzle.",
        price: 6.00,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5KFmcX3S0yrWAbmM-FcAwWPqOpJRIl3UiZ0wUxmkkxIPe4BQweYOFrwdcLK7k_eqKkp-oluvOPOENr-YGfun59Ba6qU_CpDpa8srZt5vvMHRAPX5nuVfJU6Typo_YVftBLWMys8nHvDR1jJae1kl2J0E_ixBldTaIcBNiOy4-0bOjlCKfsgPAWqvMlUL8QxigAlFayRqB_4WH8Bb8R3MiynvqdVAndKdx2O1s56emyz1vzcWFYPWXV_-dDlAokt9vx8iru1NBUag",
        category: "Hot",
        calories: 250,
        prepTime: "4-6 min",
        rating: 4.5,
        reviews: 215,
    },
    {
        id: "cd-latte",
        name: "Cinnamon Dolce Latte",
        description: "Extra spicy and sweet seasonal favorite with a cinnmanon sugar topping.",
        price: 6.25,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDByNzoxpF9gPtlEvB6L46rucueemAHnX5lV3nNa1VgXBF0shVHfa91c-aN8q_AAwI6z_YfeCkZhHMFRl_HOoN5qmNi8gYlDcFoLlvEc2ItjEpWTtCW3bxosd2zya5QZ_pSI-0JV7rBIr4L6Jl5grTlmRqJKNNlDvvFqdwKR6Q-a7uqnAgHyLT52XK38xDDTGKQc_zr7fWe_bdPJrVRQZ6hOogyjOYxFl04TUaK-H35XZ0hjufMRlxWSaeeKflR7zqMk_U2kE1Hszc",
        category: "Seasonal",
        calories: 330,
        prepTime: "6-8 min",
        rating: 4.9,
        reviews: 342,
    }
];
